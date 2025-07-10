
# app/schemas/recommendations.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal

from .securities import SecurityResponse
from .strategies import StrategyResponse

class RecommendationCreate(BaseModel):
    security_id: int
    trade_direction: str = Field(..., pattern="^(Buy|Sell|Sell Short|Cover Short)$")
    current_price: Optional[Decimal] = None
    target_price: Decimal
    time_horizon: str = Field(..., pattern="^(Trade|Short Term|Long Term|Custom Date)$")
    expected_exit_date: Optional[date] = None
    analyst_score: int = Field(..., ge=1, le=10)
    notes: Optional[str] = None
    strategy_ids: List[int] = []
    fund_ids: List[int] = []

class RecommendationUpdate(BaseModel):
    trade_direction: Optional[str] = Field(None, pattern="^(Buy|Sell|Sell Short|Cover Short)$")
    current_price: Optional[Decimal] = None
    target_price: Optional[Decimal] = None
    time_horizon: Optional[str] = Field(None, pattern="^(Trade|Short Term|Long Term|Custom Date)$")
    expected_exit_date: Optional[date] = None
    analyst_score: Optional[int] = Field(None, ge=1, le=10)
    notes: Optional[str] = None

class RecommendationResponse(BaseModel):
    id: int
    analyst_id: int
    security_id: int
    trade_direction: str
    current_price: Optional[Decimal]
    target_price: Decimal
    time_horizon: str
    expected_exit_date: Optional[date]
    analyst_score: int
    notes: Optional[str]
    status: str
    is_draft: bool
    created_at: datetime
    updated_at: datetime
    
    # Related data
    security: Optional[SecurityResponse] = None
    strategies: List[StrategyResponse] = []
    
    class Config:
        from_attributes = True