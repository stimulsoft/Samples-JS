<script setup lang="ts">
import { onMounted } from "vue";
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor";
import "stimulsoft-reports-js/Css/stimulsoft.designer.office2013.whiteblue.css";
import "stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css";

onMounted(() => {
  console.log("Loading Designer view");

  console.log("Set full screen mode for the designer");
  let options = new Stimulsoft.Designer.StiDesignerOptions();
  options.appearance.fullScreenMode = false;

  console.log("Create the report designer with specified options");
  let designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);

  console.log("Create a new report instance");
  let report = new Stimulsoft.Report.StiReport();

  // In `onBeginProcessData` event handler add custom HTTP headers
  report.onBeginProcessData = (args: any) => {
    if (
        args.database === "JSON" && 
        args.command === "GetData" && 
        args.pathData && args.pathData.endsWith("/ProtectedDemo.json")
    ) {
        // Add custom header to pass through server protection
        args.headers.push({key: "X-Auth-Token", value: "*YOUR TOKEN*"});
    }
  };

  console.log("Load report from url");
  report.loadFile("reports/SimpleListWithProtectedJson.mrt");

  console.log("Edit report template in the designer");
  designer.report = report;

  console.log("Rendering the designer to selected element");
  designer.renderHtml("designer");

  console.log("Loading completed successfully!");
});
</script>

<template>
  <div id="app">
    <div>
      <h2>Stimulsoft Reports.JS Designer</h2>
      <div id="designer"></div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
