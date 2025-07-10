# ---------------------------------------------
# app/main.py - FastAPI app entry point
# ---------------------------------------------
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from app.core.config import settings
from app.core.database import engine, test_connection
from app.api.v1 import api_router

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def print_startup_info():
    """Print helpful startup information"""
    print("\n" + "=" * 60)
    print("🚀 OrbiMed Analyst Trade Portal API")
    print("=" * 60)
    print(f"📊 Environment: {settings.ENVIRONMENT}")
    print(f"🐛 Debug Mode: {settings.DEBUG}")
    print(f"🗃️  Database: {settings.DATABASE_URL.split('://')[0]}")
    
    # Database connection test
    db_status = "✅ Connected" if test_connection() else "❌ Disconnected"
    print(f"🔗 Database Status: {db_status}")
    
    print(f"\n🌐 Server URLs:")
    print(f"   • Main API: http://localhost:8000")
    print(f"   • Health Check: http://localhost:8000/health")
    
    if settings.ENVIRONMENT == "development":
        print(f"   • Swagger UI: http://localhost:8000/docs")
        print(f"   • ReDoc: http://localhost:8000/redoc")
    
    print(f"\n📋 Available API Endpoints:")
    print(f"   • GET  /api/v1/strategies/           - List all strategies")
    print(f"   • GET  /api/v1/securities/           - List all securities")
    print(f"   • GET  /api/v1/securities/search     - Search securities")
    print(f"   • GET  /api/v1/funds/                - List all funds")
    print(f"   • GET  /api/v1/recommendations/      - List all recommendations")
    print(f"   • GET  /api/v1/recommendations/drafts - List draft recommendations")
    print(f"   • POST /api/v1/recommendations/      - Create recommendation")
    print(f"   • PUT  /api/v1/recommendations/{{id}} - Update recommendation")
    print(f"   • DELETE /api/v1/recommendations/{{id}} - Delete recommendation")
    
    print(f"\n🔧 Configuration:")
    print(f"   • File uploads: {settings.MAX_FILE_SIZE_MB}MB max")
    print(f"   • Upload directory: {settings.UPLOAD_DIR}")
    print(f"   • Redis: {settings.REDIS_URL}")
    
    # Integration status
    print(f"\n🔌 Integrations:")
    integrations = [
        ("Okta SSO", settings.OKTA_DOMAIN, bool(settings.OKTA_DOMAIN)),
        ("CRD System", settings.CRD_API_URL, settings.CRD_ENABLED),
        ("IVP System", settings.IVP_API_URL, settings.IVP_ENABLED),
        ("Bloomberg", settings.BLOOMBERG_API_URL, settings.BLOOMBERG_ENABLED),
    ]
    
    for name, url, enabled in integrations:
        if url and enabled:
            status = "✅ Enabled"
        elif url and not enabled:
            status = "⚠️  Configured but disabled"
        else:
            status = "⭕ Not configured"
        print(f"   • {name}: {status}")
    
    print("=" * 60)
    print("🎯 Ready to accept requests!")
    print("=" * 60 + "\n")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting OrbiMed Portal API...")
    print_startup_info()
    
    yield
    
    # Shutdown
    logger.info("Shutting down OrbiMed Portal API...")
    print("\n👋 OrbiMed Portal API shutting down...")

app = FastAPI(
    title="OrbiMed Analyst Trade Portal API",
    description="API for managing trade recommendations and tickets",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT == "development" else None,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "OrbiMed Analyst Trade Portal API",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "docs_url": "/docs" if settings.ENVIRONMENT == "development" else None,
        "endpoints": {
            "health": "/health",
            "docs": "/docs" if settings.ENVIRONMENT == "development" else None,
            "api": "/api/v1"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint with detailed status"""
    db_connected = test_connection()
    
    return {
        "status": "healthy" if db_connected else "unhealthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected" if db_connected else "disconnected",
        "debug_mode": settings.DEBUG,
        "integrations": {
            "okta": bool(settings.OKTA_DOMAIN),
            "crd": settings.CRD_ENABLED,
            "ivp": settings.IVP_ENABLED,
            "bloomberg": settings.BLOOMBERG_ENABLED
        }
    }