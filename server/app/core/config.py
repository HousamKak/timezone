# ---------------------------------------------
# app/core/config.py - Environment configuration
# ---------------------------------------------
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # Redis  
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480  # 8 hours
    
    # Okta
    OKTA_DOMAIN: str
    OKTA_CLIENT_ID: str
    OKTA_CLIENT_SECRET: str
    OKTA_AUDIENCE: str = "api://orbimed-portal"
    
    # CRD Integration
    CRD_API_URL: Optional[str] = None
    CRD_API_KEY: Optional[str] = None
    CRD_ENABLED: bool = False
    
    # IVP Integration
    IVP_API_URL: Optional[str] = None
    IVP_API_KEY: Optional[str] = None
    IVP_ENABLED: bool = False
    
    # Bloomberg Integration
    BLOOMBERG_API_URL: Optional[str] = None
    BLOOMBERG_API_KEY: Optional[str] = None
    BLOOMBERG_ENABLED: bool = False
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    # File Upload
    MAX_FILE_SIZE_MB: int = 10
    UPLOAD_DIR: str = "./uploads"
    ALLOWED_FILE_EXTENSIONS: list = [".pdf", ".xlsx", ".docx", ".xls", ".doc"]
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()