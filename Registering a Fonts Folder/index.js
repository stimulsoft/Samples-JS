// Stimulsoft Reports module
var Stimulsoft = require('stimulsoft-reports-js');
console.log('Stimulsoft Reports loaded');

//Register fonts folder
Stimulsoft.Base.StiFontCollection.setFontsFolder('./Fonts');
console.log('Fonts folder registered');

// Creating new report
var report = new Stimulsoft.Report.StiReport();
console.log('New report is created');

// Loading report template
report.loadFile('FontsFolder.mrt');
console.log('Report template is loaded');

// Renreding report
report.renderAsync(() => {
    console.log('Report is rendered. Pages count: ', report.renderedPages.count);

    //Embedding the Font Files into PDF
    var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
    settings.embeddedFonts = true;

    // Export to PDF
    report.exportDocumentAsync(
        (pdfData) => {
            // Converting Array into buffer
            var buffer = Buffer.from(pdfData);

            // File System module
            var fs = require('fs');

            // Saving string with rendered report in PDF into a file
            fs.writeFileSync('./FontsFolder.pdf', buffer);
            console.log('Rendered report is saved into PDF-file.');
        }, Stimulsoft.Report.StiExportFormat.Pdf, null, settings);
});
