# OrbiMed Analyst Trade Portal - Client Structure

## React + TypeScript + PrimeReact Frontend

```
client/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/                         # Business Logic Components
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx              # Main layout with PrimeReact Menubar/Sidebar
│   │   │   ├── Header.tsx                 # Top navigation with user info, logout
│   │   │   ├── RoleBasedSidebar.tsx       # Navigation menu based on user role
│   │   │   └── Breadcrumb.tsx             # Navigation breadcrumb trail
│   │   │
│   │   ├── recommendations/
│   │   │   ├── RecommendationDataTable.tsx    # PrimeReact DataTable for viewing recs
│   │   │   ├── RecommendationForm.tsx         # Multi-row grid form with PrimeReact
│   │   │   ├── RecommendationDetails.tsx      # Detailed view/edit of single rec
│   │   │   ├── BulkActionsToolbar.tsx         # Bulk approve/reject/submit actions
│   │   │   ├── RecommendationStatusBadge.tsx  # Status indicators with colors
│   │   │   ├── RecommendationFilters.tsx      # Advanced filtering panel
│   │   │   └── RecommendationExport.tsx       # CSV/Excel export functionality
│   │   │
│   │   ├── trade-tickets/
│   │   │   ├── TradeTicketDataTable.tsx       # PrimeReact DataTable for tickets
│   │   │   ├── TradeTicketForm.tsx            # Create/edit trade ticket form
│   │   │   ├── TicketApprovalPanel.tsx        # PM approval interface
│   │   │   ├── CRDStatusPanel.tsx             # Real-time CRD order status
│   │   │   ├── TicketAllocation.tsx           # Fund allocation management
│   │   │   └── TicketHistory.tsx              # Status change timeline
│   │   │
│   │   ├── securities/
│   │   │   ├── SecuritySearch.tsx             # PrimeReact AutoComplete with caching
│   │   │   ├── SecurityDialog.tsx             # Security details popup
│   │   │   ├── TempSecurityAlert.tsx          # Alert for temporary securities
│   │   │   └── SecurityValidation.tsx         # Ticker validation component
│   │   │
│   │   ├── files/
│   │   │   ├── FileUpload.tsx                 # PrimeReact FileUpload component
│   │   │   ├── FileList.tsx                   # Display uploaded files
│   │   │   ├── FileViewer.tsx                 # Preview files (PDF, Excel, etc.)
│   │   │   └── FileDownload.tsx               # File download functionality
│   │   │
│   │   ├── users/
│   │   │   ├── UserManagement.tsx             # Admin user management table
│   │   │   ├── UserDialog.tsx                 # Create/edit user dialog
│   │   │   ├── PermissionMatrix.tsx           # User permissions grid
│   │   │   └── RoleAssignment.tsx             # Role and trader designation
│   │   │
│   │   ├── common/
│   │   │   ├── LoadingOverlay.tsx             # Global loading indicator
│   │   │   ├── ErrorPanel.tsx                 # PrimeReact Messages for errors
│   │   │   ├── ConfirmationDialog.tsx         # PrimeReact ConfirmDialog wrapper
│   │   │   ├── PermissionGate.tsx             # Component-level permission checking
│   │   │   ├── StatusToast.tsx                # Toast notifications wrapper
│   │   │   └── EmptyState.tsx                 # Empty state placeholders
│   │   │
│   │   ├── charts/
│   │   │   ├── RecommendationStats.tsx        # Dashboard recommendation metrics
│   │   │   ├── StatusTimeline.tsx             # Trade lifecycle timeline
│   │   │   ├── PerformanceChart.tsx           # Analyst performance charts
│   │   │   └── VolumeChart.tsx                # Trade volume charts
│   │   │
│   │   └── forms/
│   │       ├── FormWrapper.tsx                # Common form wrapper with validation
│   │       ├── CurrencyInput.tsx              # Price input with formatting
│   │       ├── MultiSelect.tsx                # Strategy/fund multi-selection
│   │       └── DateInput.tsx                  # Date picker for time horizons
│   │
│   ├── pages/                                 # Page Components
│   │   ├── analyst/
│   │   │   ├── AnalystDashboard.tsx          # Main analyst landing page
│   │   │   ├── CreateRecommendation.tsx      # New recommendation form page
│   │   │   ├── RecommendationHistory.tsx     # Historical recommendations view
│   │   │   └── AnalystProfile.tsx            # Analyst settings and preferences
│   │   │
│   │   ├── pm/
│   │   │   ├── PMDashboard.tsx               # Portfolio manager dashboard
│   │   │   ├── ReviewRecommendations.tsx     # Pending approvals interface
│   │   │   ├── ManageTradeTickets.tsx        # Trade ticket management
│   │   │   └── TeamOverview.tsx              # Team performance overview
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx            # System administration dashboard
│   │   │   ├── UserManagement.tsx            # User and role management
│   │   │   ├── SystemConfig.tsx              # System configuration settings
│   │   │   ├── AuditLogs.tsx                 # System audit log viewer
│   │   │   └── PermissionManagement.tsx      # Permission override management
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.tsx                     # Okta login interface
│   │   │   ├── Callback.tsx                  # OAuth callback handler
│   │   │   ├── Logout.tsx                    # Logout confirmation
│   │   │   └── Unauthorized.tsx              # Access denied page
│   │   │
│   │   ├── shared/
│   │   │   ├── Dashboard.tsx                 # Common dashboard layout
│   │   │   ├── Reports.tsx                   # Reporting interface
│   │   │   └── Help.tsx                      # Help and documentation
│   │   │
│   │   └── NotFound.tsx                      # 404 error page
│   │
│   ├── services/                             # API & External Services
│   │   ├── api/
│   │   │   ├── client.ts                     # Axios client with interceptors
│   │   │   ├── recommendations.ts            # Recommendation CRUD operations
│   │   │   ├── tradeTickets.ts               # Trade ticket operations
│   │   │   ├── securities.ts                 # Security search and management
│   │   │   ├── users.ts                      # User management operations
│   │   │   ├── auth.ts                       # Authentication endpoints
│   │   │   ├── strategies.ts                 # Strategy management
│   │   │   ├── funds.ts                      # Fund management
│   │   │   ├── files.ts                      # File upload/download
│   │   │   └── dashboard.ts                  # Dashboard data endpoints
│   │   │
│   │   ├── auth/
│   │   │   ├── oktaClient.ts                 # Okta authentication client
│   │   │   ├── authGuard.ts                  # Route protection guard
│   │   │   ├── tokenManager.ts               # JWT token management
│   │   │   └── permissionChecker.ts          # Permission validation utilities
│   │   │
│   │   ├── websocket/
│   │   │   ├── statusUpdates.ts              # Real-time status updates
│   │   │   ├── notifications.ts              # Real-time notifications
│   │   │   └── connectionManager.ts          # WebSocket connection management
│   │   │
│   │   └── cache/
│   │       ├── securityCache.ts              # Redis security caching
│   │       ├── priceCache.ts                 # Price data caching
│   │       └── queryCache.ts                 # API response caching
│   │
│   ├── hooks/                                # Custom React Hooks
│   │   ├── auth/
│   │   │   ├── useAuth.ts                    # Authentication state management
│   │   │   ├── usePermissions.ts             # Permission checking hook
│   │   │   └── useRole.ts                    # User role utilities
│   │   │
│   │   ├── data/
│   │   │   ├── useRecommendations.ts         # Recommendation data management
│   │   │   ├── useTradeTickets.ts            # Trade ticket data management
│   │   │   ├── useSecurities.ts              # Security search and caching
│   │   │   ├── useUsers.ts                   # User management
│   │   │   └── useDashboard.ts               # Dashboard data
│   │   │
│   │   ├── ui/
│   │   │   ├── usePrimeReactTable.ts         # DataTable configuration hook
│   │   │   ├── useToast.ts                   # PrimeReact Toast management
│   │   │   ├── useModal.ts                   # Modal/dialog management
│   │   │   ├── useForm.ts                    # Form state management
│   │   │   └── useTheme.ts                   # Theme switching
│   │   │
│   │   └── utils/
│   │       ├── useDebounce.ts                # Debounced input handling
│   │       ├── useLocalStorage.ts            # Local storage management
│   │       ├── useWebSocket.ts               # WebSocket connection hook
│   │       └── useErrorHandler.ts            # Global error handling
│   │
│   ├── store/                                # Redux Toolkit State Management
│   │   ├── slices/
│   │   │   ├── authSlice.ts                  # Authentication state
│   │   │   ├── recommendationsSlice.ts       # Recommendations state
│   │   │   ├── tradeTicketsSlice.ts          # Trade tickets state
│   │   │   ├── securitiesSlice.ts            # Securities cache state
│   │   │   ├── uiSlice.ts                    # UI state (modals, loading, etc.)
│   │   │   ├── usersSlice.ts                 # User management state
│   │   │   └── notificationsSlice.ts         # Notification state
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts             # Authentication middleware
│   │   │   ├── errorMiddleware.ts            # Error handling middleware
│   │   │   └── auditMiddleware.ts            # User action audit middleware
│   │   │
│   │   ├── selectors/
│   │   │   ├── authSelectors.ts              # Authentication selectors
│   │   │   ├── recommendationSelectors.ts    # Recommendation data selectors
│   │   │   └── permissionSelectors.ts        # Permission checking selectors
│   │   │
│   │   └── store.ts                          # Redux store configuration
│   │
│   ├── types/                                # TypeScript Definitions
│   │   ├── api/
│   │   │   ├── auth.ts                       # Authentication types
│   │   │   ├── recommendations.ts            # Recommendation API types
│   │   │   ├── tradeTickets.ts               # Trade ticket API types
│   │   │   ├── securities.ts                 # Security API types
│   │   │   ├── users.ts                      # User management types
│   │   │   └── common.ts                     # Common API types
│   │   │
│   │   ├── ui/
│   │   │   ├── primeReact.ts                 # PrimeReact type extensions
│   │   │   ├── forms.ts                      # Form-related types
│   │   │   └── tables.ts                     # DataTable configuration types
│   │   │
│   │   ├── business/
│   │   │   ├── workflow.ts                   # Business workflow types
│   │   │   ├── permissions.ts                # Permission system types
│   │   │   └── audit.ts                      # Audit trail types
│   │   │
│   │   └── index.ts                          # Type exports
│   │
│   ├── utils/                                # Utility Functions
│   │   ├── formatters/
│   │   │   ├── currency.ts                   # Price and currency formatting
│   │   │   ├── date.ts                       # Date formatting utilities
│   │   │   ├── status.ts                     # Status display formatting
│   │   │   └── export.ts                     # Data export formatting
│   │   │
│   │   ├── validators/
│   │   │   ├── forms.ts                      # Form validation rules
│   │   │   ├── business.ts                   # Business rule validation
│   │   │   ├── security.ts                   # Security-related validation
│   │   │   └── files.ts                      # File validation utilities
│   │   │
│   │   ├── permissions/
│   │   │   ├── checker.ts                    # Permission checking utilities
│   │   │   ├── roles.ts                      # Role-based utilities
│   │   │   └── constants.ts                  # Permission constants
│   │   │
│   │   ├── constants/
│   │   │   ├── api.ts                        # API endpoint constants
│   │   │   ├── business.ts                   # Business rule constants
│   │   │   ├── ui.ts                         # UI-related constants
│   │   │   └── routes.ts                     # Route constants
│   │   │
│   │   └── helpers/
│   │       ├── primeReactHelpers.ts          # PrimeReact utility functions
│   │       ├── dataTransform.ts              # Data transformation utilities
│   │       ├── errorHandler.ts               # Error handling utilities
│   │       └── localStorage.ts               # Local storage utilities
│   │
│   ├── theme/                                # PrimeReact Theming
│   │   ├── custom-theme.css                  # Custom PrimeReact theme
│   │   ├── orbimed-variables.css             # OrbiMed brand colors and variables
│   │   ├── overrides.css                     # Component-specific style overrides
│   │   ├── layout.css                        # Layout-specific styles
│   │   └── responsive.css                    # Mobile responsive styles
│   │
│   ├── assets/                               # Static Assets
│   │   ├── images/
│   │   │   ├── logo.svg                      # OrbiMed logo
│   │   │   ├── icons/                        # Custom icons
│   │   │   └── placeholders/                 # Placeholder images
│   │   │
│   │   └── fonts/                            # Custom fonts (if needed)
│   │
│   ├── config/                               # Configuration
│   │   ├── environment.ts                    # Environment-specific config
│   │   ├── routes.ts                         # Route configuration
│   │   ├── permissions.ts                    # Permission configuration
│   │   └── primeReact.ts                     # PrimeReact global configuration
│   │
│   ├── App.tsx                               # Main React application component
│   ├── index.tsx                             # React DOM entry point
│   ├── App.css                               # Global application styles
│   └── vite-env.d.ts                         # Vite environment types
│
├── package.json                              # Dependencies and scripts
├── tsconfig.json                             # TypeScript configuration
├── vite.config.ts                            # Vite build configuration
├── postcss.config.js                         # PostCSS configuration for PrimeReact
├── tailwind.config.js                        # Tailwind CSS configuration (if used)
├── .env.example                              # Environment variables template
├── .eslintrc.js                              # ESLint configuration
├── .prettierrc                               # Prettier code formatting
└── README.md                                 # Client setup documentation
```

## Key PrimeReact Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "typescript": "^5.0.0",
    
    "primereact": "^10.0.0",
    "primeicons": "^6.0.0",
    "primeflex": "^3.3.1",
    
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    
    "@okta/okta-auth-js": "^7.0.0",
    "@okta/okta-react": "^6.7.0",
    
    "axios": "^1.5.0",
    "socket.io-client": "^4.7.0",
    
    "react-hook-form": "^7.45.0",
    "yup": "^1.3.0",
    
    "date-fns": "^2.30.0",
    "numeral": "^2.0.6"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/numeral": "^2.0.2",
    
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    
    "eslint": "^8.45.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "prettier": "^3.0.0",
    
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```