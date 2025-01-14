# Using a Custom Font

This example demonstrates adding of the fonts folder, loading of the report, data rendering and exporting the result to the PDF-document.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ npm start

### Step by step
Stimulsoft Reports.JS module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Adding new custom font:

    Stimulsoft.Base.StiFontCollection.setFontsFolder('./Fonts');

Creating new report:

    var report = new Stimulsoft.Report.StiReport();

Loading sample report template:

    report.loadFile("FontsFolder.mrt");

Renreding report:

    report.renderAsync(() => {

        //Using export settings, if needed
        var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
        settings.embeddedFonts = true;
        
        // Export to PDF
        report.exportDocumentAsync((pdfData) => {
            // Converting Array into buffer
            var buffer = Buffer.from(pdfData);

            // File System module
            var fs = require('fs');

            // Saving string with rendered report in PDF into a file
            fs.writeFileSync('./FontsFolder.pdf', buffer);
            console.log("Rendered report saved into PDF-file.");
        }, Stimulsoft.Report.StiExportFormat.Pdf, null, settings);
    });
    
