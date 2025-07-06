# ---------------------------------------------
# app/models/base.py - Base model with common fields
# ---------------------------------------------
from sqlalchemy import Column, Integer, DateTime, String
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declared_attr
from app.core.database import Base

class BaseModel(Base):
    """Base model with common fields for all tables"""
    __abstract__ = True
    
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    
    @declared_attr
    def __tablename__(cls):
        """Auto-generate table name from class name"""
        return cls.__name__.lower()
    
    def __repr__(self):
        """String representation of model"""
        return f"<{self.__class__.__name__}(id={self.id})>"