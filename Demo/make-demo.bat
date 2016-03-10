@echo off
@echo|set /p=Make Demo Demo
copy /b "..\..\Stimulsoft.Reports.JS\Builder\complete\css\min\stimulsoft.designer.office2013.white.blue.css" "css\stimulsoft.designer.office2013.white.blue.css" >nul
copy /b "..\..\Stimulsoft.Reports.JS\Builder\complete\css\min\stimulsoft.viewer.office2013.css" "css\stimulsoft.viewer.office2013.css" >nul

copy /b "..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.designer.js" "scripts\stimulsoft.designer.js" >nul
copy /b "..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.reports.js" "scripts\stimulsoft.reports.js" >nul
copy /b "..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.viewer.js" "scripts\stimulsoft.viewer.js" >nul
@echo  [OK]