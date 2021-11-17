#07. Add Font to Resource

This example illustrates loading of the report, adding font to resource and storing the result to the mdc-file.

### Installation and running
Use npm to install requred modules:

    $ npm install
Run Sample:

    $ node index

### Step by step

Stimulsoft Reports module loading:

    var Stimulsoft = require('stimulsoft-reports-js');

Font loading:
    var fileContent = Stimulsoft.System.IO.File.getFile("Roboto-Black.ttf", true);

Creating a resource with the name, type and data:
    var resource = new Stimulsoft.Report.Dictionary.StiResource("Roboto-Black", "Roboto-Black", false, Stimulsoft.Report.Dictionary.StiResourceType.FontTtf, fileContent);
    report.dictionary.resources.add(resource);

Creating text component:
    var dataText = new Stimulsoft.Report.Components.StiText();
    dataText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(1, 1, 3, 2);
    dataText.text = "Sample Text";
    dataText.font = new Stimulsoft.System.Drawing.Font("Roboto-Black");
    dataText.border.side = Stimulsoft.Base.Drawing.StiBorderSides.All;

    page.components.add(dataText);

Renreding report:

    report.renderAsync();

Saving rendered report to mdc-file:

    report.saveDocumentFile("Report.mdc");