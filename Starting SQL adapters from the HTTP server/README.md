
How it works -> [link](https://github.com/stimulsoft/DataAdapters.JS).  
    
If you need examples for other platforms, follow the links below:
* [NodeJs](https://github.com/stimulsoft/Samples-JS/tree/master/Node.js/Starting%20SQL%20adapters%20from%20the%20HTTP%20server)
* [ASP.NET](https://github.com/stimulsoft/Samples-JS/tree/master/ASP.NET/Connecting%20to%20Databases)
* [ASP.NET Core](https://github.com/stimulsoft/Samples-JS/tree/master/ASP.NET%20Core/Connecting%20to%20Databases)
* [PHP](https://github.com/stimulsoft/Samples-JS/tree/master/PHP/Connecting%20to%20Databases)
* [Java](https://github.com/stimulsoft/Samples-JS/tree/master/Java/Connecting%20to%20Databases)

# Starting SQL Adapters from the HTTP Server

This example demonstrates the implementation of connections to different databases (MySQL, Firebird, MSSQL and PostgreSQL). Adapters files are in a directory with an example. You can include adapters into your projects without changes.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ node start

And on the client side, you need to specify the URL of this host that handles requests:
```js
StiOptions.WebServer.url = "http://localhost:9615";
```

### Step by step

Loading required modules:

    var http = require('http');
    var adapter = require("stimulsoft-data-adapter");

Main function for work with adapter, it collect data from responce and run adapter with received command:

    function accept(request, response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Cache-Control", "no-cache");

        var data = "";
        request.on('data', function (buffer) {
            data += buffer;
        });

        request.on('end', function () {
            var command = adapter.getCommand(data);
            adapter.process(command, function (result) {
                var responseData = adapter.getResponse(result);
                response.end(responseData);
            });
        });
    }

Starting DataAdapter:

    http.createServer(accept).listen(9615);
