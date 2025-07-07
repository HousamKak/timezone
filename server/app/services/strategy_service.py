# app/services/strategy_service.py
from sqlalchemy.orm import Session
from typing import List
from app.models.strategies import Strategy

class StrategyService:
    
    @staticmethod
    def get_active_strategies(db: Session) -> List[Strategy]:
        """Get all active strategies ordered by name"""
        return db.query(Strategy).filter(
            Strategy.is_active == True
        ).order_by(Strategy.name).all()
    
    @staticmethod
    def get_strategy_by_id(db: Session, strategy_id: int) -> Strategy:
        """Get a specific strategy by ID"""
        return db.query(Strategy).filter(
            Strategy.id == strategy_id,
            Strategy.is_active == True
        ).first()
    
    @staticmethod
    def get_strategies_by_ids(db: Session, strategy_ids: List[int]) -> List[Strategy]:
        """Get multiple strategies by their IDs"""
        return db.query(Strategy).filter(
            Strategy.id.in_(strategy_ids),
            Strategy.is_active == True
        ).all()
