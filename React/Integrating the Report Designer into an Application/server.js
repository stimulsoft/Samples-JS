
var express = require('express');
var app = express();

app.use("/stimulsoft", express.static(__dirname + '/stimulsoft'));
app.use("/reports", express.static(__dirname + '/reports'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.listen(8080);