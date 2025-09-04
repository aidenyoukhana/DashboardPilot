# Dashboard API System

This folder contains a comprehensive mock API system for all Dashboard components. The APIs are designed to be easily replaceable with real backend endpoints when ready.

## Structure

```
api/
├── index.ts              # Main API exports and utilities
├── types.ts              # TypeScript type definitions
├── statsApi.ts           # Statistics/metrics data
├── pageAnalyticsApi.ts   # Page analytics and grid data
├── sessionApi.ts         # User session data
├── pageViewApi.ts        # Page views and downloads
├── countryApi.ts         # Geographic user data
├── treeViewApi.ts        # Tree navigation data
├── navigationApi.ts      # Menu and navigation data
├── alertApi.ts           # Alerts and notifications
└── README.md            # This file
```

## Usage

### Basic Import and Usage

```typescript
import { getStatCards, getPageAnalytics, getSessionData } from '../api';

// Get statistics data for StatCard components
const statsResponse = await getStatCards();
if (statsResponse.success) {
  console.log(statsResponse.data);
}

// Get page analytics with pagination and filtering
const analyticsResponse = await getPageAnalytics(1, 20, 'users:desc', { status: 'Online' });

// Get session data with date range
const sessionResponse = await getSessionData({
  start: '2024-04-01',
  end: '2024-04-30'
});
```

### Using the API Client

```typescript
import { createApiClient } from '../api';

// Create API client (uses mock data by default)
const apiClient = createApiClient();

// Use the client
const data = await apiClient.getStatCards();
```

### Error Handling

```typescript
import { getStatCards, handleApiError } from '../api';

try {
  const response = await getStatCards();
  // Handle successful response
} catch (error) {
  const apiError = handleApiError(error);
  console.error('API Error:', apiError.message);
}
```

### With Retry Logic

```typescript
import { getStatCards, retryApiCall } from '../api';

try {
  const response = await retryApiCall(() => getStatCards(), 3, 1000);
  // Handle successful response
} catch (error) {
  // Handle final error after retries
}
```

## API Functions by Component

### StatCard Components
- `getStatCards()` - Get all statistics cards data

### DataGrid Component
- `getPageAnalytics(page, pageSize, sortBy, filterBy)` - Get paginated analytics data

### Session Chart Component
- `getSessionData(dateRange)` - Get session data by date range
- `getSessionSummary()` - Get session summary statistics

### Page Views Chart Component
- `getPageViewData(period, months)` - Get page view data
- `getPageViewSummary()` - Get page view summary

### Country Chart Component
- `getCountryData(includeExtended)` - Get user data by country
- `getTopCountries(limit)` - Get top countries with detailed metrics
- `getCountryAnalyticsSummary()` - Get country analytics summary

### Tree View Component
- `getTreeViewData(expandLevel)` - Get tree navigation data
- `getTreeBranchData(branchId)` - Get specific branch data
- `addTreeItem(parentId, newItem)` - Add new tree item
- `deleteTreeItem(itemId)` - Delete tree item

### Navigation Components
- `getNavigationData(userId)` - Get navigation menu data
- `getBreadcrumbs(currentPath)` - Get breadcrumb data
- `getUserMenuData(userId)` - Get user menu data
- `getNavigationPermissions(userId)` - Get navigation permissions

### Alert Components
- `getAlerts(severity, limit, unreadOnly)` - Get alerts/notifications
- `getAlertSummary()` - Get alert summary counts
- `markAlertAsRead(alertId)` - Mark alert as read
- `dismissAlert(alertId)` - Dismiss alert
- `createAlert(alertData)` - Create new alert

## Switching to Real APIs

To switch from mock APIs to real backend APIs:

1. **Update the API functions**: Uncomment and modify the real API implementations in each file
2. **Configure API base URL**: Update `API_CONFIG.baseUrl` in `index.ts`
3. **Environment variables**: Set up environment variables for API configuration
4. **Authentication**: Add authentication headers if needed
5. **Error handling**: Customize error handling for your backend's error format

### Example Real API Implementation

```typescript
// Real API function example
export const getStatCards = async (): Promise<ApiResponse<StatCardData[]>> => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/dashboard/stats`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch statistics');
    }
    
    return {
      data: data,
      success: true
    };
  } catch (error) {
    throw {
      error: 'API_ERROR',
      code: 500,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
```

## Mock Data Features

- **Realistic data**: All mock data represents realistic dashboard scenarios
- **Pagination**: Page analytics API supports pagination, sorting, and filtering
- **Date ranges**: Session and page view APIs support date range filtering
- **Error simulation**: APIs include simulated delays and can be extended to simulate errors
- **Consistent typing**: All responses follow the same `ApiResponse<T>` pattern

## Type Safety

All APIs are fully typed with TypeScript:
- Request parameters have proper types
- Response data is typed
- Error responses follow a consistent pattern
- Generic types support different data structures

## Development Tips

1. **Simulated delays**: All mock APIs include realistic delays (100-500ms)
2. **Data consistency**: Mock data is consistent across related APIs
3. **Extensibility**: Easy to add new mock data or modify existing data
4. **Testing**: Mock APIs make testing components easier without backend dependencies
5. **Performance**: Mock APIs help identify frontend performance issues without network latency

## Migration Strategy

1. **Phase 1**: Use mock APIs for all components (current state)
2. **Phase 2**: Implement real APIs one component at a time
3. **Phase 3**: Add environment-based switching between mock and real APIs
4. **Phase 4**: Remove mock implementations once all real APIs are working

This approach allows for gradual migration and easy testing of individual components.
