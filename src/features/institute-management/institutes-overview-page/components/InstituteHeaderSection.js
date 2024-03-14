import Grid from '@mui/material/Grid';
import InstituteHeaderCard from 'features/institute-management/institutes-overview-page/components/InstituteHeaderCard';
const UserHeaderSection = ({ users }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Total Institutes'} stats={users?.length} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Active Institutes'} stats={0} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Blocked Institutes'} stats={0} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default UserHeaderSection;
