@echo off
REM Create the comments directory
mkdir "d:\Desktop\projects\Media-app\frontend\src\components\comments"

REM Verify directory was created
if exist "d:\Desktop\projects\Media-app\frontend\src\components\comments" (
    echo Directory created successfully!
    dir "d:\Desktop\projects\Media-app\frontend\src\components\comments"
) else (
    echo Failed to create directory
)
