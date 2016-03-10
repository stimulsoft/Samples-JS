@echo off
@echo|set /p=Make PHP
cd "01. Load Report from Server Side"
call make.bat
cd ..
cd "02. Connect to databases"
call make.bat"
cd ..
@echo  [OK]