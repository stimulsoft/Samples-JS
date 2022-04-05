const http = require("http");
const url = require('url');
const fs = require('fs');
const path = require('path');

// Launch dummy HTTP server to provide json file protected with custom header
const server = http.createServer(function (req, res) {
    const uri = decodeURI(url.parse(req.url).pathname);    
    if (req.headers["x-auth-token"] !== "*YOUR TOKEN*") {        
        res.writeHead(403);
        res.end();
        return;
    }
    if (uri !== "/ProtectedDemo.json") {
        res.writeHead(404);
        res.end();
        return;
    }
    console.log(`Load ${uri} from server`);
    res.writeHead(200, { "Content-Type": "application/json" });
    const fileStream = fs.createReadStream(path.join(__dirname, "../ProtectedDemo.json"));
    fileStream.pipe(res);
}).listen(7702);
