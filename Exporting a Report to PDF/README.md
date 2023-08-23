# Exporting a Report to PDF

This example illustrates loading of the report, data rendering and exporting the result to the PDF-document.

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

Renreding report:

    report.renderAsync(() => {
        
        // Export to PDF
        report.exportDocumentAsync((pdfData) => {
            // Converting Array into buffer
            var buffer = Buffer.from(pdfData);

            // File System module
            var fs = require('fs');

            // Saving string with rendered report in PDF into a file
            fs.writeFileSync('./SimpleList.pdf', buffer);
            console.log("Rendered report saved into PDF-file.");
        }, Stimulsoft.Report.StiExportFormat.Pdf);
    });
    
