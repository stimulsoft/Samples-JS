const express = require('express');
const app = express();
const port = 3000;

app.get('/viewer', (req, res) => {
  res.sendFile(__dirname + '/viewer.html');
});

app.get('/designer', (req, res) => {
    res.sendFile(__dirname + '/designer.html');
  });

app.get('/report', (req, res) => {
  res.sendFile(__dirname + '/SampleReport.mrt');
});

app.get('/stimulsoft.reports.js', (req, res) => {
  res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.reports.js");
});

app.get('/stimulsoft.viewer.js', (req, res) => {
  res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.viewer.js");
});

app.get('/stimulsoft.designer.js', (req, res) => {
    res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.designer.js");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Navigate to http://localhost:${port}/viewer show Viewer`);
  console.log(`Navigate to http://localhost:${port}/designer show Designer`);
  console.log(`CTRL + C to shutdown`);
});