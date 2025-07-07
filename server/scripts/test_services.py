# scripts/test_services.py
#!/usr/bin/env python3
"""
Test Script for Service Layer

This script tests all the service methods to ensure they work correctly.

Usage:
    python scripts/test_services.py
"""

import sys
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy.orm import sessionmaker
from app.core.database import engine
from app.services import (
    StrategyService, 
    SecurityService, 
    FundService, 
    RecommendationService
)
from app.schemas.recommendations import RecommendationCreate
from datetime import date

def test_strategy_service():
    """Test strategy service methods"""
    print("🧪 Testing Strategy Service...")
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Test get all strategies
        strategies = StrategyService.get_active_strategies(session)
        print(f"   ✅ Found {len(strategies)} active strategies")
        
        if strategies:
            # Test get strategy by ID
            strategy = StrategyService.get_strategy_by_id(session, strategies[0].id)
            print(f"   ✅ Retrieved strategy: {strategy.name}")
            
            # Test get multiple strategies
            strategy_ids = [s.id for s in strategies[:3]]
            multiple_strategies = StrategyService.get_strategies_by_ids(session, strategy_ids)
            print(f"   ✅ Retrieved {len(multiple_strategies)} strategies by IDs")
    
    except Exception as e:
        print(f"   ❌ Strategy service error: {e}")
    finally:
        session.close()

def test_security_service():
    """Test security service methods"""
    print("🧪 Testing Security Service...")
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Test get all securities
        securities = SecurityService.get_all_securities(session)
        print(f"   ✅ Found {len(securities)} active securities")
        
        if securities:
            # Test get security by ID
            security = SecurityService.get_security_by_id(session, securities[0].id)
            print(f"   ✅ Retrieved security: {security.ticker}")
            
            # Test search securities
            search_results = SecurityService.search_securities(session, "A", limit=5)
            print(f"   ✅ Search found {len(search_results)} securities starting with 'A'")
            
            # Test get by ticker
            ticker_security = SecurityService.get_security_by_ticker(session, securities[0].ticker)
            if ticker_security:
                print(f"   ✅ Found security by ticker: {ticker_security.ticker}")
    
    except Exception as e:
        print(f"   ❌ Security service error: {e}")
    finally:
        session.close()

def test_fund_service():
    """Test fund service methods"""
    print("🧪 Testing Fund Service...")
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Test get all funds
        funds = FundService.get_active_funds(session)
        print(f"   ✅ Found {len(funds)} active funds")
        
        if funds:
            # Test get fund by ID
            fund = FundService.get_fund_by_id(session, funds[0].id)
            print(f"   ✅ Retrieved fund: {fund.code} - {fund.name}")
            
            # Test get fund by code
            code_fund = FundService.get_fund_by_code(session, funds[0].code)
            if code_fund:
                print(f"   ✅ Found fund by code: {code_fund.code}")
            
            # Test get multiple funds
            fund_ids = [f.id for f in funds[:2]]
            multiple_funds = FundService.get_funds_by_ids(session, fund_ids)
            print(f"   ✅ Retrieved {len(multiple_funds)} funds by IDs")
    
    except Exception as e:
        print(f"   ❌ Fund service error: {e}")
    finally:
        session.close()

def test_recommendation_service():
    """Test recommendation service methods"""
    print("🧪 Testing Recommendation Service...")
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # First check if we have required data
        securities = SecurityService.get_all_securities(session)
        strategies = StrategyService.get_active_strategies(session)
        funds = FundService.get_active_funds(session)
        
        if not securities:
            print("   ⚠️  No securities found - run create_test_data.py first")
            return
        
        if not strategies:
            print("   ⚠️  No strategies found - run init_db.py first")
            return
            
        if not funds:
            print("   ⚠️  No funds found - run init_db.py first")
            return
        
        # Test get all recommendations
        all_recs = RecommendationService.get_all_recommendations(session)
        print(f"   ✅ Found {len(all_recs)} total recommendations")
        
        # Test get draft recommendations
        draft_recs = RecommendationService.get_draft_recommendations(session)
        print(f"   ✅ Found {len(draft_recs)} draft recommendations")
        
        # Test create recommendation
        rec_data = RecommendationCreate(
            security_id=securities[0].id,
            trade_direction="Buy",
            target_price=150.00,
            time_horizon="Short Term",
            analyst_score=8,
            notes="Test recommendation from service test",
            strategy_ids=[strategies[0].id],
            fund_ids=[funds[0].id]
        )
        
        new_rec = RecommendationService.create_recommendation(session, rec_data, analyst_id=1)
        print(f"   ✅ Created recommendation ID: {new_rec.id}")
        
        # Test get recommendation by ID
        retrieved_rec = RecommendationService.get_recommendation_by_id(session, new_rec.id)
        if retrieved_rec:
            print(f"   ✅ Retrieved recommendation: {retrieved_rec.trade_direction} {retrieved_rec.security.ticker}")
        
        # Test update recommendation
        from app.schemas.recommendations import RecommendationUpdate
        update_data = RecommendationUpdate(target_price=160.00, notes="Updated test recommendation")
        updated_rec = RecommendationService.update_recommendation(session, new_rec.id, update_data, analyst_id=1)
        print(f"   ✅ Updated recommendation target price to: {updated_rec.target_price}")
        
        # Test delete recommendation
        success = RecommendationService.delete_recommendation(session, new_rec.id, analyst_id=1)
        if success:
            print("   ✅ Successfully deleted test recommendation")
    
    except Exception as e:
        print(f"   ❌ Recommendation service error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.close()

def main():
    """Run all service tests"""
    print("🚀 Testing Service Layer Implementation")
    print("=" * 50)
    
    test_strategy_service()
    print()
    
    test_security_service()
    print()
    
    test_fund_service()
    print()
    
    test_recommendation_service()
    print()
    
    print("=" * 50)
    print("✅ Service testing completed!")
    print("\n💡 If all tests passed, your services are working correctly!")
    print("💡 If tests failed, check your database setup and service implementations.")

if __name__ == "__main__":
    main()