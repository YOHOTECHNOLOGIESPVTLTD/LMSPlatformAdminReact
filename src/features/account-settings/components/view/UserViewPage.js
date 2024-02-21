// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Demo Components Imports

import UserViewLeft from './UserViewLeft';
import UserViewRight from './UserViewRight';
// import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';

const UserView = ({ tab, invoiceData }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewLeft />
        </Grid>
        {/* <div>

        </div> */}
        <Grid item xs={12} md={12} lg={12}>
          <UserViewRight tab={tab} invoiceData={invoiceData} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserView;
