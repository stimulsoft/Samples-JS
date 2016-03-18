# 02. Export Rendered Report to HTML-file

This example illustrates loading of the report, data rendering and storing the result to the HTML-file.

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

Saving rendered report to mdc-file:

    report.saveDocumentFile("SimpleList.mdc");

Creating export settings:

    var settings = new Stimulsoft.Report.Export.StiHtmlExportSettings();

Creating export service:

    var service = new Stimulsoft.Report.Export.StiHtmlExportService();

Creating text writer:

    var textWriter = new Stimulsoft.System.IO.TextWriter();

Creating HTML writer:

    var htmlTextWriter = new Stimulsoft.Report.Export.StiHtmlTextWriter(textWriter);

Exportong report into HTML writer:

    service.exportTo(report, htmlTextWriter, settings);

Set HTML-data to string:

    var resultHtml = textWriter.getStringBuilder().toString();

Loading File System module:

    var fs = require('fs');

Saving string with rendered report in HTML form into a file:

    fs.writeFileSync('./SimpleList.html', resultHtml);

