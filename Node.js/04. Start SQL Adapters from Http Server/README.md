
Если Вам нужны датаадаптеры для других платформ перейдите по ссылкам ниже:
[NodeJs](https://github.com/stimulsoft/Samples-JS/tree/master/Node.js/04.%20Start%20SQL%20Adapters%20from%20Http%20Server)
[ASP.NET](https://github.com/stimulsoft/Samples-JS/tree/master/ASP.NET/02.%20Connect%20to%20databases)
[PHP](https://github.com/stimulsoft/Samples-JS/tree/master/PHP/02.%20Connect%20to%20databases)
[Java](https://github.com/stimulsoft/Samples-JS/tree/master/Java/01.%20Data%20Adapter)

# 04. Start SQL Adapters from Http Server

This example demonstrates the implementation of connections to different databases (MySQL, Firebird, MSSQL and PostgreSQL). Adapters files are in a directory with an example. You can include adapters into your projects without changes.

### Installation and running
Use npm to install requred modules:

    $ npm install
Run Sample:

    $ node index

### Step by step

Loading required modules:

    var http = require('http');
    var MySQLAdapter = require('./MySQLAdapter');
    var FirebirdAdapter = require('./FirebirdAdapter');
    var MSSQLAdapter = require('./MSSQLAdapter');
    var PostgreSQLAdapter = require('./PostgreSQLAdapter');

Main function for work with adapter, it collect data from responce and run adapter with received command:

    var response;
        function accept(req, res) {
            response = res;
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
            response.setHeader("Cache-Control", "no-cache");
            
            var data = "";
            req.on('data', function (buffer) {
                data += buffer;
            });
        
            req.on('end', function () {
                command = JSON.parse(data.toString());
                command.queryString = applyQueryParameters(command.queryString, command.parameters, command.escapeQueryParameters);

                if (command.database == "MySQL") MySQLAdapter.process(command, onProcess);
                else if (command.database == "Firebird") FirebirdAdapter.process(command, onProcess);
                else if (command.database == "MS SQL") MSSQLAdapter.process(command, onProcess);
                else if (command.database == "PostgreSQL") PostgreSQLAdapter.process(command, onProcess);
                else onResult({ success: false, notice: "Database '" + command.database + "' not supported!" });
            });
        }

Setting onProcess callback:

    var onProcess = function (result){
        response.end(JSON.stringify(result));
    }

Starting Server

    console.log("The HTTP server run on port 9615");
    http.createServer(accept).listen(9615);
