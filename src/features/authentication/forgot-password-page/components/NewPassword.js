import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { updatePassword } from '../service/forgotPasswordService';
import { useNavigate } from 'react-router';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if(!email&&!newPassword&&!confirmPassword){
      setError('Please fill the all the feilds.')
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await updatePassword({email,newPassword,confirmPassword});
      if (response.status==="success") {
        setSuccess('Password reset successfully');
        navigate('/student/home')
      } else {
        setError(response.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Reset Password
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Please enter your email and new password to reset your account.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}>
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PasswordResetForm;
