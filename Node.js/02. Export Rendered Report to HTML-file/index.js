// Stimulsoft Reports module
var Stimulsoft = require('stimulsoft-reports-js');
console.log("Stimulsoft Reports loaded");

// Loading fonts
Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Roboto-Black.ttf");
console.log("Font loaded");

// Creating new report
var report = new Stimulsoft.Report.StiReport();
console.log("New report created");

// Loading report template
report.loadFile("SimpleList.mrt");
console.log("Report template loaded");

// Renreding report
report.render();
console.log("Report rendered. Pages count: ", report.renderedPages.count);

// Export to HTML
var htmlString = report.exportDocument(Stimulsoft.Report.StiExportFormat.Html);

// File System module
var fs = require('fs');

// Saving string with rendered report in HTML into a file
fs.writeFileSync('./SimpleList.html', htmlString);
console.log("Rendered report saved into HTML-file.");