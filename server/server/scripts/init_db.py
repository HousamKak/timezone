#!/usr/bin/env python3
"""
Main Database Initialization Script for OrbiMed Portal

This script:
1. Tests database connectivity  
2. Creates all tables using SQLAlchemy metadata
3. Loads initial seed data (roles, permissions, strategies, funds)
4. Handles errors gracefully with rollback capability

Usage:
    python scripts/init_db.py

Environment:
    Requires .env file with DATABASE_URL and other settings
"""

import sys
import os
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.core.database import Base, test_connection
from app.models import *  # Import all models to register them

# Import seeding functions
from scripts.initial_data.initial_roles import create_initial_roles_and_permissions
from scripts.initial_data.default_strategies import create_default_strategies
from scripts.initial_data.default_funds import create_default_funds

def print_banner():
    """Print a nice banner for the initialization"""
    print("=" * 60)
    print("🚀 OrbiMed Analyst Trade Portal - Database Setup")
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

def create_database_tables(engine):
    """Create all database tables using SQLAlchemy metadata"""
    print("📊 Creating database tables...")
    
    try:
        # Create all tables defined in our models
        Base.metadata.create_all(bind=engine)
        
        # Verify tables were created
        with engine.connect() as conn:
            # Check if key tables exist
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                   OR table_schema = 'dbo'
                ORDER BY table_name
            """))
            tables = [row[0] for row in result]
            
        print(f"✅ Created {len(tables)} database tables:")
        for table in sorted(tables):
            print(f"   • {table}")
            
        return True
        
    except Exception as e:
        print(f"❌ Failed to create tables: {e}")
        return False

def load_initial_data(engine):
    """Load all initial seed data"""
    print("📦 Loading initial seed data...")
    
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
        
        print("✅ All initial data loaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Failed to load initial data: {e}")
        print("🔄 Rolling back any partial changes...")
        return False

def verify_installation(engine):
    """Verify the installation by checking key data"""
    print("🔍 Verifying installation...")
    
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        
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
        
        if all([roles_count >= 3, perms_count >= 10, strategies_count >= 10, funds_count >= 4]):
            print("✅ Installation verification passed!")
            return True
        else:
            print("⚠️ Installation verification failed - missing data")
            return False
            
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        return False

def main():
    """Main initialization function"""
    print_banner()
    
    # Step 1: Test database connection
    engine = test_database_connection()
    if not engine:
        sys.exit(1)
    
    # Step 2: Create tables
    if not create_database_tables(engine):
        sys.exit(1)
    
    # Step 3: Load initial data
    if not load_initial_data(engine):
        sys.exit(1)
    
    # Step 4: Verify installation
    if not verify_installation(engine):
        sys.exit(1)
    
    print("\n" + "=" * 60)
    print("🎉 Database initialization completed successfully!")
    print("=" * 60)
    print("\n📋 Next Steps:")
    print("1. Start the FastAPI server: uvicorn app.main:app --reload")
    print("2. Visit http://localhost:8000/docs for API documentation")
    print("3. Test the /health endpoint to verify everything works")
    print("\n🔗 Useful URLs:")
    print("   • API Docs: http://localhost:8000/docs")
    print("   • Health Check: http://localhost:8000/health")
    
if __name__ == "__main__":
    main()