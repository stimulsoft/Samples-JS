<?php
require_once 'stimulsoft/helper.php';
?>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Stimulsoft Reports.PHP - JS Report Designer</title>

	<!-- Report Office2013 style -->
	<link href="css/stimulsoft.viewer.office2013.whiteteal.css" rel="stylesheet">
	<link href="css/stimulsoft.designer.office2013.lightgrayteal.css" rel="stylesheet">

	<!-- Stimusloft Reports.JS -->
	<script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>
	<script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>
	<script src="scripts/stimulsoft.designer.js" type="text/javascript"></script>
	
	<?php StiHelper::initialize(); ?>
	<script type="text/javascript">
		var options = new Stimulsoft.Designer.StiDesignerOptions();
		options.appearance.fullScreenMode = true;
		options.toolbar.showSendEmailButton = true;
		
		var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
		
		// Process SQL data source
		designer.onBeginProcessData = function (event, callback) {
			<?php StiHelper::createHandler(); ?>
		}
		
		// Save report template on the server side
		designer.onSaveReport = function (event) {
			<?php StiHelper::createHandler(); ?>
		}
		
		// Load and design report
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile("reports/SimpleList.mrt");
		designer.report = report;
		designer.renderHtml("designerContent");
	</script>
	</head>
<body>
	<div id="designerContent"></div>
</body>
</html>
