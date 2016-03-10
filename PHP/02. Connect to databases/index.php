<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" href="favicon.ico" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Stimulsoft Reports.JS - PHP Demo</title>

	<!-- Report Viewer Office2013 style -->
	<link href="css/stimulsoft.viewer.office2013.css" rel="stylesheet">
	
	<!-- Report Designer Office2013 style -->
	<link href="css/stimulsoft.designer.office2013.lightgray.teal.css" rel="stylesheet">

	<!-- Stimusloft Reports.JS -->
	<script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>
	<script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>
	<script src="scripts/stimulsoft.designer.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		function onLoad() {
			StiOptions.WebServer.url = "handler.php";

			var options = new Stimulsoft.Designer.StiDesignerOptions();
			options.appearance.fullScreenMode = true;

			var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
			designer.renderHtml("content");
		}
	</script>
</head>
<body onload="onLoad()">
    <div id="content">Designer should be here</div>
</body>
</html>
