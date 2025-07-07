# scripts/create_test_data.py
"""
Create Test Data for API Testing

This script creates sample data for testing the API endpoints:
- Test user (analyst)
- Sample securities  
- Sample strategies
- Sample funds
- Sample trade recommendations

Usage:
    python scripts/create_test_data.py
"""

import sys
from pathlib import Path
from datetime import date, datetime, timedelta
from decimal import Decimal

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy.orm import sessionmaker
from app.core.database import engine
from app.models.users import User, Role
from app.models.securities import Security
from app.models.strategies import Strategy
from app.models.funds import Fund
from app.models.recommendations import TradeRecommendation
from app.models.relationships import RecommendationStrategy, RecommendationFund

def create_test_data():
    """Create test data for API testing"""
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        print("🧪 Creating test data...")
        
        # Create test user (analyst) if doesn't exist
        test_user = create_test_user(session)
        
        # Create sample securities
        create_sample_securities(session)
        
        # Create sample trade recommendations
        create_sample_recommendations(session, test_user)
        
        # Verify counts
        verify_data_counts(session)
        
        print("✅ Test data creation completed!")
        
    except Exception as e:
        session.rollback()
        print(f"❌ Error creating test data: {e}")
        raise
    finally:
        session.close()

def create_test_user(session):
    """Create test analyst user"""
    test_user = session.query(User).filter(User.email == "test.analyst@orbimed.com").first()
    if not test_user:
        analyst_role = session.query(Role).filter(Role.name == "Analyst").first()
        if analyst_role:
            test_user = User(
                okta_id="test_analyst_123",
                email="test.analyst@orbimed.com",
                name="Test Analyst",
                role_id=analyst_role.id,
                is_active=True
            )
            session.add(test_user)
            session.flush()
            print(f"   ✅ Created test analyst user (ID: {test_user.id})")
        else:
            print("   ⚠️  No Analyst role found - run 'python scripts/init_db.py' first")
            return None
    else:
        print(f"   ✅ Test analyst user already exists (ID: {test_user.id})")
    
    return test_user

def create_sample_securities(session):
    """Create sample securities for testing"""
    securities_data = [
        {"ticker": "AAPL", "name": "Apple Inc", "source_type": "IVP"},
        {"ticker": "GOOGL", "name": "Alphabet Inc", "source_type": "IVP"},
        {"ticker": "MSFT", "name": "Microsoft Corporation", "source_type": "IVP"},
        {"ticker": "AMZN", "name": "Amazon.com Inc", "source_type": "IVP"},
        {"ticker": "NVDA", "name": "NVIDIA Corporation", "source_type": "IVP"},
        {"ticker": "TSLA", "name": "Tesla Inc", "source_type": "IVP"},
        {"ticker": "META", "name": "Meta Platforms Inc", "source_type": "IVP"},
        {"ticker": "NFLX", "name": "Netflix Inc", "source_type": "IVP"},
        {"ticker": "TEMP1", "name": None, "source_type": "TEMPORARY"},
        {"ticker": "TEMP2", "name": None, "source_type": "TEMPORARY"},
    ]
    
    created_count = 0
    for sec_data in securities_data:
        existing = session.query(Security).filter(Security.ticker == sec_data["ticker"]).first()
        if not existing:
            security = Security(**sec_data)
            session.add(security)
            created_count += 1
    
    session.commit()
    if created_count > 0:
        print(f"   ✅ Created {created_count} sample securities")
    else:
        print("   ✅ Sample securities already exist")

