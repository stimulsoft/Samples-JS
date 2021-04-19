var http = require("http");
var fs = require('fs');

// Stimulsoft Reports module
var Stimulsoft = require("stimulsoft-reports-js");
// Loading fonts
Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("report/Roboto-Black.ttf");

function accept(req, res) {
	//Send index.html
	if (req.url == "/"){
		res.writeHeader(200, {"Content-Type": "text/html"}); 
		res.end(fs.readFileSync("web/index.html"));
	}
	//Send style.css
	else if (req.url == "/stimulsoft.viewer.office2013.whiteblue.css"){
		res.writeHeader(200, {"Content-Type": "text/css"}); 
		res.end(fs.readFileSync("web/stimulsoft.viewer.office2013.whiteblue.css"));
	}
	//Send reports.js
	else if (req.url == "/stimulsoft.reports.js"){
		res.writeHeader(200, {"Content-Type": "text/javascript"}); 
		res.end(fs.readFileSync("web/stimulsoft.reports.js"));
	}
	//Send viewer.js
	else if (req.url == "/stimulsoft.viewer.js"){
		res.writeHeader(200, {"Content-Type": "text/javascript"}); 
		res.end(fs.readFileSync("web/stimulsoft.viewer.js"));
	}
	//Send report
	else if (req.url == "/getReport"){
		// Creating new report
		var report = new Stimulsoft.Report.StiReport();
		// Loading report template
		report.loadFile("report/SimpleList.mrt");
		// Renreding report
		report.renderAsync(function() {
			// Saving rendered report to JSON string
    			var reportJson = report.saveDocumentToJsonString();
			// Send report
    			res.end(reportJson);
  		});
	}

}

console.log("Static file server running at http://localhost:" + 8888 + "/\nCTRL + C to shutdown");
//The HTTP server run on port 8888
http.createServer(accept).listen(8888);

