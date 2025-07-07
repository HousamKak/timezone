#!/usr/bin/env python3
"""
Database Update Script for OrbiMed Portal

This script is designed for UPDATING existing databases.
It applies new migrations and handles ongoing maintenance.

This script:
1. Verifies the database is properly managed by Alembic
2. Shows current migration status
3. Applies pending migrations
4. Handles any data updates or maintenance tasks

For fresh database setup, use: python scripts/init_db.py

Usage:
    python scripts/update_db.py [options]

Options:
    --dry-run    Show what would be done without applying changes
    --force      Skip safety checks (use with caution)
    --verbose    Show detailed migration information

Environment:
    Requires .env file with DATABASE_URL and other settings
    Requires existing database with alembic_version table
"""

import sys
import os
import argparse
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

def print_banner():
    """Print a nice banner for the update"""
    print("=" * 60)
    print("🔄 OrbiMed Portal - Database Update")
    print("=" * 60)
    print("   For fresh database setup, use: init_db.py")
    print("=" * 60)

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(description="Update OrbiMed Portal database")
    parser.add_argument(
        "--dry-run", 
        action="store_true", 
        help="Show what would be done without applying changes"
    )
    parser.add_argument(
        "--force", 
        action="store_true", 
        help="Skip safety checks (use with caution)"
    )
    parser.add_argument(
        "--verbose", 
        action="store_true", 
        help="Show detailed migration information"
    )
    return parser.parse_args()

def test_database_connection():
    """Test database connection before proceeding"""
    print("📡 Testing database connection...")
    
    try:
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
        return engine
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n💡 Check your DATABASE_URL in .env file")
        return None

def check_database_is_managed(engine, force=False):
    """Verify this database is managed by Alembic"""
    print("🔍 Checking database management status...")
    
    inspector = inspect(engine)
    existing_tables = set(inspector.get_table_names())
    
    # Check for alembic_version table
    if "alembic_version" not in existing_tables:
        print("❌ No alembic_version table found!")
        print("💡 This database is not managed by Alembic.")
        
        # Check if it looks like an OrbiMed database
        app_tables = {"users", "roles", "permissions"}
        if app_tables.intersection(existing_tables):
            print("   Found OrbiMed tables - this might be a legacy database.")
            print("   Consider running migration setup:")
            print("   1. alembic stamp head  # Mark current state")
            print("   2. python scripts/update_db.py")
        else:
            print("   Use: python scripts/init_db.py for fresh setup")
        
        if not force:
            return False
        else:
            print("⚠️  --force specified, continuing anyway...")
    
    # Check for expected application tables
    app_tables = {"users", "roles", "permissions", "strategies", "funds"}
    missing_core_tables = app_tables - existing_tables
    
    if missing_core_tables and not force:
        print(f"❌ Missing core application tables: {missing_core_tables}")
        print("💡 This doesn't look like a complete OrbiMed database.")
        print("   Use: python scripts/init_db.py for fresh setup")
        return False
    
    print("✅ Database appears to be properly managed")
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
        return False
    
    versions_dir = alembic_dir / "versions"
    if not versions_dir.exists():
        print("❌ alembic/versions/ directory not found!")
        return False
    
    print("✅ Alembic configuration looks good")
    return True

def get_migration_status(verbose=False):
    """Get current migration status"""
    print("📊 Checking migration status...")
    
    try:
        from alembic.config import Config
        from alembic import command
        from alembic.script import ScriptDirectory
        from alembic.runtime.migration import MigrationContext
        
        # Load alembic configuration
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        # Get script directory
        script = ScriptDirectory.from_config(alembic_cfg)
        
        # Get current revision
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as connection:
            context = MigrationContext.configure(connection)
            current_rev = context.get_current_revision()
        
        # Get head revision
        head_rev = script.get_current_head()
        
        print(f"   Current revision: {current_rev or 'None'}")
        print(f"   Latest revision:  {head_rev or 'None'}")
        
        if current_rev == head_rev:
            print("✅ Database is up to date!")
            return True, True  # up_to_date, has_migrations
        elif current_rev is None:
            print("⚠️  Database has no migration version")
            return False, True
        else:
            print("📋 Database needs updates")
            
            if verbose:
                # Show pending migrations
                revisions = []
                for rev in script.walk_revisions(head_rev, current_rev):
                    if rev.revision != current_rev:
                        revisions.append(rev)
                
                if revisions:
                    print("   Pending migrations:")
                    for rev in reversed(revisions):
                        print(f"   • {rev.revision[:12]} - {rev.doc}")
            
            return False, True
        
    except ImportError:
        print("❌ Alembic not installed!")
        return False, False
    except Exception as e:
        print(f"❌ Failed to check migration status: {e}")
        return False, False

