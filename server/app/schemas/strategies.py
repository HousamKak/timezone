# app/schemas/strategies.py
from pydantic import BaseModel
from typing import Optional

class StrategyBase(BaseModel):
    name: str
    description: Optional[str] = None

class StrategyResponse(StrategyBase):
    id: int
    is_active: bool
    is_system_default: bool
    
    class Config:
        from_attributes = True