import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Quiz',
      description: 'Test je kennis met interactieve quizzen',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      path: '/quiz',
    },
    {
      title: 'Interactieve Kaart',
      description: 'Leer topografie met een interactieve kaart',
      icon: <MapIcon sx={{ fontSize: 40 }} />,
      path: '/map',
    },
    {
      title: 'Beloningen',
      description: 'Verdien badges en volg je voortgang',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      path: '/rewards',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welkom bij TopTopo SuperAugurk
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Leer topografie op een leuke en interactieve manier!
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="textSecondary" paragraph>
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 