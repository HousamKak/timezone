#!/usr/bin/env python3
"""
Environment Configuration Test Script

This script validates that your .env file is properly configured
and that all settings are loaded correctly.

Usage:
    python scripts/test_env.py
"""

import sys
import os
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

try:
    from app.core.config import settings
except ImportError as e:
    print(f"❌ Failed to import settings: {e}")
    print("Make sure you're running this from the server directory")
    sys.exit(1)

def test_environment_config():
    """Test environment configuration"""
    print("🧪 Testing Environment Configuration")
    print("=" * 50)
    
    # Test basic configuration
    print(f"📊 Environment: {settings.ENVIRONMENT}")
    print(f"🐛 Debug mode: {settings.DEBUG}")
    print(f"🔑 Secret key: {'✅ Set' if settings.SECRET_KEY else '❌ Missing'}")
    
    # Test database configuration
    print(f"\n📀 Database Configuration:")
    print(f"   URL: {settings.DATABASE_URL}")
    if settings.DATABASE_URL.startswith("sqlite"):
        print("   ⚠️  Using SQLite (development only)")
    elif settings.DATABASE_URL.startswith("postgresql"):
        print("   ✅ Using PostgreSQL (recommended)")
    elif settings.DATABASE_URL.startswith("mssql"):
        print("   ✅ Using SQL Server")
    
    # Test Redis
    print(f"\n🔴 Redis Configuration:")
    print(f"   URL: {settings.REDIS_URL}")
    
    # Test file upload settings
    print(f"\n📁 File Upload Configuration:")
    print(f"   Directory: {settings.UPLOAD_DIR}")
    print(f"   Max size: {settings.MAX_FILE_SIZE_MB}MB")
    print(f"   Extensions: {settings.allowed_file_extensions_list}")
    
    # Check if uploads directory exists
    if os.path.exists(settings.UPLOAD_DIR):
        print(f"   ✅ Upload directory exists")
    else:
        print(f"   ❌ Upload directory missing")
    
    # Test integration settings
    print(f"\n🔌 Integration Configuration:")
    integrations = [
        ("Okta", settings.OKTA_DOMAIN, settings.OKTA_CLIENT_ID),
        ("CRD", settings.CRD_API_URL, settings.CRD_ENABLED),
        ("IVP", settings.IVP_API_URL, settings.IVP_ENABLED),
        ("Bloomberg", settings.BLOOMBERG_API_URL, settings.BLOOMBERG_ENABLED),
    ]
    
    for name, url, enabled in integrations:
        if url and enabled:
            print(f"   ✅ {name}: Configured and enabled")
        elif url and not enabled:
            print(f"   ⚠️  {name}: Configured but disabled")
        else:
            print(f"   ⭕ {name}: Not configured (optional for development)")
    
    # Test property methods
    print(f"\n🔧 Configuration Properties:")
    print(f"   Is development: {settings.is_development}")
    print(f"   Is production: {settings.is_production}")
    print(f"   Database echo: {settings.database_echo}")
    
    return True

def test_environment_file():
    """Test that .env file exists and is readable"""
    print(f"\n📄 Environment File Check:")
    
    env_file = project_root / ".env"
    if env_file.exists():
        print(f"   ✅ .env file exists")
        
        # Check if file is readable
        try:
            with open(env_file, 'r') as f:
                lines = f.readlines()
            print(f"   ✅ .env file readable ({len(lines)} lines)")
            
            # Check for required variables
            required_vars = ["DATABASE_URL"]
            env_vars = {}
            
            for line in lines:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()
            
            missing_vars = [var for var in required_vars if var not in env_vars or not env_vars[var]]
            if missing_vars:
                print(f"   ❌ Missing required variables: {', '.join(missing_vars)}")
                return False
            else:
                print(f"   ✅ All required variables present")
                
        except Exception as e:
            print(f"   ❌ Error reading .env file: {e}")
            return False
    else:
        print(f"   ❌ .env file not found")
        print(f"   💡 Copy .env.example to .env and configure it")
        return False
    
    return True

def main():
    """Main test function"""
    print("🚀 OrbiMed Portal - Environment Configuration Test")
    print("=" * 60)
    
    # Test .env file
    env_ok = test_environment_file()
    
    if not env_ok:
        print("\n❌ Environment file test failed!")
        sys.exit(1)
    
    # Test configuration
    try:
        config_ok = test_environment_config()
        
        if config_ok:
            print("\n" + "=" * 60)
            print("✅ Environment configuration test passed!")
            print("\n📋 Next steps:")
            print("1. Make sure your database server is running")
            print("2. Test database connection: python -c \"from app.core.database import test_connection; print('DB:', test_connection())\"")
            print("3. Start the API server: uvicorn app.main:app --reload")
        else:
            print("\n❌ Environment configuration test failed!")
            sys.exit(1)
            
    except Exception as e:
        print(f"\n❌ Configuration test failed with error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()