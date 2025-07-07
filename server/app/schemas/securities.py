# app/schemas/securities.py
from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class SecurityBase(BaseModel):
    ticker: str
    name: Optional[str] = None

class SecurityResponse(SecurityBase):
    id: int
    source_type: str
    is_active: bool
    current_price: Optional[Decimal] = None  # You'll need to add this logic
    
    class Config:
        from_attributes = True