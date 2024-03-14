// material-ui
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';
import FeesTable from 'features/payment-management/payments-page/components/PaymentTable';

const Payments = () => {
  const [loading, setLoading] = useState(true);
  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {loading ? <FeesTableSkeleton /> : <FeesTable />}
        </Grid>
      </Grid>
    </>
  );
};

export default Payments;
