# app/services/recommendation_service.py
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from typing import List, Optional
from fastapi import HTTPException, status

from app.models.recommendations import TradeRecommendation
from app.models.relationships import RecommendationStrategy, RecommendationFund
from app.schemas.recommendations import RecommendationCreate, RecommendationUpdate
from app.services.security_service import SecurityService
from app.services.strategy_service import StrategyService

class RecommendationService:
    
    @staticmethod
    def get_all_recommendations(db: Session) -> List[TradeRecommendation]:
        """Get all recommendations with related data"""
        return db.query(TradeRecommendation).options(
            joinedload(TradeRecommendation.security),
            joinedload(TradeRecommendation.strategies).joinedload(RecommendationStrategy.strategy),
            joinedload(TradeRecommendation.funds).joinedload(RecommendationFund.fund),
            joinedload(TradeRecommendation.analyst)
        ).order_by(TradeRecommendation.created_at.desc()).all()
    
    @staticmethod
    def get_draft_recommendations(db: Session, analyst_id: Optional[int] = None) -> List[TradeRecommendation]:
        """Get draft recommendations, optionally filtered by analyst"""
        query = db.query(TradeRecommendation).options(
            joinedload(TradeRecommendation.security),
            joinedload(TradeRecommendation.strategies).joinedload(RecommendationStrategy.strategy),
            joinedload(TradeRecommendation.funds).joinedload(RecommendationFund.fund),
            joinedload(TradeRecommendation.analyst)
        ).filter(
            TradeRecommendation.is_draft == True,
            TradeRecommendation.status == 'Draft'
        )
        
        if analyst_id:
            query = query.filter(TradeRecommendation.analyst_id == analyst_id)
            
        return query.order_by(TradeRecommendation.created_at.desc()).all()
    
    @staticmethod
    def get_recommendation_by_id(db: Session, recommendation_id: int) -> Optional[TradeRecommendation]:
        """Get a specific recommendation with all related data"""
        return db.query(TradeRecommendation).options(
            joinedload(TradeRecommendation.security),
            joinedload(TradeRecommendation.strategies).joinedload(RecommendationStrategy.strategy),
            joinedload(TradeRecommendation.funds).joinedload(RecommendationFund.fund),
            joinedload(TradeRecommendation.analyst)
        ).filter(TradeRecommendation.id == recommendation_id).first()
    
    @staticmethod
    def create_recommendation(
        db: Session, 
        recommendation_data: RecommendationCreate, 
        analyst_id: int
    ) -> TradeRecommendation:
        """Create a new trade recommendation"""
        
        # Validate security exists
        security = SecurityService.get_security_by_id(db, recommendation_data.security_id)
        if not security:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Security with ID {recommendation_data.security_id} not found"
            )
        
        # Validate strategies exist
        if recommendation_data.strategy_ids:
            strategies = StrategyService.get_strategies_by_ids(db, recommendation_data.strategy_ids)
            if len(strategies) != len(recommendation_data.strategy_ids):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="One or more strategy IDs are invalid"
                )
        
        try:
            # Create the main recommendation
            recommendation = TradeRecommendation(
                analyst_id=analyst_id,
                security_id=recommendation_data.security_id,
                trade_direction=recommendation_data.trade_direction,
                current_price=recommendation_data.current_price,
                target_price=recommendation_data.target_price,
                time_horizon=recommendation_data.time_horizon,
                expected_exit_date=recommendation_data.expected_exit_date,
                analyst_score=recommendation_data.analyst_score,
                notes=recommendation_data.notes,
                status='Draft',
                is_draft=True
            )
            
            db.add(recommendation)
            db.flush()  # Get the ID
            
            # Add strategies
            for strategy_id in recommendation_data.strategy_ids:
                strategy_link = RecommendationStrategy(
                    recommendation_id=recommendation.id,
                    strategy_id=strategy_id
                )
                db.add(strategy_link)
            
            # Add funds
            for fund_id in recommendation_data.fund_ids:
                fund_link = RecommendationFund(
                    recommendation_id=recommendation.id,
                    fund_id=fund_id
                )
                db.add(fund_link)
            
            db.commit()
            
            # Return with loaded relationships
            return RecommendationService.get_recommendation_by_id(db, recommendation.id)
            
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Database constraint violation: {str(e)}"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error creating recommendation: {str(e)}"
            )
    
    @staticmethod
    def update_recommendation(
        db: Session,
        recommendation_id: int,
        recommendation_data: RecommendationUpdate,
        analyst_id: Optional[int] = None
    ) -> TradeRecommendation:
        """Update a recommendation (only drafts can be updated)"""
        
        # Get the recommendation
        recommendation = RecommendationService.get_recommendation_by_id(db, recommendation_id)
        if not recommendation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommendation not found"
            )
        
        # Check if it's a draft
        if not recommendation.is_draft:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only draft recommendations can be updated"
            )
        
        # Check ownership (if analyst_id provided)
        if analyst_id and recommendation.analyst_id != analyst_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own recommendations"
            )
        
        try:
            # Update fields that were provided
            update_data = recommendation_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(recommendation, field, value)
            
            db.commit()
            db.refresh(recommendation)
            
            return RecommendationService.get_recommendation_by_id(db, recommendation_id)
            
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error updating recommendation: {str(e)}"
            )
    
    @staticmethod
    def delete_recommendation(
        db: Session, 
        recommendation_id: int, 
        analyst_id: Optional[int] = None
    ) -> bool:
        """Delete a recommendation (only drafts can be deleted)"""
        
        # Get the recommendation
        recommendation = db.query(TradeRecommendation).filter(
            TradeRecommendation.id == recommendation_id
        ).first()
        
        if not recommendation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recommendation not found"
            )
        
        # Check if it's a draft
        if not recommendation.is_draft:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only draft recommendations can be deleted"
            )
        
        # Check ownership (if analyst_id provided)
        if analyst_id and recommendation.analyst_id != analyst_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own recommendations"
            )
        
        try:
            # Delete related records first (due to foreign key constraints)
            db.query(RecommendationStrategy).filter(
                RecommendationStrategy.recommendation_id == recommendation_id
            ).delete()
            
            db.query(RecommendationFund).filter(
                RecommendationFund.recommendation_id == recommendation_id
            ).delete()
            
            # Delete the recommendation
            db.delete(recommendation)
            db.commit()
            
            return True
            
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error deleting recommendation: {str(e)}"
            )
    
    @staticmethod
    def get_recommendations_by_analyst(db: Session, analyst_id: int) -> List[TradeRecommendation]:
        """Get all recommendations for a specific analyst"""
        return db.query(TradeRecommendation).options(
            joinedload(TradeRecommendation.security),
            joinedload(TradeRecommendation.strategies).joinedload(RecommendationStrategy.strategy),
            joinedload(TradeRecommendation.funds).joinedload(RecommendationFund.fund)
        ).filter(
            TradeRecommendation.analyst_id == analyst_id
        ).order_by(TradeRecommendation.created_at.desc()).all()
    
    @staticmethod
    def get_recommendations_by_security(db: Session, security_id: int) -> List[TradeRecommendation]:
        """Get all recommendations for a specific security"""
        return db.query(TradeRecommendation).options(
            joinedload(TradeRecommendation.analyst),
            joinedload(TradeRecommendation.strategies).joinedload(RecommendationStrategy.strategy),
            joinedload(TradeRecommendation.funds).joinedload(RecommendationFund.fund)
        ).filter(
            TradeRecommendation.security_id == security_id
        ).order_by(TradeRecommendation.created_at.desc()).all()