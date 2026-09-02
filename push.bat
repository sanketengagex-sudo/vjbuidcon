@echo off
title Push to GitHub - Vishal Jamdhade Buildcon
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\MinGit\mingw64\bin;%LOCALAPPDATA%\Programs\MinGit\usr\bin;%PATH%"

echo ==============================================================
echo  Pushing code to https://github.com/sanketengagex-sudo/vjbuidcon
echo  If prompted, complete the one-time sign-in in your browser.
echo ==============================================================
git push -u origin main
echo.
pause

