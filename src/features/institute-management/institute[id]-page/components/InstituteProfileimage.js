import React from 'react';
import { Box, Typography, Avatar, Card, CardMedia, Grid } from '@mui/material';

const InstituteProfileimage = (institute) => {
    // Function to handle file upload
    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file); // Create a local URL for the uploaded image
    //         setImages((prevImages) => [...prevImages, imageUrl]); // Add the new image to the list
    //     }
    // };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: 4}}>
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ pb: 2,color: "#000", fontFamily:"Poppins",fontSize:"16px",fontWeight:600}}>Logo</Typography>
                <Avatar
                    alt="Logo"
                    src={institute.logo} // Replace with your logo URL
                    sx={{ width: 80, height: 80, marginBottom: 1, boxShadow: 4 }}
                />
                
            </Box>

            {/* Images Section */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ marginBottom: 2, color: "#000", fontFamily: "Poppins", fontSize: "16px", fontWeight: 600 }}>
                    Images
                </Typography>

                {/* Upload Button */}
                {/* <Button
                    variant="contained"
                    component="label"
                    sx={{ marginBottom: 2 }}
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </Button> */}

                {/* Image Gallery */}
                <Grid container spacing={2} width={1000}>
                    
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 4 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                image={institute.institute.image}
                                    alt={`Uploaded Image`}
                                    sx={{ borderRadius: 2 }}
                                />
                            </Card>
                        </Grid>
                
                </Grid>
            </Box>
        </Box>
    );
};

export default InstituteProfileimage