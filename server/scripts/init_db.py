#!/usr/bin/env python3
"""
Fresh Database Initialization Script for OrbiMed Portal

This script is designed for FIRST-TIME SETUP of a new database.
It should be run ONCE when setting up a new environment.

This script:
1. Verifies the database is empty/fresh
2. Creates initial migration if none exists
3. Uses Alembic to create the complete schema
4. Loads all seed data (roles, permissions, strategies, funds)

For ongoing updates to existing databases, use: python scripts/update_db.py

Usage:
    python scripts/init_db.py

Environment:
    Requires .env file with DATABASE_URL and other settings
    Requires alembic.ini configuration file
"""

import sys
import os
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy import inspect, text
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.core.database import test_connection
from app.models import *  # Import all models to register them

# Import seeding functions
from scripts.initial_data.initial_roles import create_initial_roles_and_permissions
from scripts.initial_data.default_strategies import create_default_strategies
from scripts.initial_data.default_funds import create_default_funds

def print_banner():
    """Print a nice banner for the initialization"""
    print("=" * 60)
    print("🚀 OrbiMed Portal - Fresh Database Installation")
    print("=" * 60)
    print("⚠️  This script is for NEW database setup only!")
    print("   For updates to existing databases, use: update_db.py")
    print("=" * 60)

def test_database_connection():
    """Test database connection before proceeding"""
    print("📡 Testing database connection...")
    
    try:
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            # Test with a simple query
            conn.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
        return engine
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n💡 Check your DATABASE_URL in .env file")
        print(f"   Current URL: {settings.DATABASE_URL}")
        return None

def check_database_is_fresh(engine):
    """Verify this is a fresh database suitable for initialization"""
    print("🔍 Checking if database is fresh...")
    
    inspector = inspect(engine)
    existing_tables = set(inspector.get_table_names())
    
    # Check for any of our application tables
    app_tables = {
        "users", "roles", "permissions", "role_permissions", "user_permissions",
        "securities", "strategies", "funds", 
        "trade_recommendations", "trade_tickets", "file_attachments",
        "audit_trail", "recommendation_strategies", "recommendation_funds"
    }
    
    existing_app_tables = app_tables.intersection(existing_tables)
    
    if existing_app_tables:
        print(f"❌ Database is NOT fresh! Found existing tables:")
        for table in sorted(existing_app_tables):
            print(f"   • {table}")
        print("\n💡 This script is for fresh installations only.")
        print("   For existing databases, use: python scripts/update_db.py")
        print("   Or drop/recreate the database if you want a fresh start.")
        return False
    
    # Check for alembic_version table
    if "alembic_version" in existing_tables:
        print("❌ Found alembic_version table - database appears to be managed!")
        print("💡 Use: python scripts/update_db.py")
        return False
    
    if existing_tables:
        print(f"⚠️  Found {len(existing_tables)} non-application tables:")
        for table in sorted(existing_tables):
            print(f"   • {table}")
        
        # Ask for confirmation
        response = input("\nContinue with initialization? [y/N]: ")
        if response.lower() not in ['y', 'yes']:
            print("🛑 Initialization cancelled")
            return False
    else:
        print("✅ Database is completely empty - perfect for fresh setup!")
    
    return True

def check_alembic_setup():
    """Verify Alembic is configured"""
    print("🔧 Checking Alembic configuration...")
    
    alembic_ini = project_root / "alembic.ini"
    if not alembic_ini.exists():
        print("❌ alembic.ini not found!")
        print("💡 Run 'alembic init alembic' to set up Alembic")
        return False
    
    alembic_dir = project_root / "alembic"
    if not alembic_dir.exists():
        print("❌ alembic/ directory not found!")
        print("💡 Run 'alembic init alembic' to set up Alembic")
        return False
    
    versions_dir = alembic_dir / "versions"
    if not versions_dir.exists():
        print("📁 Creating alembic/versions/ directory...")
        versions_dir.mkdir(parents=True, exist_ok=True)
    
    print("✅ Alembic configuration looks good")
    return True

def create_initial_migration():
    """Create the initial migration from current models"""
    print("📝 Creating initial migration...")
    
    try:
        from alembic.config import Config
        from alembic import command
        
        # Load alembic configuration
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        # Check if migrations already exist
        versions_dir = project_root / "alembic" / "versions"
        migration_files = list(versions_dir.glob("*.py"))
        migration_files = [f for f in migration_files if f.name != "__pycache__"]
        
        if migration_files:
            print(f"✅ Found {len(migration_files)} existing migration(s)")
            # List the migrations
            for migration_file in sorted(migration_files):
                print(f"   • {migration_file.name}")
            return True
        
        # Create initial migration
        print("   🔨 Generating initial migration from models...")
        command.revision(
            alembic_cfg, 
            autogenerate=True, 
            message="Initial OrbiMed schema - users, roles, securities, recommendations"
        )
        
        print("✅ Initial migration created successfully!")
        
        # List the created migration
        migration_files = list(versions_dir.glob("*.py"))
        migration_files = [f for f in migration_files if f.name != "__pycache__"]
        if migration_files:
            latest_migration = sorted(migration_files)[-1]
            print(f"   📄 Created: {latest_migration.name}")
        
        return True
        
    except ImportError:
        print("❌ Alembic not installed!")
        print("💡 Install alembic: pip install alembic")
        return False
    except Exception as e:
        print(f"❌ Failed to create initial migration: {e}")
        return False

