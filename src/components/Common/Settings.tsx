import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(50);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Instellingen
        </Typography>

        <Card>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Weergave
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="Donkere modus"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    color="primary"
                  />
                }
                label="Hoog contrast"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Geluid
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VolumeUpIcon />
                <Slider
                  value={volume}
                  onChange={(_, value) => setVolume(value as number)}
                  aria-label="Volume"
                  valueLabelDisplay="auto"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Notificaties
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label="Ontvang notificaties"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
} 