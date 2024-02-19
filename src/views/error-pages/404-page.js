// ** React Router Import
import { Link } from 'react-router-dom';

// ** MUI Components

import { styled } from '@mui/material/styles';
import { Typography, Button, Grid } from '@mui/material';
import PageNotFoundIllustration from './PageNotFoundIllustration';
// ** Styled Components
const BoxWrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Error404 = () => {
  return (
    <Grid sx={{ justifyContent: 'center' }}>
      <Grid
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <BoxWrapper>
          <Typography variant="h1" sx={{ mt: 4 }}>
            Page Not Found :(
          </Typography>
          <Typography sx={{ mt: 5, color: 'text.secondary', width: 400 }}>
            {' '}
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
          </Typography>
          <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          <Button to="/" component={Link} variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>
      </Grid>
    </Grid>
  );
};

export default Error404;
