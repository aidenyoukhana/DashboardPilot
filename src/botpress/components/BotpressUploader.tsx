import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  LinearProgress,
  Stack,
} from '@mui/material';
import { Upload, CloudUpload, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { BotpressService } from '../services/BotpressService';
import { DataFormatter } from '../utils/DataFormatter';
import type { 
  BotpressConfig, 
  UploadProgress, 
  DashboardDataExport,
  BotpressTableResponse 
} from '../types';

interface BotpressUploaderProps {
  config: BotpressConfig;
  data: DashboardDataExport;
  onUploadComplete?: (response: BotpressTableResponse) => void;
  onError?: (error: string) => void;
}

export const BotpressUploader: React.FC<BotpressUploaderProps> = ({
  config,
  data,
  onUploadComplete,
  onError,
}) => {
  const [tableName, setTableName] = useState<string>('dashboard_data');
  const [progress, setProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  const handleError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    setProgress({
      status: 'error',
      progress: 0,
      message: errorMessage,
      error: errorMessage,
    });
    onError?.(errorMessage);
  }, [onError]);

  const handleUpload = useCallback(async () => {
    if (!config.token || !config.workspaceId) {
      handleError(new Error('Missing Botpress configuration'));
      return;
    }

    try {
      setProgress({
        status: 'uploading',
        progress: 20,
        message: 'Formatting data for Botpress Tables...',
      });

      // Format data as table rows
      const tableRows = DataFormatter.formatAsTableRows(data);
      
      setProgress({
        status: 'uploading',
        progress: 50,
        message: 'Uploading to Botpress Tables...',
      });

      const service = new BotpressService(config);
      const response = await service.createTableRows(tableName, tableRows);

      setProgress({
        status: 'success',
        progress: 100,
        message: `Successfully uploaded ${tableRows.length} rows to table "${tableName}"`,
      });

      onUploadComplete?.(response);
    } catch (error) {
      handleError(error);
    }
  }, [config, data, tableName, handleError, onUploadComplete]);

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
              Upload to Botpress Tables
            </Typography>
          </Box>

          {/* Table Configuration */}
          <TextField
            label="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="dashboard_data"
            disabled={isUploading}
            fullWidth
            helperText="Name of the Botpress table to create/update"
          />

          {/* Data Preview */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Data Preview:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {data.type} | Records: {data.data.length} | Source: {data.metadata.source}
            </Typography>
          </Box>

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
            onClick={handleUpload}
            disabled={isUploading || !tableName.trim()}
            size="large"
          >
            {isUploading ? 'Uploading...' : 'Upload to Botpress'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
