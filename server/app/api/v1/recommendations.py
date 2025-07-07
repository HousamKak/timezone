
# app/api/v1/recommendations.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.schemas.recommendations import (
    RecommendationCreate, 
    RecommendationUpdate, 
    RecommendationResponse
)
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/", response_model=List[RecommendationResponse])
def get_recommendations(
    analyst_id: Optional[int] = Query(None, description="Filter by analyst ID"),
    security_id: Optional[int] = Query(None, description="Filter by security ID"),
    db: Session = Depends(get_db)
):
    """Get all recommendations with optional filters"""
    if analyst_id:
        return RecommendationService.get_recommendations_by_analyst(db, analyst_id)
    elif security_id:
        return RecommendationService.get_recommendations_by_security(db, security_id)
    else:
        return RecommendationService.get_all_recommendations(db)

@router.get("/drafts", response_model=List[RecommendationResponse])
def get_draft_recommendations(
    analyst_id: Optional[int] = Query(None, description="Filter by analyst ID"),
    db: Session = Depends(get_db)
):
    """Get all draft recommendations"""
    return RecommendationService.get_draft_recommendations(db, analyst_id)

@router.get("/{recommendation_id}", response_model=RecommendationResponse)
def get_recommendation(recommendation_id: int, db: Session = Depends(get_db)):
    """Get a specific recommendation"""
    recommendation = RecommendationService.get_recommendation_by_id(db, recommendation_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return recommendation

@router.post("/", response_model=RecommendationResponse, status_code=status.HTTP_201_CREATED)
def create_recommendation(
    recommendation_data: RecommendationCreate, 
    db: Session = Depends(get_db)
):
    """Create a new trade recommendation"""
    
    # For now, we'll use analyst_id = 1 (you'll replace this with actual user from auth)
    TEMP_ANALYST_ID = 1
    
    return RecommendationService.create_recommendation(
        db, recommendation_data, TEMP_ANALYST_ID
    )

@router.put("/{recommendation_id}", response_model=RecommendationResponse)
def update_recommendation(
    recommendation_id: int,
    recommendation_data: RecommendationUpdate,
    db: Session = Depends(get_db)
):
    """Update a recommendation (only drafts can be updated)"""
    
    # For now, we'll use analyst_id = 1 (you'll replace this with actual user from auth)
    TEMP_ANALYST_ID = 1
    
    return RecommendationService.update_recommendation(
        db, recommendation_id, recommendation_data, TEMP_ANALYST_ID
    )

@router.delete("/{recommendation_id}")
def delete_recommendation(recommendation_id: int, db: Session = Depends(get_db)):
    """Delete a recommendation (only drafts can be deleted)"""
    
    # For now, we'll use analyst_id = 1 (you'll replace this with actual user from auth)
    TEMP_ANALYST_ID = 1
    
    success = RecommendationService.delete_recommendation(
        db, recommendation_id, TEMP_ANALYST_ID
    )
    
    if success:
        return {"message": "Recommendation deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete recommendation"
        )