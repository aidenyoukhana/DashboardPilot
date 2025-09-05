import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import Profile from './pages/Profile';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './hooks/useNavigation';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { DataSourceManager, BotpressService, DataFormatter } from '../botpress';
import type { BotpressConfig } from '../botpress/types';

function DashboardContent() {
  const { currentPage, setCurrentPage } = useNavigation();
  const location = useLocation();
  const [uploadStatus, setUploadStatus] = useState<{
    message: string;
    severity: 'success' | 'error' | 'info';
    show: boolean;
  }>({ message: '', severity: 'info', show: false });

  // Track if data has been uploaded to prevent duplicates
  const [hasUploadedData, setHasUploadedData] = useState(false);

  // Manual sync function
  const manualSync = async () => {
    setHasUploadedData(false); // Reset the flag to allow re-sync
    
    // Trigger sync by simulating a page change
    const event = new CustomEvent('forceSync');
    window.dispatchEvent(event);
  };

  // Botpress configuration - memoized to prevent re-renders
  const botpressConfig = useMemo<BotpressConfig>(() => ({
    botId: import.meta.env.VITE_BOTPRESS_BOT_ID || '',
    token: import.meta.env.VITE_BOTPRESS_TOKEN || '',
    workspaceId: import.meta.env.VITE_BOTPRESS_WORKSPACE_ID || '',
    baseUrl: 'https://api.botpress.cloud',
  }), []);

  // Auto-upload data to Botpress when dashboard loads
  useEffect(() => {
    const uploadDashboardData = async () => {
      // Only upload if we have valid config, we're on the dashboard page, and haven't uploaded yet
      if (!botpressConfig.botId || !botpressConfig.token || currentPage !== 'dashboard' || hasUploadedData) {
        return;
      }

      try {
        setUploadStatus({
          message: 'Syncing dashboard data to bot tables (clearing duplicates)...',
          severity: 'info',
          show: true
        });

        const botpressService = new BotpressService(botpressConfig);
        const dataSources = DataSourceManager.getDataSources();
        let uploadCount = 0;

        // Table name mapping to match your existing Botpress tables
        const getTableName = (dataType: string): string => {
          const tableMap: Record<string, string> = {
            'employees': 'dashboard_employeesTable',
            'analytics': 'dashboard_analyticsTable', 
            'stats': 'dashboard_statsTable',
            'sessions': 'dashboard_sessionsTable'
          };
          return tableMap[dataType] || `dashboard_${dataType}Table`;
        };

        // Sync each data source as table rows (clears existing data first)
        for (const source of dataSources) {
          try {
            const data = await source.getData();
            
            // Format data as table rows using DataFormatter
            const tableRows = DataFormatter.formatAsTableRows(data);
            
            // Sync table data in Botpress using correct table names (clears duplicates)
            const tableName = getTableName(data.type);
            
            await botpressService.syncTableData(tableName, tableRows);
            
            uploadCount++;
          } catch (error) {
            console.warn(`Failed to sync ${source.name}:`, error);
          }
        }

        // Mark as uploaded to prevent future duplicates
        setHasUploadedData(true);

        setUploadStatus({
          message: `Successfully synced ${uploadCount} datasets to Botpress tables (duplicates cleared)`,
          severity: 'success',
          show: true
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setUploadStatus(prev => ({ ...prev, show: false }));
        }, 5000);

      } catch (error) {
        console.error('Failed to sync dashboard data:', error);
        setUploadStatus({
          message: 'Failed to sync data to bot. Check console for details.',
          severity: 'error',
          show: true
        });
      }
    };

    // Listen for manual sync events
    const handleForceSync = () => {
      uploadDashboardData();
    };

    // Upload data when dashboard loads (with a small delay to let the dashboard render)
    const timer = setTimeout(uploadDashboardData, 2000);
    
    // Add event listener for manual sync
    window.addEventListener('forceSync', handleForceSync);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('forceSync', handleForceSync);
    };
  }, [currentPage, botpressConfig, hasUploadedData]);

  // keep navigation context in sync with the URL
  useEffect(() => {
    if (location.pathname === '/profile') {
      setCurrentPage('profile');
    } else {
      setCurrentPage('dashboard');
    }
  }, [location.pathname, setCurrentPage]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          {currentPage === 'dashboard' && (
            <>
              <Header onManualSync={manualSync} />
              <MainGrid />
            </>
          )}
          {currentPage === 'profile' && (
            <>
              <Header onManualSync={manualSync} />
              <Profile />
            </>
          )}
        </Stack>
      </Box>

      {/* Upload Status Notification */}
      <Snackbar
        open={uploadStatus.show}
        autoHideDuration={uploadStatus.severity === 'error' ? null : 5000}
        onClose={() => setUploadStatus(prev => ({ ...prev, show: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setUploadStatus(prev => ({ ...prev, show: false }))}
          severity={uploadStatus.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {uploadStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <NavigationProvider>
        <DashboardContent />
      </NavigationProvider>
    </>
  );
}
