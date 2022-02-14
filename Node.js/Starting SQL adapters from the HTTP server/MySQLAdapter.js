/*
Stimulsoft.Reports.JS
Version: 2022.1.6
Build date: 2022.02.11
License: https://www.stimulsoft.com/en/licensing/reports
*/
exports.process = function (command, onResult) {
    var end = function (result) {
        try {
            if (connection) {
                connection.end();
            }
            result.adapterVersion = "2022.1.6";
            onResult(result);
        }
        catch (e) {
        }
    }

    var onError = function (message) {
        end({ success: false, notice: message });
    }

    try {
        var connect = function () {
            connection.connect(function (error) {
                if (error) onError(error.message);
                else onConnect();
            });
        }

        var query = function (queryString, timeout) {
            connection.query("USE " + command.connectionStringInfo.database);
            //queryString = queryString.replace(/\'/gi, "\"");
            connection.query({ sql: queryString, timeout: timeout }, function (error, rows, fields) {
                if (error) onError(error.message);
                else {
                    onQuery(rows, fields);
                }
            });
        }

        var onConnect = function () {
            if (command.queryString) query(command.queryString, command.timeout);
            else end({ success: true });
        }

        var onQuery = function (recordset, fields) {
            var columns = [];
            var rows = [];
            var types = [];
            if (fields.length > 0 && Array.isArray(fields[0])) fields = fields[0];

            for (var columnIndex in fields) {
                var column = fields[columnIndex]
                columns.push(column.name);

                switch (column.type) {
                    case 16: // Bit
                        types[columnIndex] = "boolean"; break;

                    case 1:   // Byte
                    case 2:   // Int16
                    case 3:   // Int32
                    case 5:   // Double
                    case 8:   // Int64
                    case 9:   // Int24
                    case 13:  // Year
                    case 501: // UByte
                    case 502: // UInt16
                    case 503: // UInt32
                    case 508: // UInt64
                    case 509: // UInt24
                        types[columnIndex] = "int"; break;

                    case 0:   // Decimal
                    case 4:   // Float
                    case 246: // NewDecimal
                        types[columnIndex] = "number"; break;

                    case 7:   // Timestamp
                    case 10:  // Date
                    case 12:  // DateTime
                    case 14:  // Newdate
                        types[columnIndex] = "datetime"; break;

                    case 11:  // Time
                        types[columnIndex] = "time"; break;

                    case 15:  // VarString
                    case 247: // Enum
                    case 248: // Set
                    case 249: // TinyBlob
                    case 250: // MediumBlob
                    case 251: // LongBlob
                    case 252: // Blob
                    case 253: // VarChar
                    case 254: // String
                    case 255: // Geometry
                    case 600: // Binary
                    case 601: // VarBinary
                    case 749: // TinyText
                    case 750: // MediumText
                    case 751: // LongText
                    case 752: // Text
                    case 800: // Guid

                    default:
                        types[columnIndex] = "string"; break;
                }
            }

            if (recordset.length > 0 && Array.isArray(recordset[0])) recordset = recordset[0];
            for (var recordIndex in recordset) {
                var row = [];
                for (var columnName in recordset[recordIndex]) {
                    var columnIndex = columns.indexOf(columnName);
                    if (recordset[recordIndex][columnName] instanceof Uint8Array ||
                        recordset[recordIndex][columnName] instanceof Buffer) {
                        types[columnIndex] = "array";
                        recordset[recordIndex][columnName] = Buffer.from(recordset[recordIndex][columnName]).toString('base64');
                    }

                    if (recordset[recordIndex][columnName] != null && typeof recordset[recordIndex][columnName].toISOString === "function") {
                        var dateTime = new Date(recordset[recordIndex][columnName].getTime() - (recordset[recordIndex][columnName].getTimezoneOffset() * 60000)).toISOString();
                        recordset[recordIndex][columnName] = dateTime.replace("Z", "");
                        types[columnIndex] = "datetime";
                    }

                    row[columnIndex] = recordset[recordIndex][columnName];
                }
                rows.push(row);
            }

            end({ success: true, columns: columns, rows: rows, types: types });
        }

        var getConnectionStringInfo = function (connectionString) {
            var info = { host: "localhost", port: "3306", charset: "utf8" };

            for (var propertyIndex in connectionString.split(";")) {
                var property = connectionString.split(";")[propertyIndex];
                if (property) {
                    var match = property.split("=");
                    if (match && match.length >= 2) {
                        match[0] = match[0].trim().toLowerCase();
                        match[1] = match[1].trim();

                        switch (match[0]) {
                            case "server":
                            case "host":
                            case "location":
                                info["host"] = match[1];
                                break;

                            case "port":
                                info["port"] = match[1];
                                break;

                            case "database":
                            case "data source":
                                info["database"] = match[1];
                                break;

                            case "uid":
                            case "user":
                            case "username":
                            case "userid":
                            case "user id":
                                info["userId"] = match[1];
                                break;

                            case "pwd":
                            case "password":
                                info["password"] = match[1];
                                break;

                            case "charset":
                                info["charset"] = match[1];
                                break;
                        }
                    }
                }
            }

            return info;
        };

        var mysql = require('mysql');
        command.connectionStringInfo = getConnectionStringInfo(command.connectionString);

        var connection = mysql.createConnection({
            host: command.connectionStringInfo.host,
            user: command.connectionStringInfo.userId,
            password: command.connectionStringInfo.password,
            port: command.connectionStringInfo.port,
            charset: command.connectionStringInfo.charset,
            database: command.connectionStringInfo.database
        });

        connect();


    }
    catch (e) {
        onError(e.stack);
    }
}