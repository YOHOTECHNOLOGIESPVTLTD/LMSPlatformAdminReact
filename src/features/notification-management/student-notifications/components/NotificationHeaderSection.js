import Grid from '@mui/material/Grid';
import NotificationHeaderCard from './NotificationHeaderCard';
const NotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard title={'Total Notification'} stats={55} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard title={'Seen Notification'} stats={5} avatarColor={'error'} icon={'tabler:user-plus'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard title={'Unseen Notification'} stats={5} avatarColor={'success'} icon={'tabler:user-check'} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotificationHeaderSection;
