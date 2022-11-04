/*
Stimulsoft.Reports.JS
Version: 2022.4.4
Build date: 2022.11.01
License: https://www.stimulsoft.com/en/licensing/reports
*/

package com.stimulsoft.js.adapter;

import com.stimulsoft.base.json.JSONArray;
import com.stimulsoft.base.json.JSONException;
import com.stimulsoft.base.json.JSONObject;
import com.stimulsoft.base.system.StiSqlTypes;
import com.stimulsoft.lib.base64.StiBase64DecoderUtil;
import com.stimulsoft.lib.base64.StiBase64EncoderUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JSDataAdapter {

    public static final String handlerVersion = "2022.4.4";
    public static final String adapterVersion = "2022.4.4";
    public static final boolean checkVersion = true;

    private static final List<String> USERS_KEYS = Arrays.asList(
            "jdbc.username", "username", "uid", "user", "user id", "userid", "connection.username");
    private static final List<String> PASSWORD_KEYS = Arrays.asList("jdbc.password", "pwd", "password", "connection.password");
    private static final List<String> HOST_KEY = Arrays.asList("host", "server", "location", "data source", "datasource");
    private static final List<String> PORT_KEY = Collections.singletonList("port");
    private static final List<String> DATABASE_KEY = Arrays.asList("database", "database name", "databasename", "initial catalog", "sid");
    protected static final List<String> URL_KEYS = Arrays.asList("jdbc.url", "connectionurl", "url", "connection.url");
    private static final SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.sss");
    private static final SimpleDateFormat mysqlDateFormatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.sss");
    private static final TimeZone timeZone = TimeZone.getTimeZone("UTC");

    static {
        mysqlDateFormatter.setTimeZone(timeZone);
    }

    private static String onError(Exception e) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("notice", e.getMessage() + "<br>" + e.getStackTrace()[0]);
        result.put("handlerVersion", handlerVersion);
        result.put("adapterVersion", adapterVersion);
        result.put("checkVersion", checkVersion);
        e.printStackTrace();
        return new JSONObject(result).toString();
    }

    private static String connect(JSONObject command) throws SQLException {
        Connection con = null;
        try {
            String dbName = command.getString("database");
            String connectionString = command.getString("connectionString");
            Map<String, String> params = parseParams(connectionString);
            Properties info = new Properties();
            info.setProperty("user", getUser(params));
            info.setProperty("password", getPassword(params));
            if (!(connectionString.contains("Encoding") || connectionString.contains("encoding"))
                    || params.containsKey("characterencoding") || params.containsKey("charset")) {
                info.setProperty("useUnicode", "true");
                info.setProperty("characterEncoding", "UTF-8");
            }
            info.putAll(params);
            String url = getUrl(params);

            if ("MySQL".equals(dbName)) {
                Class.forName("com.mysql.cj.jdbc.Driver");
                info.setProperty("zeroDateTimeBehavior", "CONVERT_TO_NULL");
                if (url == null) {
                    url = String.format("jdbc:mysql://%s:%s/%s", getHost(params), getPort(params, "3306"), getDatabase(params));
                }
            } else if ("MS SQL".equals(dbName)) {
                Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
                if (url == null) {
                    url = String.format("jdbc:sqlserver://%s:%s;databaseName=%s", getHost(params), getPort(params, "1433"), getDatabase(params));
                }
            } else if ("PostgreSQL".equals(dbName)) {
                Class.forName("org.postgresql.Driver");
                if (url == null) {
                    url = String.format("jdbc:postgresql://%s:%s/%s", getHost(params), getPort(params, "5432"), getDatabase(params));
                }
            } else if ("Firebird".equals(dbName)) {
                Class.forName("org.firebirdsql.jdbc.FBDriver");
                if (url == null) {
                    url = String.format("jdbc:firebirdsql://%s:%s/%s", getHost(params), getPort(params, "3050"), getDatabase(params));
                }
                String charSet = params.get("charset");
                info.setProperty("encoding", charSet == null? "UTF8": charSet);
            } else if ("Oracle".equals(dbName)) {
                Class.forName("oracle.jdbc.OracleDriver");
                if (url == null) {
                    Map<String, String> oracleParams = parseOracleConnectionString(params);
                    if (oracleParams != null) {
                        url = String.format("jdbc:oracle:thin:@%s:%s:%s", getHost(oracleParams), getPort(oracleParams, "1521"), getDatabase(oracleParams));
                    }
                }
            }
            //noinspection ConstantConditions
            con = DriverManager.getConnection(url, info);
            return onConnect(command, con, dbName);
        } catch (Exception e) {
            return onError(e);
        } finally {
            if (con != null && !con.isClosed()) {
                con.close();
            }
        }
    }

    private static String onConnect(JSONObject command, Connection con, String dbName) throws JSONException {
        if (command.has("queryString")) {
            JSONArray params = command.has("parameters") ? command.getJSONArray("parameters") : null;
            boolean escapeParams = command.has("escapeQueryParameters") && command.getBoolean("escapeQueryParameters");

            String queryText = applyQueryParameters(command.getString("queryString"), params, escapeParams);
            return query(queryText, con, dbName);
        } else {
            HashMap<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("handlerVersion", handlerVersion);
            result.put("adapterVersion", adapterVersion);
            result.put("checkVersion", checkVersion);
            return new JSONObject(result).toString();
        }
    }

    private static final Pattern queryParamRegexp = Pattern.compile("@[a-zA-Z0-9_-]+");

    private static String applyQueryParameters(String baseSqlCommand, JSONArray parameters, Boolean escapeQueryParameters) throws JSONException {
        if (baseSqlCommand == null || !baseSqlCommand.contains("@")) {
            return baseSqlCommand;
        }

        StringBuilder result = new StringBuilder();

        Matcher matcher = queryParamRegexp.matcher(baseSqlCommand);
        int prevStart = 0;
        while (matcher.find()) {
            result.append(baseSqlCommand, prevStart, matcher.start());

            String parameterName = baseSqlCommand.substring(matcher.start() + 1, matcher.end());

            JSONObject parameter = null;
            for (int i = 0; i < parameters.length(); i++) {
                JSONObject currParameter = parameters.getJSONObject(i);
                if (parameterName.equalsIgnoreCase(currParameter.tryGetString("name"))) {
                    parameter = currParameter;
                    break;
                }
            }

            if (parameter == null) {
                result.append('@').append(parameterName);
            } else {
                String value = parameter.tryGetString("value");
                if (!parameter.tryGetString("typeGroup").equals("number")) {
                    if (escapeQueryParameters) {
                        value = value.replace("\\", "\\\\").replace("'", "\\'").replace("\"", "\\\"");
                    }
                    result.append("'").append(value).append("'");
                } else {
                    result.append(value);
                }
            }

            prevStart = matcher.end();
        }

        if (prevStart < baseSqlCommand.length()) {
            result.append(baseSqlCommand, prevStart, baseSqlCommand.length());
        }

        return result.toString();
    }

    private static String query(String queryString, Connection con, String dbName) {
        try {
            PreparedStatement pstmt = con.prepareStatement(queryString);
            ResultSet rs = pstmt.executeQuery();
            return onQuery(rs, dbName);
        } catch (Exception e) {
            return onError(e);
        }
    }

    private static String onQuery(ResultSet rs, String dbName) throws SQLException {
        List<String> columns = new ArrayList<>();
        List<List<String>> rows = new ArrayList<>();
        List<String> types = new ArrayList<>();
        boolean isColumnsFill = false;
        while (rs.next()) {
            List<String> row = new ArrayList<>();
            for (int index = 1; index <= rs.getMetaData().getColumnCount(); index++) {
                if (!isColumnsFill) {
                    columns.add(rs.getMetaData().getColumnName(index));
                    types.add(getColumnType(rs.getMetaData().getColumnType(index)));
                }
                String columnType = types.get(index - 1);
                String value = "";
                if (rs.getString(index) != null) {
                    if ("datetime".equals(columnType)) {
                        if ("MySQL".equals(dbName)) {
                            Timestamp dbValue = rs.getTimestamp(index);
                            value = dbValue == null ? null : mysqlDateFormatter.format(rs.getTimestamp(index));
                        } else {
                            value = dateFormatter.format(rs.getTimestamp(index));
                        }
                    } else if ("array".equals(columnType)) {
                        value = new String(StiBase64EncoderUtil.encode(rs.getBytes(index)));
                    } else {
                        value = rs.getString(index);
                    }
                }
                row.add(value);
            }
            rows.add(row);
            isColumnsFill = true;
        }
        HashMap<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("columns", columns);
        result.put("rows", rows);
        result.put("types", types);
        result.put("handlerVersion", handlerVersion);
        result.put("adapterVersion", adapterVersion);
        result.put("checkVersion", checkVersion);
        return new JSONObject(result).toString();
    }

    public static String getColumnType(int columnType) {
        // Description http://msdn.microsoft.com/en-us/library/ms131092.aspx
        switch (columnType) {
        case StiSqlTypes.VARCHAR:
        case StiSqlTypes.CHAR:
        case StiSqlTypes.CLOB:
        case StiSqlTypes.LONGNVARCHAR:
        case StiSqlTypes.LONGVARCHAR:
        case StiSqlTypes.NCHAR:
        case StiSqlTypes.NCLOB:
        case StiSqlTypes.NVARCHAR:
            return "string";

        case StiSqlTypes.BOOLEAN:
        case StiSqlTypes.BIT:
            return "boolean";

        case StiSqlTypes.INTEGER:
        case StiSqlTypes.BIGINT:
        case StiSqlTypes.SMALLINT:
        case StiSqlTypes.TINYINT:
            return "int";
        case StiSqlTypes.TIMESTAMP_WITH_ZONE:
        case StiSqlTypes.DATE:
        case StiSqlTypes.TIMESTAMP:
            return "datetime";
        case StiSqlTypes.TIME:
            return "time";
        case StiSqlTypes.DECIMAL:
        case StiSqlTypes.DOUBLE:
        case StiSqlTypes.FLOAT:
        case StiSqlTypes.NUMERIC:
        case StiSqlTypes.REAL:
            return "number";

        case StiSqlTypes.BLOB:
        case StiSqlTypes.VARBINARY:
        case StiSqlTypes.BINARY:
        case StiSqlTypes.ARRAY:
        case StiSqlTypes.DATALINK: // !!
        case StiSqlTypes.JAVA_OBJECT:
        case StiSqlTypes.LONGVARBINARY:
        case StiSqlTypes.NULL:
        case StiSqlTypes.OTHER:
        case StiSqlTypes.REF:
        case StiSqlTypes.SQLXML:
        case StiSqlTypes.STRUCT:
            return "array";
        default:
            return "object";
        }

    }

    public static String process(InputStream is) throws IOException, SQLException, JSONException {
        BufferedReader r = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        StringBuilder command = new StringBuilder();
        String str;
        while ((str = r.readLine()) != null) {
            command.append(str);
        }
        boolean encryptData = false;
        if (command.charAt(0) != '{') {
            byte[] decoded = StiBase64DecoderUtil.decode(rot13(command).toString());
            command = new StringBuilder(new String(decoded, StandardCharsets.UTF_8));
            encryptData = true;
        }

        JSONObject commandData = new JSONObject(command.toString());
        String result;
        if (commandData.getString("command").equals("GetSupportedAdapters")) {
            JSONObject resultData = new JSONObject();
            resultData.put("success", true);
            resultData.put("types", new String[] {
                "MySQL", "MS SQL", "PostgreSQL", "Oracle", "Firebird"
            });
            result = resultData.toString();
        } else {
            result = connect(commandData);
        }

        if (encryptData) {
            byte[] encodedData = StiBase64EncoderUtil.encode(result.getBytes(StandardCharsets.UTF_8));
            result = rot13(new StringBuilder(new String(encodedData, StandardCharsets.US_ASCII))).toString();
        }
        return result;
    }

    private static Map<String, String> parseParams(String string) {
        String[] keyValues = string.split(";");
        Map<String, String> result = new HashMap<>();
        for (String element : keyValues) {
            String[] keyValue = element.split("=", 2);
            String originalKey = keyValue[0];
            String lowerKey = originalKey.trim().toLowerCase();
            String value = keyValue.length > 1 ? keyValue[1].trim() : "";
            result.put(lowerKey, value);
        }
        return result;
    }

    private static String getUrl(Map<String, String> params) {
        return getLeastOne(params, URL_KEYS);
    }

    private static String getDatabase(Map<String, String> params) {
        return getLeastOne(params, DATABASE_KEY);
    }

    private static String getPort(Map<String, String> params, String def) {
        String result = getLeastOne(params, PORT_KEY);
        return result != null ? result : def;
    }

    private static String getHost(Map<String, String> params) {
        return getLeastOne(params, HOST_KEY);
    }

    private static String getUser(Map<String, String> params) {
        return getLeastOne(params, USERS_KEYS);
    }

    private static String getPassword(Map<String, String> params) {
        return getLeastOne(params, PASSWORD_KEYS);
    }

    private static String getLeastOne(Map<String, String> params, List<String> keys) {
        for (final String key : keys) {
            final String value = params.get(key);
            if (value != null) {
                params.remove(key);
                return value;
            }
        }
        return null;
    }

    private static Map<String, String> parseOracleConnectionString(Map<String, String> params) {
        String dataSource = getHost(params);
        if (dataSource != null) {
            Pattern pattern = Pattern.compile("\\([^()]*\\)");
            Matcher matcher = pattern.matcher(dataSource);
            List<String> values = new ArrayList<>();
            while (matcher.find()) {
                values.add(matcher.group().replaceAll("[()]", ""));
            }
            return parseParams(String.join(";", values));
        }
        return null;
    }

    private static StringBuilder rot13(StringBuilder str) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (c >= 'a' && c <= 'm')
                c += 13;
            else if (c >= 'A' && c <= 'M')
                c += 13;
            else if (c >= 'n' && c <= 'z')
                c -= 13;
            else if (c >= 'N' && c <= 'Z')
                c -= 13;
            result.append(c);
        }
        return result;
    }

}
