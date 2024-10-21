import { Grid } from '@mui/material';
import FeesTable from 'features/payment-management/payments-page/components/PaymentTable';


const Payments = () => {
  

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          <FeesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Payments;
