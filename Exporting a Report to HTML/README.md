# Exporting a Report to HTML

This example illustrates loading of the report, data rendering and exporting the result to the HTML-file.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ node index

### Step by step
Stimulsoft Reports.JS module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Creating new report:

    var report = new Stimulsoft.Report.StiReport();

Loading sample report template:

    report.loadFile("SimpleList.mrt");

Renreding, saving and exporting report:

    report.renderAsync(() => {
    
        // Export to HTML
        var htmlString = report.exportDocument(Stimulsoft.Report.StiExportFormat.Html);

        // File System module
        var fs = require('fs');

        // Saving string with rendered report in HTML into a file
        fs.writeFileSync('./SimpleList.html', htmlString);
    });

