// Stimulsoft Reports module
var Stimulsoft = require('stimulsoft-reports-js');
console.log("Stimulsoft Reports loaded");

// Creating new report
var report = new Stimulsoft.Report.StiReport();
console.log("New report created");

// Loading report template
report.loadFile("SimpleList.mrt");
console.log("Report template loaded");

// Renreding report
report.renderAsync(function () {
    console.log("Report rendered. Pages count: ", report.renderedPages.count);

    // Saving rendered report to file
    report.saveDocumentFile("SimpleList.mdc");
    console.log("Rendered report saved");
});
