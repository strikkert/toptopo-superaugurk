import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
} from '@mui/material';

interface Location {
  name: string;
  x: number;
  y: number;
}

const locations: Location[] = [
  { name: 'Amsterdam', x: 30, y: 20 },
  { name: 'Rotterdam', x: 25, y: 35 },
  { name: 'Den Haag', x: 20, y: 30 },
  { name: 'Utrecht', x: 35, y: 25 },
  { name: 'Eindhoven', x: 40, y: 40 },
];

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showLabels, setShowLabels] = useState(false);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Interactieve Kaart van Nederland
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '60vh',
                    backgroundColor: '#e3f2fd',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  {locations.map((location) => (
                    <Box
                      key={location.name}
                      sx={{
                        position: 'absolute',
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleLocationClick(location)}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: selectedLocation?.name === location.name
                            ? 'primary.main'
                            : 'secondary.main',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      />
                      {showLabels && (
                        <Typography
                          sx={{
                            position: 'absolute',
                            top: 25,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            backgroundColor: 'white',
                            padding: '2px 8px',
                            borderRadius: 1,
                            fontSize: '0.8rem',
                          }}
                        >
                          {location.name}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informatie
                </Typography>
                {selectedLocation ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      {selectedLocation.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Klik op een andere locatie op de kaart om meer informatie te zien.
                    </Typography>
                  </>
                ) : (
                  <Typography color="textSecondary">
                    Klik op een locatie op de kaart om meer informatie te zien.
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowLabels(!showLabels)}
                  sx={{ mt: 2 }}
                >
                  {showLabels ? 'Verberg Labels' : 'Toon Labels'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 