def apply_migrations(dry_run=False, verbose=False):
    """Apply pending migrations"""
    if dry_run:
        print("🔍 DRY RUN: Would apply these migrations...")
    else:
        print("🚀 Applying pending migrations...")
    
    try:
        from alembic.config import Config
        from alembic import command
        
        # Load alembic configuration
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        if verbose:
            # Capture and display migration output
            import io
            import contextlib
            
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                if not dry_run:
                    command.upgrade(alembic_cfg, "head", sql=False)
                else:
                    command.upgrade(alembic_cfg, "head", sql=True)
            
            migration_output = output.getvalue()
            if migration_output.strip():
                print("Migration details:")
                print(migration_output)
        else:
            if not dry_run:
                command.upgrade(alembic_cfg, "head")
            else:
                print("   (Use --verbose to see detailed migration plan)")
        
        if not dry_run:
            print("✅ Migrations applied successfully!")
        else:
            print("✅ Dry run completed")
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return False

def run_maintenance_tasks(engine):
    """Run any maintenance tasks after migrations"""
    print("🧹 Running maintenance tasks...")
    
    # Add any post-migration maintenance here
    # Examples:
    # - Update cached data
    # - Rebuild indexes
    # - Clean up old data
    # - Update statistics
    
    try:
        # Example maintenance task
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Could add tasks like:
        # - Refresh materialized views
        # - Update user permission caches
        # - Clean up expired sessions
        
        session.close()
        print("✅ Maintenance tasks completed")
        return True
        
    except Exception as e:
        print(f"⚠️  Maintenance tasks failed: {e}")
        print("   Migrations were successful, but maintenance needs attention")
        return False

def verify_update(engine):
    """Verify the update was successful"""
    print("🔍 Verifying update...")
    
    try:
        # Check database connectivity
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        
        # Check migration status
        up_to_date, _ = get_migration_status()
        if not up_to_date:
            print("❌ Database is still not up to date!")
            return False
        
        # Basic data integrity checks
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Check core tables have data
        roles_count = session.query(Role).count()
        if roles_count < 3:
            print("⚠️  Warning: Less than 3 roles found")
        
        session.close()
        
        print("✅ Update verification passed!")
        return True
        
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        return False

def main():
    """Main update function"""
    args = parse_arguments()
    
    print_banner()
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No changes will be made\n")
    
    # Step 1: Test database connection
    engine = test_database_connection()
    if not engine:
        sys.exit(1)
    
    # Step 2: Check database is managed by Alembic
    if not check_database_is_managed(engine, args.force):
        sys.exit(1)
    
    # Step 3: Check Alembic setup
    if not check_alembic_setup():
        sys.exit(1)
    
    # Step 4: Check migration status
    up_to_date, has_migrations = get_migration_status(args.verbose)
    
    if not has_migrations:
        print("❌ No migration system found!")
        sys.exit(1)
    
    if up_to_date and not args.dry_run:
        print("\n🎉 Database is already up to date!")
        print("📋 Nothing to do.")
        sys.exit(0)
    
    # Step 5: Apply migrations
    if not apply_migrations(args.dry_run, args.verbose):
        sys.exit(1)
    
    if args.dry_run:
        print("\n✅ Dry run completed successfully!")
        print("   Run without --dry-run to apply these changes.")
        sys.exit(0)
    
    # Step 6: Run maintenance tasks
    run_maintenance_tasks(engine)
    
    # Step 7: Verify update
    if not verify_update(engine):
        sys.exit(1)
    
    print("\n" + "=" * 60)
    print("🎉 Database update completed successfully!")
    print("=" * 60)
    print("\n📋 Summary:")
    print("   • Migrations applied")
    print("   • Maintenance tasks completed")
    print("   • Database verified")
    print("\n🔗 Useful Commands:")
    print("   • Check status: alembic current")
    print("   • View history: alembic history")
    print("   • Create migration: alembic revision --autogenerate -m 'description'")

if __name__ == "__main__":
    main()