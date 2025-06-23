-- =============================================
-- OrbiMed Analyst Trade Portal Database Schema
-- =============================================

-- =============================================
-- 1. USER MANAGEMENT & PERMISSIONS
-- =============================================

-- Roles table (3 roles: Analyst, Portfolio_Manager, Administrator)
CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) UNIQUE NOT NULL,
    description NVARCHAR(255) NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Users table with trader designation
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    okta_id NVARCHAR(255) UNIQUE NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    user_designation NVARCHAR(50) NULL, -- 'TRADER', 'OPERATIONS', NULL
    can_act_as_pm BIT DEFAULT 0, -- True if user can perform PM functions
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    created_by INT NULL,
    last_login_at DATETIME2 NULL,
    failed_login_attempts INT DEFAULT 0,
    account_locked_until DATETIME2 NULL,
    permission_override_count INT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Permissions table - all system capabilities
CREATE TABLE permissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    permission_key NVARCHAR(100) UNIQUE NOT NULL,
    category NVARCHAR(50) NOT NULL, -- UI, Functional, Business, Admin
    display_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(255) NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Role-based permission assignments
CREATE TABLE role_permissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    is_granted BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id),
    UNIQUE(role_id, permission_id)
);

-- Direct user permission assignments (overrides role permissions)
CREATE TABLE user_permissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    is_granted BIT NOT NULL,
    is_forced BIT DEFAULT 0, -- True = cannot be overridden
    reason NVARCHAR(255) NULL,
    granted_by INT NOT NULL,
    granted_at DATETIME2 DEFAULT GETDATE(),
    expires_at DATETIME2 NULL,
    is_active BIT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id),
    FOREIGN KEY (granted_by) REFERENCES users(id),
    UNIQUE(user_id, permission_id)
);

-- =============================================
-- 2. REFERENCE DATA
-- =============================================

-- Unified securities table (handles both IVP and temporary securities)
CREATE TABLE securities (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticker NVARCHAR(20) UNIQUE NOT NULL,
    name NVARCHAR(255) NULL, -- Nullable since temp securities may not have name initially
    source_type NVARCHAR(20) NOT NULL DEFAULT 'TEMPORARY', -- IVP, TEMPORARY, MANUAL
    ivp_security_id NVARCHAR(50) NULL, -- IVP system identifier (if from IVP)
    is_active BIT DEFAULT 1,
    is_resolved BIT DEFAULT 0, -- If temp security was resolved to IVP
    resolved_at DATETIME2 NULL, -- When temp security was resolved
    resolved_by INT NULL, -- User who resolved temp security
    resolved_to_ivp_id NVARCHAR(50) NULL, -- IVP ID it was resolved to
    notes TEXT NULL, -- Additional notes for temp securities
    research_notes TEXT NULL, -- Research about temp ticker
    priority_level NVARCHAR(20) DEFAULT 'NORMAL', -- HIGH, NORMAL, LOW (for temps)
    created_by INT NULL, -- User who created (for temps/manual)
    created_at DATETIME2 DEFAULT GETDATE(),
    last_updated DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (resolved_by) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    CHECK (source_type IN ('IVP', 'TEMPORARY', 'MANUAL')),
    CHECK (priority_level IN ('HIGH', 'NORMAL', 'LOW'))
);

