# Run this verification script
import sys
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy.orm import sessionmaker
from app.core.database import engine
from app.models import Role, Permission, Strategy, Fund

Session = sessionmaker(bind=engine)
session = Session()

roles = session.query(Role).count()
permissions = session.query(Permission).count()
strategies = session.query(Strategy).count()
funds = session.query(Fund).count()

print(f'Database verification:')
print(f'Roles: {roles}')
print(f'Permissions: {permissions}')
print(f'Strategies: {strategies}')
print(f'Funds: {funds}')

session.close()

if all([roles >= 3, permissions >= 15, strategies >= 10, funds >= 4]):
    print('✅ Database setup complete and verified!')
else:
    print('❌ Database setup incomplete')