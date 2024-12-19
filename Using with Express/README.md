# Using with Express

This example illustrates how to use Stimulsoft Reports.JS in conjunction with the Express framework.

### Installation and running
Use npm to install requred modules:

    $ npm install

Run Sample:

    $ npm start

### Step by step server.js

Configure Express Server:
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;
   ```
   
Set up a route to serve the Stimulsoft Reports.js viewer and designer page:
   ```javascript
    app.get('/viewer', (req, res) => {
        res.sendFile(__dirname + '/viewer.html');
    });

    app.get('/designer', (req, res) => {
        res.sendFile(__dirname + '/designer.html');
    });
    ```

Set up a route to serve the necessary Stimulsoft Reports.JS scripts:
    ```javascript
    app.get('/stimulsoft.reports.js', (req, res) => {
        res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.reports.js");
    });

    app.get('/stimulsoft.viewer.js', (req, res) => {
        res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.viewer.js");
    });

    app.get('/stimulsoft.designer.js', (req, res) => {
        res.sendFile(__dirname + "/node_modules/stimulsoft-reports-js/Scripts/stimulsoft.designer.js");
    });
    ```

In your Express route handler, load the report definition:
    ```javascript
    app.get('/report', (req, res) => {
        res.sendFile(__dirname + '/SampleReport.mrt');
    });
   ```

Start the server by adding the following code at the end of the file:
   ```javascript
   app.listen(port, () => {
       console.log(`Server running on port ${port}`);
   });
   ```

### Step by step Viewer page
Add the following code to the HTML file to include the required Stimulsoft Reports.js libraries and initialize the viewer:
   ```html
    <script src="stimulsoft.reports.js"></script>
    <script src="stimulsoft.viewer.js"></script>
   ```

Add the following code to the HTML file to script tag:

Set full screen mode for the viewer:
```javascript
var options = new Stimulsoft.Viewer.StiViewerOptions();
options.appearance.fullScreenMode = true;
```

Create the report viewer with specified options:
```javascript
var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
```

Render Viewer:
```javascript    
viewer.renderHtml("viewer");
```

Create a new report instance:
```javascript
var report = new Stimulsoft.Report.StiReport();
```

Load report from url:
```javascript
report.loadFile('/report');
```

Show report template in the viewer:
```javascript
viewer.report = report;
```

### Step by step Designer page
Add the following code to the HTML file to include the required Stimulsoft Reports.js libraries and initialize the designer:
   ```html
    <script src="stimulsoft.reports.js"></script>
    <script src="stimulsoft.viewer.js"></script>
    <script src="stimulsoft.designer.js"></script>
   ```

Add the following code to the HTML file to script tag:

Set full screen mode for the designer:
```javascript
var options = new Stimulsoft.Designer.StiDesignerOptions();
options.appearance.fullScreenMode = true;
```

Create the report viewer with specified options:
```javascript
var designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);
```

Render Designer:
```javascript    
designer.renderHtml("designer");
```

Create a new report instance:
```javascript
var report = new Stimulsoft.Report.StiReport();
```

Load report from url:
```javascript
report.loadFile('/report');
```

Edit report template in the designer:
```javascript
designer.report = report;
```
