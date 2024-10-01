// components/StepperCustomDot.js
import React from 'react';
import { StepIconProps } from '@mui/material/StepIcon';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { CheckCircle, Error, Circle, CircleOutlined } from '@mui/icons-material';

const StepperCustomDot = (props) => {
  const { active, completed, error } = props;

  return (
    <div
      style={{
        height: 22,
        width: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: error ? '#f44336' : '#bdbdbd',
      }}
    >
      {completed ? (
        <CheckCircle style={{ color: '#4caf50' }} />
      ) : active ? (
        <Circle style={{ color: '#1976d2' }} />
      ) : (
        <CircleOutlined style={{ color: '#bdbdbd' }} />
      )}
    </div>
  );
};

export default StepperCustomDot;
