# OrbiMed Portal - Server Setup

## 🚀 Quick Start (Windows)

### Prerequisites
- Python 3.8+ installed
- Git (to clone the repository)

### Setup Instructions

1. **Navigate to Server Directory**
   ```cmd
   cd server
   ```
2. **Copy Environment File**
   Copy `.env.example` to `.env` and set the database URL:
   ```cmd
   copy .env.example .env
   ```
 3. **Configure .env**  
   Edit `.env` file and set for SQLITE:
   ```
   DATABASE_URL=sqlite:///./test.db
   ```
   for MSSQL:
   DATABASE_URL=mssql+pyodbc://analyst_portal_admin:PortalUser@localhost/TradePortalDev?driver=ODBC+Driver+17+for+SQL+Server

4. **Update config.py**  
   In your server’s `config.py`, add or update:
   SQLITE:
   DATABASE_URL: str = "sqlite:///./test.db"
   MSSQL:
   DATABASE_URL: str = "mssql+pyodbc://analyst_portal_admin:PortalUser@localhost/TradePortalDev?driver=ODBC+Driver+17+for+SQL+Server"

5. **Update alembic.ini**  
   In `alembic.ini`, set:
   SQLITE:
   sqlalchemy.url = sqlite:///./test.db
   MSSQL:
   sqlalchemy.url = mssql+pyodbc://analyst_portal_admin:PortalUser@localhost/TradePortalDev?driver=ODBC+Driver+17+for+SQL+Server

6. **Create Virtual Environment**
   ```cmd
   python -m venv venv
   ```

7. **Install Dependencies and Setup**
   ```cmd
   .\install_server.bat
   ```

8. **Start Development Server**
   ```cmd
   .\run_server.bat
   ```

## 📋 Detailed Setup Steps

### 1. Virtual Environment Setup
Create a virtual environment in the server directory:
```bash
python -m venv venv
```

### 2. Environment Configuration
The `install_server.bat` script will:
- Copy `.env.example` to `.env`
- Set up SQLite database for local development

If you need custom configuration, edit the `.env` file after setup.

#### Configuring Database URL for Development
By default, the setup uses SQLite for local development. Ensure your `.env` file contains:
```
DATABASE_URL=sqlite:///./test.db
```

For production or custom database configurations, update the `DATABASE_URL` in the `.env` file accordingly.

### 3. Installation Process
Run the installation script:
```bash
.\install_server.bat
```

This will:
- ✅ Activate virtual environment
- ✅ Install required dependencies from `requirements.txt`
- ✅ Create `.env` file from `.env.example`
- ✅ Test environment configuration
- ✅ Initialize database with schema and seed data
- ✅ Apply database migrations
- ✅ Create sample test data
- ✅ Run service layer tests

### 4. Daily Development
Start the development server:
```bash
.\run_server.bat
```

## 🌐 Server URLs

Once running, access:
- **API Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health
- **Main API**: http://localhost:8000/api/v1/

## 📊 Available API Endpoints

- `GET /api/v1/strategies/` - List all trading strategies
- `GET /api/v1/securities/` - List all securities
- `GET /api/v1/securities/search?q=AAPL` - Search securities by ticker/name
- `GET /api/v1/funds/` - List all funds
- `GET /api/v1/recommendations/` - List all trade recommendations
- `GET /api/v1/recommendations/drafts` - List draft recommendations
- `POST /api/v1/recommendations/` - Create new recommendation
- `PUT /api/v1/recommendations/{id}` - Update recommendation
- `DELETE /api/v1/recommendations/{id}` - Delete recommendation

## 🔧 Manual Setup (Alternative)

If you prefer manual setup or are not on Windows:

### 1. Create and Activate Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
# Copy example environment file
copy .env.example .env    # Windows
cp .env.example .env      # macOS/Linux

# Edit .env file and set:
# DATABASE_URL=sqlite:///./test.db
```

### 4. Initialize Database
```bash
python scripts/init_db.py
```

### 5. Apply Database Updates
```bash
python scripts/update_db.py
```

### 6. Create Test Data
```bash
python scripts/create_test_data.py
```

### 7. Test Services
```bash
python scripts/test_services.py
```

### 8. Start Server
```bash
uvicorn app.main:app --reload
```

## 🗃️ Database Configuration

### Local Development (Default)
The setup automatically configures SQLite for local development:
```
DATABASE_URL=sqlite:///./test.db
```

### Production Database
For production, update your `.env` file with SQL Server connection:
```
DATABASE_URL=mssql+pyodbc://username:password@server/database?driver=ODBC+Driver+17+for+SQL+Server
```

## 🛠️ Troubleshooting

### Virtual Environment Issues
```cmd
# If venv creation fails
python --version    # Check Python is installed
python -m pip --version    # Check pip is available

# Recreate virtual environment
rmdir /s venv
python -m venv venv
```

### Installation Script Issues
```cmd
# Make sure you're in the server directory
dir app\main.py    # This file should exist

# Check virtual environment exists
dir venv\Scripts\activate.bat    # This should exist
```

### Database Connection Issues
1. Check your `.env` file exists
2. Verify `DATABASE_URL` is set correctly
3. For SQLite: `DATABASE_URL=sqlite:///./test.db`
4. Re-run database initialization: `python scripts/init_db.py`

### Server Won't Start
```cmd
# Activate environment manually
venv\Scripts\activate

# Check FastAPI is installed
python -c "import fastapi; print('FastAPI installed')"

# Check database connection
python -c "from app.core.database import test_connection; print('DB OK' if test_connection() else 'DB Failed')"
```
