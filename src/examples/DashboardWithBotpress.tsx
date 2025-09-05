import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { BotpressDashboardIntegration } from '../botpress';

/**
 * Example component showing how to integrate Botpress uploading 
 * into your existing dashboard
 */
export const DashboardWithBotpress: React.FC = () => {
  const [botpressDialogOpen, setBotpressDialogOpen] = useState(false);

  return (
    <Box>
      {/* Your existing dashboard content */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Add a card for Botpress integration */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Bot Knowledge Base
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload your dashboard data to Botpress to make your bot intelligent about your business data.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={() => setBotpressDialogOpen(true)}
            >
              Manage Bot Data
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Your other dashboard components */}
      
      {/* Botpress Dialog */}
      <Dialog
        open={botpressDialogOpen}
        onClose={() => setBotpressDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Botpress Knowledge Base Management
        </DialogTitle>
        <DialogContent>
          <BotpressDashboardIntegration />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