def create_sample_recommendations(session, test_user):
    """Create sample trade recommendations"""
    if not test_user:
        print("   ⚠️  Cannot create recommendations - no test user")
        return
    
    # Get required data
    securities = session.query(Security).filter(Security.is_active == True).all()
    strategies = session.query(Strategy).filter(Strategy.is_active == True).all()
    funds = session.query(Fund).filter(Fund.is_active == True).all()
    
    if not securities or not strategies or not funds:
        print("   ⚠️  Missing required data for recommendations:")
        print(f"      Securities: {len(securities)}, Strategies: {len(strategies)}, Funds: {len(funds)}")
        print("   ⚠️  Run 'python scripts/init_db.py' first")
        return
    
    # Sample recommendation data
    recommendations_data = [
        {
            "ticker": "AAPL",
            "trade_direction": "Buy",
            "current_price": Decimal("150.00"),
            "target_price": Decimal("180.00"),
            "time_horizon": "Short Term",
            "analyst_score": 8,
            "notes": "Strong quarterly earnings expected. iPhone sales momentum continues.",
            "status": "Draft",
            "is_draft": True,
            "strategy_names": ["Valuation", "Earnings Beat/Miss"],
            "fund_codes": ["WWH"]
        },
        {
            "ticker": "GOOGL", 
            "trade_direction": "Buy",
            "current_price": Decimal("2800.00"),
            "target_price": Decimal("3200.00"),
            "time_horizon": "Long Term",
            "analyst_score": 9,
            "notes": "AI leadership position and cloud growth trajectory very strong.",
            "status": "Proposed",
            "is_draft": False,
            "strategy_names": ["Commercial Outlook", "Thematic Baskets"],
            "fund_codes": ["GEN", "WWH"]
        },
        {
            "ticker": "NVDA",
            "trade_direction": "Sell",
            "current_price": Decimal("800.00"),
            "target_price": Decimal("650.00"),
            "time_horizon": "Trade",
            "analyst_score": 6,
            "notes": "Valuation seems stretched. Taking profits after strong run.",
            "status": "Draft",
            "is_draft": True,
            "strategy_names": ["Technical Analysis", "PM Rebalance"],
            "fund_codes": ["OPM"]
        },
        {
            "ticker": "TSLA",
            "trade_direction": "Buy",
            "current_price": Decimal("200.00"),
            "target_price": Decimal("280.00"),
            "time_horizon": "Custom Date",
            "expected_exit_date": date.today() + timedelta(days=90),
            "analyst_score": 7,
            "notes": "New model launch should drive sales. Autonomous driving progress.",
            "status": "Draft",
            "is_draft": True,
            "strategy_names": ["Drug/Product Launch", "Commercial Outlook"],
            "fund_codes": ["GEN"]
        },
        {
            "ticker": "META",
            "trade_direction": "Sell Short",
            "current_price": Decimal("320.00"),
            "target_price": Decimal("280.00"),
            "time_horizon": "Short Term",
            "analyst_score": 4,
            "notes": "Regulatory headwinds and metaverse spending concerns.",
            "status": "Approved",
            "is_draft": False,
            "strategy_names": ["Political Trade", "Macro"],
            "fund_codes": ["WWH"]
        },
        {
            "ticker": "TEMP1",
            "trade_direction": "Buy",
            "current_price": None,
            "target_price": Decimal("50.00"),
            "time_horizon": "Long Term",
            "analyst_score": 8,
            "notes": "Promising biotech company. Temporary ticker until IVP integration.",
            "status": "Draft",
            "is_draft": True,
            "strategy_names": ["Clinical Catalyst", "Other"],
            "fund_codes": ["BIOG"]
        }
    ]
    
    created_count = 0
    for rec_data in recommendations_data:
        # Find security by ticker
        security = next((s for s in securities if s.ticker == rec_data["ticker"]), None)
        if not security:
            print(f"   ⚠️  Security {rec_data['ticker']} not found, skipping recommendation")
            continue
        
        # Check if recommendation already exists
        existing = session.query(TradeRecommendation).filter(
            TradeRecommendation.analyst_id == test_user.id,
            TradeRecommendation.security_id == security.id,
            TradeRecommendation.trade_direction == rec_data["trade_direction"]
        ).first()
        
        if existing:
            continue  # Skip if similar recommendation exists
        
        # Create recommendation
        recommendation = TradeRecommendation(
            analyst_id=test_user.id,
            security_id=security.id,
            trade_direction=rec_data["trade_direction"],
            current_price=rec_data.get("current_price"),
            target_price=rec_data["target_price"],
            time_horizon=rec_data["time_horizon"],
            expected_exit_date=rec_data.get("expected_exit_date"),
            analyst_score=rec_data["analyst_score"],
            notes=rec_data["notes"],
            status=rec_data["status"],
            is_draft=rec_data["is_draft"]
        )
        
        session.add(recommendation)
        session.flush()  # Get the ID
        
        # Add strategies
        for strategy_name in rec_data["strategy_names"]:
            strategy = next((s for s in strategies if s.name == strategy_name), None)
            if strategy:
                strategy_link = RecommendationStrategy(
                    recommendation_id=recommendation.id,
                    strategy_id=strategy.id
                )
                session.add(strategy_link)
        
        # Add funds
        for fund_code in rec_data["fund_codes"]:
            fund = next((f for f in funds if f.code == fund_code), None)
            if fund:
                fund_link = RecommendationFund(
                    recommendation_id=recommendation.id,
                    fund_id=fund.id
                )
                session.add(fund_link)
        
        created_count += 1
    
    session.commit()
    if created_count > 0:
        print(f"   ✅ Created {created_count} sample trade recommendations")
    else:
        print("   ✅ Sample trade recommendations already exist")

def verify_data_counts(session):
    """Verify all test data was created properly"""
    print("\n📊 Data Summary:")
    
    # Count all the data
    users_count = session.query(User).count()
    securities_count = session.query(Security).count()
    strategies_count = session.query(Strategy).count()
    funds_count = session.query(Fund).count()
    recommendations_count = session.query(TradeRecommendation).count()
    draft_recs_count = session.query(TradeRecommendation).filter(TradeRecommendation.is_draft == True).count()
    
    print(f"   Users: {users_count}")
    print(f"   Securities: {securities_count}")
    print(f"   Strategies: {strategies_count}")
    print(f"   Funds: {funds_count}")
    print(f"   Trade Recommendations: {recommendations_count}")
    print(f"   Draft Recommendations: {draft_recs_count}")
    
    # Warnings
    if strategies_count == 0:
        print("   ⚠️  No strategies found - run 'python scripts/init_db.py' first")
    
    if funds_count == 0:
        print("   ⚠️  No funds found - run 'python scripts/init_db.py' first")
    
    if recommendations_count == 0:
        print("   ⚠️  No recommendations created - check for errors above")

def show_test_endpoints():
    """Show which endpoints can now be tested"""
    print("\n🧪 Test These API Endpoints:")
    print("   GET  /api/v1/strategies/")
    print("   GET  /api/v1/securities/")
    print("   GET  /api/v1/funds/")
    print("   GET  /api/v1/recommendations/")
    print("   GET  /api/v1/recommendations/drafts")
    print("   POST /api/v1/recommendations/")
    print("   PUT  /api/v1/recommendations/{id}")
    print("   DELETE /api/v1/recommendations/{id}")
    print("\n🌐 API Documentation: http://localhost:8000/docs")

if __name__ == "__main__":
    create_test_data()
    show_test_endpoints()