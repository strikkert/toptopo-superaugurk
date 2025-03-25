import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';

// Importeer componenten
import Layout from './components/Common/Layout';
import Home from './components/Common/Home';
import Quiz from './components/Quiz/Quiz';
import Map from './components/Map/Map';
import Rewards from './components/Common/Rewards';
import Settings from './components/Common/Settings';
import TestPlanner from './components/Common/TestPlanner';
import Ezelsbruggetjes from './components/Common/Ezelsbruggetjes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/map" element={<Map />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/test-planner" element={<TestPlanner />} />
            <Route path="/ezelsbruggetjes" element={<Ezelsbruggetjes />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
