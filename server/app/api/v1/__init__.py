# app/api/v1/__init__.py
from fastapi import APIRouter
from app.api.v1 import strategies, securities, recommendations, funds

api_router = APIRouter()

api_router.include_router(strategies.router, prefix="/strategies", tags=["strategies"])
api_router.include_router(securities.router, prefix="/securities", tags=["securities"])
api_router.include_router(funds.router, prefix="/funds", tags=["funds"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])