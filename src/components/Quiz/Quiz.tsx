import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Container,
} from '@mui/material';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: 'Wat is de hoofdstad van Nederland?',
    options: ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht'],
    correctAnswer: 0,
  },
  {
    question: 'Welke rivier stroomt door Amsterdam?',
    options: ['Rijn', 'Maas', 'Amstel', 'Schelde'],
    correctAnswer: 2,
  },
  {
    question: 'Wat is de hoogste berg van Nederland?',
    options: ['Vaalserberg', 'Sint Pietersberg', 'Grensberg', 'Wilhelminaberg'],
    correctAnswer: 0,
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Topografie Quiz
        </Typography>

        {!showScore ? (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mb: 4, height: 10, borderRadius: 5 }}
            />
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vraag {currentQuestion + 1} van {questions.length}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {questions[currentQuestion].question}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? 'contained' : 'outlined'}
                      onClick={() => handleAnswerClick(index)}
                      sx={{ mb: 2, width: '100%', justifyContent: 'flex-start' }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  sx={{ mt: 2 }}
                >
                  {currentQuestion + 1 === questions.length ? 'Afronden' : 'Volgende'}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Quiz Afgerond!
              </Typography>
              <Typography variant="h5" gutterBottom>
                Je score: {score} van {questions.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRestart}
                sx={{ mt: 2 }}
              >
                Opnieuw Proberen
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
} 