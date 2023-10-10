var process = require('process')

// Stimulsoft Reports module
var Stimulsoft = require('stimulsoft-reports-js');
console.log("Stimulsoft Reports loaded");

// Creating new report
var report = new Stimulsoft.Report.StiReport();

// Loading report template
report.loadFile("Over-2.000-pages.mrt");

// Enable caching
report.reportCacheMode = Stimulsoft.Report.StiReportCacheMode.On;

// The more pages remain in memory, the faster rendering is. But it required more memory. This parameter affects the number of pages.
Stimulsoft.StiOptions.Engine.ReportCache.amountOfQuickAccessPages = 50; //Default 50

// The path where temporary files for the cache should be stored. If not specified, the system’s temporary folder will be used
Stimulsoft.StiOptions.Engine.ReportCache.cachePath = require("path").resolve("./");

console.log(`Memory usage by before rendering: ${Math.round(process.memoryUsage()["heapUsed"] / 1000000)}MB `);

// Renreding report
report.renderAsync(() => {
    console.log("Report rendered. Pages count: ", report.renderedPages.count);

    console.log(`Memory usage by after rendering: ${Math.round(process.memoryUsage()["heapUsed"] / 1000000)}MB `);

    // Saving rendered report to file
    report.saveDocumentFile("Over-2.000-pages.mdc");
    console.log("Rendered report saved");

    console.log(`Memory usage by after save: ${Math.round(process.memoryUsage()["heapUsed"] / 1000000)}MB `);

    // To clear the report cache; otherwise, the cache will not be cleared
    report.dispose();
});
