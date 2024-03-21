// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
// ** Custom Component Import
import { TextField } from '@mui/material';

const PaymentCardHeader = (props) => {
  const { value, handleFilter, toggle } = props;
  return (
    <>
      <Box
        sx={{
          px: 1,
          pb: 1,
          pt: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <TextField
          value={value}
          sx={{
            width: 400
          }}
          placeholder="Search Payments"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={toggle} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add payments
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PaymentCardHeader;
