"""
Default Trading Strategies Setup

This script creates the 12 standard trading strategies used by OrbiMed analysts.
These strategies are referenced in trade recommendations and help categorize
the reasoning behind investment decisions.

Strategy Categories:
1. Event-driven: M&A, Clinical Catalyst, Drug/Product Launch
2. Analysis-based: Valuation, Technical Analysis, Commercial Outlook  
3. Market-driven: Macro, Political Trade, Earnings Beat/Miss
4. Portfolio management: PM Rebalance, Thematic Baskets
5. Custom: Other (allows custom text input)

All strategies are marked as system_default=True and cannot be deleted by users.
"""

from sqlalchemy.orm import sessionmaker
from app.models.strategies import Strategy

def create_default_strategies(engine):
    """
    Create all default trading strategies
    This function is idempotent - safe to run multiple times
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Define all default strategies from the BRD
        strategies_data = [
            # ===========================================
            # EVENT-DRIVEN STRATEGIES
            # ===========================================
            {
                "name": "M&A Speculation",
                "description": "Merger and acquisition opportunities - trades based on potential M&A activity",
                "is_system_default": True
            },
            {
                "name": "Clinical Catalyst", 
                "description": "Clinical trial catalysts - trades based on expected clinical trial results",
                "is_system_default": True
            },
            {
                "name": "Drug/Product Launch",
                "description": "New product launch opportunities - trades based on upcoming drug or product launches",
                "is_system_default": True
            },
            
            # ===========================================
            # ANALYSIS-BASED STRATEGIES  
            # ===========================================
            {
                "name": "Valuation",
                "description": "Valuation-based investment decisions - trades based on fundamental analysis and valuation metrics",
                "is_system_default": True
            },
            {
                "name": "Technical Analysis",
                "description": "Technical chart-based analysis - trades based on price patterns and technical indicators",
                "is_system_default": True
            },
            {
                "name": "Commercial Outlook", 
                "description": "Commercial prospects analysis - trades based on business fundamentals and commercial potential",
                "is_system_default": True
            },
            
            # ===========================================
            # MARKET-DRIVEN STRATEGIES
            # ===========================================
            {
                "name": "Macro",
                "description": "Macroeconomic driven trades - investments based on broader economic trends and conditions",
                "is_system_default": True
            },
            {
                "name": "Political Trade",
                "description": "Political event-driven opportunities - trades based on regulatory or political developments",
                "is_system_default": True
            },
            {
                "name": "Earnings Beat/Miss",
                "description": "Earnings-driven trades - positions based on expected earnings results vs. consensus",
                "is_system_default": True
            },
            
            # ===========================================
            # PORTFOLIO MANAGEMENT STRATEGIES
            # ===========================================
            {
                "name": "PM Rebalance",
                "description": "Portfolio rebalancing trades - position adjustments for portfolio optimization",
                "is_system_default": True
            },
            {
                "name": "Thematic Baskets",
                "description": "Thematic investment approach - trades based on broader investment themes",
                "is_system_default": True
            },
            
            # ===========================================
            # CUSTOM STRATEGY
            # ===========================================
            {
                "name": "Other",
                "description": "Custom strategy - specify details in recommendation notes or custom text field",
                "is_system_default": True
            }
        ]
        
        created_count = 0
        updated_count = 0
        
        for strategy_data in strategies_data:
            # Check if strategy already exists
            existing = session.query(Strategy).filter(
                Strategy.name == strategy_data["name"]
            ).first()
            
            if existing:
                # Update existing strategy if needed
                if existing.description != strategy_data["description"]:
                    existing.description = strategy_data["description"]
                    existing.is_system_default = strategy_data["is_system_default"]
                    updated_count += 1
            else:
                # Create new strategy
                strategy = Strategy(**strategy_data)
                session.add(strategy)
                created_count += 1
        
        session.commit()
        
        if created_count > 0:
            print(f"   ✅ Created {created_count} new strategies")
        if updated_count > 0:
            print(f"   ✅ Updated {updated_count} existing strategies")
        if created_count == 0 and updated_count == 0:
            print("   ✅ All strategies already exist and are up to date")
            
    except Exception as e:
        session.rollback()
        print(f"   ❌ Error creating strategies: {e}")
        raise e
    finally:
        session.close()

def get_strategy_usage_notes():
    """
    Return usage notes for how strategies are used in the system
    """
    return """
    STRATEGY USAGE NOTES:
    
    1. Multi-Selection: Analysts can select multiple strategies per recommendation
    2. Custom Strategy: "Other" allows custom text input for unique situations
    3. CRD Integration: Strategy names are comma-concatenated for CRD submission
    4. Filtering: Strategies can be used to filter recommendation views
    5. Reporting: Strategy data is used for performance analysis and reporting
    
    STRATEGY COMBINATIONS (Examples):
    - "Valuation, Clinical Catalyst" - Undervalued stock with upcoming trial
    - "M&A Speculation, Technical Analysis" - M&A target with strong technicals
    - "Commercial Outlook, Macro" - Strong business in favorable macro environment
    
    BUSINESS RULES:
    - System default strategies cannot be deleted
    - Custom strategies can be added by administrators
    - Strategy names are passed to CRD as comma-separated string
    - "Other" strategy should include explanation in recommendation notes
    """

if __name__ == "__main__":
    # For testing purposes
    print("Default Trading Strategies")
    print("=" * 50)
    print(get_strategy_usage_notes())