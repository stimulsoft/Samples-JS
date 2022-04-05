const path = require("path");
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', "http://localhost:4200");
    res.set('Access-Control-Allow-Credentials', 'true');
    const headerNames = req.get('Access-Control-Request-Headers');
    if (headerNames) {
        res.set('Access-Control-Allow-Headers', headerNames);
    }    
    next();
});

app.get("/ProtectedDemo.json", async (req, res) => {
    if (req.get("x-auth-token") === "*YOUR TOKEN*") {
        res.sendFile(path.join(__dirname, "ProtectedDemo.json"));
    } else {
        res.status(403).end();
    }
});

app.listen(7702);
