<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Demo.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="favicon.ico" />
    <title>Stimulsoft Reports.JS - ASP.NET Demo</title>

    <!-- Report Viewer Office2013 style -->
    <link href="Css/stimulsoft.viewer.office2013.whiteblue.css" rel="stylesheet"/>
    <link href="Css/stimulsoft.designer.office2013.whiteblue.css" rel="stylesheet"/>

    <!-- Stimusloft Reports.JS -->
    <script src="Scripts/stimulsoft.reports.js" type="text/javascript"></script>
    <script src="Scripts/stimulsoft.viewer.js" type="text/javascript"></script>
    <script src="Scripts/stimulsoft.designer.js" type="text/javascript"></script>
</head>
<body onload="onLoad()">
    <script type="text/javascript">
        function onLoad() {
            StiOptions.WebServer.url = "handler.aspx";

            var options = new Stimulsoft.Designer.StiDesignerOptions();
            options.appearance.fullScreenMode = true;

            var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
            designer.renderHtml("content");
        }
    </script>
    <div id="content"></div>
</body>
</html>
