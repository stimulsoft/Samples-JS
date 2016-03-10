<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Demo.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="favicon.ico" />
    <title>Stimulsoft Reports.JS - ASP.NET Demo</title>

    <!-- Report Viewer Office2013 style -->
	<link href="Css/stimulsoft.viewer.office2013.css" rel="stylesheet">

    <!-- Stimusloft Reports.JS -->
	<script src="Scripts/stimulsoft.reports.js" type="text/javascript"></script>
	<script src="Scripts/stimulsoft.viewer.js" type="text/javascript"></script>
</head>
<body>
    <form id="Form1" runat="server">
    <div>
        <asp:DropDownList ID="DropDownList1" runat="server" Height="25px" Width="200px" AutoPostBack="true">
            <asp:ListItem Value="SimpleList">Simple List</asp:ListItem>
            <asp:ListItem Value="HighlightCondition">Highlight Condition</asp:ListItem>
            <asp:ListItem>Images</asp:ListItem>
            <asp:ListItem Value="MasterDetail">Master-Detail</asp:ListItem>
            <asp:ListItem Value="MultiColumnList">Multi-Column List</asp:ListItem>
            <asp:ListItem Value="SimpleGroup">Simple-Group</asp:ListItem>
            <asp:ListItem Value="ChartStyles">Chart Styles</asp:ListItem>
        </asp:DropDownList>

        <br /><br />

        <script type="text/javascript">
            // Create a new report instance and load report from server
            var report = new Stimulsoft.Report.StiReport();
            report.loadFile("GetReport.aspx?id=<%= DropDownList1.SelectedValue %>");

            // View report in Viewer
            var options = new Stimulsoft.Viewer.StiViewerOptions();
            var viewer = new Stimulsoft.Viewer.StiViewer(options);
            viewer.report = report;
        </script>
    </div>
    </form>
</body>
</html>
