exports.process = function (command, onResult) {
    
    var end = function (result) {
        try {
            if (connection) connection.end();
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
        
        var query = function (queryString) {
            connection.query("USE " + command.connectionStringInfo.database);
            //queryString = queryString.replace(/\'/gi, "\"");
            connection.query(queryString, function (error, rows) {
                if (error) onError(error.message);
                else {
                    onQuery(rows);
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
                    if (recordset[recordIndex][columnName] instanceof Uint8Array) {
                        var value = "";
                        for (var index = 0; index < recordset[recordIndex][columnName].length; index++) {
                            value += String.fromCharCode(recordset[recordIndex][columnName][index]);
                        }
                        recordset[recordIndex][columnName] = value;
                    }
                    row.push(recordset[recordIndex][columnName]);
                }
                isColumnsFill = true;
                rows.push(row);
            }
            
            end({ success: true, columns: columns, rows: rows });
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