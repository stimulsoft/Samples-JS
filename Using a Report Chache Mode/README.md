# Exporting a Report to PDF

This example illustrates how you can enable and configure cache settings to resolve lack of memory issues.

### Installation and running
Use npm to install requred modules:
    
    $ npm install

Run Sample:

    $ npm start

### Step by step
Stimulsoft Reports.JS module loading:

```javascript
var Stimulsoft = require('stimulsoft-reports-js');
```

Creating new report:

```javascript
var report = new Stimulsoft.Report.StiReport();
```

Loading sample report template:

```javascript
report.loadFile("Over-2.000-pages.mrt");
```

Enable caching:

```javascript
report.reportCacheMode = Stimulsoft.Report.StiReportCacheMode.On;
```

Renreding report and saving rendered report to mdc-file:

```javascript
report.renderAsync(function () {
    
    // Saving rendered report to file
    report.saveDocumentFile("SimpleList.mdc");

    // To clear the report cache; otherwise, the cache will not be cleared
    report.dispose();
});
```

Dispose report for clear cache:

```javascript
report.dispose();
```
