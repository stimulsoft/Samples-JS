# Loading a Report and Saving a Rendered Report

This example illustrates loading of the report, data rendering and saving the result to the mdc-file.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ node start

### Step by step
Stimulsoft Reports.JS module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Creating new report:

    var report = new Stimulsoft.Report.StiReport();

Loading sample report template:

    report.loadFile("SimpleList.mrt");

Renreding report and saving rendered report to mdc-file:

    report.renderAsync(function () {
    
        // Saving rendered report to file
        report.saveDocumentFile("SimpleList.mdc");
    });
