import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  LinearProgress,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QuizIcon from '@mui/icons-material/Quiz';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'quiz-master',
    title: 'Quiz Meester',
    description: 'Voltooi 10 quizzen met een score van 80% of hoger',
    icon: <QuizIcon sx={{ fontSize: 40 }} />,
    progress: 3,
    total: 10,
    unlocked: false,
  },
  {
    id: 'explorer',
    title: 'Ontdekkingsreiziger',
    description: 'Bezoek 20 verschillende locaties op de kaart',
    icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
    progress: 8,
    total: 20,
    unlocked: false,
  },
  {
    id: 'perfect-score',
    title: 'Perfecte Score',
    description: 'Behaal een perfecte score in een quiz',
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    progress: 0,
    total: 1,
    unlocked: false,
  },
  {
    id: 'champion',
    title: 'Topografie Kampioen',
    description: 'Voltooi alle beschikbare quizzen',
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    progress: 0,
    total: 1,
    unlocked: false,
  },
];

export default function Rewards() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Beloningen
        </Typography>

        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={3} key={achievement.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: achievement.unlocked ? 1 : 0.7,
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      color: achievement.unlocked ? 'primary.main' : 'text.secondary',
                      mb: 2,
                    }}
                  >
                    {achievement.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    {achievement.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(achievement.progress / achievement.total) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {achievement.progress} / {achievement.total}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 