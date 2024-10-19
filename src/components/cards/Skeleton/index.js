import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const WaveSkeleton = styled(Box)(({ reverse }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: '#e0e0e0', 
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: reverse
      ? 'linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)'
      : 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
    animation: 'wave 1.5s infinite ease-in-out',
  },
  '@keyframes wave': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

const CustomSkeleton = ({ variant = 'rectangular', width, height, reverse = false, ...props }) => {
 
  const isCircular = variant === 'circular';
//   const isRectangular = variant === 'rectangular';

  return (
    <WaveSkeleton
      reverse={reverse}
      sx={{
        width,
        height: isCircular ? width : height, // For circular, match height to width
        borderRadius: isCircular ? '50%' : '4px', // Circular if variant is circular
      }}
      {...props}
    />
  );
};

export default CustomSkeleton;

