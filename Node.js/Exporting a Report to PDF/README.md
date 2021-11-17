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

    report.renderAsync();

Export to PDF

	var pdfData = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);

Converting Array into buffer:

    var buffer = Buffer.from(pdfData)

Loading File System module:

    var fs = require('fs');

Saving string with rendered report in PDF form into a file:

    fs.writeFileSync('./SimpleList.pdf', buffer);
