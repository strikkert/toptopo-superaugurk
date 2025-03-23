import React from 'react';
import { Box, keyframes } from '@mui/material';

interface SuperAugurkProps {
  emotion?: 'happy' | 'excited' | 'thinking' | 'sad';
  size?: number;
}

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`;

export default function SuperAugurk({ emotion = 'happy', size = 100 }: SuperAugurkProps) {
  const getEyeStyle = () => {
    switch (emotion) {
      case 'excited':
        return {
          height: '25%',
          borderRadius: '50%',
          animation: `${wiggle} 0.5s ease-in-out infinite`,
        };
      case 'thinking':
        return {
          height: '15%',
          borderRadius: '25%',
          transform: 'rotate(-10deg)',
        };
      case 'sad':
        return {
          height: '15%',
          borderRadius: '25%',
          transform: 'rotate(10deg)',
        };
      default:
        return {
          height: '20%',
          borderRadius: '50%',
        };
    }
  };

  const getMouthStyle = () => {
    switch (emotion) {
      case 'excited':
        return {
          width: '60%',
          height: '30%',
          borderRadius: '50%',
          border: '4px solid #2E7D32',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          transform: 'translateY(-10px)',
        };
      case 'thinking':
        return {
          width: '30%',
          height: '10%',
          backgroundColor: '#2E7D32',
          borderRadius: '25%',
          transform: 'translateY(10px) rotate(-10deg)',
        };
      case 'sad':
        return {
          width: '60%',
          height: '30%',
          borderRadius: '50%',
          border: '4px solid #2E7D32',
          borderBottom: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          transform: 'translateY(10px) rotate(180deg)',
        };
      default:
        return {
          width: '60%',
          height: '30%',
          borderRadius: '50%',
          border: '4px solid #2E7D32',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
        };
    }
  };

  return (
    <Box
      sx={{
        width: size,
        height: size * 1.5,
        position: 'relative',
        animation: emotion === 'excited' ? `${bounce} 0.5s ease-in-out infinite` : 'none',
      }}
    >
      {/* Lichaam */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#A5D6A7',
          borderRadius: '40% 40% 30% 30%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '40%',
          },
        }}
      >
        {/* Ogen */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '25%',
              backgroundColor: '#2E7D32',
              ...getEyeStyle(),
            }}
          />
          <Box
            sx={{
              width: '25%',
              backgroundColor: '#2E7D32',
              ...getEyeStyle(),
            }}
          />
        </Box>

        {/* Mond */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            ...getMouthStyle(),
          }}
        />
      </Box>
    </Box>
  );
} 