// ** React Imports
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// ** MUI Imports
import { Card, Box, Grid, Button, Typography } from '@mui/material';
import PricingPlans from 'features/subscription-management/plans/components';
import SubscriptionFeatures from 'features/subscription-management/features/components';
import { getAllSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansThunks';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectLoading, selectSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansSelectors';
import SubscriptionSkelton from 'components/cards/Skeleton/SubscriptionSkelton';


const Subscription = () => {
  const [ page,setpage] = useState(1)
  const dispatch = useDispatch();
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const loading = useSelector(selectLoading)
  const plans = useSelector(selectSubscriptionPlans)

  useEffect(() => {
    const data = { perPage : 3, page : page}
    dispatch(getAllSubscriptionPlans(data));
  }, [dispatch,page]);


  const handleToggleView = () => {
    setIsCreatingPlan(!isCreatingPlan);
  };
  
  return (
    <>
    {
      loading ?
        <SubscriptionSkelton setpage={setpage} />
      : 
    <Box sx={{  minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}
        >
          {isCreatingPlan ? 'Create New Subscription Plan' : 'Subscription Plans'}
        </Typography>
        
        <Button
          variant="contained"
          startIcon={isCreatingPlan ? <ArrowBackIcon /> : <AddIcon />}
          onClick={handleToggleView}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '8px 16px', 
            borderRadius: '8px' 
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
              <PricingPlans page={page} setpage={setpage} plans={plans}  />
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
   }
    </>
  );
};

export default Subscription;
