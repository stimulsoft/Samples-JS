<template>
  <div id="app">
    <div>
      <h2>Stimulsoft Reports.JS Designer</h2>
      <div id="designer"></div>
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
    console.log('Loading Designer view');

    console.log('Set full screen mode for the designer');
    var options = new window.Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = false;

    console.log('Create the report designer with specified options');
    var designer = new window.Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

    console.log('Create a new report instance');
    var report = new window.Stimulsoft.Report.StiReport();

    console.log('Load report from url');
    report.loadFile('reports/SimpleList.mrt');

    console.log('Edit report template in the designer');
    designer.report = report;

    console.log('Rendering the viewer to selected element');
    designer.renderHtml('designer');

    console.log('Loading completed successfully!');
  }
}
</script>

<style>
</style>
