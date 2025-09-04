import { Card, CardContent, CardHeader, Typography, CircularProgress, Box, Alert, Stack, LinearProgress, linearProgressClasses } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useCountryData } from '../api/hooks';
import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../internals/components/CustomIcons';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

export default function CountryChartCard() {
  const { data: countryData, loading, error } = useCountryData();

  const flagMap: { [key: string]: React.ReactNode } = {
    'India': <IndiaFlag />,
    'USA': <UsaFlag />, 
    'Brazil': <BrazilFlag />,
    'Other': <GlobeFlag />,
  };

  const chartData = countryData?.map(country => ({
    label: country.name,
    value: country.value
  })) || [];

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title={
          <Typography variant="h6" component="h3">
            Users by Country
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error loading country data: {error}
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <PieChart
                colors={['hsl(220, 25%, 65%)', 'hsl(220, 25%, 45%)', 'hsl(220, 25%, 30%)', 'hsl(220, 25%, 20%)']}
                series={[{
                  data: chartData,
                  innerRadius: 55,
                  outerRadius: 85,
                  cx: 110,
                  cy: 95,
                }]}
                height={190}
                width={220}
              >
                <PieCenterLabel>Users</PieCenterLabel>
              </PieChart>
            </Box>
            
            <Stack spacing={2}>
              {countryData?.map((country) => (
                <Stack key={country.name} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                  <Stack sx={{ gap: 1, flexGrow: 1 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                        {flagMap[country.name]}
                        <Typography variant="body2" sx={{ fontWeight: '500' }}>
                          {country.name}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {country.percentage}%
                      </Typography>
                    </Stack>
                    <BorderLinearProgress
                      variant="determinate"
                      value={country.percentage}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
