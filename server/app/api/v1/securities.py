# app/api/v1/securities.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.schemas.securities import SecurityResponse
from app.services.security_service import SecurityService

router = APIRouter()

@router.get("/", response_model=List[SecurityResponse])
def get_securities(db: Session = Depends(get_db)):
    """Get all active securities"""
    return SecurityService.get_all_securities(db)

@router.get("/search", response_model=List[SecurityResponse])
def search_securities(
    q: str = Query(..., min_length=1, description="Search query (ticker or name)"),
    limit: int = Query(10, ge=1, le=50, description="Maximum number of results"),
    db: Session = Depends(get_db)
):
    """Search securities by ticker or name"""
    return SecurityService.search_securities(db, q, limit)

@router.get("/{security_id}", response_model=SecurityResponse)
def get_security(security_id: int, db: Session = Depends(get_db)):
    """Get a specific security by ID"""
    security = SecurityService.get_security_by_id(db, security_id)
    if not security:
        raise HTTPException(status_code=404, detail="Security not found")
    return security