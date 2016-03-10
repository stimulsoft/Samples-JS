@echo off
@echo|set /p=Make Demo NW.JS
copy /b "..\..\..\..\Stimulsoft.Reports.JS\Builder\complete\css\min\stimulsoft.designer.office2013.white.blue.css" "stimulsoft.designer.office2013.white.blue.css" >nul
copy /b "..\..\..\..\Stimulsoft.Reports.JS\Builder\complete\css\min\stimulsoft.viewer.office2013.css" "stimulsoft.viewer.office2013.css" >nul

copy /b "..\..\..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.reports.js" "stimulsoft.reports.js" >nul
copy /b "..\..\..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.viewer.js" "stimulsoft.viewer.js" >nul
copy /b "..\..\..\..\Stimulsoft.Reports.JS\Builder\complete\scripts\min-demo\stimulsoft.designer.js" "stimulsoft.designer.js" >nul

rd output /Q /S 2>nul 1>nul
@echo  [OK]