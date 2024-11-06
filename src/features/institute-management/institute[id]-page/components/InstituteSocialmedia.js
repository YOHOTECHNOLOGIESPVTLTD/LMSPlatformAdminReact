import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Email, Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter'; // Replace with X icon if needed


const InstituteSocialmedia = () => {
    // Define social links data
    const links = [
        { name: 'Google', url: 'https://www.google.co.in/', icon: <GoogleIcon color="error" /> },
        { name: 'Email', url: 'mailto:Rajalakshmi@place.com', icon: <Email color="error" /> },
        { name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: <WhatsApp color="success" /> },
        { name: 'LinkedIn', url: 'https://in.linkedin.com/', icon: <LinkedIn color="primary" /> },
        { name: 'Facebook', url: 'https://www.facebook.com/login/', icon: <Facebook color="primary" /> },
        { name: 'Instagram', url: 'https://www.instagram.com/', icon: <Instagram color="secondary" /> },
        { name: 'Twitter', url: 'https://x.com/i/flow/login', icon: <TwitterIcon sx={{ color: 'black' }} /> },
    ];

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={4} justifyContent="flex-start">
                {links.map((link, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1,pb:6 }}>
                        {link.icon}
                        <Link href={link.url} target="_blank" rel="noopener" underline="hover">
                            <Typography variant="body2" color="#0D6EFD" sx={{ fontFamily:"Nunito Sans",fontSize:'16px',fontWeight:400,textDecorationLine:'underline'}}>
                                {link.url}
                            </Typography>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default InstituteSocialmedia