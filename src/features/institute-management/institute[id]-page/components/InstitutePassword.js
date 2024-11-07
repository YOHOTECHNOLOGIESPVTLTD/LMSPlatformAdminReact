import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { useState } from 'react';

const InstitutePassword = (institute) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Simulated async password verification function
    const verifyOldPassword = async (password) => {
        setLoading(true);
        // Simulate an API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);

        // Replace this condition with an actual API response check
        return password === 'correctPassword123'; // Mock correct password
    };

    const handleOldPasswordChange = async (event) => {
        const value = event.target.value;
        setOldPassword(value);

        // Call API or function to verify password dynamically
        if (value) {
            const isCorrect = await verifyOldPassword(value);
            setIsOldPasswordCorrect(isCorrect);
        } else {
            setIsOldPasswordCorrect(false);
        }
    };

    const handleSubmit = () => {
        if (newPassword && reenterPassword && newPassword === reenterPassword) {
            setSuccessMessage('Your password will change');
            // You could also trigger an actual password change API call here
        } else {
            setSuccessMessage('Passwords do not match');
        }
    };

    console.log(institute,"institutessssssss")

    return (
        <Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                    Institute Name:
                </Typography>
                    <Typography sx={{ mr: 2, fontWeight: 400, color: '#000', fontFamily: 'Inter', fontSize: '15px' }}>{institute.institute.institute_name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                    Institute Email:
                </Typography>
                    <Typography sx={{ mr: 2, fontWeight: 400, color: '#000', fontFamily: 'Inter', fontSize: '15px' }}>{institute.institute.email}</Typography>
            </Box>
            </Box>
            <Grid container spacing={2}>
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
                        disabled={!isOldPasswordCorrect}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
                {successMessage && (
                    <Grid item xs={12}>
                        <Typography color="success.main">{successMessage}</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default InstitutePassword;
