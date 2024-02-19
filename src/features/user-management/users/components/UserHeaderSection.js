import Grid from '@mui/material/Grid';
import UserHeaderCard from 'features/user-management/users/components/UserHeaderCard';
const UserHeaderSection = ({ users, groups }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Users'} stats={users?.length} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Groups'} stats={groups?.length} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Active Users'} stats={0} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Blocked Users'} stats={0} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default UserHeaderSection;
