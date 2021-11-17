#01. Load Report and Saving Rendered Report

This example illustrates loading of the report, data rendering and storing the result to the mdc-file.

### Installation and running
Use npm to install requred modules:

    $ npm install
Run Sample:

    $ node index

### Step by step

Stimulsoft Reports module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Requered for rendering font loading:

    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Roboto-Black.ttf");

Creating new report:

    var report = new Stimulsoft.Report.StiReport();

Loading sample report template:

    report.loadFile("SimpleList.mrt");

Renreding report:

    report.renderAsync();

Saving rendered report to mdc-file:

    report.saveDocumentFile("SimpleList.mdc");
