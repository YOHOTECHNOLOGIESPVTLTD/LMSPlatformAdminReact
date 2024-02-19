// BeautifulMuiErrorBoundary.js
import React, { Component } from 'react';

// ** MUI Components

import { styled } from '@mui/material/styles';
import { Typography, Button, Grid } from '@mui/material';
import SeverErrorIllustration from './ServerErrorIllustration';
// ** Styled Components
const BoxWrapper = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

class BeautifulMuiErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by beautiful Mui error boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  handleReload = () => {
    // You can add custom logic here to handle reloading or resetting the application
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
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
              <Typography variant="h3" sx={{ mt: 4 }}>
                500 Internal Server Error
              </Typography>
              <Typography sx={{ mt: 5, color: 'text.secondary', textAlign: 'center' }}>
                
                There was an error, please try again later.
              </Typography>
              <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
              <Button onClick={this.handleReload} variant="contained">
                Reload
              </Button>
            </BoxWrapper>
          </Grid>
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default BeautifulMuiErrorBoundary;
