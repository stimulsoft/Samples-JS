var express = require("express");
var bodyParser = require("body-parser");
 
var app = express();
 
var urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.use(express.static(__dirname + "/"));
 
app.get("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  response.send(`${request.body.userName} - ${request.body.userAge}`);
});
 
app.listen(3000);