def apply_initial_migration():
    """Apply the initial migration to create all tables"""
    print("📊 Applying initial migration to create database schema...")
    
    try:
        from alembic.config import Config
        from alembic import command
        
        # Load alembic configuration
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        # Apply all migrations (should just be the initial one)
        print("   🚀 Running: alembic upgrade head")
        command.upgrade(alembic_cfg, "head")
        
        print("✅ Migration applied successfully!")
        
        # Verify tables were created
        engine = create_engine(settings.DATABASE_URL)
        inspector = inspect(engine)
        created_tables = inspector.get_table_names()
        
        print(f"   📊 Created {len(created_tables)} tables:")
        for table in sorted(created_tables):
            print(f"   • {table}")
        
        # Check that we have our expected core tables
        expected_core_tables = {"users", "roles", "permissions", "securities", "strategies", "funds"}
        missing_core = expected_core_tables - set(created_tables)
        
        if missing_core:
            print(f"❌ Missing expected core tables: {missing_core}")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return False

def load_seed_data(engine):
    """Load all initial seed data"""
    print("📦 Loading seed data...")
    
    try:
        # Create roles and permissions first (required for everything else)
        print("   → Loading roles and permissions...")
        create_initial_roles_and_permissions(engine)
        
        # Create default strategies
        print("   → Loading default strategies...")
        create_default_strategies(engine)
        
        # Create default funds
        print("   → Loading default funds...")
        create_default_funds(engine)
        
        print("✅ All seed data loaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Failed to load seed data: {e}")
        print("🔄 Database schema created but seed data failed")
        return False

def verify_installation(engine):
    """Verify the installation by checking key data"""
    print("🔍 Verifying installation...")
    
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Check tables exist
        inspector = inspect(engine)
        table_count = len(inspector.get_table_names())
        print(f"   • Tables: {table_count}")
        
        # Check alembic version table exists
        if "alembic_version" in inspector.get_table_names():
            print("   • Alembic tracking: ✅ Active")
        else:
            print("   • Alembic tracking: ❌ Missing")
        
        # Check roles
        roles_count = session.query(Role).count()
        print(f"   • Roles: {roles_count}")
        
        # Check permissions  
        perms_count = session.query(Permission).count()
        print(f"   • Permissions: {perms_count}")
        
        # Check strategies
        strategies_count = session.query(Strategy).count()
        print(f"   • Strategies: {strategies_count}")
        
        # Check funds
        funds_count = session.query(Fund).count()
        print(f"   • Funds: {funds_count}")
        
        session.close()
        
        # Verify we have the expected minimum data
        checks = [
            (table_count >= 10, "Tables"),
            (roles_count >= 3, "Roles"),
            (perms_count >= 15, "Permissions"),
            (strategies_count >= 10, "Strategies"),
            (funds_count >= 4, "Funds")
        ]
        
        failed_checks = [name for passed, name in checks if not passed]
        
        if not failed_checks:
            print("✅ Installation verification passed!")
            return True
        else:
            print(f"❌ Installation verification failed: {', '.join(failed_checks)}")
            return False
            
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        return False

def show_alembic_status():
    """Show current Alembic status"""
    print("📋 Final Alembic status:")
    
    try:
        from alembic.config import Config
        from alembic import command
        from alembic.script import ScriptDirectory
        from alembic.runtime.migration import MigrationContext
        
        # Load alembic configuration
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        # Get current revision
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as connection:
            context = MigrationContext.configure(connection)
            current_rev = context.get_current_revision()
        
        # Get head revision
        script = ScriptDirectory.from_config(alembic_cfg)
        head_rev = script.get_current_head()
        
        print(f"   • Current revision: {current_rev or 'None'}")
        print(f"   • Latest revision:  {head_rev or 'None'}")
        
        if current_rev == head_rev and current_rev is not None:
            print("   • Status: ✅ Up to date")
        else:
            print("   • Status: ⚠️  Out of sync")
        
    except Exception as e:
        print(f"   • Status: ❌ Error checking status: {e}")

def main():
    """Main initialization function"""
    print_banner()
    
    # Step 1: Test database connection
    engine = test_database_connection()
    if not engine:
        sys.exit(1)
    
    # Step 2: Verify database is fresh
    if not check_database_is_fresh(engine):
        sys.exit(1)
    
    # Step 3: Check Alembic setup
    if not check_alembic_setup():
        sys.exit(1)
    
    # Step 4: Create initial migration if needed
    if not create_initial_migration():
        sys.exit(1)
    
    # Step 5: Apply migration to create schema
    if not apply_initial_migration():
        sys.exit(1)
    
    # Step 6: Load seed data
    if not load_seed_data(engine):
        sys.exit(1)
    
    # Step 7: Verify installation
    if not verify_installation(engine):
        sys.exit(1)
    
    # Step 8: Show Alembic status
    show_alembic_status()
    
    print("\n" + "=" * 60)
    print("🎉 Fresh database initialization completed successfully!")
    print("=" * 60)
    print("\n📋 What was accomplished:")
    print("   ✅ Database schema created via Alembic migration")
    print("   ✅ All seed data loaded (roles, permissions, strategies, funds)")
    print("   ✅ Alembic version tracking established")
    print("\n📋 Next Steps:")
    print("1. Start the FastAPI server: uvicorn app.main:app --reload")
    print("2. Visit http://localhost:8000/docs for API documentation")
    print("3. Test the /health endpoint to verify everything works")
    print("\n🔗 Useful URLs:")
    print("   • API Docs: http://localhost:8000/docs")
    print("   • Health Check: http://localhost:8000/health")
    print("\n🗃️ Future Database Updates:")
    print("   • For schema changes: python scripts/update_db.py")
    print("   • Create migrations: alembic revision --autogenerate -m 'description'")
    print("   • Apply migrations: alembic upgrade head")
    print("   • Check status: alembic current")
    
if __name__ == "__main__":
    main()