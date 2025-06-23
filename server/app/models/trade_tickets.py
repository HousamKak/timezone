# ---------------------------------------------
# app/models/trade_tickets.py - Trade ticket models
# ---------------------------------------------
from sqlalchemy import Column, String, Integer, ForeignKey, Text, Boolean, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class TradeTicket(BaseModel):
    __tablename__ = "trade_tickets"
    
    # Note: id serves as both portal trade ID and CRD order ID
    recommendation_id = Column(Integer, ForeignKey("trade_recommendations.id"), index=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    security_id = Column(Integer, ForeignKey("securities.id"), nullable=False, index=True)
    fund_id = Column(Integer, ForeignKey("funds.id"))  # Nullable per BRD
    trade_direction = Column(String(20), nullable=False)
    target_price = Column(DECIMAL(18, 4), nullable=False)
    current_position = Column(DECIMAL(18, 4), default=0)
    benchmark_position = Column(DECIMAL(18, 4), default=0)
    new_position = Column(DECIMAL(18, 4), nullable=False)
    allocation_percentage = Column(DECIMAL(5, 2))
    strategies_for_crd = Column(String(500))  # Comma-delimited strategies for CRD
    timing_notes = Column(Text)
    status = Column(String(50), nullable=False, default='Draft', index=True)
    
    # CRD Integration fields
    crd_status = Column(String(50), index=True)  # Current CRD order status
    fill_price = Column(DECIMAL(18, 4))  # Actual execution price from CRD
    fill_quantity = Column(DECIMAL(18, 4))  # Actual executed quantity from CRD
    crd_error_message = Column(Text)  # CRD error details if submission fails
    
    account_code = Column(String(50))
    submitted_to_crd_at = Column(DateTime)
    filled_at = Column(DateTime)  # CRD fill completion timestamp
    
    # Relationships
    recommendation = relationship("TradeRecommendation", back_populates="trade_tickets")
    creator = relationship("User", back_populates="trade_tickets", foreign_keys=[created_by])
    security = relationship("Security", back_populates="trade_tickets")
    fund = relationship("Fund", back_populates="trade_tickets")
    status_history = relationship("TradeTicketStatusHistory", back_populates="trade_ticket")
    
    # Constraints
    __table_args__ = (
        {'schema': None},
    )