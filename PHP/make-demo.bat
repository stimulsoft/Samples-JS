@echo off
@echo|set /p=Make PHP
cd "01. Load Report from Server Side"
call make-demo.bat
cd ..
cd "02. Connect to databases"
call make-demo.bat"
cd ..
@echo  [OK]