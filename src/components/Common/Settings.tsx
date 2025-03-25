import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SuperAugurk from './SuperAugurk';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk 
            message="Ik help je graag met het aanpassen van je instellingen!"
            isHappy={true}
          />
        </Box>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            color: '#2E7D32',
            fontFamily: 'Fredoka, sans-serif',
            fontSize: '2.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 4,
          }}
        >
          Instellingen
        </Typography>

        <Card
          sx={{
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            border: '4px solid #A5D6A7',
          }}
        >
          <CardContent>
            <List>
              <ListItem
                sx={{
                  borderRadius: '15px',
                  mb: 2,
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  },
                }}
              >
                <VolumeUpIcon 
                  sx={{ 
                    mr: 2, 
                    color: '#2E7D32',
                    fontSize: '2rem',
                  }} 
                />
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: 'Fredoka, sans-serif',
                        color: '#1B5E20',
                        fontSize: '1.2rem',
                      }}
                    >
                      Geluid
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontFamily: 'Fredoka, sans-serif',
                        color: '#2E7D32',
                      }}
                    >
                      Zet het geluid aan of uit
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#4CAF50',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#81C784',
                      },
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
} 