var http = require('http');
var MySQLAdapter = require('./MySQLAdapter');
var FirebirdAdapter = require('./FirebirdAdapter');
var MSSQLAdapter = require('./MSSQLAdapter');
var PostgreSQLAdapter = require('./PostgreSQLAdapter');

var connectionStringBuilder;
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
        if (data.indexOf("{") != 0){
            data = Buffer.from(data.replace(/[A-Za-z]/g, function(c) {
                return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= "M" ? 13 : -13));
            }), "base64").toString("ascii");

        }
        command = JSON.parse(data.toString());

        if (command.database == "MySQL") MySQLAdapter.process(command, onProcess);
        if (command.database == "Firebird") FirebirdAdapter.process(command, onProcess);
        if (command.database == "MS SQL") MSSQLAdapter.process(command, onProcess);
        if (command.database == "PostgreSQL") PostgreSQLAdapter.process(command, onProcess);
    });
}

var onProcess = function (result){
    response.end(JSON.stringify(result));
}

http.createServer(accept).listen(9615);
