from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
import sys

# Add the project root to the path so we can import our app
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# Import our app configuration and models
from app.core.config import settings
from app.models.base import Base

# Import ALL models so they're registered with SQLAlchemy metadata
from app.models.users import User, Role, Permission, RolePermission, UserPermission
from app.models.securities import Security
from app.models.strategies import Strategy
from app.models.funds import Fund
from app.models.recommendations import TradeRecommendation
from app.models.trade_tickets import TradeTicket
from app.models.files import FileAttachment
from app.models.audit import AuditTrail, RecommendationStatusHistory, TradeTicketStatusHistory
from app.models.relationships import RecommendationStrategy, RecommendationFund

# This is the Alembic Config object
config = context.config

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target_metadata to our models' metadata
target_metadata = Base.metadata

def get_url():
    """Get database URL from our app settings"""
    return settings.DATABASE_URL

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()