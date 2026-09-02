@echo off
title Push to GitHub - Vishal Jamdhade Buildcon
cd /d "%~dp0"
echo ==============================================================
echo  Pushing code to https://github.com/sanketengagex-sudo/vjbuidcon
echo  If prompted, complete the one-time sign-in in your browser.
echo ==============================================================
git push -u origin main
echo.
pause
