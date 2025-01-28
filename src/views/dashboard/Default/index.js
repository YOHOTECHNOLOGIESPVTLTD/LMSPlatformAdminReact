// material-ui
import { Grid } from '@mui/material';
import EarningCard from 'features/dashboard/components/EarningCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={2} sx={{ pt: "22px", pl: "22px" }}>
      {/* Row of 4 Cards */}
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EarningCard />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
