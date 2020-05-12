exports.process = function (command, onResult) {

    var end = function (result) {
        try {
            if (connection) connection.close();
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
                var column = recordset.columns[columnName]
                var columnIndex = column.index;
                columns.push(column.name);

                switch (column.type) {
                    case sql.Bit:
                    case sql.SmallInt:
                    case sql.Int:
                    case sql.BigInt:
                        types[columnIndex] = "int"; break;

                    case sql.Decimal:
                    case sql.Float:
                    case sql.Money:
                    case sql.Numeric:
                    case sql.SmallMoney:
                    case sql.Real:
                        types[columnIndex] = "number"; break;

                    case sql.TinyInt:
                        types[columnIndex] = "boolean"; break;

                    case sql.Char:
                    case sql.NChar:
                    case sql.Text:
                    case sql.NText:
                    case sql.VarChar:
                    case sql.NVarChar:
                    case sql.Xml:
                        types[columnIndex] = "string"; break;

                    case sql.Time:
                    case sql.Date:
                    case sql.DateTime:
                    case sql.DateTime2:
                    case sql.DateTimeOffset:
                    case sql.SmallDateTime:
                        types[columnIndex] = "datetime"; break;

                    case sql.UniqueIdentifier:
                        types[columnIndex] = "string"; break;
                    case sql.Variant:
                        types[columnIndex] = "string"; break;

                    case sql.Binary:
                    case sql.VarBinary:
                    case sql.Image:
                        types[columnIndex] = "string"; break;

                    case sql.UDT:
                    case sql.Geography:
                    case sql.Geometry:
                        types[columnIndex] = "string"; break;
                }
            }

            if (recordset.length > 0 && Array.isArray(recordset[0])) recordset = recordset[0];
            for (var recordIndex in recordset) {
                var row = [];
                for (var columnName in recordset[recordIndex]) {
                    var columnIndex = columns.indexOf(columnName);
                    if (types[columnIndex] != "array") types[columnIndex] = typeof recordset[recordIndex][columnName];
                    if (recordset[recordIndex][columnName] instanceof Uint8Array) {
                        types[columnIndex] = "array";
                        recordset[recordIndex][columnName] = Buffer.from(recordset[recordIndex][columnName]).toString('base64');
                    }

                    if (recordset[recordIndex][columnName] != null && typeof recordset[recordIndex][columnName].toISOString === "function") {
                        recordset[recordIndex][columnName] = recordset[recordIndex][columnName].toISOString();
                        types[columnIndex] = "datetime";
                    }

                    row[columnIndex] = recordset[recordIndex][columnName];
                }
                rows.push(row);
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
                options: {}
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

                            case "encrypt":
                                config.options["encrypt"] = match[1];
                                break;
                        }
                    }
                }
            }

            return config;
        };

        var sql = require('mssql');
        var config = getConnectionStringConfig(command.connectionString);

        connect();
    }
    catch (e) {
        onError(e.stack);
    }
}