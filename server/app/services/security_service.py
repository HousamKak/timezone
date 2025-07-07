# app/services/security_service.py
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from app.models.securities import Security

class SecurityService:
    
    @staticmethod
    def get_all_securities(db: Session) -> List[Security]:
        """Get all active securities"""
        return db.query(Security).filter(
            Security.is_active == True
        ).order_by(Security.ticker).all()
    
    @staticmethod
    def get_security_by_id(db: Session, security_id: int) -> Optional[Security]:
        """Get a specific security by ID"""
        return db.query(Security).filter(
            Security.id == security_id,
            Security.is_active == True
        ).first()
    
    @staticmethod
    def search_securities(db: Session, query: str, limit: int = 10) -> List[Security]:
        """Search securities by ticker or name"""
        search_term = f"%{query.upper()}%"
        
        return db.query(Security).filter(
            Security.is_active == True,
            or_(
                Security.ticker.ilike(search_term),
                Security.name.ilike(search_term)
            )
        ).order_by(Security.ticker).limit(limit).all()
    
    @staticmethod
    def get_security_by_ticker(db: Session, ticker: str) -> Optional[Security]:
        """Get security by ticker symbol"""
        return db.query(Security).filter(
            Security.ticker.ilike(ticker.strip()),
            Security.is_active == True
        ).first()