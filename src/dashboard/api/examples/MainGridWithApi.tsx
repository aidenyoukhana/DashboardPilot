// Example: MainGrid component with API integration
// This is an example of how to integrate the mock APIs into the existing MainGrid component

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// Import API functions - adjust path as needed
import { getStatCards, type StatCardData, type ApiResponse } from '../index';

// Mock components for example - replace with actual imports
const Copyright = ({ sx }: { sx?: Record<string, unknown> }) => <div style={sx as React.CSSProperties}>© 2024 Dashboard</div>;
const ChartUserByCountry = () => <div>Chart User By Country</div>;
const CustomizedTreeView = () => <div>Customized Tree View</div>;
const CustomizedDataGrid = () => <div>Customized Data Grid</div>;
const HighlightedCard = () => <div>Highlighted Card</div>;
const PageViewsBarChart = () => <div>Page Views Bar Chart</div>;
const SessionsChart = () => <div>Sessions Chart</div>;
const StatCard = (props: StatCardData) => (
  <div>
    <h3>{props.title}</h3>
    <p>{props.value}</p>
    <p>{props.interval}</p>
  </div>
);

export default function MainGridWithApi() {
  const [statCards, setStatCards] = useState<StatCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatCards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: ApiResponse<StatCardData[]> = await getStatCards();
        
        if (response.success) {
          setStatCards(response.data);
        } else {
          setError(response.message || 'Failed to load statistics');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadStatCards();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Alert severity="error">
          Error loading dashboard data: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {statCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

// Alternative approach using React Query (if you're using it)
/*
import { useQuery } from '@tanstack/react-query';

export default function MainGridWithReactQuery() {
  const {
    data: statCards = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['statCards'],
    queryFn: async () => {
      const response = await getStatCards();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load statistics');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  // Rest of the component...
}
*/
