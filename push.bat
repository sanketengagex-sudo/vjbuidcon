@echo off
title Push to GitHub - Vishal Jamdhade Buildcon
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\MinGit\mingw64\bin;%LOCALAPPDATA%\Programs\MinGit\usr\bin;%PATH%"

echo ==============================================================
echo  Synchronizing ^& Pushing code to GitHub
echo  Repository: https://github.com/sanketengagex-sudo/vjbuidcon
echo ==============================================================

git add -A
git diff --cached --quiet
if errorlevel 1 (
    echo Committing latest architectural updates...
    git commit -m "update: latest architectural design updates and enhancements"
)

echo Pushing to main branch...
git push -u origin main
echo.
echo ==============================================================
echo  Done! Live site will deploy at:
echo  https://sanketengagex-sudo.github.io/vjbuidcon/
echo ==============================================================
pause

