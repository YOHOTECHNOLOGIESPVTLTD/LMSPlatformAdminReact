import React from 'react';
import { Box, Typography, Avatar, Card, CardMedia, Grid } from '@mui/material';
import { getImageUrl } from 'themes/imageUtlis';

const InstituteProfileimage = ({ institute }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        padding: 4,
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          textAlign: 'center',
          width: { xs: '100%', md: '250px' },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            pb: 2,
            color: '#000',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Logo
        </Typography>
        <Avatar
          alt="Institute Logo"
          src={getImageUrl(institute.logo)} // Replace with your logo URL
          sx={{
            width: 120,
            height: 120,
            margin: '0 auto',
            marginBottom: 2,
            boxShadow: 4,
          }}
        />
      </Box>

      {/* Images Section */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
            color: '#000',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Gallery Images
        </Typography>

        {/* Gallery */}
        <Grid container spacing={2}>
          {institute.gallery_images?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={getImageUrl(image)} // Dynamically load images from the gallery
                  alt={`Gallery Image ${index + 1}`}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InstituteProfileimage;
