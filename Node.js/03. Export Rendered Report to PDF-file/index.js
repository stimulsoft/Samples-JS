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

// Creating export settings
var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
// Creating export service
var service = new Stimulsoft.Report.Export.StiPdfExportService();
// Creating MemoryStream
var stream = new Stimulsoft.System.IO.MemoryStream();

// Exportong report into the MemoryStream
service.exportTo(report, stream, settings);

// Converting MemoryStream into Array
var data = stream.toArray();
// Converting Array into buffer
var buffer = new Buffer(data, "utf-8")

// File System module
var fs = require('fs');

// Saving string with rendered report in PDF into a file
fs.writeFileSync('./SimpleList.pdf', buffer);
console.log("Rendered report saved into PDF-file.");