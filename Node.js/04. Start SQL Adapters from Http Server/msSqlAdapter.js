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
            connection = new sql.Connection(config, function (error) {
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
            var columns = [];
            var rows = [];
            var isColumnsFill = false;
            for (var recordIndex in recordset) {
                var row = [];
                for (var columnName in recordset[recordIndex]) {
                    if (!isColumnsFill) columns.push(columnName);
                    row.push(recordset[recordIndex][columnName]);
                }
                isColumnsFill = true;
                rows.push(row);
            }
            
            end({ success: true, columns: columns, rows: rows });
        }
        
        var getConnectionStringInfo = function (connectionString) {
            var info = {};
            
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
                                info["host"] = match[1];
                                break;

                            case "database":
                            case "initial catalog":
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
        
        var sql = require('mssql');
        command.connectionStringInfo = getConnectionStringInfo(command.connectionString);
        
        var config = {
            user: command.connectionStringInfo.userId,
            password: command.connectionStringInfo.password,
            server: command.connectionStringInfo.host,
            database: command.connectionStringInfo.database
        };
        
        connect();
    }
    catch (e) {
        onError(e.stack);
    }
}