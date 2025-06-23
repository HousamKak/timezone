server/
│
├── app/
│   ├── api/                                  # API Route Handlers
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                       # Authentication endpoints (Okta SSO)
│   │   │   ├── recommendations.py            # Trade recommendation CRUD
│   │   │   ├── trade_tickets.py              # Trade ticket management
│   │   │   ├── securities.py                 # Security search and management
│   │   │   ├── users.py                      # User management and permissions
│   │   │   ├── strategies.py                 # Strategy management
│   │   │   ├── funds.py                      # Fund management
│   │   │   ├── files.py                      # File upload/download endpoints
│   │   │   ├── dashboard.py                  # Dashboard data endpoints
│   │   │   ├── audit.py                      # Audit log endpoints
│   │   │   └── system.py                     # System configuration endpoints
│   │   │
│   │   ├── deps.py                           # API dependencies (auth, db, etc.)
│   │   └── __init__.py
│   │
│   ├── core/                                 # Core Configuration
│   │   ├── __init__.py
│   │   ├── config.py                         # Environment configuration
│   │   ├── security.py                       # JWT, password hashing, encryption
│   │   ├── database.py                       # Database connection and session
│   │   ├── redis.py                          # Redis connection and caching
│   │   ├── permissions.py                    # Permission system configuration
│   │   ├── logging.py                        # Logging configuration
│   │   └── exceptions.py                     # Custom exception handlers
│   │
│   ├── models/                               # SQLAlchemy Database Models
│   │   ├── __init__.py
│   │   ├── base.py                           # Base model with common fields
│   │   ├── users.py                          # User, Role, Permission models
│   │   ├── securities.py                     # Securities model (unified)
│   │   ├── recommendations.py                # Trade recommendation models
│   │   ├── trade_tickets.py                  # Trade ticket models
│   │   ├── strategies.py                     # Strategy models
│   │   ├── funds.py                          # Fund models
│   │   ├── files.py                          # File attachment models
│   │   ├── audit.py                          # Audit trail models
│   │   └── relationships.py                  # Model relationships and associations
│   │
│   ├── schemas/                              # Pydantic Request/Response Schemas
│   │   ├── __init__.py
│   │   ├── auth.py                           # Authentication schemas
│   │   ├── recommendations.py                # Recommendation request/response
│   │   ├── trade_tickets.py                  # Trade ticket schemas
│   │   ├── securities.py                     # Security search schemas
│   │   ├── users.py                          # User management schemas
│   │   ├── strategies.py                     # Strategy schemas
│   │   ├── funds.py                          # Fund schemas
│   │   ├── files.py                          # File upload schemas
│   │   ├── dashboard.py                      # Dashboard data schemas
│   │   ├── audit.py                          # Audit log schemas
│   │   └── common.py                         # Common/shared schemas
│   │
│   ├── services/                             # Business Logic Services
│   │   ├── __init__.py
│   │   ├── auth_service.py                   # Authentication and authorization
│   │   ├── recommendation_service.py         # Recommendation business logic
│   │   ├── trade_ticket_service.py           # Trade ticket workflow logic
│   │   ├── security_service.py               # Security search and caching
│   │   ├── permission_service.py             # Permission checking and overrides
│   │   ├── user_service.py                   # User management logic
│   │   ├── file_service.py                   # File handling and storage
│   │   ├── audit_service.py                  # Audit trail logging
│   │   ├── notification_service.py           # Real-time notifications
│   │   ├── workflow_service.py               # Business workflow orchestration
│   │   └── cache_service.py                  # Redis caching management
│   │
│   ├── integrations/                         # External System Integrations
│   │   ├── __init__.py
│   │   │
│   │   ├── okta/
│   │   │   ├── __init__.py
│   │   │   ├── client.py                     # Okta API client
│   │   │   ├── validators.py                 # Token validation
│   │   │   ├── user_sync.py                  # User data synchronization
│   │   │   └── exceptions.py                 # Okta-specific exceptions
│   │   │
│   │   ├── crd/
│   │   │   ├── __init__.py
│   │   │   ├── client.py                     # CRD API client
│   │   │   ├── models.py                     # CRD data models
│   │   │   ├── webhooks.py                   # CRD webhook handlers
│   │   │   ├── order_manager.py              # Order submission and tracking
│   │   │   ├── status_sync.py                # Real-time status synchronization
│   │   │   └── exceptions.py                 # CRD-specific exceptions
│   │   │
│   │   ├── ivp/
│   │   │   ├── __init__.py
│   │   │   ├── client.py                     # IVP API client
│   │   │   ├── sync.py                       # Securities data synchronization
│   │   │   ├── parser.py                     # IVP data parsing
│   │   │   └── exceptions.py                 # IVP-specific exceptions
│   │   │
│   │   └── bloomberg/
│   │       ├── __init__.py
│   │       ├── client.py                     # Bloomberg API client
│   │       ├── mock.py                       # Mock pricing for development
│   │       ├── price_feed.py                 # Real-time price streaming
│   │       └── exceptions.py                 # Bloomberg-specific exceptions
│   │
│   ├── middleware/                           # Custom Middleware
│   │   ├── __init__.py
│   │   ├── auth.py                           # JWT authentication middleware
│   │   ├── audit.py                          # Request/response audit logging
│   │   ├── error_handler.py                  # Global error handling
│   │   ├── cors.py                           # CORS configuration
│   │   ├── rate_limit.py                     # API rate limiting
│   │   └── request_id.py                     # Request ID tracking
│   │
│   ├── utils/                                # Utility Functions
│   │   ├── __init__.py
│   │   ├── validators.py                     # Data validation utilities
│   │   ├── formatters.py                     # Data formatting utilities
│   │   ├── constants.py                      # Application constants
│   │   ├── helpers.py                        # General helper functions
│   │   ├── date_utils.py                     # Date/time utilities
│   │   ├── file_utils.py                     # File handling utilities
│   │   ├── crypto_utils.py                   # Encryption/decryption utilities
│   │   └── db_utils.py                       # Database utility functions
│   │
│   ├── tasks/ 
│   │
│   ├── main.py                               # FastAPI application entry point
│   └── __init__.py
│
├── tests/                                    # Test Suite
│
├── scripts/
│   └── initial_data/                               # Manual Data Migrations
│       ├── __init__.py
│       ├── initial_roles.py                      # Initial role setup
│       ├── default_strategies.py                 # Default strategy data
│       └── default_funds.py                      # Default fund data
│
├── docs/                                     # API Documentation
│   ├── openapi_extra.py                      # Extended OpenAPI documentation
│   └── examples/
│       ├── request_examples.py               # API request examples
│       └── response_examples.py              # API response examples
│
├── requirements.txt                          # Production dependencies
├── requirements-dev.txt                      # Development dependencies
├── pyproject.toml                            # Python project configuration
├── .env.example                              # Environment variables template
├── .env.development                          # Development environment variables
├── Dockerfile                                # Docker configuration
├── docker-compose.yml                        # Multi-service Docker setup
├── gunicorn.conf.py                          # Gunicorn WSGI server config
├── pytest.ini                                # Pytest configuration
├── .flake8                                   # Code linting configuration
├── .pre-commit-config.yaml                   # Pre-commit hooks
└── README.md                                 # Server setup documentation
