# ---------------------------------------------
# app/models/strategies.py - Strategies model
# ---------------------------------------------
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Strategy(BaseModel):
    __tablename__ = "strategies"
    
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text)
    is_active = Column(Boolean, default=True, nullable=False)
    is_system_default = Column(Boolean, default=False, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))
    
    # Relationships
    creator = relationship("User")
    recommendation_strategies = relationship("RecommendationStrategy", back_populates="strategy")