
# ---------------------------------------------
# app/models/relationships.py - Junction tables
# ---------------------------------------------
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel

class RecommendationStrategy(BaseModel):
    __tablename__ = "recommendation_strategies"
    
    recommendation_id = Column(Integer, ForeignKey("trade_recommendations.id"), nullable=False, index=True)
    strategy_id = Column(Integer, ForeignKey("strategies.id"))
    custom_strategy_text = Column(String(255))  # For "Other" custom strategies
    
    # Relationships
    recommendation = relationship("TradeRecommendation", back_populates="strategies")
    strategy = relationship("Strategy", back_populates="recommendation_strategies")

class RecommendationFund(BaseModel):
    __tablename__ = "recommendation_funds"
    
    recommendation_id = Column(Integer, ForeignKey("trade_recommendations.id"), nullable=False, index=True)
    fund_id = Column(Integer, ForeignKey("funds.id"), nullable=False)
    
    # Relationships
    recommendation = relationship("TradeRecommendation", back_populates="funds")
    fund = relationship("Fund", back_populates="recommendation_funds")
