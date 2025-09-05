# Botpress Dashboard Integration

This module provides a comprehensive solution for uploading dashboard data to Botpress knowledge base, making your bot intelligent about your business data.

## Features

- **Multiple Upload Formats**: Rich text, HTML tables, structured documents, and JSON
- **Bulk Uploads**: Upload multiple data sources at once
- **Componentized Architecture**: Reusable React components
- **Type Safety**: Full TypeScript support
- **Data Formatting**: Automatic formatting for optimal bot understanding
- **Progress Tracking**: Real-time upload progress and status

## Setup

### 1. Botpress Configuration

First, you need to configure your Botpress connection:

```typescript
import { BotpressDashboardIntegration } from './botpress';

// Use the integration component in your dashboard
<BotpressDashboardIntegration />
```

### 2. Required Configuration

You'll need these values from your Botpress account:

- **Bot ID**: Found in your Botpress Studio URL
- **Workspace ID**: Found in your workspace settings
- **Personal Access Token**: Create one in your Botpress Cloud account settings

## Components

### BotpressDashboardIntegration

The main component that provides a complete interface for configuring and uploading data.

```tsx
import { BotpressDashboardIntegration } from './botpress';

function App() {
  return <BotpressDashboardIntegration />;
}
```

### BotpressUploader

For uploading individual datasets:

```tsx
import { BotpressUploader } from './botpress';

const config = {
  botId: 'your-bot-id',
  token: 'your-token',
  workspaceId: 'your-workspace-id',
};

const data = {
  type: 'employees',
  data: employeeData,
  metadata: {
    exportDate: new Date().toISOString(),
    totalRecords: employeeData.length,
    source: 'hr-system',
  },
};

<BotpressUploader 
  config={config}
  data={data}
  onUploadComplete={(fileId) => console.log('Uploaded:', fileId)}
/>
```

### BulkUploader

For uploading multiple data sources:

```tsx
import { BulkUploader } from './botpress';

const dataSources = DataSourceManager.getDataSources();

<BulkUploader
  config={config}
  dataSources={dataSources}
  onUploadComplete={(results) => console.log('All uploads:', results)}
/>
```

## Data Formats

### Rich Text (Recommended)
Best for natural language queries. Converts data into markdown format that's easy for the bot to understand.

```markdown
# Employee Data

**John Doe**
- Age: 30
- Role: Developer
- Join Date: 2023-01-15
- Employment Type: Full-time
```

### HTML Table
Good for structured data display.

```html
<table>
  <thead>
    <tr><th>Name</th><th>Role</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>John Doe</td><td>Developer</td><td>30</td></tr>
  </tbody>
</table>
```

### Structured Document
Comprehensive documentation format.

```
Employee Documentation
=====================

Export Information:
- Date: 2024-01-01T10:00:00Z
- Total Records: 25
- Source: hr-system

Record 1:
--------
Name: John Doe
Age: 30
Role: Developer
```

### JSON
Raw data format for technical queries.

```json
{
  "type": "employees",
  "data": [...],
  "metadata": {...}
}
```

## Data Sources

The system comes with built-in data source managers:

```typescript
import { DataSourceManager } from './botpress';

// Get all available data sources
const sources = DataSourceManager.getDataSources();

// Get specific data
const employeeData = await DataSourceManager.getEmployeesData();
const analyticsData = await DataSourceManager.getAnalyticsData();
```

## Custom Data Sources

You can easily add your own data sources:

```typescript
// Add to DataSourceManager
static async getCustomData(): Promise<DashboardDataExport> {
  const customData = await fetchYourCustomData();
  
  return {
    type: 'custom',
    data: customData,
    metadata: {
      exportDate: new Date().toISOString(),
      totalRecords: customData.length,
      source: 'your-custom-source',
    },
  };
}
```

## Best Practices

### 1. Choose the Right Format

- **Rich Text**: Best for Q&A scenarios
- **Table**: Good for data that needs structure
- **Document**: Best for comprehensive information
- **JSON**: For technical/API-related queries

### 2. Add Meaningful Tags

```typescript
const tags = {
  department: 'hr',
  dataType: 'employees',
  lastUpdated: '2024-01-01',
  priority: 'high',
};
```

### 3. Regular Updates

Set up a schedule to update your knowledge base:

```typescript
// Example: Daily update at midnight
const updateSchedule = {
  frequency: 'daily',
  time: '00:00',
  sources: ['employees', 'analytics', 'stats'],
};
```

### 4. Monitor Upload Success

```typescript
const handleUploadComplete = (fileId: string) => {
  // Log successful uploads
  console.log('Upload successful:', fileId);
  
  // Update your tracking system
  updateUploadLog(fileId);
  
  // Notify stakeholders
  notifySuccess(fileId);
};
```

## Error Handling

The components include comprehensive error handling:

```typescript
const handleError = (error: string) => {
  console.error('Upload failed:', error);
  
  // Show user-friendly message
  showNotification('Upload failed. Please try again.');
  
  // Log for debugging
  logError(error);
};
```

## Integration with Your Dashboard

### Adding to Existing Components

```tsx
import { BotpressUploader } from './botpress';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  
  const handleDataUpload = async () => {
    const data = await DataSourceManager.getEmployeesData();
    // Upload to Botpress
  };
  
  return (
    <div>
      {/* Your existing employee management UI */}
      
      <BotpressUploader 
        config={botpressConfig}
        data={employeeData}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
```

### Navigation Integration

Add to your dashboard navigation:

```tsx
import { NavigationProvider } from './dashboard/context/NavigationContext';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Employees', path: '/employees' },
  { label: 'Bot Knowledge', path: '/botpress' }, // Add this
];
```

## Security Considerations

1. **Store tokens securely**: Use environment variables or secure storage
2. **Validate data**: Ensure data doesn't contain sensitive information
3. **Monitor uploads**: Keep track of what data is uploaded
4. **Regular cleanup**: Remove outdated knowledge base entries

## Troubleshooting

### Common Issues

1. **Invalid Configuration**: Ensure all required fields are filled
2. **Network Errors**: Check your internet connection and Botpress API status
3. **Data Format Errors**: Validate your data structure before upload
4. **Token Expiration**: Refresh your personal access token if needed

### Debugging

Enable debug logging:

```typescript
const config = {
  ...botpressConfig,
  debug: true, // Enable debug mode
};
```

## API Reference

See the TypeScript definitions in `/types/index.ts` for complete API documentation.

## Contributing

To add new features or fix issues:

1. Add new data formatters to `utils/DataFormatter.ts`
2. Extend data sources in `utils/DataSourceManager.ts`
3. Create new components in `components/`
4. Update types in `types/index.ts`
