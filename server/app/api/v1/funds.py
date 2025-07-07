# app/api/v1/funds.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.funds import FundResponse
from app.services.fund_service import FundService

router = APIRouter()

@router.get("/", response_model=List[FundResponse])
def get_funds(db: Session = Depends(get_db)):
    """Get all active funds"""
    return FundService.get_active_funds(db)

@router.get("/{fund_id}", response_model=FundResponse)
def get_fund(fund_id: int, db: Session = Depends(get_db)):
    """Get a specific fund by ID"""
    fund = FundService.get_fund_by_id(db, fund_id)
    if not fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return fund

@router.get("/code/{code}", response_model=FundResponse)
def get_fund_by_code(code: str, db: Session = Depends(get_db)):
    """Get a fund by its code (e.g., 'OPM', 'GEN')"""
    fund = FundService.get_fund_by_code(db, code)
    if not fund:
        raise HTTPException(status_code=404, detail=f"Fund with code '{code}' not found")
    return fund