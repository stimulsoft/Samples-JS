angular
.module('demoApp', [])

// Controller here
.controller('MainCtrl', function($scope) {
	$scope.testData = "Angular JS Demo";
	
	// Create the report viewer with default options
	var viewer = new Stimulsoft.Viewer.StiViewer(null, "StiViewer", false);
	
	// Create a new report instance
	var report = new Stimulsoft.Report.StiReport();	
	
	// Load report from url
	report.loadFile("/reports/SimpleList.mrt");
	
	// Assign report to the viewer, the report will be built automatically after rendering the viewer
	viewer.report = report;
	
	// Render the viewer to selected element
	viewer.renderHtml("viewerContent");
	
	// Next Page action
	$scope.nextPage = function() {
		viewer.jsObject.postAction("NextPage");
    }
   
	// Previous Page action
	$scope.prevPage = function() {
		viewer.jsObject.postAction("PrevPage");
    }
	
	// Print Report action
	$scope.printReport = function() {
		viewer.jsObject.postAction("Print");
    }
});