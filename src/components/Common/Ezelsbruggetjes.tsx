import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import SuperAugurk from './SuperAugurk';

interface Ezelsbrug {
  locaties: string[];
  ezelbrug: string;
  type: 'stad' | 'rivier' | 'regio' | 'zee' | 'combinatie';
  uitleg?: string;
}

const ezelsbruggetjes: Ezelsbrug[] = [
  {
    locaties: ['Hamburg', 'Bremen', 'Hannover'],
    ezelbrug: "Hamburgers Bremen Hun auto in Hannover",
    type: 'stad',
    uitleg: "Deze steden liggen van noord naar zuid in deze volgorde"
  },
  {
    locaties: ['Berlijn'],
    ezelbrug: "De Beer Lijnt in Berlijn",
    type: 'stad',
    uitleg: "De beer is het symbool van Berlijn"
  },
  {
    locaties: ['München', 'Stuttgart'],
    ezelbrug: "Mün(t)chen Stutt(ert) van de Duitse auto's",
    type: 'stad',
    uitleg: "Beide steden zijn bekend om hun auto-industrie (BMW en Mercedes)"
  },
  {
    locaties: ['Rijn', 'Keulen', 'Bonn'],
    ezelbrug: "De Rijn stroomt door Keulen, waar ze Bonnen maken",
    type: 'combinatie',
    uitleg: "De Rijn stroomt langs beide steden"
  },
  {
    locaties: ['Frankfurt'],
    ezelbrug: "Frank zoekt zijn fort aan de Main",
    type: 'stad',
    uitleg: "Frankfurt ligt aan de rivier de Main"
  },
  {
    locaties: ['Ruhrgebied', 'Essen', 'Dortmund'],
    ezelbrug: "In het Ruhrgebied kun je lekker Essen en Dort(mund)drinken",
    type: 'combinatie',
    uitleg: "Essen en Dortmund zijn belangrijke steden in het Ruhrgebied"
  },
  {
    locaties: ['Zwarte Woud'],
    ezelbrug: "In het Zwarte Woud is het zo donker dat je de bomen niet ziet",
    type: 'regio',
    uitleg: "Het Zwarte Woud is een dichtbebost gebied"
  },
  {
    locaties: ['Noordzee', 'Oostzee'],
    ezelbrug: "In het Noorden en Oosten ligt de zee te wachten",
    type: 'zee',
    uitleg: "De Noordzee ligt in het noorden, de Oostzee in het oosten"
  },
  {
    locaties: ['Elbe', 'Dresden'],
    ezelbrug: "De Elbe Draait en Dendert door Dresden",
    type: 'combinatie',
    uitleg: "De Elbe stroomt door Dresden"
  }
];

export default function Ezelsbruggetjes() {
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
            fontFamily: 'Chicle, cursive',
            fontSize: '3rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 4,
          }}
        >
          Ezelsbruggetjes met SuperAugurk!
        </Typography>

        <Grid container spacing={3}>
          {ezelsbruggetjes.map((brug, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                  border: '4px solid #A5D6A7',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {brug.locaties.map((locatie, idx) => (
                      <Chip
                        key={idx}
                        label={locatie}
                        sx={{
                          m: 0.5,
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          fontFamily: 'Fredoka, sans-serif',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontFamily: 'Chicle, cursive',
                      color: '#1B5E20',
                      fontSize: '1.5rem',
                    }}
                  >
                    {brug.ezelbrug}
                  </Typography>
                  {brug.uitleg && (
                    <Typography 
                      sx={{ 
                        mt: 1,
                        fontFamily: 'Fredoka, sans-serif',
                        color: '#2E7D32',
                      }}
                    >
                      {brug.uitleg}
                    </Typography>
                  )}
                  <Chip
                    label={brug.type}
                    size="small"
                    sx={{
                      mt: 2,
                      backgroundColor: 
                        brug.type === 'stad' ? '#FF93A8' :
                        brug.type === 'rivier' ? '#93CAFF' :
                        brug.type === 'regio' ? '#D093FF' :
                        brug.type === 'zee' ? '#93FFED' :
                        '#FFE793',
                      fontFamily: 'Fredoka, sans-serif',
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 