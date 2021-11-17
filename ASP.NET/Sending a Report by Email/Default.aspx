<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Demo.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="favicon.ico" />
    <title>Stimulsoft Reports.JS - Send Report by Email</title>

    <!-- JQuery -->
    <script src="Scripts/jquery-1.10.2.min.js" type="text/javascript"></script>

    <!-- Report Viewer Office2013 style -->
    <link href="Css/stimulsoft.viewer.office2013.whiteblue.css" rel="stylesheet"/>

    <!-- Stimusloft Reports.JS -->
    <script src="Scripts/stimulsoft.reports.js" type="text/javascript"></script>
    <script src="Scripts/stimulsoft.viewer.js" type="text/javascript"></script>
</head>
<body onload="onLoad()">
    <script type="text/javascript">
        function onLoad() {
            var report = new Stimulsoft.Report.StiReport();
            report.loadFile("Reports/SimpleList.mrt");

            var options = new Stimulsoft.Viewer.StiViewerOptions();
            options.toolbar.showSendEmailButton = true;

            var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

            viewer.onEmailReport = function (args) {
                // Prepare settings
                var data = {};
                data.fileName = args.fileName;
                data.format = args.format;
                data.data = Stimulsoft.System.Convert.toBase64String(args.data);
                data.email = args.settings.email;
                data.subject = args.settings.subject;
                data.message = args.settings.message;

                // Send data to server
                $.post("SendEmail.aspx", data)
                    .done(function (data) {
                        alert("Send Email: " + data);
                    });
            }

            viewer.report = report;
            viewer.renderHtml("content");
        }
    </script>
    <div id="content"></div>
</body>
</html>
