import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Container } from '@mui/material';
import { sendOtpForPasswordReset } from '../service/forgotPasswordService';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const UserNameAndEmailInput = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('email', email);

      const response = await sendOtpForPasswordReset(email);
      console.log('OTP sent successfully:', response);

      const otpData = {
        email: email,
        token: response.data,
        otp: response.data.otp
      };
      Cookies.set('otp_data', JSON.stringify(otpData));

      navigate('/verify-otp');
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'Failed to send OTP');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please enter your email address to reset your password.
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Send OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserNameAndEmailInput;
