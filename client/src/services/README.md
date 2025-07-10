# API Service Layer

This service layer provides a clean abstraction over our FastAPI backend, implementing consistent patterns for data fetching, caching, and state management. Built with React Query and OpenAPI-generated TypeScript clients for type safety and maintainability.

## Architecture

```
src/services/
├── api/                    # Service layer and HTTP clients
│   ├── config.ts          # API configuration
│   ├── generated-client.ts # OpenAPI client wrapper
│   ├── securities.ts      # Securities service (OpenAPI)
│   ├── strategies.ts      # Strategies service (OpenAPI)
│   ├── funds.ts           # Funds service (OpenAPI)
│   └── recommendations.ts # Recommendations service (OpenAPI)
├── queries/               # React Query hooks
│   ├── useSecurities.ts
│   ├── useStrategies.ts
│   ├── useFunds.ts
│   └── useRecommendations.ts
├── utils/                 # Shared utilities
└── examples/              # Usage examples
```

## Service Integration Status

- ✅ **Securities**: OpenAPI TypeScript client with full type safety
- ✅ **Strategies**: OpenAPI TypeScript client with full type safety  
- ✅ **Funds**: OpenAPI TypeScript client with full type safety
- ✅ **Recommendations**: OpenAPI TypeScript client with full type safety

## Usage

### Data Fetching
```typescript
import { useStrategies, useSecurities } from './services/queries';

// Type-safe data fetching with automatic caching
const { data: strategies, isLoading, error } = useStrategies();
const { data: securities } = useSecurities();
```

### Search Operations
```typescript
import { useSearchSecurities } from './services/queries';

const { data: searchResults } = useSearchSecurities('AAPL');
```

### Direct Service Calls
```typescript
import { SecurityService, StrategyService } from './services/api';

// For use outside React components
const securities = await SecurityService.getSecurities();
const strategy = await StrategyService.getStrategy(id);
```

## Type Safety

Services use OpenAPI-generated TypeScript interfaces that match the backend exactly:

```typescript
import { SecurityResponse, StrategyResponse } from '../generated/api/models';

// These types are automatically synchronized with the backend API
const security: SecurityResponse = await SecurityService.getSecurity(1);
```

## Caching Strategy

Optimized caching based on data volatility:

- **Strategies**: 10min (rarely change)
- **Securities**: 5min (moderate updates)  
- **Funds**: 10min (stable data)
- **Recommendations**: 1min (frequent updates)

## Error Handling

Centralized error handling with proper error types:

```typescript
import { ApiError } from './services/api';

try {
  const data = await SecurityService.getSecurities();
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

## Development Workflow

### Adding New Endpoints

1. **Update backend API** and restart server
2. **Regenerate client** when API changes:
   ```bash
   npx @openapitools/openapi-generator-cli generate \
     -i http://localhost:8000/openapi.json \
     -g typescript-axios \
     -o src/generated/api
   ```
3. **Create service wrapper** in `api/` directory
4. **Add React Query hooks** in `queries/` directory
5. **Export from index files**

### Testing Integration

```typescript
// Check if backend is running
curl http://localhost:8000/api/v1/strategies/

// Test in browser console
const { data } = await fetch('/api/v1/securities/').then(r => r.json());
```

## Performance Features

- Automatic background refetching
- Request deduplication
- Stale-while-revalidate caching
- Configurable retry logic
- Optimistic updates (where implemented)

## Configuration

API configuration is centralized in `api/config.ts`:

```typescript
export const apiConfig = new Configuration({
  basePath: 'http://localhost:8000',
  // Add auth headers when needed
});
```

## Migration Notes

The service layer is transitioning from manual fetch-based clients to OpenAPI-generated clients. This provides:

- Automatic type generation from backend schema
- Consistent error handling
- Better maintainability
- Reduced manual type definitions

Services marked "OpenAPI" use the new generated client, while others will be migrated incrementally.
  rejectRecommendation 
} = useRecommendationMutations();

// Direct API calls
const recommendation = await RecommendationService.createRecommendation(data);
```

## 📝 Next Steps

### **Phase 1: Integration Testing**
1. Test each endpoint with the running backend
2. Verify data mapping between frontend types and backend models
3. Test error handling scenarios

### **Phase 2: Component Integration**
1. **Trade Recommendations Page**: Replace mock data with real API calls
2. **Strategy Selection**: Use real strategy data
3. **Fund Management**: Integrate fund selection

### **Phase 3: Advanced Features**
1. **React Query Integration**: Add for better caching and synchronization
2. **Optimistic Updates**: For better UX in mutations
3. **Real-time Updates**: WebSocket integration for live data
4. **Pagination**: For large datasets

### **Phase 4: Performance Optimization**
1. **Data Caching**: Client-side caching strategy
2. **Error Boundaries**: Component-level error handling
3. **Loading States**: Advanced loading patterns

## 🔧 Usage Examples

### **Replace Mock Data in TradeRecommendations**
```typescript
// Before (mock data)
import { strategyOptions } from '../../data/newTradeMockData';

// After (real API)
import { useStrategies } from '../../services/hooks';

const { data: strategies, loading } = useStrategies();
```

## 🎯 Recommended Integration Order

1. **Start with Strategies**: Simple endpoint, easy to test
2. **Add Securities**: Load all securities for dropdowns
3. **Integrate Funds**: Similar to strategies, straightforward
4. **Implement Recommendations**: Most complex, full CRUD operations

## 🛠️ Development Workflow

1. **Test API endpoint** in browser/Postman
2. **Update types** if needed to match backend
3. **Add/modify service methods** 
4. **Update hooks** for new functionality
5. **Integrate in components**
6. **Test error scenarios**
7. **Add loading states**

This architecture provides a solid foundation for scaling the application while maintaining clean, testable, and maintainable code.
