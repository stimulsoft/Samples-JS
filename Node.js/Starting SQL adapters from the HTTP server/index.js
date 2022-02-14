var http = require('http');
var MySQLAdapter = require('./MySQLAdapter');
var FirebirdAdapter = require('./FirebirdAdapter');
var MSSQLAdapter = require('./MSSQLAdapter');
var PostgreSQLAdapter = require('./PostgreSQLAdapter');

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
        var encryptResult = false;

        if (typeof data === "string" && !data.startsWith("{")) {
            data = Buffer.from(data.replace(/[A-Za-z]/g, function (c) {
                return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= "M" ? 13 : -13));
            }), "base64").toString("ascii");
            encryptResult = true;
        }

        var onProcessHandler = onProcess.bind(null, encryptResult);

        var command = null;
        try {
            command = JSON.parse(data.toString());
        }
        catch (e) {
            console.log(e.message);
            return onProcessHandler({ success: false, notice: e.message });
        }

        if (command.command === "GetSupportedAdapters") {
            let result = {
                success: true,
                types: ["MySQL", "MS SQL", "Firebird", "PostgreSQL"]
            };
            onProcessHandler(result);
        } else {
            command.queryString = applyQueryParameters(command.queryString, command.parameters, command.escapeQueryParameters);

            if (command.database == "MySQL") MySQLAdapter.process(command, onProcessHandler);
            else if (command.database == "Firebird") FirebirdAdapter.process(command, onProcessHandler);
            else if (command.database == "MS SQL") MSSQLAdapter.process(command, onProcessHandler);
            else if (command.database == "PostgreSQL") PostgreSQLAdapter.process(command, onProcessHandler);
            else onProcessHandler({ success: false, notice: "Database '" + command.database + "' not supported!" });
        }
    });
}

var applyQueryParameters = function (baseSqlCommand, parameters, escapeQueryParameters) {
    if (baseSqlCommand == null || baseSqlCommand.indexOf("@") < 0) return baseSqlCommand;

    var result = "";
    while (baseSqlCommand.indexOf("@") >= 0 && parameters != null && parameters.length > 0) {
        result += baseSqlCommand.substring(0, baseSqlCommand.indexOf("@"));
        baseSqlCommand = baseSqlCommand.substring(baseSqlCommand.indexOf("@") + 1);

        var parameterName = "";

        while (baseSqlCommand.length > 0) {
            var char = baseSqlCommand.charAt(0);
            if (char.length === 1 && char.match(/[a-zA-Z0-9_-]/i)) {
                parameterName += char;
                baseSqlCommand = baseSqlCommand.substring(1);
            }
            else break;
        }

        var parameter = parameters.find(parameter => parameter.name.toLowerCase() == parameterName.toLowerCase());
        if (parameter) {
            if (parameter.typeGroup != "number") {
                if (escapeQueryParameters)
                    result += "'" + parameter.value.toString().replace(/\\/gi, "\\\\").replace(/\'/gi, "\\\'").replace(/\"/gi, "\\\"") + "'";
                else
                    result += "'" + parameter.value.toString() + "'";
            }
            else
                result += parameter.value.toString();
        }
        else
            result += "@" + parameterName;
    }

    return result + baseSqlCommand;
}

var onProcess = function (encryptData, result) {
    result.handlerVersion = "2022.1.6";
    result = JSON.stringify(result);
    if (encryptData) {
        result = Buffer.from(result).toString("base64").replace(/[A-Za-z]/g, function (c) {
            return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= "M" ? 13 : -13));
        });
    }
    response.end(result);
}

console.log("The DataAdapter run on port 9615");
console.log("To use, on the client side, you need to specify the URL of this host that handles requests:");
console.log("StiOptions.WebServer.url = \"http://localhost:9615\"");
http.createServer(accept).listen(9615);
