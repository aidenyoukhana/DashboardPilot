import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import { Settings, CloudUpload, DataUsage } from '@mui/icons-material';
import { BotpressUploader } from './BotpressUploader';
import { BulkUploader } from './BulkUploader';
import { DataSourceManager } from '../utils/DataSourceManager';
import type { BotpressConfig, DashboardDataExport, BotpressTableResponse } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`botpress-tabpanel-${index}`}
      aria-labelledby={`botpress-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const BotpressDashboardIntegration: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [config, setConfig] = useState<BotpressConfig>({
    botId: '',
    token: '',
    workspaceId: '',
    baseUrl: 'https://api.botpress.cloud',
  });
  
  const [configValid, setConfigValid] = useState(false);
  const [selectedData, setSelectedData] = useState<DashboardDataExport | null>(null);
  const [dataSources] = useState(() => DataSourceManager.getDataSources());
  const [uploadHistory, setUploadHistory] = useState<string[]>([]);

  // Load saved config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('botpress-config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
      } catch (error) {
        console.error('Failed to parse saved config:', error);
      }
    }
  }, []);

  // Validate config whenever it changes
  useEffect(() => {
    const isValid = Boolean(
      config.botId?.trim() && 
      config.token?.trim() && 
      config.workspaceId?.trim()
    );
    setConfigValid(isValid);
  }, [config]);

  const handleConfigChange = useCallback((field: keyof BotpressConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveConfig = useCallback(() => {
    localStorage.setItem('botpress-config', JSON.stringify(config));
  }, [config]);

  const handleLoadData = useCallback(async (sourceId: string) => {
    try {
      const source = DataSourceManager.getDataSource(sourceId);
      if (source) {
        const data = await source.getData();
        setSelectedData(data);
        setTabValue(1); // Switch to upload tab
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, []);

  const handleUploadComplete = useCallback((response: BotpressTableResponse) => {
    setUploadHistory(prev => [`Upload completed: ${response.insertedRows.length} rows`, ...prev.slice(0, 9)]); // Keep last 10
    setSelectedData(null);
  }, []);

  const handleBulkUploadComplete = useCallback((results: Array<{ source: string; success: boolean; response?: BotpressTableResponse; error?: string }>) => {
    const successMessages = results
      .filter(r => r.success)
      .map(r => `${r.source}: ${r.response?.insertedRows.length || 0} rows`);
    setUploadHistory(prev => [...successMessages, ...prev].slice(0, 10));
  }, []);

  return (
    <Paper sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab 
            label="Configuration" 
            icon={<Settings />} 
            iconPosition="start"
          />
          <Tab 
            label="Single Upload" 
            icon={<CloudUpload />} 
            iconPosition="start"
            disabled={!configValid}
          />
          <Tab 
            label="Bulk Upload" 
            icon={<DataUsage />} 
            iconPosition="start"
            disabled={!configValid}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Botpress Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Configure your Botpress connection settings. These settings will be saved locally.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Bot ID"
              value={config.botId}
              onChange={(e) => handleConfigChange('botId', e.target.value)}
              placeholder="Enter your bot ID"
              helperText="Found in your Botpress Studio URL"
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Workspace ID"
              value={config.workspaceId}
              onChange={(e) => handleConfigChange('workspaceId', e.target.value)}
              placeholder="Enter your workspace ID"
              helperText="Found in your Botpress workspace settings"
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="password"
              label="Personal Access Token"
              value={config.token}
              onChange={(e) => handleConfigChange('token', e.target.value)}
              placeholder="Enter your personal access token"
              helperText="Create one in your Botpress Cloud account settings"
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="API Base URL"
              value={config.baseUrl}
              onChange={(e) => handleConfigChange('baseUrl', e.target.value)}
              placeholder="https://api.botpress.cloud"
              helperText="Leave default unless using a custom deployment"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleSaveConfig}
            disabled={!configValid}
          >
            Save Configuration
          </Button>
          
          {configValid ? (
            <Alert severity="success">Configuration is valid</Alert>
          ) : (
            <Alert severity="warning">Please fill in all required fields</Alert>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Available Data Sources
        </Typography>
        
        <Grid container spacing={2}>
          {dataSources.map(source => (
            <Grid size={{ xs: 12, md: 6 }} key={source.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {source.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {source.description}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => handleLoadData(source.id)}
                    disabled={!configValid}
                  >
                    Load & Upload
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Single Data Upload
        </Typography>
        
        {selectedData ? (
          <BotpressUploader
            config={config}
            data={selectedData}
            onUploadComplete={handleUploadComplete}
            onError={(error: string) => console.error('Upload error:', error)}
          />
        ) : (
          <Alert severity="info">
            Select a data source from the Configuration tab to upload individual datasets.
          </Alert>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Bulk Data Upload
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Upload multiple data sources to your Botpress knowledge base at once.
        </Typography>
        
        <BulkUploader
          config={config}
          onUploadComplete={handleBulkUploadComplete}
          onError={(error: string) => console.error('Bulk upload error:', error)}
        />
      </TabPanel>

      {uploadHistory.length > 0 && (
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Uploads
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {uploadHistory.map((fileId) => (
              <Typography
                key={fileId}
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.5,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontSize: '0.75rem'
                }}
              >
                {fileId.slice(0, 8)}...
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};
