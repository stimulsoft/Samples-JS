@echo off
@echo|set /p=Make Demo AngularJS
copy /b "..\..\..\Stimulsoft.Reports.JS\Builder\complete\css\min\stimulsoft.viewer.office2013.css" "reports\stimulsoft.viewer.office2013.css" >nul

copy /b "..\..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.reports.js" "reports\stimulsoft.reports.js" >nul
copy /b "..\..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.viewer.js" "reports\stimulsoft.viewer.js" >nul
@echo  [OK]