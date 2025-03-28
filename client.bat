@echo off
color 0a
title "SnippetShare Client"
chcp 65001 

mode con:cols=80 lines=100

echo "Odpalanie serwera klienta SnippetShare..."
echo "=-=-=-=-=-=-=-=-=-="
echo "Nie zamykaj tego okna!"
echo "=-=-=-=-=-=-=-=-=-="
node client.js
echo "=-=-=-=-=-=-=-=-=-="
echo "Zamknięcie klienta lokalnego SnippetShare..."
echo "=-=-=-=-=-=-=-=-=-="
echo press enter to exit
pause >nul
exit