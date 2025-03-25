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
  TextField,
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

type QuestionType = 'multiple-choice' | 'type';

interface QuizState {
  currentLocation: Location | null;
  options: string[];
  answeredLocations: string[];
  correctAnswers: number;
  wrongAnswers: number;
  feedback: 'correct' | 'wrong' | null;
  isAnswering: boolean;
  questionType: QuestionType;
  typedAnswer: string;
  feedbackMessage: string;
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    currentLocation: null,
    options: [],
    answeredLocations: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    feedback: null,
    isAnswering: false,
    questionType: 'multiple-choice',
    typedAnswer: '',
    feedbackMessage: '',
  });

  const selectNextLocation = React.useCallback(() => {
    const remainingLocations = locations.filter(loc => !state.answeredLocations.includes(loc.name));
    if (remainingLocations.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingLocations.length);
    const selected = remainingLocations[randomIndex];
    
    // Genereer opties voor multiple choice
    const otherLocations = locations.filter(loc => loc.name !== selected.name);
    const shuffledOthers = [...otherLocations].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [selected.name, ...shuffledOthers.map(loc => loc.name)];
    
    // Willekeurig kiezen tussen multiple choice en type vraag
    const questionType: QuestionType = Math.random() < 0.5 ? 'multiple-choice' : 'type';

    setState(prev => ({
      ...prev,
      currentLocation: selected,
      options: allOptions.sort(() => Math.random() - 0.5),
      feedback: null,
      isAnswering: true,
      questionType,
      typedAnswer: '',
      feedbackMessage: '',
    }));
  }, [state.answeredLocations]);

  useEffect(() => {
    selectNextLocation();
  }, [selectNextLocation]);

  const normalizeString = (str: string): string => {
    return str.toLowerCase().trim();
  };

  const handleTypedAnswer = (answer: string) => {
    setState(prev => ({ ...prev, typedAnswer: answer }));
  };

  const checkTypedAnswer = () => {
    if (!state.currentLocation || !state.isAnswering) return;

    const normalizedAnswer = normalizeString(state.typedAnswer);
    const normalizedCorrect = normalizeString(state.currentLocation.name);
    const isCorrect = normalizedAnswer === normalizedCorrect;
    
    let feedbackMessage = '';
    if (isCorrect) {
      feedbackMessage = 'Goed gedaan!';
    } else if (normalizedAnswer.length > 0) {
      feedbackMessage = `Niet helemaal juist. Het juiste antwoord is: ${state.currentLocation.name}`;
    }

    setState(prev => ({
      ...prev,
      isAnswering: false,
      feedback: isCorrect ? 'correct' : 'wrong',
      feedbackMessage,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
      answeredLocations: [...prev.answeredLocations, state.currentLocation!.name],
    }));

    setTimeout(selectNextLocation, 2000);
  };

  const handleMultipleChoiceAnswer = (answer: string) => {
    if (!state.isAnswering || !state.currentLocation) return;
    
    const isCorrect = answer === state.currentLocation.name;
    
    setState(prev => ({
      ...prev,
      isAnswering: false,
      feedback: isCorrect ? 'correct' : 'wrong',
      feedbackMessage: isCorrect ? 'Goed gedaan!' : `Niet juist. Het juiste antwoord is: ${state.currentLocation!.name}`,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
      answeredLocations: [...prev.answeredLocations, state.currentLocation!.name],
    }));
    
    setTimeout(selectNextLocation, 2000);
  };

  const progress = (state.answeredLocations.length / locations.length) * 100;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk 
            emotion={state.feedback === 'correct' ? 'happy' : state.feedback === 'wrong' ? 'sad' : 'thinking'} 
            size={120} 
          />
        </Box>

        {/* Statusbalk */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 4, 
            background: 'var(--duolingo-white)',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--duolingo-gray)' }}>
                Voortgang: {state.answeredLocations.length} van {locations.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--duolingo-gray)' }}>
                Goed: {state.correctAnswers} | Fout: {state.wrongAnswers}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--duolingo-gray)' }}>
                Score: {Math.round((state.correctAnswers / (state.correctAnswers + state.wrongAnswers || 1)) * 100)}%
              </Typography>
            </Grid>
          </Grid>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              mt: 2, 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'var(--duolingo-light-gray)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--duolingo-green)',
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
            color: 'var(--duolingo-gray)',
            fontFamily: 'Chicle, cursive',
            fontSize: '3rem',
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                border: 'none',
                background: 'var(--duolingo-white)',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: '60vh', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <MapContainer
                    center={GERMANY_CENTER}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    dragging={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    touchZoom={false}
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
                          state.answeredLocations.includes(location.name),
                          state.currentLocation?.name === location.name
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                background: 'var(--duolingo-white)',
                border: 'none',
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontFamily: 'Fredoka, sans-serif',
                    color: 'var(--duolingo-gray)',
                  }}
                >
                  Welke plaats zie je hier?
                </Typography>
                {state.currentLocation ? (
                  <Box sx={{ mt: 3 }}>
                    {state.questionType === 'multiple-choice' ? (
                      // Multiple choice opties
                      state.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="contained"
                          fullWidth
                          onClick={() => handleMultipleChoiceAnswer(option)}
                          disabled={!state.isAnswering}
                          sx={{
                            mb: 2,
                            py: 2,
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: 'Fredoka, sans-serif',
                            fontSize: '1.1rem',
                            backgroundColor: state.feedback === 'correct' && option === state.currentLocation?.name ? 'var(--duolingo-green)' :
                                         state.feedback === 'wrong' && option === state.currentLocation?.name ? 'var(--duolingo-red)' :
                                         state.feedback && option === state.currentLocation?.name ? 'var(--duolingo-green)' : 'var(--duolingo-blue)',
                            '&:hover': {
                              backgroundColor: state.feedback === 'correct' && option === state.currentLocation?.name ? '#4CAF50' :
                                           state.feedback === 'wrong' && option === state.currentLocation?.name ? '#d32f2f' :
                                           state.feedback && option === state.currentLocation?.name ? '#4CAF50' : '#1B5E20',
                            },
                          }}
                        >
                          {option}
                        </Button>
                      ))
                    ) : (
                      // Type antwoord interface
                      <Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={state.typedAnswer}
                          onChange={(e) => handleTypedAnswer(e.target.value)}
                          disabled={!state.isAnswering}
                          placeholder="Type je antwoord hier..."
                          sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '15px',
                              fontFamily: 'Fredoka, sans-serif',
                              backgroundColor: 'white',
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={checkTypedAnswer}
                          disabled={!state.isAnswering || !state.typedAnswer}
                          sx={{
                            py: 2,
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: 'Fredoka, sans-serif',
                            fontSize: '1.1rem',
                            backgroundColor: 'var(--duolingo-blue)',
                            '&:hover': {
                              backgroundColor: '#1B5E20',
                            },
                          }}
                        >
                          Controleer
                        </Button>
                      </Box>
                    )}
                    {state.feedbackMessage && (
                      <Typography 
                        sx={{ 
                          mt: 2, 
                          textAlign: 'center',
                          fontFamily: 'Fredoka, sans-serif',
                          color: state.feedback === 'correct' ? 'var(--duolingo-green)' : 'var(--duolingo-red)',
                        }}
                      >
                        {state.feedbackMessage}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Typography variant="h5" sx={{ color: 'var(--duolingo-gray)', fontFamily: 'Fredoka, sans-serif' }}>
                    Quiz afgerond! Je score: {Math.round((state.correctAnswers / (state.correctAnswers + state.wrongAnswers || 1)) * 100)}%
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