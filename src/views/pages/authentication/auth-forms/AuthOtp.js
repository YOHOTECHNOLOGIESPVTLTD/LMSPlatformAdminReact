import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Container, Paper, Typography, Button, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { useSpinner } from 'context/spinnerContext';
import {resendOtp, validateOtp } from 'features/authentication/forgot-password-page/service/forgotPasswordService';


const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
  background: ${theme.palette.mode === 'dark' ? theme.palette.primary.main : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? theme.palette.secondary : theme.palette.secondary};

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        onChange((prevOtp) => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;
    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join('');
    });
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split('');

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(''));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <InputElement
            ref={(ele) => {
              inputRefs.current[index] = ele;
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onChange={(event) => handleChange(event, index)}
            onClick={(event) => handleClick(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            value={value[index] ?? ''}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired
};

const AuthOtpForm = () => {
  const [otp, setOtp] = React.useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [error, setError] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { showSpinnerFn, hideSpinnerFn } = useSpinner();

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }
    setIsResendDisabled(true);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    const otp_data = Cookies.get('otp_data');
    if (!otp_data) return;

    const otp_data2 = JSON.parse(otp_data);
    const response = await resendOtp(otp_data2.email);
    console.log('resended otp', response);

    if (response.success) {
      setTimeLeft(20);
      setIsResendDisabled(true);
      setError('')
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6 || otp.includes(' ')) {
      setError('Please enter all OTP digits.');
      return;
    }
    const otp_data = Cookies.get('otp_data');
    const otp_data2 = JSON.parse(otp_data);
    console.log('otpppp', otp_data2.token);

    console.log('Entered otp', otp);
    setError('');
    try {
      showSpinnerFn();
      // const data = { "email": otp_data2?.email,"otp": otp,"token": otp_data2?.token.token };
      const response = await validateOtp({ email: otp_data2?.email, otp: otp, token: otp_data2?.token.token });
      console.log('response', response);
      if (response.status==="success") {
        navigate('/new-password');
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      hideSpinnerFn();
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          OTP Verification
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Please enter the OTP sent to your email.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          <OTP value={otp} onChange={setOtp} length={6} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
            <Box>
              <Typography sx={{ color: '#000000', fontSize: '16px', fontWeight: 700, lineHeight: '21px' }}>
                {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                {timeLeft % 60}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleResend}
                disabled={isResendDisabled}
                sx={{
                  mt: 2,
                  borderRadius: 5,
                  color: '#8D8E90',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  fontWeight: 700,
                  border: 'none',
                  ':hover': { border: 'none', backgroundColor: '#F8F7FA' },
                  padding: '0px'
                }}
              >
                Resend OTP
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: '#0D6EFD',
                  color: 'white',
                  borderRadius: '36px',
                  boxShadow: '0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)',
                  fontSize: '13px',
                  fontWeight: 700,
                  lineHeight: '15px',
                  width: '101px',
                  height: '37px',
                  ':hover': { backgroundColor: '#0D6EFD' }
                }}
                onClick={handleVerify}
              >
                Verify
              </Button>
              <Button
                sx={{
                  backgroundColor: '#0D6EFD',
                  color: 'white',
                  borderRadius: '36px',
                  boxShadow: '0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)',
                  fontSize: '13px',
                  fontWeight: 700,
                  lineHeight: '15px',
                  width: '101px',
                  height: '37px',
                  ml: 5,
                  ':hover': { backgroundColor: '#0D6EFD' }
                }}
                onClick={() => navigate('/new-password')}
              >
                GO
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthOtpForm;
