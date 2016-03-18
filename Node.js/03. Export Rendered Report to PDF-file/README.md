# 03. Export Rendered Report to PDF-file

This example illustrates loading of the report, data rendering and storing the result to the PDF-document.

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

    report.render();

Creating export settings:

    var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();

Creating export service:

    var service = new Stimulsoft.Report.Export.StiPdfExportService();

Creating MemoryStream:

    var stream = new Stimulsoft.System.IO.MemoryStream();

Exportong report into the MemoryStream:

    service.exportTo(report, stream, settings);

Converting MemoryStream into Array:

    var data = stream.toArray();

Converting Array into buffer:

    var buffer = new Buffer(data, "utf-8")

Loading File System module:

    var fs = require('fs');

Saving string with rendered report in PDF form into a file:

    fs.writeFileSync('./SimpleList.pdf', buffer);
