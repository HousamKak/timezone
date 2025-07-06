"""
Initial Roles and Permissions Setup

This script creates:
1. Three core roles: Analyst, Portfolio_Manager, Administrator
2. All system permissions organized by category
3. Default role-permission assignments based on BRD requirements

Key Permission Categories:
- UI: Portal access permissions
- Functional: Feature-level permissions  
- Business: Workflow permissions
- Admin: System administration permissions

Role Hierarchy:
- Analyst: Basic trade recommendation creation and own data access
- Portfolio_Manager: All analyst permissions + approval + trade management
- Administrator: All permissions + user management + system config
"""

from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from app.models.users import Role, Permission, RolePermission

def create_initial_roles_and_permissions(engine):
    """
    Create all roles, permissions, and their assignments
    This function is idempotent - safe to run multiple times
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Create roles first
        _create_roles(session)
        
        # Create permissions  
        _create_permissions(session)
        
        # Assign permissions to roles
        _assign_role_permissions(session)
        
        session.commit()
        print("   ✅ Roles and permissions created successfully")
        
    except Exception as e:
        session.rollback()
        print(f"   ❌ Error creating roles/permissions: {e}")
        raise e
    finally:
        session.close()

def _create_roles(session):
    """Create the three core system roles"""
    roles_data = [
        {
            "name": "Analyst", 
            "description": "Financial analysts who submit trade recommendations"
        },
        {
            "name": "Portfolio_Manager", 
            "description": "Portfolio managers who approve trades and manage portfolios"
        },
        {
            "name": "Administrator", 
            "description": "System administrators with full access"
        }
    ]
    
    for role_data in roles_data:
        # Check if role already exists
        existing = session.query(Role).filter(Role.name == role_data["name"]).first()
        if not existing:
            role = Role(**role_data)
            session.add(role)
            session.flush()  # Get the ID immediately

def _create_permissions(session):
    """Create all system permissions organized by category"""
    
    permissions_data = [
        # ===========================================
        # UI ACCESS PERMISSIONS
        # ===========================================
        {
            "permission_key": "ui.analyst_portal",
            "category": "UI",
            "display_name": "Analyst Portal Access",
            "description": "Access to analyst trade submission interface"
        },
        {
            "permission_key": "ui.pm_portal", 
            "category": "UI",
            "display_name": "PM Portal Access",
            "description": "Access to portfolio manager approval interface"
        },
        {
            "permission_key": "ui.admin_portal",
            "category": "UI", 
            "display_name": "Admin Portal Access",
            "description": "Access to system administration interface"
        },
        
        # ===========================================
        # TRADE RECOMMENDATION PERMISSIONS
        # ===========================================
        {
            "permission_key": "trade.create_recommendation",
            "category": "Functional",
            "display_name": "Create Trade Recommendations", 
            "description": "Submit new trade recommendations"
        },
        {
            "permission_key": "trade.edit_own_drafts",
            "category": "Functional",
            "display_name": "Edit Own Drafts",
            "description": "Modify own draft recommendations"
        },
        {
            "permission_key": "trade.delete_own_drafts",
            "category": "Functional", 
            "display_name": "Delete Own Drafts",
            "description": "Delete own draft recommendations"
        },
        {
            "permission_key": "trade.view_own_history",
            "category": "Functional",
            "display_name": "View Own History", 
            "description": "View own recommendation history"
        },
        {
            "permission_key": "trade.view_all_recommendations",
            "category": "Functional",
            "display_name": "View All Recommendations",
            "description": "View all analysts' recommendations"
        },
        
        # ===========================================
        # APPROVAL & WORKFLOW PERMISSIONS
        # ===========================================
        {
            "permission_key": "trade.approve_recommendations",
            "category": "Business",
            "display_name": "Approve Recommendations",
            "description": "Approve or reject trade recommendations"
        },
        {
            "permission_key": "trade.create_tickets", 
            "category": "Business",
            "display_name": "Create Trade Tickets",
            "description": "Create trade tickets from approved recommendations"
        },
        {
            "permission_key": "trade.submit_to_crd",
            "category": "Business",
            "display_name": "Submit to CRD", 
            "description": "Submit trade tickets to CRD system"
        },
        
        # ===========================================
        # FILE MANAGEMENT PERMISSIONS
        # ===========================================
        {
            "permission_key": "file.upload",
            "category": "Functional",
            "display_name": "Upload Files",
            "description": "Upload file attachments to recommendations"
        },
        {
            "permission_key": "file.download", 
            "category": "Functional",
            "display_name": "Download Files",
            "description": "Download file attachments"
        },
        {
            "permission_key": "file.delete",
            "category": "Functional",
            "display_name": "Delete Files",
            "description": "Delete file attachments"
        },
        
        # ===========================================
        # MARKET DATA PERMISSIONS
        # ===========================================
        {
            "permission_key": "market.view_prices",
            "category": "Functional", 
            "display_name": "View Prices",
            "description": "Access current and historical price data"
        },
        {
            "permission_key": "market.refresh_prices",
            "category": "Functional",
            "display_name": "Refresh Prices", 
            "description": "Trigger price data refresh"
        },
        
        # ===========================================
        # ADMINISTRATIVE PERMISSIONS
        # ===========================================
        {
            "permission_key": "admin.user_management",
            "category": "Admin",
            "display_name": "User Management",
            "description": "Create, modify, deactivate users"
        },
        {
            "permission_key": "admin.system_config",
            "category": "Admin", 
            "display_name": "System Configuration",
            "description": "Configure strategies, securities, settings"
        },
        {
            "permission_key": "admin.view_audit_logs",
            "category": "Admin",
            "display_name": "View Audit Logs",
            "description": "Access system audit logs and metrics"
        },
        {
            "permission_key": "admin.impersonate_users",
            "category": "Admin",
            "display_name": "User Impersonation", 
            "description": "Switch user context for testing"
        }
    ]
    
    for perm_data in permissions_data:
        # Check if permission already exists
        existing = session.query(Permission).filter(
            Permission.permission_key == perm_data["permission_key"]
        ).first()
        
        if not existing:
            permission = Permission(**perm_data)
            session.add(permission)
            session.flush()

def _assign_role_permissions(session):
    """Assign permissions to roles based on BRD requirements"""
    
    # Get all roles
    analyst_role = session.query(Role).filter(Role.name == "Analyst").first()
    pm_role = session.query(Role).filter(Role.name == "Portfolio_Manager").first()
    admin_role = session.query(Role).filter(Role.name == "Administrator").first()
    
    # ===========================================
    # ANALYST PERMISSIONS
    # ===========================================
    analyst_permissions = [
        "ui.analyst_portal",              # Portal access
        "trade.create_recommendation",    # Create recommendations
        "trade.edit_own_drafts",         # Edit own drafts
        "trade.delete_own_drafts",       # Delete own drafts  
        "trade.view_own_history",        # View own history
        "file.upload",                   # Upload files
        "file.download",                 # Download files
        "market.view_prices",            # View prices
        "market.refresh_prices"          # Refresh prices
    ]
    
    # ===========================================
    # PORTFOLIO MANAGER PERMISSIONS
    # ===========================================
    pm_permissions = [
        "ui.pm_portal",                   # PM portal access
        "trade.view_all_recommendations", # View all recommendations
        "trade.approve_recommendations",  # Approve/reject recommendations
        "trade.create_tickets",          # Create trade tickets
        "trade.submit_to_crd",           # Submit to CRD
        "file.download",                 # Download files
        "market.view_prices"             # View prices
    ]
    
    # Assign analyst permissions
    _assign_permissions_to_role(session, analyst_role, analyst_permissions)
    
    # Assign PM permissions
    _assign_permissions_to_role(session, pm_role, pm_permissions)
    
    # Assign ALL permissions to administrator
    all_permissions = session.query(Permission).all()
    admin_permission_keys = [p.permission_key for p in all_permissions]
    _assign_permissions_to_role(session, admin_role, admin_permission_keys)

def _assign_permissions_to_role(session, role, permission_keys):
    """Helper function to assign multiple permissions to a role"""
    for perm_key in permission_keys:
        permission = session.query(Permission).filter(
            Permission.permission_key == perm_key
        ).first()
        
        if permission:
            # Check if assignment already exists
            existing = session.query(RolePermission).filter(
                RolePermission.role_id == role.id,
                RolePermission.permission_id == permission.id
            ).first()
            
            if not existing:
                role_perm = RolePermission(
                    role_id=role.id,
                    permission_id=permission.id,
                    is_granted=True
                )
                session.add(role_perm)