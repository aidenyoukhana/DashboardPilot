import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigation } from '../hooks/useNavigation';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, page: 'dashboard' as const },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, page: 'dashboard' as const },
  { text: 'Clients', icon: <PeopleRoundedIcon />, page: 'dashboard' as const },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, page: 'dashboard' as const },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, page: 'dashboard' as const },
  { text: 'About', icon: <InfoRoundedIcon />, page: 'dashboard' as const },
  { text: 'Feedback', icon: <HelpRoundedIcon />, page: 'dashboard' as const },
];

export default function MenuContent() {
  const { setCurrentPage, currentPage } = useNavigation();
  const navigate = useNavigate();

  const handleItemClick = (page: 'dashboard') => {
  setCurrentPage(page);
  // keep URL in sync for the main dashboard pages
  navigate('/dashboard');
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              selected={item.text === 'Home' && currentPage === 'dashboard'}
              onClick={() => handleItemClick(item.page)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleItemClick(item.page)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
