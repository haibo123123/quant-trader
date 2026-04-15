@echo off
chcp 65001 >nul
echo ============================================
echo   QuantTrader 本地服务器启动器 v1.0
echo ============================================
echo.

REM 查找本机IP地址
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP: =%

echo 📱 请用手机浏览器访问以下地址：
echo    http://%IP%:8080
echo.
echo ⚠️  重要提示：
echo    1. 确保手机和电脑连接同一个WiFi
echo    2. 手机浏览器输入上面的地址
echo    3. 看到APP后，点击"添加到主屏幕"
echo.
echo 按任意键启动服务器...
pause >nul

echo.
echo 🚀 服务器已启动，请勿关闭此窗口！
echo.
python -m http.server 8080
pause
