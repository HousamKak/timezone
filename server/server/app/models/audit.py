# ---------------------------------------------
# app/models/audit.py - Audit trail models
# ---------------------------------------------
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel

class AuditTrail(BaseModel):
    __tablename__ = "audit_trail"
    
    id = Column(BigInteger, primary_key=True, index=True)  # Use BigInteger for audit
    table_name = Column(String(100), nullable=False, index=True)
    record_id = Column(Integer, nullable=False, index=True)
    action_type = Column(String(20), nullable=False, index=True)  # INSERT, UPDATE, DELETE
    field_name = Column(String(100))
    old_value = Column(Text)
    new_value = Column(Text)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    changed_at = Column(DateTime, default=func.now(), nullable=False, index=True)
    session_id = Column(String(100))
    ip_address = Column(String(45))
    user_agent = Column(String(500))
    
    # Relationships
    user = relationship("User")

class RecommendationStatusHistory(BaseModel):
    __tablename__ = "recommendation_status_history"
    
    recommendation_id = Column(Integer, ForeignKey("trade_recommendations.id"), nullable=False, index=True)
    old_status = Column(String(50))
    new_status = Column(String(50), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    notes = Column(Text)
    changed_at = Column(DateTime, default=func.now(), nullable=False)
    
    # Relationships
    recommendation = relationship("TradeRecommendation", back_populates="status_history")
    user = relationship("User")

class TradeTicketStatusHistory(BaseModel):
    __tablename__ = "trade_ticket_status_history"
    
    trade_ticket_id = Column(Integer, ForeignKey("trade_tickets.id"), nullable=False, index=True)
    old_status = Column(String(50))
    new_status = Column(String(50), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    notes = Column(Text)
    changed_at = Column(DateTime, default=func.now(), nullable=False)
    
    # Relationships
    trade_ticket = relationship("TradeTicket", back_populates="status_history")
    user = relationship("User")
