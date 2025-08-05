import Grid from '@mui/material/Grid';
import InstituteHeaderCard from 'features/institute-management/institutes-overview-page/components/InstituteHeaderCard';
const UserHeaderSection = ({ allInstitutes }) => {
  // console.log('students',users)
  const activeInstitutes=allInstitutes?.filter((item)=>item?.is_active===true)
  console.log('aacIns',activeInstitutes);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Total Institutes'} stats={allInstitutes?.length} background={"#E4E4FF"} avatarColor={"#8280FF"} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Active Institutes'} stats={activeInstitutes?.length} avatarColor={'#4AD991'} background={"#D9F7E7"} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={4} sm={6}>
        <InstituteHeaderCard title={'Blocked Institutes'} stats={0} avatarColor={'#FF9066'} background={"#FFE7DE"} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default UserHeaderSection;
