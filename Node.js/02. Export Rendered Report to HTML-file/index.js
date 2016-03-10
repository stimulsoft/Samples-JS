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
var settings = new Stimulsoft.Report.Export.StiHtmlExportSettings();
// Creating export service
var service = new Stimulsoft.Report.Export.StiHtmlExportService();
// Creating text writer 
var textWriter = new Stimulsoft.System.IO.TextWriter();
// Creating HTML writer
var htmlTextWriter = new Stimulsoft.Report.Export.StiHtmlTextWriter(textWriter);

// Exportong report into HTML writer
service.exportTo(report, htmlTextWriter, settings);

// Set HTML-data to string
var resultHtml = textWriter.getStringBuilder().toString();

// File System module
var fs = require('fs');

// Saving string with rendered report in HTML into a file
fs.writeFileSync('./SimpleList.html', resultHtml);
console.log("Rendered report saved into HTML-file.");