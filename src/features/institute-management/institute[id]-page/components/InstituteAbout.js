import React from 'react';
import { Box, Container, Grid, Typography, Avatar, Card, CardContent, Stack, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const InstituteAbout = ({ institute }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Institute Logo and Basic Info */}
          <Grid item xs={12} md={4} textAlign="center">
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Avatar
              src={`${process.env.REACT_APP_PUBLIC_API_URL}/${institute?.logo}`}
              alt={institute?.slug}
              sx={{ width: 140, height: 140, mb: 2 }}
            />
            <Typography variant="h5" fontWeight={700}>{institute?.institute_name}</Typography>
            <Typography variant="body2" color="textSecondary">{institute?.email}</Typography>
            </Box>
            
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>Contact Details</Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center">
                  <LocationOnIcon sx={{ color: 'gray', mr: 1 }} />
                  <Typography variant="body2">
                    {institute?.contact_info.address.address2}, {institute?.contact_info.address.city},
                    {institute?.contact_info.address.pincode}, {institute?.contact_info.address.state}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <EmailIcon sx={{ color: 'gray', mr: 1 }} />
                  <Typography variant="body2">{institute?.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <PhoneIcon sx={{ color: 'gray', mr: 1 }} />
                  <Typography variant="body2">{institute?.contact_info.phone_no}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        {/* About Section */}
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>About Us</Typography>
          <Typography variant="body2" color="textSecondary">
            {institute?.description}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default InstituteAbout;