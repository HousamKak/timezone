# ---------------------------------------------
# app/models/recommendations.py - Trade recommendation models
# ---------------------------------------------
from sqlalchemy import Column, String, Integer, ForeignKey, Text, Boolean, DateTime, DECIMAL, Date, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel

class TradeRecommendation(BaseModel):
    __tablename__ = "trade_recommendations"
    
    analyst_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    security_id = Column(Integer, ForeignKey("securities.id"), nullable=False, index=True)
    trade_direction = Column(String(20), nullable=False)
    current_price = Column(DECIMAL(18, 4))
    target_price = Column(DECIMAL(18, 4), nullable=False)
    time_horizon = Column(String(50), nullable=False)
    expected_exit_date = Column(Date)
    analyst_score = Column(Integer, nullable=False)  # 1-10 scale
    notes = Column(Text)
    status = Column(String(50), nullable=False, default='Draft', index=True)
    approved_by = Column(Integer, ForeignKey("users.id"))
    approved_at = Column(DateTime)
    approval_notes = Column(Text)
    is_draft = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    analyst = relationship("User", back_populates="recommendations", foreign_keys=[analyst_id])
    approver = relationship("User", back_populates="approved_recommendations", foreign_keys=[approved_by])
    security = relationship("Security", back_populates="recommendations")
    strategies = relationship("RecommendationStrategy", back_populates="recommendation")
    funds = relationship("RecommendationFund", back_populates="recommendation")
    trade_tickets = relationship("TradeTicket", back_populates="recommendation")
    files = relationship("FileAttachment", back_populates="recommendation")
    status_history = relationship("RecommendationStatusHistory", back_populates="recommendation")
    
    # Constraints
    __table_args__ = (
        CheckConstraint("trade_direction IN ('Buy', 'Sell', 'Sell Short', 'Cover Short')", name='check_trade_recommendation_direction'),
        CheckConstraint("analyst_score BETWEEN 1 AND 10", name='check_analyst_score'),
        CheckConstraint("time_horizon IN ('Trade', 'Short Term', 'Long Term', 'Custom Date')", name='check_time_horizon'),
        CheckConstraint("status IN ('Draft', 'Proposed', 'Approved', 'Rejected')", name='check_trade_recommendation_status'),
        {'schema': None},
    )
