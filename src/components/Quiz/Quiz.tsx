import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  LinearProgress,
  Paper,
} from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SuperAugurk from '../Common/SuperAugurk';

interface Location {
  name: string;
  type: 'city' | 'river' | 'mountain' | 'sea' | 'region';
  lat: number;
  lng: number;
  description: string;
}

// Duitse coördinaten
const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };

// Importeer locaties van de Map component
const locations: Location[] = [
  // Steden
  { name: 'Hamburg', type: 'city', lat: 53.5511, lng: 9.9937, description: 'Belangrijke havenstad in het noorden' },
  { name: 'Bremen', type: 'city', lat: 53.0793, lng: 8.8017, description: 'Historische Hanzestad' },
  { name: 'Hannover', type: 'city', lat: 52.3759, lng: 9.7320, description: 'Hoofdstad van Nedersaksen' },
  { name: 'Berlijn', type: 'city', lat: 52.5200, lng: 13.4050, description: 'Hoofdstad van Duitsland' },
  { name: 'Magdeburg', type: 'city', lat: 52.1205, lng: 11.6276, description: 'Hoofdstad van Saksen-Anhalt' },
  { name: 'Leipzig', type: 'city', lat: 51.3397, lng: 12.3731, description: 'Culturele stad in Saksen' },
  { name: 'Dresden', type: 'city', lat: 51.0504, lng: 13.7373, description: 'Hoofdstad van Saksen' },
  { name: 'Duisburg', type: 'city', lat: 51.4344, lng: 6.7623, description: 'Stad in het Ruhrgebied' },
  { name: 'Essen', type: 'city', lat: 51.4556, lng: 7.0116, description: 'Belangrijke stad in het Ruhrgebied' },
  { name: 'Dortmund', type: 'city', lat: 51.5136, lng: 7.4653, description: 'Grootste stad in het Ruhrgebied' },
  { name: 'Düsseldorf', type: 'city', lat: 51.2277, lng: 6.7735, description: 'Hoofdstad van Noordrijn-Westfalen' },
  { name: 'Keulen', type: 'city', lat: 50.9375, lng: 6.9603, description: 'Grootste stad aan de Rijn' },
  { name: 'Bonn', type: 'city', lat: 50.7374, lng: 7.0982, description: 'Voormalige hoofdstad van West-Duitsland' },
  { name: 'Frankfurt', type: 'city', lat: 50.1109, lng: 8.6821, description: 'Financieel centrum van Duitsland' },
  { name: 'Neurenberg', type: 'city', lat: 49.4521, lng: 11.0767, description: 'Historische stad in Beieren' },
  { name: 'München', type: 'city', lat: 48.1351, lng: 11.5820, description: 'Hoofdstad van Beieren' },
  { name: 'Stuttgart', type: 'city', lat: 48.7758, lng: 9.1829, description: 'Hoofdstad van Baden-Württemberg' },
  { name: 'Karlsruhe', type: 'city', lat: 49.0069, lng: 8.4037, description: 'Technologiecentrum in Baden-Württemberg' },
];

// Marker iconen voor verschillende types
const getMarkerIcon = (type: Location['type'], isSelected: boolean, isCurrent: boolean) => {
  const color = isCurrent ? '#FF9800' : '#CCCCCC';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [24, 24],
  });
};

export default function Quiz() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [answeredLocations, setAnsweredLocations] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const selectNextLocation = React.useCallback(() => {
    const remainingLocations = locations.filter(loc => !answeredLocations.includes(loc.name));
    if (remainingLocations.length === 0) {
      // Quiz is afgelopen
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingLocations.length);
    const selected = remainingLocations[randomIndex];
    
    // Genereer opties
    const otherLocations = locations.filter(loc => loc.name !== selected.name);
    const shuffledOthers = [...otherLocations].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [selected.name, ...shuffledOthers.map(loc => loc.name)];
    
    setCurrentLocation(selected);
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setFeedback(null);
    setIsAnswering(true);
  }, [answeredLocations]);

  // Initialiseer de quiz
  useEffect(() => {
    selectNextLocation();
  }, [selectNextLocation]);

  const handleAnswer = (answer: string) => {
    if (!isAnswering || !currentLocation) return;
    
    setIsAnswering(false);
    const isCorrect = answer === currentLocation.name;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback('correct');
    } else {
      setWrongAnswers(prev => prev + 1);
      setFeedback('wrong');
    }
    
    setAnsweredLocations(prev => [...prev, currentLocation.name]);
    
    // Wacht 2 seconden voordat we naar de volgende vraag gaan
    setTimeout(selectNextLocation, 2000);
  };

  const progress = (answeredLocations.length / locations.length) * 100;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk 
            emotion={feedback === 'correct' ? 'happy' : feedback === 'wrong' ? 'sad' : 'thinking'} 
            size={120} 
          />
        </Box>

        {/* Statusbalk */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 4, 
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            borderRadius: '15px',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: '#2E7D32' }}>
                Voortgang: {answeredLocations.length} van {locations.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: '#2E7D32' }}>
                Goed: {correctAnswers} | Fout: {wrongAnswers}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: '#2E7D32' }}>
                Score: {Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)}%
              </Typography>
            </Grid>
          </Grid>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              mt: 2, 
              height: 10, 
              borderRadius: 5,
              backgroundColor: '#E8F5E9',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#2E7D32',
              }
            }} 
          />
        </Paper>

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
          Topografie Quiz
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                border: '4px solid #A5D6A7',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: '60vh', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <MapContainer
                    center={GERMANY_CENTER}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      detectRetina={true}
                      maxZoom={19}
                      minZoom={3}
                      noWrap={true}
                      updateWhenIdle={true}
                      updateWhenZooming={false}
                      updateInterval={150}
                      zIndex={1}
                      opacity={0.8}
                      className="map-tiles"
                    />
                    {locations.map((location) => (
                      <Marker
                        key={`${location.name}-${location.type}`}
                        position={[location.lat, location.lng]}
                        icon={getMarkerIcon(
                          location.type,
                          answeredLocations.includes(location.name),
                          currentLocation?.name === location.name
                        )}
                      />
                    ))}
                  </MapContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                border: '4px solid #A5D6A7',
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontFamily: 'Fredoka, sans-serif',
                    color: '#2E7D32',
                  }}
                >
                  Welke plaats zie je hier?
                </Typography>
                {currentLocation ? (
                  <Box sx={{ mt: 3 }}>
                    {options.map((option, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        fullWidth
                        onClick={() => handleAnswer(option)}
                        disabled={!isAnswering}
                        sx={{
                          mb: 2,
                          py: 2,
                          borderRadius: '15px',
                          textTransform: 'none',
                          fontFamily: 'Fredoka, sans-serif',
                          fontSize: '1.1rem',
                          backgroundColor: feedback === 'correct' && option === currentLocation.name ? '#4CAF50' :
                                       feedback === 'wrong' && option === currentLocation.name ? '#f44336' :
                                       feedback && option === currentLocation.name ? '#4CAF50' : '#2E7D32',
                          '&:hover': {
                            backgroundColor: feedback === 'correct' && option === currentLocation.name ? '#43A047' :
                                         feedback === 'wrong' && option === currentLocation.name ? '#d32f2f' :
                                         feedback && option === currentLocation.name ? '#43A047' : '#1B5E20',
                          },
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="h5" sx={{ color: '#2E7D32', fontFamily: 'Fredoka, sans-serif' }}>
                    Quiz afgerond! Je score: {Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)}%
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 