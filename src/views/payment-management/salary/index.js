// material-ui
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import PaymentSalarySkeleton from 'components/cards/Skeleton/PaymentSkeleton';
import SalaryTable from 'features/payment-management/salaries/components/SalaryTable';

const Salary = () => {
  const [loading, setLoading] = useState(true);

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
          {loading ? <PaymentSalarySkeleton /> : <SalaryTable />}
        </Grid>
      </Grid>
    </>
  );
};

export default Salary;
