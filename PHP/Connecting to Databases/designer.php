<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Stimulsoft Reports.JS Designer</title>

	<!-- Office2013 style -->
	<link href="css/stimulsoft.viewer.office2013.whiteblue.css" rel="stylesheet">
	<link href="css/stimulsoft.designer.office2013.whiteblue.css" rel="stylesheet">

	<!-- Stimulsoft Reports.JS -->
	<script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>

	<!-- Stimulsoft JS Viewer (for preview tab) and Stimulsoft JS Designer -->
	<script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>
	<script src="scripts/stimulsoft.designer.js" type="text/javascript"></script>
	
	<!-- Stimulsoft Blockly editor for JS Designer -->
	<script src="scripts/stimulsoft.blockly.editor.js" type="text/javascript"></script>

	<script type="text/javascript">
		Stimulsoft.StiOptions.WebServer.url = "stimulsoft/handler.php";
		
		var options = new Stimulsoft.Designer.StiDesignerOptions();
		options.appearance.fullScreenMode = true;
		options.toolbar.showSendEmailButton = true;

		var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);

		// Load and design report
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile("reports/SimpleList.mrt");
		designer.report = report;

		function onLoad() {
			designer.renderHtml("designerContent");
		}
	</script>
	</head>
<body onload="onLoad();">
	<div id="designerContent"></div>
</body>
</html>
