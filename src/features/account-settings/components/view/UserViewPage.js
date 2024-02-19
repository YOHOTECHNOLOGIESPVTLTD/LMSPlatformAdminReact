// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
// import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
// import UserViewRight from 'src/views/apps/user/view/UserViewRight'
import UserViewLeft from './UserViewLeft';
import UserViewRight from './UserViewRight';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useState } from 'react';
import { useEffect } from 'react';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};
const UserView = ({ tab, invoiceData }) => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
     {loading ? (
        <StaffManagementView />
      ) : (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewLeft />
        </Grid>
        {/* <div>
helloo
        </div> */}
        <Grid item xs={12} md={12} lg={12}>
          <UserViewRight tab={tab} invoiceData={invoiceData} />
        </Grid>
      </Grid>
        )}    
    </>
  );
};

export default UserView;
