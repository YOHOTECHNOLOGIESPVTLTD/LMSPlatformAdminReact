import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

const InstituteSocialmedia = ({ institute }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={4} justifyContent="flex-start">
                
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 6 }}>
                        <Facebook />
                        <Link href={institute.facebook} target="_blank" rel="noopener" underline="hover">
                            <Typography
                                variant="body2"
                                color="#0D6EFD"
                                sx={{
                                    fontFamily: "Nunito Sans",
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    textDecorationLine: 'underline'
                                }}
                            >
                                {institute?.social_media.facebook_id}
                            </Typography>
                        </Link>
                    </Grid>
                
                
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 6 }}>
                        <Instagram />
                        <Link href={institute.instagram} target="_blank" rel="noopener" underline="hover">
                            <Typography
                                variant="body2"
                                color="#0D6EFD"
                                sx={{
                                    fontFamily: "Nunito Sans",
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    textDecorationLine: 'underline'
                                }}
                            >
                                {institute?.social_media.facebook_id}
                            </Typography>
                        </Link>
                    </Grid>
                
               
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 6 }}>
                        <LinkedIn />
                        <Link href={institute.linkedin} target="_blank" rel="noopener" underline="hover">
                            <Typography
                                variant="body2"
                                color="#0D6EFD"
                                sx={{
                                    fontFamily: "Nunito Sans",
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    textDecorationLine: 'underline'
                                }}
                            >
                                {institute?.social_media.facebook_id}
                            </Typography>
                        </Link>
                    </Grid>
                
                
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 6 }}>
                        <Twitter />
                        <Link href={institute.twitter} target="_blank" rel="noopener" underline="hover">
                            <Typography
                                variant="body2"
                                color="#0D6EFD"
                                sx={{
                                    fontFamily: "Nunito Sans",
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    textDecorationLine: 'underline'
                                }}
                            >
                                {institute?.social_media.facebook_id}
                            </Typography>
                        </Link>
                    </Grid>
                
            </Grid>
        </Box>
    );
};

export default InstituteSocialmedia;
