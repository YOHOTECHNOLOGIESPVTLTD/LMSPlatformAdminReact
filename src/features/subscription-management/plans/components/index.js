// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';

// ** Custom Components Imports
import PlanDetails from './plan-details';
import { getAllSubscriptionPlans } from '../redux/subscriptionPlansThunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscriptionPlans } from '../redux/subscriptionPlansSelectors';
const PricingPlans = () => {
  // ** Props

  // create-modal
  const dispatch = useDispatch();
  const plans = useSelector(selectSubscriptionPlans);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, []);

  console.log('plans', plans);
  return (
    <Grid container spacing={6}>
      {plans &&
        plans?.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <PlanDetails plans={item} />
          </Grid>
        ))}
    </Grid>
  );
};

export default PricingPlans;
