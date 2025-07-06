from pydantic_settings import BaseSettings
from typing import Optional, List
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # Redis  
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str = "development-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480  # 8 hours
    
    # Okta (Optional for development)
    OKTA_DOMAIN: Optional[str] = None
    OKTA_CLIENT_ID: Optional[str] = None
    OKTA_CLIENT_SECRET: Optional[str] = None
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
    DEBUG: bool = True  # Default to True for development
    
    # File Upload
    MAX_FILE_SIZE_MB: int = 10
    UPLOAD_DIR: str = "./uploads"
    ALLOWED_FILE_EXTENSIONS: str = ".pdf,.xlsx,.docx,.xls,.doc"  # Comma-separated string
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"
    
    @property
    def allowed_file_extensions_list(self) -> List[str]:
        """Convert comma-separated string to list"""
        return [ext.strip() for ext in self.ALLOWED_FILE_EXTENSIONS.split(",")]
    
    @property
    def is_development(self) -> bool:
        """Check if running in development mode"""
        return self.ENVIRONMENT.lower() in ["development", "dev", "local"]
    
    @property
    def is_production(self) -> bool:
        """Check if running in production mode"""
        return self.ENVIRONMENT.lower() in ["production", "prod"]
    
    @property
    def database_echo(self) -> bool:
        """Should SQLAlchemy echo SQL statements"""
        return self.DEBUG and self.is_development

# Create settings instance
settings = Settings()

# Create uploads directory if it doesn't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
