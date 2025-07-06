# ---------------------------------------------
# app/main.py - FastAPI app entry point
# ---------------------------------------------
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine
from app.models import base  # Import to ensure tables are created

# Create tables on startup (for development)
base.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="OrbiMed Analyst Trade Portal API",
    description="API for managing trade recommendations and tickets",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT == "development" else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "OrbiMed Analyst Trade Portal API",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected" if engine else "disconnected"
    }