-- Strategies table
CREATE TABLE strategies (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    description TEXT NULL,
    is_active BIT DEFAULT 1,
    is_system_default BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    created_by INT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Funds table
CREATE TABLE funds (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(10) UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- =============================================
-- 3. CORE BUSINESS TABLES
-- =============================================

-- Trade recommendations
CREATE TABLE trade_recommendations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    analyst_id INT NOT NULL,
    security_id INT NOT NULL,
    trade_direction NVARCHAR(20) NOT NULL,
    current_price DECIMAL(18,4) NULL,
    target_price DECIMAL(18,4) NOT NULL,
    time_horizon NVARCHAR(50) NOT NULL,
    expected_exit_date DATE NULL,
    analyst_score INT NOT NULL,
    notes TEXT NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'Draft',
    approved_by INT NULL,
    approved_at DATETIME2 NULL,
    approval_notes TEXT NULL,
    is_draft BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (analyst_id) REFERENCES users(id),
    FOREIGN KEY (security_id) REFERENCES securities(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    CHECK (trade_direction IN ('Buy', 'Sell', 'Sell Short', 'Cover Short')),
    CHECK (analyst_score BETWEEN 1 AND 10),
    CHECK (time_horizon IN ('Trade', 'Short Term', 'Long Term', 'Custom Date')),
    CHECK (status IN ('Draft', 'Proposed', 'Approved', 'Rejected'))
);

-- Trade tickets
CREATE TABLE trade_tickets (
    id INT IDENTITY(1,1) PRIMARY KEY,
    recommendation_id INT NULL,
    created_by INT NOT NULL,
    security_id INT NOT NULL,
    fund_id INT NOT NULL,
    trade_direction NVARCHAR(20) NOT NULL,
    target_price DECIMAL(18,4) NOT NULL,
    current_position DECIMAL(18,4) DEFAULT 0,
    benchmark_position DECIMAL(18,4) DEFAULT 0,
    new_position DECIMAL(18,4) NOT NULL,
    allocation_percentage DECIMAL(5,2) NULL,
    strategies_for_crd NVARCHAR(500) NULL, -- Comma-delimited strategies for CRD submission
    timing_notes TEXT NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'Draft',
    account_code NVARCHAR(50) NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    submitted_to_crd_at DATETIME2 NULL,
    FOREIGN KEY (recommendation_id) REFERENCES trade_recommendations(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (security_id) REFERENCES securities(id),
    FOREIGN KEY (fund_id) REFERENCES funds(id),
    CHECK (trade_direction IN ('Buy', 'Sell', 'Sell Short', 'Cover Short')),
    CHECK (status IN ('Draft', 'Submitted_to_CRD', 'Booked', 'Working', 'Partially_Filled', 'Filled', 'Cancelled', 'CRD_Error')),
    CHECK (allocation_percentage IS NULL OR allocation_percentage BETWEEN 0 AND 100)
);

-- =============================================
-- 4. JUNCTION TABLES
-- =============================================

-- Recommendation to strategies mapping
CREATE TABLE recommendation_strategies (
    id INT IDENTITY(1,1) PRIMARY KEY,
    recommendation_id INT NOT NULL,
    strategy_id INT NULL,
    custom_strategy_text NVARCHAR(255) NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (recommendation_id) REFERENCES trade_recommendations(id) ON DELETE CASCADE,
    FOREIGN KEY (strategy_id) REFERENCES strategies(id)
);

-- Recommendation to funds mapping
CREATE TABLE recommendation_funds (
    id INT IDENTITY(1,1) PRIMARY KEY,
    recommendation_id INT NOT NULL,
    fund_id INT NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (recommendation_id) REFERENCES trade_recommendations(id) ON DELETE CASCADE,
    FOREIGN KEY (fund_id) REFERENCES funds(id)
);

-- =============================================
-- 5. SUPPORTING TABLES
-- =============================================

-- File attachments
CREATE TABLE file_attachments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    recommendation_id INT NOT NULL,
    filename NVARCHAR(255) NOT NULL,
    file_path NVARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    content_type NVARCHAR(100) NOT NULL,
    uploaded_by INT NOT NULL,
    uploaded_at DATETIME2 DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (recommendation_id) REFERENCES trade_recommendations(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- =============================================
-- 6. AUDIT & HISTORY TABLES
-- =============================================

-- Main audit trail
CREATE TABLE audit_trail (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    table_name NVARCHAR(100) NOT NULL,
    record_id INT NOT NULL,
    action_type NVARCHAR(20) NOT NULL,
    field_name NVARCHAR(100) NULL,
    old_value NVARCHAR(MAX) NULL,
    new_value NVARCHAR(MAX) NULL,
    changed_by INT NOT NULL,
    changed_at DATETIME2 DEFAULT GETDATE(),
    session_id NVARCHAR(100) NULL,
    ip_address NVARCHAR(45) NULL,
    user_agent NVARCHAR(500) NULL,
    FOREIGN KEY (changed_by) REFERENCES users(id),
    CHECK (action_type IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- Recommendation status history
CREATE TABLE recommendation_status_history (
    id INT IDENTITY(1,1) PRIMARY KEY,
    recommendation_id INT NOT NULL,
    old_status NVARCHAR(50) NULL,
    new_status NVARCHAR(50) NOT NULL,
    changed_by INT NOT NULL,
    notes TEXT NULL,
    changed_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (recommendation_id) REFERENCES trade_recommendations(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- Trade ticket status history
CREATE TABLE trade_ticket_status_history (
    id INT IDENTITY(1,1) PRIMARY KEY,
    trade_ticket_id INT NOT NULL,
    old_status NVARCHAR(50) NULL,
    new_status NVARCHAR(50) NOT NULL,
    changed_by INT NOT NULL,
    notes TEXT NULL,
    changed_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (trade_ticket_id) REFERENCES trade_tickets(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- =============================================
-- 7. INDEXES FOR PERFORMANCE
-- =============================================

-- User management indexes
CREATE INDEX IX_users_okta_id ON users(okta_id);
CREATE INDEX IX_users_email ON users(email);
CREATE INDEX IX_users_role_active ON users(role_id, is_active);
CREATE INDEX IX_users_designation ON users(user_designation) WHERE user_designation IS NOT NULL;

-- Permission resolution indexes
CREATE INDEX IX_role_permissions_lookup ON role_permissions(role_id, permission_id);
CREATE INDEX IX_user_permissions_lookup ON user_permissions(user_id, permission_id, is_active);
CREATE INDEX IX_user_permissions_expiry ON user_permissions(expires_at) WHERE expires_at IS NOT NULL;

-- Securities indexes
CREATE INDEX IX_securities_ticker ON securities(ticker);
CREATE INDEX IX_securities_source_type ON securities(source_type);
CREATE INDEX IX_securities_ivp_id ON securities(ivp_security_id) WHERE ivp_security_id IS NOT NULL;
CREATE INDEX IX_securities_temporary_unresolved ON securities(source_type, is_resolved, created_at) WHERE source_type = 'TEMPORARY';
CREATE INDEX IX_securities_resolved ON securities(is_resolved, resolved_at) WHERE is_resolved = 1;

-- Core business indexes
CREATE INDEX IX_trade_recommendations_analyst_status ON trade_recommendations(analyst_id, status, created_at);
CREATE INDEX IX_trade_recommendations_security ON trade_recommendations(security_id);
CREATE INDEX IX_trade_recommendations_status_date ON trade_recommendations(status, created_at);
CREATE INDEX IX_trade_recommendations_approval ON trade_recommendations(approved_by, approved_at);

CREATE INDEX IX_trade_tickets_recommendation ON trade_tickets(recommendation_id);
CREATE INDEX IX_trade_tickets_creator_status ON trade_tickets(created_by, status);
CREATE INDEX IX_trade_tickets_status_date ON trade_tickets(status, created_at);
CREATE INDEX IX_trade_tickets_fund ON trade_tickets(fund_id);

-- Junction table indexes
CREATE INDEX IX_recommendation_strategies_rec ON recommendation_strategies(recommendation_id);
CREATE INDEX IX_recommendation_strategies_strategy ON recommendation_strategies(strategy_id);
CREATE INDEX IX_recommendation_funds_rec ON recommendation_funds(recommendation_id);
CREATE INDEX IX_recommendation_funds_fund ON recommendation_funds(fund_id);

-- Audit indexes
CREATE INDEX IX_audit_trail_table_record ON audit_trail(table_name, record_id, changed_at);
CREATE INDEX IX_audit_trail_user_date ON audit_trail(changed_by, changed_at);

-- File attachments indexes
CREATE INDEX IX_file_attachments_recommendation ON file_attachments(recommendation_id, is_deleted);

-- =============================================
-- 8. INITIAL DATA SETUP
-- =============================================

-- Insert roles (3 roles only)
INSERT INTO roles (name, description) VALUES
('Analyst', 'Financial analysts who submit trade recommendations'),
('Portfolio_Manager', 'Portfolio managers who approve trades and manage portfolios'),
('Administrator', 'System administrators with full access');

-- Insert core permissions
INSERT INTO permissions (permission_key, category, display_name, description) VALUES
-- UI Access Permissions
('ui.analyst_portal', 'UI', 'Analyst Portal Access', 'Access to analyst trade submission interface'),
('ui.pm_portal', 'UI', 'PM Portal Access', 'Access to portfolio manager approval interface'),
('ui.admin_portal', 'UI', 'Admin Portal Access', 'Access to system administration interface'),

-- Trade Recommendation Permissions
('trade.create_recommendation', 'Functional', 'Create Trade Recommendations', 'Submit new trade recommendations'),
('trade.edit_own_drafts', 'Functional', 'Edit Own Drafts', 'Modify own draft recommendations'),
('trade.delete_own_drafts', 'Functional', 'Delete Own Drafts', 'Delete own draft recommendations'),
('trade.view_own_history', 'Functional', 'View Own History', 'View own recommendation history'),
('trade.view_all_recommendations', 'Functional', 'View All Recommendations', 'View all analysts recommendations'),

-- Approval Permissions
('trade.approve_recommendations', 'Business', 'Approve Recommendations', 'Approve or reject trade recommendations'),
('trade.create_tickets', 'Business', 'Create Trade Tickets', 'Create trade tickets from approved recommendations'),
('trade.submit_to_crd', 'Business', 'Submit to CRD', 'Submit trade tickets to CRD system'),

-- File Management
('file.upload', 'Functional', 'Upload Files', 'Upload file attachments to recommendations'),
('file.download', 'Functional', 'Download Files', 'Download file attachments'),
('file.delete', 'Functional', 'Delete Files', 'Delete file attachments'),

-- Market Data
('market.view_prices', 'Functional', 'View Prices', 'Access current and historical price data'),
('market.refresh_prices', 'Functional', 'Refresh Prices', 'Trigger price data refresh'),

-- Administrative
('admin.user_management', 'Admin', 'User Management', 'Create, modify, deactivate users'),
('admin.system_config', 'Admin', 'System Configuration', 'Configure strategies, securities, settings'),
('admin.view_audit_logs', 'Admin', 'View Audit Logs', 'Access system audit logs and metrics'),
('admin.impersonate_users', 'Admin', 'User Impersonation', 'Switch user context for testing');

-- Insert default role permissions
-- Analyst Role Permissions
INSERT INTO role_permissions (role_id, permission_id, is_granted) 
SELECT r.id, p.id, 1
FROM roles r, permissions p 
WHERE r.name = 'Analyst' 
AND p.permission_key IN (
    'ui.analyst_portal',
    'trade.create_recommendation',
    'trade.edit_own_drafts', 
    'trade.delete_own_drafts',
    'trade.view_own_history',
    'file.upload',
    'file.download',
    'market.view_prices',
    'market.refresh_prices'
);

-- Portfolio Manager Role Permissions  
INSERT INTO role_permissions (role_id, permission_id, is_granted)
SELECT r.id, p.id, 1  
FROM roles r, permissions p
WHERE r.name = 'Portfolio_Manager'
AND p.permission_key IN (
    'ui.pm_portal',
    'trade.view_all_recommendations',
    'trade.approve_recommendations', 
    'trade.create_tickets',
    'trade.submit_to_crd',
    'file.download',
    'market.view_prices'
);

-- Administrator Role (All permissions)
INSERT INTO role_permissions (role_id, permission_id, is_granted)
SELECT r.id, p.id, 1
FROM roles r, permissions p
WHERE r.name = 'Administrator';

-- Insert default funds
INSERT INTO funds (code, name) VALUES
('OPM', 'OrbiMed Private Investments'),
('GEN', 'OrbiMed Genesis Fund'),
('WWH', 'OrbiMed Worldwide Health Fund'),
('BIOG', 'OrbiMed Biotech Opportunities Fund');

-- Insert default strategies
INSERT INTO strategies (name, description, is_system_default) VALUES
('M&A Speculation', 'Merger and acquisition opportunities', 1),
('Valuation', 'Valuation-based investment decisions', 1),
('Macro', 'Macroeconomic driven trades', 1),
('Commercial Outlook', 'Commercial prospects analysis', 1),
('Political Trade', 'Political event-driven opportunities', 1),
('Drug/Product Launch', 'New product launch opportunities', 1),
('Technical Analysis', 'Technical chart-based analysis', 1),
('Earnings Beat/Miss', 'Earnings-driven trades', 1),
('Clinical Catalyst', 'Clinical trial catalysts', 1),
('Thematic Baskets', 'Thematic investment approach', 1),
('PM Rebalance', 'Portfolio rebalancing trades', 1),
('Other', 'Custom strategy (specify in notes)', 1);

-- =============================================
-- 9. STORED PROCEDURES & FUNCTIONS
-- =============================================

-- Function to check if user can perform PM actions
GO
CREATE FUNCTION dbo.CanUserActAsPM(@user_id INT)
RETURNS BIT
AS
BEGIN
    DECLARE @canAct BIT = 0;
    
    SELECT @canAct = 1
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = @user_id 
      AND u.is_active = 1
      AND (r.name = 'Portfolio_Manager' OR u.can_act_as_pm = 1);
    
    RETURN ISNULL(@canAct, 0);
END;
GO

-- Function to resolve effective permissions for a user
CREATE FUNCTION dbo.GetEffectiveUserPermissions(@user_id INT)
RETURNS @permissions TABLE (
    permission_key NVARCHAR(100),
    is_granted BIT,
    source NVARCHAR(20),
    is_forced BIT
)
AS
BEGIN
    -- Get role-based permissions
    INSERT INTO @permissions (permission_key, is_granted, source, is_forced)
    SELECT DISTINCT p.permission_key, rp.is_granted, 'ROLE', 0
    FROM users u
    JOIN roles r ON u.role_id = r.id  
    JOIN role_permissions rp ON r.id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE u.id = @user_id AND u.is_active = 1 AND r.is_active = 1 AND p.is_active = 1;
    
    -- Override with user-specific permissions
    UPDATE @permissions 
    SET is_granted = up.is_granted, 
        source = 'USER_OVERRIDE',
        is_forced = up.is_forced
    FROM @permissions perm
    JOIN permissions p ON perm.permission_key = p.permission_key
    JOIN user_permissions up ON p.id = up.permission_id  
    WHERE up.user_id = @user_id 
      AND up.is_active = 1 
      AND (up.expires_at IS NULL OR up.expires_at > GETDATE());
    
    -- Add user permissions that don't exist in role
    INSERT INTO @permissions (permission_key, is_granted, source, is_forced)
    SELECT p.permission_key, up.is_granted, 'USER_OVERRIDE', up.is_forced
    FROM user_permissions up
    JOIN permissions p ON up.permission_id = p.id
    WHERE up.user_id = @user_id 
      AND up.is_active = 1
      AND (up.expires_at IS NULL OR up.expires_at > GETDATE())
      AND p.permission_key NOT IN (SELECT permission_key FROM @permissions);
      
    RETURN;
END;
GO

-- Procedure to grant PM permissions to traders
CREATE PROCEDURE GrantTraderPMAccess
    @user_id INT,
    @granted_by INT,
    @reason NVARCHAR(255) = 'Trader designation - can act as PM'
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Update user designation
        UPDATE users 
        SET user_designation = 'TRADER', 
            can_act_as_pm = 1,
            updated_at = GETDATE()
        WHERE id = @user_id;
        
        -- Grant PM permissions directly to this user
        INSERT INTO user_permissions (user_id, permission_id, is_granted, is_forced, reason, granted_by)
        SELECT @user_id, p.id, 1, 0, @reason, @granted_by
        FROM permissions p 
        WHERE p.permission_key IN (
            'ui.pm_portal',
            'trade.view_all_recommendations',
            'trade.approve_recommendations', 
            'trade.create_tickets',
            'trade.submit_to_crd'
        )
        AND NOT EXISTS (
            SELECT 1 FROM user_permissions up 
            WHERE up.user_id = @user_id AND up.permission_id = p.id
        );
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO



-- =============================================
-- REDIS CACHE INTEGRATION NOTES
-- =============================================

/*
REDIS CACHE Possible STRUCTURE:
- Key: "security:{ticker}" or "security:{ivp_security_id}"
- Value: JSON object with full security details from IVP
  {https://bitbucket.org/omnivistasolutions/analyst-trade-portal/src/main/
    "ticker": "AAPL",
    "name": "Apple Inc",
    "sector": "Technology", 
    "exchange": "NASDAQ",
    "cusip": "037833100",
    "isin": "US0378331005",
    "bloomberg_ticker": "AAPL US",
    "lot_size": 1,
    "price_multiplier": 1.0,
    "currency_code": "USD",
    "last_updated": "2025-06-17T10:30:00Z"
  }
*/