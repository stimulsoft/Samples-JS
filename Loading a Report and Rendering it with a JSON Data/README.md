# Loading a Report and Rendering it with a JSON Data

This example illustrates loading of the report and load Json-data, data rendering and saving the result to the mdc-file.

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

Remove all connections from the report template

    report.dictionary.databases.clear();

Create new DataSet object:

    var dataSet = new Stimulsoft.System.Data.DataSet("Demo");

Load JSON data file from specified URL to the DataSet object:

    dataSet.readJsonFile("Demo.json");

Remove all connections from the report template:

    report.dictionary.databases.clear();

Register DataSet object:

    report.regData("Demo", "Demo", dataSet);

Renreding report and saving rendered report to mdc-file:

    report.renderAsync(function () {
    
        // Saving rendered report to file
        report.saveDocumentFile("SimpleList.mdc");
    });
