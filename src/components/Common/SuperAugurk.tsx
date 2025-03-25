import React, { useState } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface SuperAugurkProps {
  message?: string;
  isHappy?: boolean;
}

const SuperAugurk: React.FC<SuperAugurkProps> = ({ message, isHappy = true }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: isMinimized ? '60px' : '200px',
        height: isMinimized ? '60px' : 'auto',
        backgroundColor: '#fff',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        zIndex: 1000,
        transition: 'all 0.3s ease-in-out',
        border: '2px solid #4CAF50',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Minimize/Maximize button */}
        <IconButton
          onClick={() => setIsMinimized(!isMinimized)}
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: '#4CAF50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#45a049',
            },
            zIndex: 1001,
          }}
        >
          {isMinimized ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        {/* Close button */}
        <IconButton
          onClick={() => setIsVisible(false)}
          sx={{
            position: 'absolute',
            top: -10,
            left: -10,
            backgroundColor: '#f44336',
            color: 'white',
            '&:hover': {
              backgroundColor: '#da190b',
            },
            zIndex: 1001,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* SuperAugurk face */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Eyes */}
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Box
              sx={{
                width: '20px',
                height: '20px',
                backgroundColor: '#000',
                borderRadius: '50%',
                animation: isHappy ? 'blink 3s infinite' : 'none',
              }}
            />
            <Box
              sx={{
                width: '20px',
                height: '20px',
                backgroundColor: '#000',
                borderRadius: '50%',
                animation: isHappy ? 'blink 3s infinite' : 'none',
              }}
            />
          </Box>

          {/* Mouth */}
          <Box
            sx={{
              width: '40px',
              height: '20px',
              borderBottom: isHappy ? '3px solid #000' : '3px solid #000',
              borderBottomLeftRadius: isHappy ? '20px' : '0',
              borderBottomRightRadius: isHappy ? '20px' : '0',
              transform: isHappy ? 'none' : 'rotate(180deg)',
            }}
          />

          {/* Message */}
          {!isMinimized && message && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: 'center',
                color: '#333',
                maxWidth: '150px',
                wordBreak: 'break-word',
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>

      <style>
        {`
          @keyframes blink {
            0%, 48%, 52%, 100% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(0.1);
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default SuperAugurk; 