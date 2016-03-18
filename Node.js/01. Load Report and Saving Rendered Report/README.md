#01. Load Report and Saving Rendered Report

This example illustrates loading of the report, data rendering and storing the result to the mdc-file.

**Key steps for this task:**

Stimulsoft Reports module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Requered for rendering font loading:

    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Roboto-Black.ttf");

Creating new report:

    var report = new Stimulsoft.Report.StiReport();

Loading sample report template:

    report.loadFile("SimpleList.mrt");

Renreding report:

    report.render();

Saving rendered report to mdc-file:

    report.saveDocumentFile("SimpleList.mdc");
