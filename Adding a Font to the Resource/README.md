# Adding a Font to the Resource

This example illustrates loading of the report, adding font to resource and saving the result to the mdc-file.

### Installation and running
Use npm to install requred modules:

    $ npm install
Run Sample:

    $ npm start

### Step by step
Stimulsoft Reports.JS module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Creating a new report:

    var report = new Stimulsoft.Report.StiReport();

Font loading:

    var fileContent = Stimulsoft.System.IO.File.getFile("Roboto-Black.ttf", true);

Creating a resource with the name, type and data:

    var resource = new Stimulsoft.Report.Dictionary.StiResource("Roboto-Black", "Roboto-Black", false, Stimulsoft.Report.Dictionary.StiResourceType.FontTtf, fileContent);
    report.dictionary.resources.add(resource);

Getting a report page:

    var page = report.pages.getByIndex(0);

Creating text component:

    var dataText = new Stimulsoft.Report.Components.StiText();
    dataText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(1, 1, 3, 2);
    dataText.text = "Sample Text";
    dataText.font = new Stimulsoft.System.Drawing.Font("Roboto-Black");
    dataText.border.side = Stimulsoft.Base.Drawing.StiBorderSides.All;

    page.components.add(dataText);

Renreding and saving report to file:

    report.renderAsync(function () {

        // Saving rendered report to file
        report.saveDocumentFile("Report.mdc");  
    });
