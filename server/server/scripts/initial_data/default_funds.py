"""
Default OrbiMed Funds Setup

This script creates the four main OrbiMed funds that analysts can recommend
for their trade recommendations. These funds represent different investment
strategies and focus areas within OrbiMed's healthcare investment portfolio.

Fund Details:
- OPM: Private Investments - Private equity and late-stage investments
- GEN: Genesis Fund - Early-stage and growth investments  
- WWH: Worldwide Health Fund - Global healthcare investments
- BIOG: Biotech Opportunities - Specialized biotech investments

Usage in System:
1. Analysts select recommended funds during trade recommendation submission
2. PMs create trade tickets with specific fund allocations
3. Funds are used for position tracking and portfolio management
4. CRD integration uses fund codes for order routing
"""

from sqlalchemy.orm import sessionmaker
from app.models.funds import Fund

def create_default_funds(engine):
    """
    Create all default OrbiMed funds
    This function is idempotent - safe to run multiple times
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Define all OrbiMed funds
        funds_data = [
            {
                "code": "OPM",
                "name": "OrbiMed Private Investments",
                "is_active": True
            },
            {
                "code": "GEN", 
                "name": "OrbiMed Genesis Fund",
                "is_active": True
            },
            {
                "code": "WWH",
                "name": "OrbiMed Worldwide Health Fund", 
                "is_active": True
            },
            {
                "code": "BIOG",
                "name": "OrbiMed Biotech Opportunities Fund",
                "is_active": True
            }
        ]
        
        created_count = 0
        updated_count = 0
        
        for fund_data in funds_data:
            # Check if fund already exists by code
            existing = session.query(Fund).filter(
                Fund.code == fund_data["code"]
            ).first()
            
            if existing:
                # Update existing fund if name changed
                if existing.name != fund_data["name"]:
                    existing.name = fund_data["name"]
                    existing.is_active = fund_data["is_active"]
                    updated_count += 1
            else:
                # Create new fund
                fund = Fund(**fund_data)
                session.add(fund)
                created_count += 1
        
        session.commit()
        
        if created_count > 0:
            print(f"   ✅ Created {created_count} new funds")
        if updated_count > 0:
            print(f"   ✅ Updated {updated_count} existing funds")
        if created_count == 0 and updated_count == 0:
            print("   ✅ All funds already exist and are up to date")
            
    except Exception as e:
        session.rollback()
        print(f"   ❌ Error creating funds: {e}")
        raise e
    finally:
        session.close()

def get_fund_details():
    """
    Return detailed information about each OrbiMed fund
    """
    return {
        "OPM": {
            "full_name": "OrbiMed Private Investments",
            "focus": "Private equity and late-stage healthcare investments",
            "typical_investments": [
                "Late-stage private companies",
                "Growth capital investments", 
                "Buyout opportunities",
                "Pre-IPO investments"
            ],
            "investment_stage": "Late-stage/Private",
            "geographic_focus": "Global"
        },
        "GEN": {
            "full_name": "OrbiMed Genesis Fund", 
            "focus": "Early-stage and growth healthcare investments",
            "typical_investments": [
                "Early-stage biotechnology companies",
                "Medical device startups",
                "Digital health platforms",
                "Novel therapeutic platforms"
            ],
            "investment_stage": "Early to growth stage",
            "geographic_focus": "Primarily US/Europe"
        },
        "WWH": {
            "full_name": "OrbiMed Worldwide Health Fund",
            "focus": "Global public healthcare investments", 
            "typical_investments": [
                "Public biotechnology stocks",
                "Pharmaceutical companies",
                "Healthcare services",
                "Medical technology companies"
            ],
            "investment_stage": "Public markets",
            "geographic_focus": "Global"
        },
        "BIOG": {
            "full_name": "OrbiMed Biotech Opportunities Fund",
            "focus": "Specialized biotechnology investments",
            "typical_investments": [
                "Biotech companies with novel platforms",
                "Specialty pharmaceutical opportunities", 
                "Orphan drug developers",
                "Breakthrough therapy designations"
            ],
            "investment_stage": "All stages",
            "geographic_focus": "Global"
        }
    }

def get_fund_usage_notes():
    """
    Return usage notes for how funds are used in the system
    """
    return """
    FUND USAGE IN SYSTEM:
    
    1. RECOMMENDATION PHASE:
       - Analysts select multiple recommended funds
       - Funds stored in recommendation_funds junction table
       - Recommendations can target multiple funds simultaneously
    
    2. APPROVAL PHASE:
       - PMs see which funds were recommended
       - PMs can approve for all or subset of recommended funds
    
    3. TRADE TICKET PHASE:
       - PMs create trade tickets for specific funds
       - Each ticket targets one primary fund
       - Fund allocations determine position sizing
    
    4. CRD INTEGRATION:
       - Fund codes passed to CRD for order routing
       - Position tracking by fund
       - Portfolio management by fund
    
    BUSINESS RULES:
    - Fund codes must be unique (enforced by database)
    - Fund names should be descriptive for UI display
    - is_active flag allows temporary fund deactivation
    - Fund codes are case-sensitive in CRD integration
    
    MULTI-FUND RECOMMENDATIONS:
    - Single recommendation can target multiple funds
    - PM creates separate trade tickets for each fund
    - Allows different sizing per fund
    - Enables fund-specific timing decisions
    """

if __name__ == "__main__":
    # For testing purposes
    print("OrbiMed Fund Details")
    print("=" * 50)
    fund_details = get_fund_details()
    for code, details in fund_details.items():
        print(f"\n{code} - {details['full_name']}")
        print(f"Focus: {details['focus']}")
        print(f"Stage: {details['investment_stage']}")
        print(f"Geography: {details['geographic_focus']}")