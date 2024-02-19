// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ** Icon Imports
import Icon from 'components/icon';

const StaffNotificationTableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid></Grid>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item sm={6} xs={12}></Grid>
        <Grid item sm={4} xs={12}>
          <TextField fullWidth value={value} sx={{}} placeholder="Search User" onChange={(e) => handleFilter(e.target.value)} />
        </Grid>
        <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Staff Notification
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffNotificationTableHeader;
