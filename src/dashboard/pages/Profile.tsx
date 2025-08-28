import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Copyright from '../internals/components/Copyright';

interface ProfileStats {
  label: string;
  value: string;
  description: string;
}

const profileStats: ProfileStats[] = [
  { label: 'Projects', value: '12', description: 'Active projects' },
  { label: 'Tasks', value: '48', description: 'Completed this month' },
  { label: 'Experience', value: '3.5y', description: 'Years at company' },
  { label: 'Rating', value: '4.8', description: 'Average performance' },
];

export default function Profile() {
  return (
    <Box sx={{ 
      width: '100%',
      alignSelf: 'stretch'
    }}>
      {/* Page Title */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Manage your account settings and preferences
      </Typography>
      
      <Grid container spacing={3} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {/* Profile Overview Card */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', mb: 3 }}>
                  <Avatar
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{ 
                      width: 120, 
                      height: 120,
                      border: '4px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h4" component="h1">
                        Riley Carter
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<EditRoundedIcon />}
                        size="small"
                      >
                        Edit Profile
                      </Button>
                    </Stack>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                      Senior Frontend Developer
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip label="Pro User" color="primary" size="small" />
                      <Chip label="Team Lead" color="success" size="small" />
                      <Chip label="Verified" color="info" size="small" />
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 500 }}>
                      Passionate frontend developer with expertise in React, TypeScript, and modern web technologies. 
                      Focused on creating exceptional user experiences and leading development teams.
                    </Typography>
                  </Box>
                </Stack>

                {/* Profile Stats */}
                <Grid container spacing={2}>
                  {profileStats.map((stat) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          bgcolor: 'background.default'
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {stat.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailRoundedIcon color="primary" />
                  Contact Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value="riley@email.com"
                      InputProps={{
                        startAdornment: <EmailRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value="+1 (555) 123-4567"
                      InputProps={{
                        startAdornment: <PhoneRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Location"
                      value="San Francisco, CA"
                      InputProps={{
                        startAdornment: <LocationOnRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Department"
                      value="Engineering"
                      InputProps={{
                        startAdornment: <WorkRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar with additional info */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            {/* Account Details */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayRoundedIcon color="primary" />
                  Account Details
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Member Since
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      March 15, 2021
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Last Login
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Today, 2:30 PM
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Account Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Professional
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Two-Factor Auth
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                      Enabled
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsRoundedIcon color="primary" />
                  Preferences
                </Typography>
                <Stack spacing={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Time Zone</InputLabel>
                    <Select value="PST" label="Time Zone">
                      <MenuItem value="PST">Pacific Standard Time</MenuItem>
                      <MenuItem value="EST">Eastern Standard Time</MenuItem>
                      <MenuItem value="GMT">Greenwich Mean Time</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Language</InputLabel>
                    <Select value="en" label="Language">
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Notifications</InputLabel>
                    <Select value="all" label="Notifications">
                      <MenuItem value="all">All Notifications</MenuItem>
                      <MenuItem value="important">Important Only</MenuItem>
                      <MenuItem value="none">None</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityRoundedIcon color="primary" />
                  Security
                </Typography>
                <Stack spacing={1}>
                  <Button variant="outlined" fullWidth size="small">
                    Change Password
                  </Button>
                  <Button variant="outlined" fullWidth size="small">
                    Manage Sessions
                  </Button>
                  <Button variant="outlined" fullWidth size="small">
                    Privacy Settings
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
