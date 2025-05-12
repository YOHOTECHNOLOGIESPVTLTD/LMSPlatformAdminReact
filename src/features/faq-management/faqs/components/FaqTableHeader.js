// ** MUI Imports
import { Grid, TextField, InputAdornment, Paper } from '@mui/material';
import Button from '@mui/material/Button';
// ** Icon Imports
import Icon from 'components/icon';

const FaqTableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, faqs, searchQuery } = props;
  console.log('faqssss', faqs);

  return (
    <Paper sx={{ padding: 2, backgroundColor: 'white', boxShadow: 3 }}>
      <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid item sm={5} xs={12}>
          <TextField
            fullWidth
            value={searchQuery}
            label="Search FaqCategories"
            variant="outlined"
            onChange={(e) => handleFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon fontSize="1.125rem" icon="tabler:search" />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item sm={3} xs={12} sx={{ textAlign: 'right' }}>
          <Button onClick={toggle} variant="contained" color="primary" startIcon={<Icon fontSize="1.125rem" icon="tabler:plus" />}>
            Add Faq
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FaqTableHeader;
