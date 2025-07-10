@echo off
REM ============================================================================
REM OrbiMed Analyst Trade Portal - Development Server Start
REM ============================================================================
REM This script starts the FastAPI development server
REM 
REM Prerequisites: Run install_server.bat first for initial setup
REM ============================================================================

setlocal EnableDelayedExpansion

echo.
echo ============================================================================
echo [RUN] OrbiMed Portal - Starting Development Server
echo ============================================================================
echo.

REM Check if we're in the server directory
if not exist "app\main.py" (
    echo [ERROR] This script must be run from the server directory!
    echo         Expected to find app\main.py in current directory.
    echo         Current directory: %CD%
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Virtual environment not found!
    echo         You need to run setup first:
    echo.
    echo         1. Run: install_server.bat
    echo         2. Then run: run_server.bat
    echo.
    pause
    exit /b 1
)

REM Check if requirements are installed
call venv\Scripts\activate.bat >nul 2>&1
python -c "import fastapi" >nul 2>&1
if !errorlevel! neq 0 (
    echo [ERROR] Required packages not found!
    echo         Please run install_server.bat to set up the environment
    pause
    exit /b 1
)

echo [INFO] Server directory: %CD%
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [OK] Environment activated successfully
echo [INFO] Python: %VIRTUAL_ENV%
echo.

REM Quick database check
echo [INFO] Checking database connection...
python -c "from app.core.database import test_connection; exit(0 if test_connection() else 1)" >nul 2>&1
if !errorlevel! neq 0 (
    echo [WARN] Database connection failed!
    echo        Make sure your .env file is configured correctly
    echo        The server may not work properly
    echo.
) else (
    echo [OK] Database connection verified
)

echo.
echo ============================================================================
echo [START] Starting FastAPI Development Server
echo ============================================================================
echo.
echo [INFO] Server will be available at:
echo        * Main API: http://localhost:8000
echo        * Interactive API Docs: http://localhost:8000/docs  
echo        * Alternative Docs: http://localhost:8000/redoc
echo        * Health Check: http://localhost:8000/health
echo.
echo [INFO] Development Features:
echo        * Auto-reload on code changes
echo        * Detailed error messages
echo        * SQL query logging (if debug enabled)
echo.
echo [INFO] Press Ctrl+C to stop the server
echo ============================================================================
echo.

REM Start the FastAPI server with auto-reload
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

REM Server was stopped
echo.
echo ============================================================================
echo [STOP] Development server stopped
echo ============================================================================
echo.
echo [INFO] Server has been shut down successfully
echo.
echo [INFO] To restart the server:
echo        * Run: run_server.bat
echo        * Or manually: v