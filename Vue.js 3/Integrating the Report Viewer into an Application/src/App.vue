<script setup lang="ts">
import { onMounted } from "vue";
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor";
import "stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css";

onMounted(() => {
  console.log("Loading Viewer view");

  console.log("Creating the report viewer with default options");
  let viewer = new Stimulsoft.Viewer.StiViewer(undefined, "StiViewer", false);

  console.log("Creating a new report instance");
  let report = new Stimulsoft.Report.StiReport();

  console.log("Load report from url");
  report.loadFile("/reports/SimpleList.mrt");

  console.log("Assigning report to the viewer, the report will be built automatically after rendering the viewer");
  viewer.report = report;

  console.log("Rendering the viewer to selected element");
  viewer.renderHtml("viewer");

  console.log("Loading completed successfully!");
});
</script>

<template>
  <div id="app">
    <div>
      <h2 id="app-title">Stimulsoft Reports.JS Viewer</h2>
      <div id="viewer"></div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  margin-top: 60px;
}

#app-title {
  text-align: center;
}
</style>
