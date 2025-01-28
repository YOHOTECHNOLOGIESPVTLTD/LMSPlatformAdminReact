import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

const InstitutePassword = ({ institute }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulated async password verification function
  const verifyOldPassword = async (password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
    setLoading(false);
    return password === 'correctPassword123'; // Replace with real API validation
  };

  const handleOldPasswordChange = async (event) => {
    const value = event.target.value;
    setOldPassword(value);

    if (value) {
      const isCorrect = await verifyOldPassword(value);
      setIsOldPasswordCorrect(isCorrect);
    } else {
      setIsOldPasswordCorrect(false);
    }
  };

  const handleSubmit = () => {
    if (newPassword && reenterPassword && newPassword === reenterPassword) {
      setSuccessMessage('Your password has been updated successfully!');
    } else {
      setSuccessMessage('Passwords do not match. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 4,
        bgcolor: '#f9f9f9',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Institute Info */}
      <Card
        sx={{
          marginBottom: 4,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontWeight: 600,
              fontFamily: 'Poppins',
              textAlign: 'center',
            }}
          >
            Institute Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon color="primary" />
                <Typography variant="body1" fontWeight={500}>
                  {institute.institute_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="secondary" />
                <Typography variant="body1" fontWeight={500}>
                  {institute.email}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Password Update Form */}
      <Card
        sx={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 3,
              fontWeight: 600,
              fontFamily: 'Poppins',
              textAlign: 'center',
            }}
          >
            Update Password
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Old Password"
                type="password"
                fullWidth
                value={oldPassword}
                onChange={handleOldPasswordChange}
                InputProps={{
                  endAdornment: loading ? (
                    <CircularProgress size={20} />
                  ) : isOldPasswordCorrect ? (
                    <CheckCircleOutlineIcon color="success" />
                  ) : null,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isOldPasswordCorrect}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Re-enter Password"
                type="password"
                fullWidth
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
                disabled={!isOldPasswordCorrect}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isOldPasswordCorrect}
                onClick={handleSubmit}
                sx={{
                  paddingY: 1.5,
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                Update Password
              </Button>
            </Grid>
            {successMessage && (
              <Grid item xs={12}>
                <Typography
                  color={successMessage.includes('success') ? 'success.main' : 'error.main'}
                  textAlign="center"
                  sx={{ fontWeight: 500 }}
                >
                  {successMessage}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InstitutePassword;
