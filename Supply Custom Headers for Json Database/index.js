const Stimulsoft = require('stimulsoft-reports-js');

// Creating new report
const report = new Stimulsoft.Report.StiReport();
console.log("New report created");
// In `onBeginProcessData` event handler add custom HTTP headers
report.onBeginProcessData = function (args) {
    if (
        args.database === "JSON" && 
        args.command === "GetData" && 
        args.pathData && args.pathData.endsWith("/ProtectedDemo.json")
    ) {
        // Add custom header to pass through server protection
        args.headers.push({key: "X-Auth-Token", value: "*YOUR TOKEN*"});
    }
};
// Load report from url
report.loadFile("SimpleListWithProtectedJson.mrt");
console.log("Report template loaded");
// Renreding report
report.renderAsync(function () {
    console.log("Report rendered. Pages count: ", report.renderedPages.count);

    // Saving rendered report to file
    report.saveDocumentFile("SimpleListWithProtectedJson.mdc");
    console.log("Rendered report saved");
});
