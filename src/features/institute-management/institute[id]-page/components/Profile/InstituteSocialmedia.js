import React from 'react';
import { Box, Grid, Link } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

const InstituteSocialmedia = ({ institute }) => {
    const socialMediaLinks = [
        { name: 'Facebook', icon: <Facebook sx={{ color: '#1877F2' }} />, link: institute?.social_media?.facebook, id: institute?.social_media?.facebook_id },
        { name: 'Instagram', icon: <Instagram sx={{ color: '#E4405F' }} />, link: institute?.social_media?.instagram, id: institute?.social_media?.instagram_id },
        { name: 'LinkedIn', icon: <LinkedIn sx={{ color: '#0A66C2' }} />, link: institute?.social_media?.linkedin, id: institute?.social_media?.linkedin_id },
        { name: 'Twitter', icon: <Twitter sx={{ color: '#1DA1F2' }} />, link: institute?.social_media?.twitter, id: institute?.social_media?.twitter_id },
    ];

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={4}>
                {socialMediaLinks.map((platform, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                            {platform.icon}
                            <Link
                                href={platform.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                                sx={{
                                    color: '#0D6EFD',
                                    fontFamily: 'Nunito Sans',
                                    fontSize: '16px',
                                    fontWeight: 400,
                                }}
                            >
                                {platform.id}
                            </Link>
                        </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default InstituteSocialmedia;
