import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { updatePassword } from '../service/forgotPasswordService';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const PasswordResetForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if(!oldPassword&&!newPassword&&!confirmPassword){
      setError('Please fill the all the feilds.')
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if(oldPassword===newPassword){
      setError('Your new Password is same as your previous password')
      return;
    }
     const otp_data = Cookies.get('otp_data');
        const datas = JSON.parse(otp_data);
        
    
    

    try {
      const response = await updatePassword({email:datas?.email,newPassword,confirmPassword});
      if (response.status==="success") {
        setSuccess('Password reset successfully');
        toast.success("password reset successfully")
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
          Please enter your old and new password to reset your account.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="old password"
            label="old password"
            name="old password"
            autoComplete="old password"
            autoFocus
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
