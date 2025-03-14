import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Box, Grid, Button, Typography } from '@mui/material';
import PricingPlans from 'features/subscription-management/plans/components';
import SubscriptionFeatures from 'features/subscription-management/features/components';
import { getAllSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansThunks';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectLoading, selectSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansSelectors';
import SubscriptionSkelton from 'components/cards/Skeleton/SubscriptionSkelton';

const Subscription = () => {
  const [page, setPage] = useState(1);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const plans = useSelector(selectSubscriptionPlans);

  useEffect(() => {
    const data = { perPage: 3, page };

    // Prevent unnecessary API calls if data is already fetched
    if (!loading && plans.length === 0) {
      dispatch(getAllSubscriptionPlans(data));
    }
  }, [dispatch, page, loading, plans.length]); // Added plans.length to avoid multiple fetches

  const handleToggleView = () => {
    setIsCreatingPlan(!isCreatingPlan);
  };

  return (
    <>
      {loading ? (
        <SubscriptionSkelton setpage={setPage} />
      ) : (
        <Box sx={{ minHeight: '100vh' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
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
                borderRadius: '8px',
              }}
            >
              {isCreatingPlan ? 'Back to Plans' : 'Create New Plan'}
            </Button>
          </Box>

          {/* Main Content */}
          <Grid container spacing={4}>
            {isCreatingPlan ? (
              <Grid item xs={12}>
                <Card sx={{ p: 3 }}>
                  <SubscriptionFeatures />
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Card sx={{ p: 3 }}>
                <PricingPlans page={page} setPage={setPage} plans={plans} />
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Subscription;
