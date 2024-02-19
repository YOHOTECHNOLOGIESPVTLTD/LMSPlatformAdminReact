// ** React Imports
// ** React Imports
// import { useState, useEffect } from 'react';

// ** MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import { Grid } from '@mui/material';

// ** Third Party Imports
// import axios from 'axios';

// ** Icon Imports
import Icon from 'components/icon';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}));

// ** State


const UserViewLeft = () => {

// const designationIcon = data?.designationIcon || 'tabler:briefcase';
return(
  <Card>
    <CardMedia
      component="img"
      alt="profile-header"
      image='https://th.bing.com/th/id/R.2609fa18d5091dc020ae92e8ffde827d?rik=EFdtfi8dYkunsA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fBeautiful-Gradient-Wallpaper.jpg&ehk=wHC%2bBEdWF6fKy71W%2byG8l40bZoD6JV35mjLfEsDFAdQ%3d&risl=&pid=ImgRaw&r=0'
      sx={{
        height: { xs: 150, md: 250 }
      }}
    />
    <CardContent
      sx={{
        pt: 0,
        mt: -8,
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        justifyContent: { xs: 'center', md: 'flex-start' }
      }}
    >
      <ProfilePicture src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg' alt="profile-picture" />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          ml: { xs: 0, md: 6 },
          alignItems: 'flex-end',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: ['center', 'space-between']
        }}
      >
        <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
          
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: ['center', 'flex-start'],
              alignItems:'center'
            }}
          >
            <Typography variant="h3" sx={{ mr: 4, display: 'flex', alignItems: 'center' }}>
           Lara Carlson
          </Typography>
            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
              <Icon fontSize="1.25rem" icon='tabler:briefcase' />
              <Typography sx={{ color: 'text.secondary' }}>ReactJs</Typography>
            </Box>  
            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
              <Icon fontSize="1.25rem" icon="tabler:map-pin" />
              <Typography sx={{ color: 'text.secondary' }}>london</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
              <Icon fontSize="1.25rem" icon="tabler:calendar" />
              <Typography sx={{ color: 'text.secondary' }}>Joined 11/09/2023</Typography>
            </Box>
          </Box>
        </Box>
        <Button variant="contained" sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:check" fontSize="1.125rem" />
          Active
        </Button>
      </Box>
    </CardContent>
  </Card>

)


  
};

export default UserViewLeft;
