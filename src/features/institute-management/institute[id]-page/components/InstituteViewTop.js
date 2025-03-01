import { useState } from 'react';
import { Tabs, Tab, IconButton, Box, Typography,  CardMedia } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { getImageUrl } from 'themes/imageUtlis';
import InstituteAbout from './InstituteAbout';
import UserViewAccount from './UserViewAccount';
import CourseView from './Course/CourseView';
import StatusDialog from 'components/modal/DeleteModel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styled Components
const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: '#002B38',
  color: '#fff',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"
}));

const InstituteLogo = styled('img')(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  marginRight: theme.spacing(2),
}));

const GalleryImage = styled(CardMedia)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  // marginBottom: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "white",
  '.MuiTabs-indicator': {
    backgroundColor: '#0CCE7F',
  },
}));

const UserViewLeft = ({ institute }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [statusOpen, setStatusDialogOpen] = useState(false);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
      <StyledHeader>
        <IconButton onClick={() => window.history.back()} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'Poppins',color: "white" }}>
            {institute?.institute_name}
          </Typography>
          <InstituteLogo
            src={institute?.image ? getImageUrl(institute.image) : 'https://via.placeholder.com/60'}
            alt="Institute Logo"
          />
        
        </Box>
      </StyledHeader>

      <Box 
      sx={{ backgroundColor: "white" }}
      >
        <Slider  {...gallerySettings} >
          {institute?.gallery_images?.map((image, index) => (
            <div key={index}>
              <GalleryImage
                component="img"
                image={getImageUrl(image)}
                alt={`Gallery Image ${index + 1}`}
                sx={{ height: { xs: 200, md: 300 } }}
              />
            </div>
          ))}
        </Slider>
      </Box>

      <StyledTabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab sx={{fontSize:'25px', fontWeight:'bold',}} label="About" />
        <Tab  sx={{fontSize:'25px', fontWeight:'bold',}} label="Profile" />
        <Tab  sx={{fontSize:'25px', fontWeight:'bold',}} label="Courses" />
      </StyledTabs>

      <StatusDialog
                open={statusOpen}
                setOpen={setStatusDialogOpen}
                description="Are you sure you want to Change Status"
                title="Status"
              />
      <Box sx={{ mt: 3, backgroundColor: "white" }}>
        {selectedTab === 0 && <InstituteAbout institute={institute} />}
        {selectedTab === 1 && <UserViewAccount institute={institute} />}
        {selectedTab === 2 && <CourseView />}
      </Box>
    </Box>
  );
};

export default UserViewLeft;
