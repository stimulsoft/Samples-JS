# Supply Custom Headers for Json Database

This example illustrates loading of the report that uses json database from some web-server and accessible only by suppliing custom HTTP header. That report is rendered and result is stored to the mdc-file.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ npm start

### Step by step

Stimulsoft Reports.JS module loading:

    const Stimulsoft = require('stimulsoft-reports-js');

Creating new report:

    const report = new Stimulsoft.Report.StiReport();

Add onBeginProcessData event handler and set necessary headers:

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

Loading sample report template:

    report.loadFile("SimpleListWithProtectedJson.mrt");

Renreding report and saving rendered report to mdc-file:

    report.renderAsync(function () {

        // Saving rendered report to file
        report.saveDocumentFile("SimpleListWithProtectedJson.mdc");
    });
