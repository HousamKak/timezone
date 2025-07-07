# app/services/fund_service.py
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.funds import Fund

class FundService:
    
    @staticmethod
    def get_active_funds(db: Session) -> List[Fund]:
        """Get all active funds ordered by code"""
        return db.query(Fund).filter(
            Fund.is_active == True
        ).order_by(Fund.code).all()
    
    @staticmethod
    def get_fund_by_id(db: Session, fund_id: int) -> Optional[Fund]:
        """Get a specific fund by ID"""
        return db.query(Fund).filter(
            Fund.id == fund_id,
            Fund.is_active == True
        ).first()
    
    @staticmethod
    def get_fund_by_code(db: Session, code: str) -> Optional[Fund]:
        """Get fund by code (e.g., 'OPM', 'GEN')"""
        return db.query(Fund).filter(
            Fund.code.ilike(code.strip()),
            Fund.is_active == True
        ).first()
    
    @staticmethod
    def get_funds_by_ids(db: Session, fund_ids: List[int]) -> List[Fund]:
        """Get multiple funds by their IDs"""
        return db.query(Fund).filter(
            Fund.id.in_(fund_ids),
            Fund.is_active == True
        ).all()