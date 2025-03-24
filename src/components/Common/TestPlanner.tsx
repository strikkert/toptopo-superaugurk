import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SuperAugurk from './SuperAugurk';

interface Test {
  id: number;
  date: string;
  subject: string;
}

export default function TestPlanner() {
  const [tests, setTests] = useState<Test[]>([]);
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');

  const handleAddTest = () => {
    if (date && subject) {
      setTests([...tests, { id: Date.now(), date, subject }]);
      setDate('');
      setSubject('');
    }
  };

  const handleDeleteTest = (id: number) => {
    setTests(tests.filter(test => test.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk emotion="thinking" size={120} />
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
          Plan je Toetsen!
        </Typography>

        <Card
          sx={{
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            border: '4px solid #A5D6A7',
            mb: 4,
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.8)',
                    },
                    '& fieldset': {
                      borderColor: '#A5D6A7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4CAF50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E7D32',
                    },
                  },
                }}
              />
              <TextField
                placeholder="Wat ga je leren?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.8)',
                    },
                    '& fieldset': {
                      borderColor: '#A5D6A7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4CAF50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E7D32',
                    },
                  },
                }}
              />
              <Button
                onClick={handleAddTest}
                variant="contained"
                sx={{
                  borderRadius: '15px',
                  textTransform: 'none',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '1.1rem',
                  backgroundColor: '#4CAF50',
                  color: '#FFFFFF',
                  minWidth: '120px',
                  '&:hover': {
                    backgroundColor: '#43A047',
                  },
                }}
              >
                Toevoegen
              </Button>
            </Box>
          </CardContent>
        </Card>

        {tests.length > 0 && (
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
                  color: '#1B5E20',
                  mb: 3,
                }}
              >
                Jouw Toetsen
              </Typography>
              <List>
                {tests.map((test) => (
                  <ListItem
                    key={test.id}
                    sx={{
                      borderRadius: '15px',
                      mb: 2,
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: 'Fredoka, sans-serif',
                            color: '#1B5E20',
                            fontSize: '1.2rem',
                          }}
                        >
                          {test.subject}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontFamily: 'Fredoka, sans-serif',
                            color: '#2E7D32',
                          }}
                        >
                          {new Date(test.date).toLocaleDateString('nl-NL', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      }
                    />
                    <IconButton
                      onClick={() => handleDeleteTest(test.id)}
                      sx={{
                        color: '#F44336',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
} 