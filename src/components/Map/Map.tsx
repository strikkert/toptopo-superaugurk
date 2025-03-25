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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

  // Regio's
  { name: 'Ruhrgebied', type: 'region', lat: 51.5, lng: 7.1, description: 'Grootste stedelijke gebied van Duitsland' },
  { name: 'Sauerland', type: 'region', lat: 51.2, lng: 8.0, description: 'Bergachtig gebied in Noordrijn-Westfalen' },
  { name: 'Eifel', type: 'region', lat: 50.4, lng: 6.5, description: 'Middelgebergte in het westen' },
  { name: 'Harz', type: 'region', lat: 51.8, lng: 10.6, description: 'Hoogste gebergte in Noord-Duitsland' },
  { name: 'Zwarte Woud', type: 'region', lat: 48.0, lng: 8.2, description: 'Bosrijk gebied in Baden-Württemberg' },
  { name: 'Beieren', type: 'region', lat: 48.7, lng: 11.5, description: 'Grootste deelstaat van Duitsland' },

  // Rivieren (approximatie van centrale punten)
  { name: 'Elbe', type: 'river', lat: 53.0, lng: 11.0, description: 'Belangrijke rivier in Noord-Duitsland' },
  { name: 'Rijn', type: 'river', lat: 50.0, lng: 7.0, description: 'Belangrijkste rivier van Duitsland' },
  { name: 'Donau', type: 'river', lat: 48.5, lng: 13.0, description: 'Langste rivier van Europa' },

  // Zeeën
  { name: 'Noordzee', type: 'sea', lat: 54.0, lng: 8.0, description: 'Zee aan de noordwestkust' },
  { name: 'Oostzee', type: 'sea', lat: 54.5, lng: 14.0, description: 'Zee aan de noordoostkust' },
];

// Marker iconen voor verschillende types
const getMarkerIcon = (type: Location['type'], isSelected: boolean) => {
  const color = isSelected ? '#FF9800' : (() => {
    switch (type) {
      case 'city': return '#FF93A8'; // Pastel roze
      case 'river': return '#93CAFF'; // Pastel blauw
      case 'mountain': return '#A8FF93'; // Pastel groen
      case 'sea': return '#93FFED'; // Pastel turquoise
      case 'region': return '#D093FF'; // Pastel paars
      default: return '#FFE793'; // Pastel geel
    }
  })();

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

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedType, setSelectedType] = useState<Location['type'] | 'all'>('all');

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const filteredLocations = selectedType === 'all'
    ? locations
    : locations.filter(loc => loc.type === selectedType);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk emotion="happy" size={120} />
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
          Ontdek Duitsland met SuperAugurk!
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
                    center={[52.3676, 4.9041]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                      attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                      maxZoom={17}
                      detectRetina={true}
                    />
                    {filteredLocations.map((location) => (
                      <Marker
                        key={`${location.name}-${location.type}`}
                        position={[location.lat, location.lng]}
                        icon={getMarkerIcon(location.type, selectedLocation?.name === location.name)}
                        eventHandlers={{
                          click: () => handleLocationClick(location),
                        }}
                      >
                        <Popup>
                          <Typography 
                            variant="subtitle1"
                            sx={{ 
                              fontFamily: 'Fredoka, sans-serif',
                              color: '#2E7D32',
                            }}
                          >
                            {location.name}
                          </Typography>
                          <Typography variant="body2">{location.description}</Typography>
                        </Popup>
                      </Marker>
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
                  Wat zie je hier?
                </Typography>
                {selectedLocation ? (
                  <>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{
                        fontFamily: 'Fredoka, sans-serif',
                        color: '#1B5E20',
                        mb: 3,
                      }}
                    >
                      {selectedLocation.name}
                    </Typography>
                    <Typography 
                      color="textSecondary" 
                      paragraph
                      sx={{ fontSize: '1.1rem', fontFamily: 'Fredoka, sans-serif', color: '#2E7D32' }}
                    >
                      {selectedLocation.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Dit is een: {selectedLocation.type}
                    </Typography>
                  </>
                ) : (
                  <Typography color="textSecondary">
                    Klik op een plek op de kaart om meer te ontdekken!
                  </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{
                      fontFamily: 'Fredoka, sans-serif',
                      color: '#2E7D32',
                    }}
                  >
                    Wat wil je zien?
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['all', 'city', 'river', 'mountain', 'sea', 'region'].map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedType(type as typeof selectedType)}
                        sx={{
                          borderRadius: '15px',
                          textTransform: 'none',
                          fontFamily: 'Fredoka, sans-serif',
                          backgroundColor: selectedType === type ? '#4CAF50' : 'transparent',
                          borderColor: '#4CAF50',
                          color: selectedType === type ? 'white' : '#4CAF50',
                          '&:hover': {
                            backgroundColor: selectedType === type ? '#43A047' : 'rgba(76, 175, 80, 0.1)',
                          },
                        }}
                      >
                        {type === 'all' ? 'Alles' :
                         type === 'city' ? 'Steden' :
                         type === 'river' ? 'Rivieren' :
                         type === 'mountain' ? 'Bergen' :
                         type === 'sea' ? 'Zeeën' : 'Regio\'s'}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 