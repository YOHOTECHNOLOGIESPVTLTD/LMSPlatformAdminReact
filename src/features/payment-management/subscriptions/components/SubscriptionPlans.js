// ** MUI Imports
import Grid from '@mui/material/Grid';
// ** Custom Components Imports
import SubscriptionDetails from './SubscriptionDetails';

const SubscriptionPlans = (props) => {
  // ** Props
  const { plan, data } = props;
  return (
    <Grid container spacing={6}>
      {data?.map((item) => (
        <Grid item xs={12} md={4} key={item.title.toLowerCase()}>
          <SubscriptionDetails plan={plan} data={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionPlans;
