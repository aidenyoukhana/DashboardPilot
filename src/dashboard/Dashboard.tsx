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
import { useEffect } from 'react';

function DashboardContent() {
  const { currentPage, setCurrentPage } = useNavigation();
  const location = useLocation();

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
              <Header />
              <MainGrid />
            </>
          )}
          {currentPage === 'profile' && (
            <>
              <Header />
              <Profile />
            </>
          )}
        </Stack>
      </Box>
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
