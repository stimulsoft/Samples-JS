/*
Stimulsoft.Reports.JS
Version: 2022.1.6
Build date: 2022.02.11
License: https://www.stimulsoft.com/en/licensing/reports
*/
exports.process = function (command, onResult) {
    var end = function (result) {
        try {
            if (connection) connection.close();
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
            connection = new sql.ConnectionPool(config, function (error) {
                if (error) onError(error.message);
                else onConnect();
            });
        }

        var query = function (queryString) {
            var request = connection.request();
            request.query(queryString, function (error, recordset) {
                if (error) onError(error.message);
                else {
                    onQuery(recordset);
                }
            });
        }

        var onConnect = function () {
            if (command.queryString) query(command.queryString);
            else end({ success: true });
        }

        var onQuery = function (recordset) {
            recordset = recordset.recordset;
            var columns = [];
            var rows = [];
            var types = [];
            if (recordset.length > 0 && Array.isArray(recordset[0])) recordset = recordset[0];
            for (var columnName in recordset.columns) {
                var column = recordset.columns[columnName];
                var columnIndex = columns.length;
                columns.push(column.name);
                
                switch (column.type) {
                    case sql.UniqueIdentifier:
                    case sql.BigInt:
                    case sql.timestamp:
                    case sql.Int:
                    case sql.SmallInt:
                    case sql.TinyInt:
                        types[columnIndex] = "int"; break;

                    case sql.Decimal:
                    case sql.Money:
                    case sql.SmallMoney:
                    case sql.Float:
                    case sql.Real:
                        types[columnIndex] = "number"; break;

                    case sql.DateTime:
                    case sql.Date:
                    case sql.DateTime2:
                    case sql.SmallDateTime:
                        types[columnIndex] = "datetime"; break;

                    case sql.DateTimeOffset:
                        types[columnIndex] = "datetimeZ"; break;

                    case sql.Time:
                        types[columnIndex] = "time"; break;

                    case sql.Bit:
                        types[columnIndex] = "boolean"; break;

                    case sql.Binary:
                    case sql.Image:
                        types[columnIndex] = "array"; break;

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
                        var dateTime = recordset[recordIndex][columnName].toISOString();
                        if (types[columnIndex] == "time") {
                            recordset[recordIndex][columnName] = dateTime.substr(dateTime.indexOf("T") + 1).replace("Z", "");
                        }
                        else if (types[columnIndex] == "datetimeZ") {
                            var offset = "+00:00";
                            recordset[recordIndex][columnName] = dateTime.replace("Z", "") + offset;
                        }
                        else {
                            recordset[recordIndex][columnName] = dateTime.replace("Z", "");
                            types[columnIndex] = "datetime";
                        }
                    }

                    if (columnName == "" && Array.isArray(recordset[recordIndex][columnName])) {
                        for (var i = 0; i < recordset[recordIndex][columnName].length; i++) {
                            if (columns.length <= columnIndex + i && columns[columnIndex + i] != ""){
                                columns.splice(columnIndex + i - 1, 0, columns[columnIndex]);
                                types.splice(columnIndex + i - 1, 0, types[columnIndex]);
                            }
                            row[columnIndex + i] = recordset[recordIndex][columnName][i];
                        }
                    }
                    else
                        row[columnIndex] = recordset[recordIndex][columnName];
                }
                rows.push(row);
            }

            for (var typeIndex in types) {
                if (types[typeIndex] == "datetimeZ") types[typeIndex] = "datetimeoffset";
            }

            end({ success: true, columns: columns, rows: rows, types: types });
        }

        var getHostInfo = function (host) {
            const info = {};
            const regexPort = /(.*),([0-9]+)/;
            const matchPort = regexPort.exec(host);

            if (matchPort) {
                info.port = matchPort[2].trim();
                host = matchPort[1].trim();
            }

            const regexInstanceName = /(.*)\\(.*)/;
            const matchInstanceName = regexInstanceName.exec(host);
            if (matchInstanceName) {
                info.instanceName = matchInstanceName[2].trim();
                host = matchInstanceName[1].trim();
            }

            info.host = host;
            return info;
        }

        var getConnectionStringConfig = function (connectionString) {
            var config = {
                options: {
                    trustServerCertificate: true,
                    cryptoCredentialsDetails: {
                        minVersion: 'TLSv1'
                    }
                }
            };

            for (var propertyIndex in connectionString.split(";")) {
                var property = connectionString.split(";")[propertyIndex];
                if (property) {
                    var match = property.split("=");
                    if (match && match.length >= 2) {
                        match[0] = match[0].trim().toLowerCase();
                        match[1] = match[1].trim();

                        switch (match[0]) {
                            case "data source":
                            case "server":
                                var hostInfo = getHostInfo(match[1]);
                                config["server"] = hostInfo.host;
                                if ("port" in hostInfo) config["port"] = +hostInfo.port;
                                if ("instanceName" in hostInfo) config.options["instanceName"] = hostInfo.instanceName;
                                break;

                            case "database":
                            case "initial catalog":
                                config["database"] = match[1];
                                break;

                            case "uid":
                            case "user":
                            case "user id":
                                config["user"] = match[1];
                                break;

                            case "pwd":
                            case "password":
                                config["password"] = match[1];
                                break;

                            case "domain":
                                config["domain"] = match[1];
                                break;

                            case "encrypt":
                                config.options["encrypt"] = !!match[1];
                                break;

                            case "connectiontimeout":
                                config.options["connectionTimeout"] = match[1];
                                break;

                            case "requesttimeout":
                                config.options["requestTimeout"] = match[1];
                                break;

                            case "tdsversion":
                                config.options["tdsVersion"] = match[1];
                                break;

                            case "trustservercertificate":
                                config.options["trustServerCertificate"] = !!match[1];
                                break;
                        }
                    }
                }
            }

            return config;
        };

        var sql = require('mssql');
        var config = getConnectionStringConfig(command.connectionString);
        if (!("connectionTimeout" in config) && "timeout" in command) config.connectionTimeout = command.timeout;
        if (!("requestTimeout" in config) && "timeout" in command) config.requestTimeout = command.timeout;

        connect();
    }
    catch (e) {
        onError(e.stack);
    }
}