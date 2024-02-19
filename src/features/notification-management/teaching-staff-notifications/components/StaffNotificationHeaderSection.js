import Grid from '@mui/material/Grid';
import StaffNotificationHeaderCard from './StaffNotificationHeaderCard';

const StaffNotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Total Notification'} stats={55} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Seen Notification'} stats={5} avatarColor={'error'} icon={'tabler:user-plus'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Unseen Notification'} stats={5} avatarColor={'success'} icon={'tabler:user-check'} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StaffNotificationHeaderSection;
