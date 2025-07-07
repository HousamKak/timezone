# app/schemas/funds.py
from pydantic import BaseModel
from typing import Optional

class FundBase(BaseModel):
    code: str
    name: str

class FundResponse(FundBase):
    id: int
    is_active: bool
    
    class Config:
        from_attributes = True