import Grid from '@mui/material/Grid';
import AllNotificationHeaderCard from './AllNotificationHeaderCard';

const AllNotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={6}>
        <AllNotificationHeaderCard title={'Total Notification'} stats={55} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <AllNotificationHeaderCard title={'Seen Notification'} stats={5} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <AllNotificationHeaderCard title={'Unseen Notification'} stats={5} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
    </Grid>
  );
};

export default AllNotificationHeaderSection;
