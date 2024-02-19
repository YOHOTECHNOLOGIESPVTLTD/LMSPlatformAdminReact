// ** React Router Import
import { Link } from 'react-router-dom';

// ** MUI Components
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}));

const Error401 = () => {
  const Image401 = require('assets/images/pages/401.png');
  return (
    <Box className="content-center">
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            You are not authorized!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to view this page using the credentials that you have provided while login.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>Please contact your site administrator.</Typography>
          <Button to="/" component={Link} variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>
        <Img height="500" alt="error-illustration" src={Image401} />
      </Box>
    </Box>
  );
};

export default Error401;
