// ** MUI Components
import { useState } from 'react';
import { MenuItem, Tabs, Tab,TextField, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// ** Icon Imports
// import { Link } from 'react-router-dom';
import { instituteChangeStatus } from 'features/institute-management/services/instituteService';
import toast from 'react-hot-toast';
import StatusDialog from 'components/modal/DeleteModel';
import { imagePlaceholder } from 'lib/placeholders';
import { getImageUrl } from 'themes/imageUtlis';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import LocationOn from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserViewAccount from './UserViewAccount';
import InstituteAbout from './InstituteAbout';
import CourseView from './Course/CourseView';



const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}));

const images = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1"
];



const UserViewLeft = ({ institute }) => {
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         
    autoplaySpeed: 10000,    // 10 seconds
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  

  console.log(institute,"insti")

  return (

    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton sx={{ mr: 1 }} onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1, color: "#000", fontFamily:"Poppins",fontSize:'15px',fontWeight:'700',fontStyle:'normal'}}>
          {institute?.institute_name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px',mr:24 }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: '15px',
              fontWeight: '500'
            }}
          >
            LMSID:
          </Typography>
          <Typography
            sx={{
              color: "#747474",
              fontFamily: "Poppins",
              fontSize: '12px',
              fontWeight: '400'
            }}
          >
            {institute?.id}
          </Typography>
        </Box>

        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab sx={{ color:'#002B38',fontFamily:"Poppins",fontSize:'16px',fontWeight:700,lineHeight:'normal'}} label="About" />
          <Tab sx={{ color: '#002B38', fontFamily: "Poppins", fontSize: '16px', fontWeight: 700, lineHeight: 'normal' }} label="Profile" />
          <Tab sx={{ color: '#002B38', fontFamily: "Poppins", fontSize: '16px', fontWeight: 700, lineHeight: 'normal' }} label="Courses" />
          <Tab sx={{ color: '#002B38', fontFamily: "Poppins", fontSize: '16px', fontWeight: 700, lineHeight: 'normal' }} label="Subscription" />
        </Tabs>
      </Box>

      
        <Card sx={{ mb: 3 }}>
          <Slider {...settings}>
            {images?.map((image, index) => (
              <div key={index}>
                <CardMedia
                  component="img"
                  alt={`${institute?.institute_name} Institute-${index}`}
                  image={image}
                  sx={{
                    height: { xs: 150, md: 250 }
                  }}
                />
              </div>
            ))}
          </Slider>

          <CardContent
            sx={{
              pt: 0,
              mt: 4,
              display: 'flex',
              alignItems: 'flex-end',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              justifyContent: 'space-between'
            }}
          >
            <ProfilePicture src={`${institute?.image ? getImageUrl(institute?.image) : imagePlaceholder}`} alt="profile-picture" />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                ml: { xs: 0, md: 6 },
                mt: 1,
                alignItems: 'flex-end',
                flexWrap: ['wrap', 'nowrap'],
                justifyContent: ['center', 'space-between']
              }}
            >
              <Box
                sx={{
                  mt: 1.75,
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Typography variant="h3" sx={{ mr: 2, mt: 3, textTransform: 'uppercase', fontFamily: 'poppins', fontSize: '20px', fontWeight: 700 }}>
                  {institute?.institute_name}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ mr: 2, mt: 2, textTransform: 'uppercase', color: '#141522', fontFamily: 'poppins', fontSize: '15px', fontWeight: 700, lineHeight: '21px', letterSpacing: '-0.28px' }}
                >
                  <LocationOn sx={{ color: '#141522', marginRight: 1 }} />
                  {institute?.contact_info.address.city}, {institute?.contact_info.address.state}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mr: 4,
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 300
                  }}
                >
                  {institute?.description}
                </Typography>
              </Box>

              <TextField
                select
                label="Status"
                sx={{ ml: 3 }}
                defaultValue={institute?.is_active}
                onChange={async (e) => {
                  const data = {
                    id: institute?.uuid,
                    status: e.target.value
                  };
                  const result = await instituteChangeStatus(data);
                  setStatusDialogOpen(true);
                  if (result.success) {
                    toast.success(result.message);
                  } else {
                    toast.error(result.message);
                  }
                }}
              >
                <MenuItem value={'true'}>Active</MenuItem>
                <MenuItem value={'false'}>Inactive</MenuItem>
              </TextField>

              <StatusDialog
                open={statusOpen}
                setOpen={setStatusDialogOpen}
                description="Are you sure you want to Change Status"
                title="Status"
              />
            </Box>
          </CardContent>
        </Card>
      
      {selectedTab === 0 && <div><InstituteAbout /></div>}
      {selectedTab === 1 && <div><UserViewAccount institute={institute} /></div>}
      {selectedTab === 2 && <div><CourseView/></div>}
      {selectedTab === 3 && <div><CourseView /></div>}
    </>
  );
};

export default UserViewLeft;
