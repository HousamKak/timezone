# ---------------------------------------------
# app/models/securities.py 
# ---------------------------------------------
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, Text, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import BaseModel
from sqlalchemy.sql import func

class Security(BaseModel):
    __tablename__ = "securities"
    
    ticker = Column(String(20), unique=True, nullable=False, index=True)
    name = Column(String(255))  # Nullable for temporary securities
    source_type = Column(String(20), nullable=False, default='TEMPORARY')  # IVP, TEMPORARY, MANUAL
    ivp_security_id = Column(String(50), index=True)  # IVP system identifier
    is_active = Column(Boolean, default=True, nullable=False)
    is_resolved = Column(Boolean, default=False, nullable=False)  # If temp security was resolved
    resolved_at = Column(DateTime)
    resolved_by = Column(Integer, ForeignKey("users.id"))
    resolved_to_ivp_id = Column(String(50))  # IVP ID it was resolved to
    notes = Column(Text)  # Additional notes for temp securities
    research_notes = Column(Text)  # Research about temp ticker
    priority_level = Column(String(20), default='NORMAL', nullable=False)  # HIGH, NORMAL, LOW
    created_by = Column(Integer, ForeignKey("users.id"))
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    resolver = relationship("User", foreign_keys=[resolved_by])
    creator = relationship("User", foreign_keys=[created_by])
    recommendations = relationship("TradeRecommendation", back_populates="security")
    trade_tickets = relationship("TradeTicket", back_populates="security")
    
    # Constraints
    __table_args__ = (
        CheckConstraint("source_type IN ('IVP', 'TEMPORARY', 'MANUAL')", name='check_source_type'),
        CheckConstraint("priority_level IN ('HIGH', 'NORMAL', 'LOW')", name='check_priority_level'),
        {'schema': None},
    )