// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import { Card, Box, Grid, Button, Typography } from '@mui/material';
import PricingPlans from 'features/subscription-management/plans/components';
import SubscriptionFeatures from 'features/subscription-management/features/components';
import { getAllSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansThunks';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Subscription = () => {
  const [ page,setpage] = useState(1)
  const dispatch = useDispatch();
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);

  useEffect(() => {
    const data = { perPage : 3, page : page}
    dispatch(getAllSubscriptionPlans(data));
  }, [dispatch]);

  // Toggle between views (Pricing Plans and Create New Plan)
  const handleToggleView = () => {
    setIsCreatingPlan(!isCreatingPlan);
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        
        {/* Left Side Text Styling */}
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }} // Customize font size and color here
        >
          {isCreatingPlan ? 'Create New Subscription Plan' : 'Subscription Plans'}
        </Typography>
        
        {/* Toggle button between Pricing Plans and Create New Plan */}
        <Button
          variant="contained"
          startIcon={isCreatingPlan ? <ArrowBackIcon /> : <AddIcon />}
          onClick={handleToggleView}
          sx={{
            backgroundColor: '#1976d2', // Customize button background color here
            '&:hover': { backgroundColor: '#115293' }, // Customize button hover color
            textTransform: 'none', // Remove uppercase transformation
            fontSize: '16px', // Button font size
            fontWeight: 'bold', // Button font weight
            padding: '8px 16px', // Padding for button
            borderRadius: '8px' // Rounded button corners
          }}
        >
          {isCreatingPlan ? 'Back to Plans' : 'Create New Plan'}
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {isCreatingPlan ? (
          // Create New Plan View
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <SubscriptionFeatures />
            </Card>
          </Grid>
        ) : (
          // Pricing Plans View
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <PricingPlans page={page} setpage={setpage}  />
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Subscription;
