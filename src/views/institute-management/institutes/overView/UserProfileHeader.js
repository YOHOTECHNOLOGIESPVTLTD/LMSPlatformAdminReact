// ** React Imports
// import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
// import CustomChip from '@mui/material/Chip';

// import { useSearchParams } from 'react-router-dom'

// ** Third Party Imports
// import axios from 'axios'

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
const data = {
  location: 'Vatican City',
  joiningDate: 'April 2021',
  fullName: 'Belle Ferguson',
  designation: 'UX Designer',
  profileImg: '/images/avatars/14.png',
  designationIcon: 'tabler:color-swatch',
  coverImg: 'https://th.bing.com/th/id/OIP.-_PJcHTPZ0z-z3SmklPTwwHaEo?rs=1&pid=ImgDetMain'
};

// console.log(instituteData);
//   // ** State
//   const [data, setData] = useState(null)
//   useEffect(() => {
//     axios.get('/pages/profile-header').then(response => {
//       setData(response.data)
//     })
//   }, [])
const designationIcon = data?.designationIcon || 'tabler:briefcase';

const UserProfileHeader = ({ instituteData }) => {
  const [isActive, setIsActive] = useState(instituteData?.is_active === 1);
  const handleChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };
  return (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={data.coverImg}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -5,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src="https://wallpaperaccess.com/full/2213424.jpg" alt="profile-picture" />
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
          <Box sx={{ mb: [5, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {instituteData?.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize="1.25rem" icon={designationIcon} />
                <Typography sx={{ color: 'text.secondary' }}>{instituteData?.email}</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize="1.25rem" icon="tabler:map-pin" />
                <Typography sx={{ color: 'text.secondary' }}>{instituteData?.city}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize="1.25rem" icon="tabler:calendar" />
                <Typography sx={{ color: 'text.secondary' }}>Joined {instituteData?.created_at}</Typography>
              </Box>
            </Box>
          </Box>
          {/* <Button
            variant="contained"
            sx={{
              '& svg': { mr: 2 },
              backgroundColor: instituteData?.is_active === 1 ? '#4CAF50' : '#FF5252',
              color: 'white',
              '&:hover': {
                backgroundColor: instituteData?.is_active === 1 ? '#4CAF50' : '#FF5252'
              }
            }}
            color="success"
          >
            <Icon icon={instituteData?.is_active === 1 ? 'tabler:check' : 'tabler:x'} />
            {instituteData?.is_active === 1 ? 'Active' : 'Inactive'}
          </Button> */}
          <FormControlLabel
            control={<Switch checked={isActive} onChange={handleChange} color={isActive ? 'success' : 'error'} inputProps={{ 'aria-label': 'controlled' }} />}
            label={isActive ? 'Active' : 'Inactive'}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
