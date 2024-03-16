// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
// ** Icon Imports
import Icon from 'components/icon';

const FaqTableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
    <Grid item xs={12} sx={{ my: 3 }}>
      <Grid container spacing={4} sx={{display:"flex",justifyContent:"space-between"}}>
        <Grid item sm={5} xs={12}>
          <TextField
            fullWidth
            value={value}
            label="Search FaqCategories"
            sx={{}}

            onChange={(e) => handleFilter(e.target.value)}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
          <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Add Faq Categories
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  );
};

export default FaqTableHeader;
