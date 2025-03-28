@echo off
color 0a
title "SnippetShare Server"
chcp 65001 

mode con:cols=80 lines=100

echo "Odpalanie serwera lokalnego SnippetShare..."
echo "=-=-=-=-=-=-=-=-=-="
echo "Nie zamykaj tego okna!"
echo "=-=-=-=-=-=-=-=-=-="
node server.js
echo "=-=-=-=-=-=-=-=-=-="
echo "Zamknięcie serwera lokalnego SnippetShare..."
echo "=-=-=-=-=-=-=-=-=-="
echo press enter to exit
pause >nul
exit