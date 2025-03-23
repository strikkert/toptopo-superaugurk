import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {title}
        </Typography>
        <Typography color="textSecondary" align="center">
          Deze functionaliteit is momenteel in ontwikkeling. Kom binnenkort terug!
        </Typography>
      </Paper>
    </Box>
  );
} 