import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Alert,
  LinearProgress,
  Stack,
} from '@mui/material';
import { CloudUpload, Upload, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { BotpressService } from '../services/BotpressService';
import { DataFormatter } from '../utils/DataFormatter';
import { DataSourceManager } from '../utils/DataSourceManager';
import type { BotpressConfig, UploadProgress, BotpressTableResponse } from '../types';

interface BulkUploaderProps {
  config: BotpressConfig;
  onUploadComplete?: (results: Array<{ source: string; success: boolean; response?: BotpressTableResponse; error?: string }>) => void;
  onError?: (error: string) => void;
}

export const BulkUploader: React.FC<BulkUploaderProps> = ({
  config,
  onUploadComplete,
  onError,
}) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [progress, setProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  const dataSources = DataSourceManager.getDataSources();

  const handleToggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleUploadAll = async () => {
    if (selectedSources.length === 0) {
      onError?.('Please select at least one data source');
      return;
    }

    if (!config.token || !config.workspaceId) {
      onError?.('Missing Botpress configuration');
      return;
    }

    // Table name mapping to match existing Botpress tables
    const getTableName = (dataType: string): string => {
      const tableMap: Record<string, string> = {
        'employees': 'dashboard_employeesTable',
        'analytics': 'dashboard_analyticsTable', 
        'stats': 'dashboard_statsTable',
        'sessions': 'dashboard_sessionsTable'
      };
      return tableMap[dataType] || `dashboard_${dataType}Table`;
    };

    try {
      setProgress({
        status: 'uploading',
        progress: 0,
        message: 'Starting bulk upload...',
      });

      const botpressService = new BotpressService(config);
      const results: Array<{ source: string; success: boolean; response?: BotpressTableResponse; error?: string }> = [];
      const selectedSourceObjects = dataSources.filter(source => 
        selectedSources.includes(source.name)
      );

      for (let i = 0; i < selectedSourceObjects.length; i++) {
        const source = selectedSourceObjects[i];
        const progressPercent = ((i + 1) / selectedSourceObjects.length) * 100;

        setProgress({
          status: 'uploading',
          progress: progressPercent,
          message: `Uploading ${source.name}...`,
        });

        try {
          const data = await source.getData();
          const tableRows = DataFormatter.formatAsTableRows(data);
          const tableName = getTableName(data.type);
          
          const response = await botpressService.createTableRows(tableName, tableRows);
          results.push({ source: source.name, success: true, response });
        } catch (error) {
          results.push({ 
            source: source.name, 
            success: false, 
            error: error instanceof Error ? error.message : 'Upload failed' 
          });
        }
      }

      const successCount = results.filter(r => r.success).length;
      
      setProgress({
        status: 'success',
        progress: 100,
        message: `Completed! ${successCount}/${selectedSources.length} uploads successful`,
      });

      onUploadComplete?.(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bulk upload failed';
      setProgress({
        status: 'error',
        progress: 0,
        message: errorMessage,
        error: errorMessage,
      });
      onError?.(errorMessage);
    }
  };

  const isUploading = progress.status === 'uploading';
  const isSuccess = progress.status === 'success';
  const isError = progress.status === 'error';

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <CloudUpload color="primary" />
            <Typography variant="h6">
              Bulk Upload to Botpress Tables
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Select data sources to upload to Botpress tables
          </Typography>

          {/* Data Source Selection */}
          <List>
            {dataSources.map((source) => (
              <ListItemButton
                key={source.name}
                onClick={() => handleToggleSource(source.name)}
                disabled={isUploading}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={selectedSources.includes(source.name)}
                    disabled={isUploading}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={source.name}
                  secondary={source.description}
                />
              </ListItemButton>
            ))}
          </List>

          {/* Progress */}
          {isUploading && (
            <Box>
              <LinearProgress 
                variant="determinate" 
                value={progress.progress} 
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {progress.message}
              </Typography>
            </Box>
          )}

          {/* Status Messages */}
          {isSuccess && (
            <Alert 
              severity="success" 
              icon={<CheckCircle />}
              onClose={() => setProgress({ status: 'idle', progress: 0, message: '' })}
            >
              {progress.message}
            </Alert>
          )}

          {isError && (
            <Alert 
              severity="error" 
              icon={<ErrorIcon />}
              onClose={() => setProgress({ status: 'idle', progress: 0, message: '' })}
            >
              {progress.message}
            </Alert>
          )}

          {/* Upload Button */}
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={handleUploadAll}
            disabled={isUploading || selectedSources.length === 0}
            size="large"
          >
            {isUploading ? 'Uploading...' : `Upload Selected (${selectedSources.length})`}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
