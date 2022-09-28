
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Stimulsoft Reports.JS Viewer</title>

	<!-- Stimulsoft Reports.JS -->
	<script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>

	<!-- Stimulsoft JS Viewer -->
	<script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>

	<script type="text/javascript">
		Stimulsoft.StiOptions.WebServer.url = "stimulsoft/handler.php";

		var options = new Stimulsoft.Viewer.StiViewerOptions();
		options.appearance.fullScreenMode = true;
		options.toolbar.showSendEmailButton = true;

		var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

		// Load and show report
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile("reports/SimpleList.mrt");
		viewer.report = report;

		function onLoad() {
			viewer.renderHtml("viewerContent");
		}
	</script>
	</head>
<body onload="onLoad();">
	<div id="viewerContent"></div>
</body>
</html>
