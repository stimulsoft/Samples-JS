package com.stimulsoft.js.adapter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.stimulsoft.base.json.JSONException;
import com.stimulsoft.base.json.JSONObject;
import com.stimulsoft.base.system.StiSqlTypes;
import com.stimulsoft.lib.base64.StiBase64DecoderUtil;

/**
 * Copyright Stimulsoft
 */
public class JSDataAdapter {

    private static final List<String> USERS_KEYS = Arrays.asList(
            new String[] { "jdbc.username", "username", "uid", "user", "user id", "userid", "connection.username" });
    private static final List<String> PASSWORD_KEYS = Arrays.asList(new String[] { "jdbc.password", "pwd", "password", "connection.password" });
    private static final List<String> HOST_KEY = Arrays.asList(new String[] { "host", "server", "location" });
    private static final List<String> PORT_KEY = Arrays.asList(new String[] { "port" });
    private static final List<String> DATABASE_KEY = Arrays.asList(new String[] { "database", "database name", "databasename", "data source" });
    protected static final List<String> URL_KEYS = Arrays.asList(new String[] { "jdbc.url", "connectionurl", "url", "connection.url" });

    private static String onError(Exception e) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        result.put("success", false);
        result.put("notice", e.getMessage() + "<br>" + e.getStackTrace()[0]);
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
            if (!(connectionString.contains("Encoding") || connectionString.contains("encoding")) || params.containsKey("characterEncoding")) {
                info.setProperty("useUnicode", "true");
                info.setProperty("characterEncoding", "UTF-8");
            }
            info.putAll(params);
            String url = getUrl(params);

            if ("MySQL".equals(dbName)) {
                Class.forName("com.mysql.jdbc.Driver");
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
            }
            con = DriverManager.getConnection(url, info);
            return onConnect(command, con);
        } catch (Exception e) {
            return onError(e);
        } finally {
            if (con != null && !con.isClosed()) {
                con.close();
            }
        }
    }

    private static String onConnect(JSONObject command, Connection con) throws JSONException {
        if (command.has("queryString")) {
            return query(command.getString("queryString"), con);
        } else {
            HashMap<String, Object> result = new HashMap<String, Object>();
            result.put("success", true);
            return new JSONObject(result).toString();
        }
    }

    private static String query(String queryString, Connection con) {
        try {
            PreparedStatement pstmt = con.prepareStatement(queryString);
            ResultSet rs = pstmt.executeQuery();
            return onQuery(rs);
        } catch (Exception e) {
            return onError(e);
        }
    }

    private static String onQuery(ResultSet rs) throws SQLException {
        List<String> columns = new ArrayList<String>();
        List<List<String>> rows = new ArrayList<List<String>>();
        List<String> types = new ArrayList<String>();
        boolean isColumnsFill = false;
        while (rs.next()) {
            List<String> row = new ArrayList<String>();
            for (int index = 1; index <= rs.getMetaData().getColumnCount(); index++) {
                if (!isColumnsFill) {
                    columns.add(rs.getMetaData().getColumnName(index));
                    types.add(getColumnType(rs.getMetaData().getColumnType(index)));
                }
                String value = rs.getString(index) != null ? rs.getString(index) : "";
                row.add(value);
            }
            rows.add(row);
            isColumnsFill = true;
        }
        HashMap<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("columns", columns);
        result.put("rows", rows);
        result.put("types", types);
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
        case StiSqlTypes.TIME:
            return "datetime";
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
            throw new IllegalArgumentException("Undefined type - '" + columnType + "'");
        }

    }

    public static String process(InputStream is) throws IOException, SQLException, JSONException {
        BufferedReader r = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        StringBuilder command = new StringBuilder();
        String str = null;
        while ((str = r.readLine()) != null) {
            command.append(str);
        }
        if (command.charAt(0) != '{') {
            byte[] decoded = StiBase64DecoderUtil.decode(rot13(command).toString());
            command = new StringBuilder(new String(decoded, "UTF-8"));
        }
        return connect(new JSONObject(command.toString()));
    }

    private static Map<String, String> parseParams(String string) {
        String[] keyValues = string.split(";");
        Map<String, String> result = new HashMap<String, String>();
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
