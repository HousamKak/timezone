# ---------------------------------------------
# app/models/users.py - User, Role, Permission models
# ---------------------------------------------
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, Text, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
from sqlalchemy.sql import func

class Role(BaseModel):
    __tablename__ = "roles"
    
    name = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(String(255))
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    users = relationship("User", back_populates="role")
    role_permissions = relationship("RolePermission", back_populates="role")

class Permission(BaseModel):
    __tablename__ = "permissions"
    
    permission_key = Column(String(100), unique=True, nullable=False, index=True)
    category = Column(String(50), nullable=False)  # UI, Functional, Business, Admin
    display_name = Column(String(100), nullable=False)
    description = Column(String(255))
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    role_permissions = relationship("RolePermission", back_populates="permission")
    user_permissions = relationship("UserPermission", back_populates="permission")

class User(BaseModel):
    __tablename__ = "users"
    
    okta_id = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    user_designation = Column(String(50))  # TRADER, OPERATIONS, NULL
    can_act_as_pm = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    last_login_at = Column(DateTime)
    failed_login_attempts = Column(Integer, default=0, nullable=False)
    account_locked_until = Column(DateTime)
    permission_override_count = Column(Integer, default=0, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))
    
    # Relationships
    role = relationship("Role", back_populates="users")
    created_by_user = relationship("User",foreign_keys=[created_by], remote_side=lambda: [User.id], backref="created_users",           
    )
    user_permissions = relationship( "UserPermission", back_populates="user",
        foreign_keys=lambda: [UserPermission.user_id],   # <-- unambiguous
        cascade="all, delete-orphan"                    
    )

    # 2️⃣ permissions this user **granted** to others (handy to have)
    granted_permissions = relationship(
        "UserPermission",
        back_populates="granter",
        foreign_keys=lambda: [UserPermission.granted_by]
    )
    
    # Business relationships
    recommendations = relationship("TradeRecommendation", back_populates="analyst", foreign_keys="TradeRecommendation.analyst_id")
    approved_recommendations = relationship("TradeRecommendation", back_populates="approver", foreign_keys="TradeRecommendation.approved_by")
    trade_tickets = relationship("TradeTicket", back_populates="creator", foreign_keys="TradeTicket.created_by")
    uploaded_files = relationship("FileAttachment", back_populates="uploader")

class RolePermission(BaseModel):
    __tablename__ = "role_permissions"
    
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    permission_id = Column(Integer, ForeignKey("permissions.id"), nullable=False)
    is_granted = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    role = relationship("Role", back_populates="role_permissions")
    permission = relationship("Permission", back_populates="role_permissions")
    
    # Unique constraint
    __table_args__ = (
        {'schema': None},  # Ensure no schema conflicts
    )

class UserPermission(BaseModel):
    __tablename__ = "user_permissions"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    permission_id = Column(Integer, ForeignKey("permissions.id"), nullable=False)
    is_granted = Column(Boolean, nullable=False)
    is_forced = Column(Boolean, default=False, nullable=False)  # Cannot be overridden
    reason = Column(String(255))
    granted_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    granted_at = Column(DateTime, default=func.now(), nullable=False)
    expires_at = Column(DateTime)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Relationships
    user = relationship(
        "User",
        back_populates="user_permissions",
        foreign_keys=[user_id]
    )
    permission = relationship("Permission", back_populates="user_permissions")
    granter = relationship(
        "User",
        back_populates="granted_permissions",
        foreign_keys=[granted_by]
    )