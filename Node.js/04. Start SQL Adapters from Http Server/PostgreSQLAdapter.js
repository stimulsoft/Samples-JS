exports.process = function (command, onResult) {

    var end = function (result) {
        try {
            if (client) client.end();
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
            client.connect(function (error) {
                if (error) onError(error.message);
                else onConnect();
            });
        }

        var query = function (queryString) {
            client.query(queryString, function (error, recordset) {
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
            var columns = [];
            var rows = [];
            for (var recordIndex in recordset.fields) {
              columns.push(recordset.fields[recordIndex].name);
            }

            for (var recordIndex in recordset.rows) {
                var row = [];
                for (var columnNameIndex in columns) {
                    row[columnNameIndex] = recordset.rows[recordIndex][columns[columnNameIndex]];
                }
                rows.push(row);
            }

            end({ success: true, columns: columns, rows: rows });
        }

        var getConnectionStringInfo = function (connectionString) {
            var info = { port: 5432 };

            for (var propertyIndex in connectionString.split(";")) {
                var property = connectionString.split(";")[propertyIndex];
                if (property) {
                    var match = property.split(new RegExp('=|:'));
                    if (match && match.length >= 2) {
                        match[0] = match[0].trim().toLowerCase();
                        match[1] = match[1].trim();

                        switch (match[0]) {
                            case "data source":
                            case "server":
                            case "host":
                                info["host"] = match[1];
                                break;

                            case "port":
                                info["port"] = match[1];
                                break;

                            case "database":
                            case "location":
                                info["database"] = match[1];
                                break;

                            case "uid":
                            case "user":
                            case "user id":
                                info["userId"] = match[1];
                                break;

                            case "pwd":
                            case "password":
                                info["password"] = match[1];
                                break;
                        }
                    }
                }
            }

            return info;
        };

        var pg = require('pg');
        command.connectionStringInfo = getConnectionStringInfo(command.connectionString);

        command.postgreConnectionString = "postgres://"+command.connectionStringInfo.userId+":"+command.connectionStringInfo.password+"@"+command.connectionStringInfo.host;
        if (command.connectionStringInfo.port != null) command.postgreConnectionString += ":"+command.connectionStringInfo.port;
        command.postgreConnectionString += "/"+command.connectionStringInfo.database;

        var client = new pg.Client(command.postgreConnectionString);

        connect();
    }
    catch (e) {
        onError(e.stack);
    }
}
