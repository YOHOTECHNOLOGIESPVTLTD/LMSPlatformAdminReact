// ** MUI Imports
import Grid from '@mui/material/Grid';
// import { useEffect } from 'react';
import { Box } from '@mui/material';

// ** Custom Components Imports
import PlanDetails from './plan-details';
// import { getAllSubscriptionPlans } from '../redux/subscriptionPlansThunks';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectSubscriptionPlans } from '../redux/subscriptionPlansSelectors';
import { Pagination } from '@mui/material';
// import { useSpinner } from 'context/spinnerContext';

const PricingPlans = ({page,setpage,plans}) => {

  // ** Props

  // create-modal


  // useEffect(() => {
  //   try {
  //     showSpinnerFn()
  //     let data = { perPage : 3,page:page}
  //     dispatch(getAllSubscriptionPlans(data));
  //     console.log("running",data)
  //   } catch (error) {
  //     hideSpinnerFn()
  //   }finally{
  //     hideSpinnerFn()
  //   }
    
  // }, []);


  return (
    <Grid container spacing={6}>
      {plans &&
        plans?.data?.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <PlanDetails plans={item} />
          </Grid>
        ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", py: "20px"}}>
      {
        plans?.last_page && plans?.last_page !== 1 && 
        <Pagination
        page={page}
        count={plans?.last_page}
        onChange={(e,value) => {
          setpage(value)
        }}
        />
      }  
      </Box>
    </Grid>
  );
};

export default PricingPlans;
