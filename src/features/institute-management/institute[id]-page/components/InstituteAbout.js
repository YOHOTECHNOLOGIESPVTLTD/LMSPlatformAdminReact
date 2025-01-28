import React from 'react';
import { Box, Container, Grid, Typography, Avatar, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const InstituteAbout = () => {
  const institute = {
    logo: "staticfiles/lms/6267591d-1284-4f8b-b9c3-4cb5e7d46aa2.png",
    name: "Oxford",
    address: "Oxfordshire, England",
    email: "institute@gmail.com",
    phone: "5411754721",
    description: `The University of Oxford is a collegiate research university in Oxford, England. 
    There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking 
    world and the world's second-oldest university in continuous operation.`,
    vision: `To remain an outstanding provider of high-quality education, inspiring and developing 
    a global perspective among students.`,
    mission: [
      "Provide quality education and ignite young minds.",
      "Create proactive and excellent professionals.",
      "Prepare students to compete globally and become self-reliant.",
    ],
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Avatar
              src={institute.logo}
              alt={institute.name}
              sx={{ width: 120, height: 120, mb: 2, mx: "auto" }}
            />
            <Typography variant="h5" fontWeight={700}>
              {institute.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              {institute.address}
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ color: "gray", mr: 1 }} />
                <Typography variant="body2">{institute.address}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ color: "gray", mr: 1 }} />
                <Typography variant="body2">{institute.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ color: "gray", mr: 1 }} />
                <Typography variant="body2">{institute.phone}</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Box>
            {/* Description */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={4}>
              {institute.description}
            </Typography>

            {/* Vision */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Vision
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={4}>
              {institute.vision}
            </Typography>

            {/* Mission */}
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Mission
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: "textSecondary", mb: 4 }}>
              {institute.mission.map((point, index) => (
                <Typography component="li" variant="body2" key={index}>
                  {point}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstituteAbout;
