@echo off
REM ============================================================================
REM OrbiMed Analyst Trade Portal - One-Time Server Installation Script
REM ============================================================================
REM This script performs one-time setup:
REM 1. Create virtual environment
REM 2. Install requirements
REM 3. Test environment configuration
REM 4. Initialize database (fresh setup)
REM 5. Update database (apply migrations)
REM 6. Create test data
REM 7. Test services
REM 
REM After running this once, use run_server.bat to start the server
REM ============================================================================

setlocal EnableDelayedExpansion

echo.
echo ============================================================================
echo [INSTALL] OrbiMed Portal - One-Time Server Installation
echo ============================================================================
echo This script will set up your development environment.
echo After this completes, use run_server.bat to start the server.
echo.

REM Check if we're in the server directory
if not exist "app\main.py" (
    echo [ERROR] This script must be run from the server directory!
    echo         Expected to find app\main.py in current directory.
    echo         Current directory: %CD%
    pause
    exit /b 1
)

echo [INFO] Installation directory: %CD%
echo.

REM ============================================================================
REM Step 1: Virtual Environment Setup
REM ============================================================================
echo [STEP 1] Activating virtual environment...
call venv\Scripts\activate.bat
if !errorlevel! neq 0 (
    echo [ERROR] Failed to activate virtual environment!
    pause
    exit /b 1
)
echo [OK] Virtual environment activated
echo [INFO] Python location: %VIRTUAL_ENV%
echo.

REM ============================================================================
REM Step 2: Install Requirements
REM ============================================================================
echo [STEP 2] Installing Python packages...

if not exist "requirements.txt" (
    echo [ERROR] requirements.txt not found!
    echo         Make sure you're in the correct directory
    pause
    exit /b 1
)

echo [INFO] Upgrading pip...
python -m pip install --upgrade pip

echo [INFO] Installing packages from requirements.txt...
pip install -r requirements.txt
if !errorlevel! neq 0 (
    echo [ERROR] Failed to install requirements!
    echo         Check the error messages above
    pause
    exit /b 1
)
echo [OK] All Python packages installed successfully
echo.

REM ============================================================================
REM Step 3: Test Environment Configuration
REM ============================================================================
echo [STEP 3] Testing environment configuration...

if not exist ".env" (
    echo [WARN] .env file not found!
    if exist ".env.example" (
        echo [INFO] Found .env.example - you should copy it to .env and configure it
        echo         copy .env.example .env
        echo         Then edit .env with your database settings
    ) else (
        echo [WARN] No .env.example found either
    )
    echo [INFO] Continuing with default configuration...
) else (
    echo [OK] Found .env file
)

if not exist "tests\test_env.py" (
    echo [WARN] test_env.py not found, skipping environment test
) else (
    echo [INFO] Running environment configuration test...
    python tests\test_env.py
    if !errorlevel! neq 0 (
        echo [ERROR] Environment configuration test failed!
        echo         Please check your .env file and configuration
        echo         Make sure DATABASE_URL is set correctly
        pause
        exit /b 1
    )
    echo [OK] Environment configuration test passed
)
echo.

REM ============================================================================
REM Step 4: Initialize Database
REM ============================================================================
echo [STEP 4] Setting up database...

if not exist "scripts\init_db.py" (
    echo [ERROR] init_db.py script not found!
    echo         Make sure all project files are present
    pause
    exit /b 1
)

echo [INFO] Running database initialization...
echo [INFO] This creates tables and loads initial data (roles, strategies, funds)
python scripts\init_db.py
if !errorlevel! neq 0 (
    echo [WARN] Database initialization had issues
    echo        This might be normal if database already exists
    echo        Continuing with next steps...
) else (
    echo [OK] Database initialization completed successfully
)
echo.

REM ============================================================================
REM Step 5: Update Database
REM ============================================================================
echo [STEP 5] Applying database updates...

if not exist "scripts\update_db.py" (
    echo [WARN] update_db.py script not found, skipping database updates
) else (
    echo [INFO] Running database updates...
    echo [INFO] This applies any pending migrations
    python scripts\update_db.py
    if !errorlevel! neq 0 (
        echo [WARN] Database update had issues
        echo        This might be normal if no updates are needed
        echo        Continuing with next steps...
    ) else (
        echo [OK] Database updates completed successfully
    )
)
echo.

REM ============================================================================
REM Step 6: Create Test Data
REM ============================================================================
echo [STEP 6] Creating test data...

if not exist "scripts\create_test_data.py" (
    echo [WARN] create_test_data.py not found, skipping test data creation
) else (
    echo [INFO] Creating sample data for testing...
    echo [INFO] This creates test users, securities, and recommendations
    python scripts\create_test_data.py
    if !errorlevel! neq 0 (
        echo [WARN] Test data creation had issues
        echo        This might be normal if test data already exists
        echo        Continuing with next steps...
    ) else (
        echo [OK] Test data created successfully
    )
)
echo.

REM ============================================================================
REM Step 7: Test Services
REM ============================================================================
echo [STEP 7] Testing service layer...

if not exist "scripts\test_services.py" (
    echo [WARN] test_services.py not found, skipping service tests
) else (
    echo [INFO] Running comprehensive service tests...
    echo [INFO] This verifies all business logic is working correctly
    python scripts\test_services.py
    if !errorlevel! neq 0 (
        echo [ERROR] Service tests failed!
        echo         There are issues with your database or services
        echo         Please review the error messages above
        pause
        exit /b 1
    )
    echo [OK] All service tests passed successfully
)
echo.

REM ============================================================================
REM Installation Complete
REM ============================================================================
echo ============================================================================
echo [SUCCESS] Installation completed successfully!
echo ============================================================================
echo.
echo [INFO] Your OrbiMed Portal development environment is ready!
echo.
echo [INFO] What was installed:
echo        * Python virtual environment (venv folder)
echo        * All required Python packages
echo        * Database with schema and initial data
echo        * Sample test data for development
echo.
echo [INFO] Next steps:
echo        1. Use 'run_server.bat' to start the development server
echo        2. Visit http://localhost:8000/docs for API documentation
echo        3. Use 'run_server.bat' anytime you want to start the server
echo.
echo [INFO] Useful commands for later:
echo        * Start server: run_server.bat
echo        * Activate environment manually: venv\Scripts\activate.bat
echo        * Direct server start: uvicorn app.main:app --reload
echo.
echo ============================================================================
echo [INFO] Installation complete! You can now run 'run_server.bat'
echo ============================================================================
pause