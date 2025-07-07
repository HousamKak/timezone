# app/api/v1/strategies.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.strategies import StrategyResponse
from app.services.strategy_service import StrategyService

router = APIRouter()

@router.get("/", response_model=List[StrategyResponse])
def get_strategies(db: Session = Depends(get_db)):
    """Get all active strategies"""
    return StrategyService.get_active_strategies(db)

@router.get("/{strategy_id}", response_model=StrategyResponse)
def get_strategy(strategy_id: int, db: Session = Depends(get_db)):
    """Get a specific strategy by ID"""
    strategy = StrategyService.get_strategy_by_id(db, strategy_id)
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    return strategy


