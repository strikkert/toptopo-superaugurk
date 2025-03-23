import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Container,
  Grid,
} from '@mui/material';
import SuperAugurk from '../Common/SuperAugurk';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'city' | 'river' | 'mountain' | 'sea' | 'region';
}

const questions: Question[] = [
  {
    category: 'city',
    question: 'Wat is de hoofdstad van Duitsland?',
    options: ['Berlijn', 'München', 'Hamburg', 'Frankfurt'],
    correctAnswer: 0,
  },
  {
    category: 'river',
    question: 'Welke rivier stroomt door Keulen?',
    options: ['Elbe', 'Donau', 'Rijn', 'Main'],
    correctAnswer: 2,
  },
  {
    category: 'mountain',
    question: 'Wat is de hoogste berg van Duitsland?',
    options: ['Brocken', 'Zugspitze', 'Feldberg', 'Watzmann'],
    correctAnswer: 1,
  },
  {
    category: 'sea',
    question: 'Welke zee grenst aan het noorden van Duitsland?',
    options: ['Middellandse Zee', 'Noordzee', 'Oostzee', 'Beide B en C'],
    correctAnswer: 3,
  },
  {
    category: 'region',
    question: 'Wat is de grootste deelstaat van Duitsland?',
    options: ['Beieren', 'Saksen', 'Baden-Württemberg', 'Nedersaksen'],
    correctAnswer: 0,
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Question['category'] | 'all'>('all');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer.toString();
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const filteredQuestions = selectedCategory === 'all'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -20, top: -60, zIndex: 1 }}>
          <SuperAugurk 
            emotion={isCorrect === null ? 'happy' : isCorrect ? 'excited' : 'sad'} 
            size={120} 
          />
        </Box>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            color: '#2E7D32',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            fontSize: '2.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 4,
          }}
        >
          Duitse Topografie Quiz!
        </Typography>

        {!showResult ? (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Filter op categorie:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button
                  variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('all')}
                >
                  Alle
                </Button>
                <Button
                  variant={selectedCategory === 'city' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('city')}
                >
                  Steden
                </Button>
                <Button
                  variant={selectedCategory === 'river' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('river')}
                >
                  Rivieren
                </Button>
                <Button
                  variant={selectedCategory === 'mountain' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('mountain')}
                >
                  Bergen
                </Button>
                <Button
                  variant={selectedCategory === 'sea' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('sea')}
                >
                  Zeeën
                </Button>
                <Button
                  variant={selectedCategory === 'region' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory('region')}
                >
                  Regio's
                </Button>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mb: 4, height: 10, borderRadius: 5 }}
            />
            <Card
              sx={{
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                border: '4px solid #A5D6A7',
              }}
            >
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="body2" 
                    align="right" 
                    sx={{ mt: 1, color: '#2E7D32' }}
                  >
                    Vraag {currentQuestionIndex + 1} van {filteredQuestions.length}
                  </Typography>
                </Box>

                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    color: '#1B5E20',
                    mb: 3,
                  }}
                >
                  {currentQuestion.question}
                </Typography>

                <Grid container spacing={2}>
                  {filteredQuestions[currentQuestionIndex].options.map((option, index) => (
                    <Grid item xs={12} sm={6} key={option}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleAnswer(option)}
                        disabled={selectedAnswer !== null}
                        sx={{
                          borderRadius: '15px',
                          p: 2,
                          textTransform: 'none',
                          fontFamily: '"Comic Sans MS", cursive, sans-serif',
                          fontSize: '1.1rem',
                          backgroundColor: selectedAnswer === option
                            ? (isCorrect ? '#4CAF50' : '#F44336')
                            : '#FFFFFF',
                          color: selectedAnswer === option
                            ? '#FFFFFF'
                            : '#2E7D32',
                          border: '3px solid #A5D6A7',
                          '&:hover': {
                            backgroundColor: '#E8F5E9',
                            border: '3px solid #4CAF50',
                          },
                          '&.Mui-disabled': {
                            backgroundColor: selectedAnswer === option
                              ? (isCorrect ? '#4CAF50' : '#F44336')
                              : '#F5F5F5',
                            color: selectedAnswer === option
                              ? '#FFFFFF'
                              : '#9E9E9E',
                          },
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card
            sx={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
              border: '4px solid #A5D6A7',
              textAlign: 'center',
              p: 4,
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                color: '#1B5E20',
                mb: 2,
              }}
            >
              {score === filteredQuestions.length ? 'Geweldig gedaan!' : 'Goed geprobeerd!'}
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                color: '#2E7D32',
                mb: 4,
              }}
            >
              Je score: {score} van de {filteredQuestions.length}
            </Typography>

            <Button
              variant="contained"
              onClick={resetQuiz}
              sx={{
                borderRadius: '15px',
                p: 2,
                textTransform: 'none',
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                fontSize: '1.2rem',
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#43A047',
                },
              }}
            >
              Nog een keer spelen!
            </Button>
          </Card>
        )}
      </Box>
    </Container>
  );
} 