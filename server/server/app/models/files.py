# ---------------------------------------------
# app/models/files.py - File attachment models
# ---------------------------------------------
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel

class FileAttachment(BaseModel):
    __tablename__ = "file_attachments"
    
    recommendation_id = Column(Integer, ForeignKey("trade_recommendations.id"), nullable=False, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(BigInteger, nullable=False)
    content_type = Column(String(100), nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    uploaded_at = Column(DateTime, default=func.now(), nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
    
    # Relationships
    recommendation = relationship("TradeRecommendation", back_populates="files")
    uploader = relationship("User", back_populates="uploaded_files")