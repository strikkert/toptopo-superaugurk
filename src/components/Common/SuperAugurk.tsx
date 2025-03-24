import React from 'react';
import { Box, keyframes, Typography } from '@mui/material';

interface SuperAugurkProps {
  emotion?: 'happy' | 'excited' | 'thinking' | 'sad' | 'proud' | 'encouraging';
  size?: number;
  message?: string;
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

const blink = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(2deg); }
`;

const messages = {
  happy: "Geweldig gedaan! 🌟",
  excited: "Wauw, dat is super goed! 🎉",
  thinking: "Hmm, laten we even nadenken... 🤔",
  sad: "Niet getreurd, probeer het nog een keer! 💪",
  proud: "Ik ben zo trots op je! 🏆",
  encouraging: "Je kunt het! Ga door! ⭐"
};

export default function SuperAugurk({ emotion = 'happy', size = 100, message }: SuperAugurkProps) {
  const getEyeStyle = () => {
    switch (emotion) {
      case 'excited':
        return {
          height: '30%',
          borderRadius: '50%',
          animation: `${wiggle} 0.5s ease-in-out infinite`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: '30%',
            height: '30%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.8,
          }
        };
      case 'thinking':
        return {
          height: '15%',
          borderRadius: '25%',
          transform: 'rotate(-10deg)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '20%',
            height: '20%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.6,
          }
        };
      case 'sad':
        return {
          height: '15%',
          borderRadius: '25%',
          transform: 'rotate(10deg)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '30%',
            right: '20%',
            width: '20%',
            height: '20%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.4,
          }
        };
      case 'proud':
        return {
          height: '25%',
          borderRadius: '50%',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '25%',
            height: '25%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.9,
          }
        };
      case 'encouraging':
        return {
          height: '28%',
          borderRadius: '50%',
          animation: `${blink} 2s ease-in-out infinite`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '25%',
            right: '25%',
            width: '35%',
            height: '35%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.7,
          }
        };
      default:
        return {
          height: '20%',
          borderRadius: '50%',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '25%',
            height: '25%',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: 0.8,
          }
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
          animation: `${wiggle} 0.5s ease-in-out infinite`,
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
      case 'proud':
        return {
          width: '50%',
          height: '25%',
          borderRadius: '50%',
          border: '4px solid #2E7D32',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          transform: 'translateY(-5px)',
        };
      case 'encouraging':
        return {
          width: '55%',
          height: '28%',
          borderRadius: '50%',
          border: '4px solid #2E7D32',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          animation: `${float} 2s ease-in-out infinite`,
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Spraakballon */}
      {message && (
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '10px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #fff',
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#2E7D32',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Box>
      )}

      {/* SuperAugurk */}
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
                position: 'relative',
                ...getEyeStyle(),
              }}
            />
            <Box
              sx={{
                width: '25%',
                backgroundColor: '#2E7D32',
                position: 'relative',
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
    </Box>
  );
} 