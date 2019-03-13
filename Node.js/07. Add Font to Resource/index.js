// Stimulsoft Reports module
var Stimulsoft = require('stimulsoft-reports-js');
console.log("Stimulsoft Reports loaded");

var report = new Stimulsoft.Report.StiReport();

var fileContent = Stimulsoft.System.IO.File.getFile("Roboto-Black.ttf", true);
var resource = new Stimulsoft.Report.Dictionary.StiResource("Roboto-Black", "Roboto-Black", false, Stimulsoft.Report.Dictionary.StiResourceType.FontTtf, fileContent);
report.dictionary.resources.add(resource);

var page = report.pages.getByIndex(0);

//Create text
var dataText = new Stimulsoft.Report.Components.StiText();
dataText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(1, 1, 3, 2);
dataText.text = "Sample Text";
dataText.font = new Stimulsoft.System.Drawing.Font("Roboto-Black");
dataText.border.side = Stimulsoft.Base.Drawing.StiBorderSides.All;

page.components.add(dataText);

// Renreding report
report.render();
console.log("Report rendered. Pages count: ", report.renderedPages.count);

// Saving rendered report to file
report.saveDocumentFile("Report.mdc");
console.log("Rendered report saved");