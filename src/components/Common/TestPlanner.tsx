import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import nl from 'date-fns/locale/nl';

interface TestPlan {
  id: string;
  title: string;
  date: Date;
  topics: string[];
  status: 'planned' | 'completed' | 'cancelled';
}

const availableTopics = [
  'Hoofdsteden',
  'Rivieren',
  'Bergen',
  'Zeeën',
  'Provincies',
  'Grenzen',
];

export default function TestPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [testPlans, setTestPlans] = useState<TestPlan[]>([]);

  const handleAddTestPlan = () => {
    if (!selectedDate || selectedTopics.length === 0) return;

    const newTestPlan: TestPlan = {
      id: Date.now().toString(),
      title: `Toets ${testPlans.length + 1}`,
      date: selectedDate,
      topics: [...selectedTopics],
      status: 'planned',
    };

    setTestPlans([...testPlans, newTestPlan]);
    setSelectedTopics([]);
  };

  const handleDeleteTestPlan = (id: string) => {
    setTestPlans(testPlans.filter((plan) => plan.id !== id));
  };

  const getStatusColor = (status: TestPlan['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Toets Planner
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nieuwe Toets Plannen
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
                  <DatePicker
                    label="Datum"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    sx={{ width: '100%', mb: 2 }}
                  />
                </LocalizationProvider>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Onderwerpen</InputLabel>
                  <Select
                    multiple
                    value={selectedTopics}
                    onChange={(e) => setSelectedTopics(e.target.value as string[])}
                    label="Onderwerpen"
                  >
                    {availableTopics.map((topic) => (
                      <MenuItem key={topic} value={topic}>
                        {topic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTestPlan}
                  disabled={!selectedDate || selectedTopics.length === 0}
                  fullWidth
                >
                  Toets Toevoegen
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Geplande Toetsen
                </Typography>
                {testPlans.length === 0 ? (
                  <Typography color="textSecondary">
                    Nog geen toetsen gepland. Voeg een nieuwe toets toe om te beginnen.
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {testPlans.map((plan) => (
                      <Card key={plan.id} variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6">{plan.title}</Typography>
                              <Typography color="textSecondary">
                                {plan.date.toLocaleDateString('nl-NL')}
                              </Typography>
                            </Box>
                            <Box>
                              <Chip
                                label={plan.status}
                                color={getStatusColor(plan.status)}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleDeleteTestPlan(plan.id)}
                              >
                                Verwijderen
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            {plan.topics.map((topic) => (
                              <Chip
                                key={topic}
                                label={topic}
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 