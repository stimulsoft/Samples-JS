<template>
  <div id="app">
    <div>
      <h2>Stimulsoft Reports.JS Viewer</h2>
      <div id="viewer"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    
    }
  },
  mounted: function() {
    console.log('Loading Viewer view');
    
    console.log('Creating the report viewer with default options');
    var viewer = new window.Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

    console.log('Creating a new report instance');
    
    var report = new window.Stimulsoft.Report.StiReport();

    console.log('Load report from url');
    report.loadFile('/reports/SimpleList.mrt');

    console.log('Assigning report to the viewer, the report will be built automatically after rendering the viewer');
    viewer.report = report;

    console.log('Rendering the viewer to selected element');
    viewer.renderHtml('viewer');

    console.log('Loading completed successfully!');
  }
}
</script>

<style>

</style>
