# ---------------------------------------------
# app/models/funds.py - Funds model
# ---------------------------------------------
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Fund(BaseModel):
    __tablename__ = "funds"
    
    code = Column(String(10), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    recommendation_funds = relationship("RecommendationFund", back_populates="fund")
    trade_tickets = relationship("TradeTicket", back_populates="fund")