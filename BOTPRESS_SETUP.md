# Botpress Integration Setup

This dashboard integrates with Botpress to automatically upload data to your bot's **Tables** (not Knowledge Base files).

## Important: API Endpoints

⚠️ **Key Point**: Botpress doesn't expose a public REST API for uploading to Knowledge Base. Instead, use:

1. **Tables API** (recommended) - For structured data that your bot can query
2. **Converse API** - For runtime conversations

This integration uses the **Tables API** to store dashboard data as structured records.

## Setup Instructions

### 1. Get Your Botpress Credentials

In your Botpress Studio:
1. Go to your workspace settings
2. Get your **Workspace ID**
3. Create a **Personal Access Token** 
4. Get your **Bot ID** from the bot settings

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Botpress Configuration
VITE_BOTPRESS_BOT_ID=your_bot_id_here
VITE_BOTPRESS_TOKEN=your_personal_access_token_here
VITE_BOTPRESS_WORKSPACE_ID=your_workspace_id_here
```

### 3. How It Works

The integration:
- Automatically uploads dashboard data when you load the dashboard
- Converts data to structured table rows
- Creates separate tables for each data type:
  - `dashboard_employees` - Employee records
  - `dashboard_analytics` - Page analytics data
  - `dashboard_stats` - Dashboard statistics
  - `dashboard_sessions` - Session data

### 4. Table Structure

Each table includes:
- Original data fields (mapped to proper column names)
- `data_type` - Identifies the source data type
- `created_at` - Timestamp of when the data was uploaded

### 5. Using in Your Bot

In your Botpress bot, you can query the tables using:

```javascript
const { rows } = await client.createTableRows({
  table: 'dashboard_employees',
  rows: [
    {
      query: 'test'
    }
  ]
});
```

### 6. Manual Upload

You can also manually upload data using the Botpress components:
- `BotpressUploader` - Upload single dataset
- `BulkUploader` - Upload multiple datasets at once

## API Endpoints Used

- **Tables API**: `https://api.botpress.cloud/v1/tables/{tableName}/rows`
- **Headers**: 
  - `Authorization: Bearer {your_token}`
  - `x-workspace-id: {your_workspace_id}`
  - `Content-Type: application/json`

## Troubleshooting

1. **405 Method Not Found**: You're trying to use the wrong API endpoint
2. **401 Unauthorized**: Check your token and workspace ID
3. **Table not found**: Tables are created automatically on first upload

## Next Steps

After setup:
1. Load your dashboard - data should auto-upload
2. Check your Botpress Tables in the Studio
3. Configure your bot to query the tables
4. Test the integration with your bot's conversations
