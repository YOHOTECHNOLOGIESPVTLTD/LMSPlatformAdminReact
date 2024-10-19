// ** MUI Imports
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
// ** Custom Component Import
// import { TextField } from '@mui/material';

const PaymentCardHeader = (props) => {
  const { toggle } = props;
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
          justifyContent: "space-between",
          p: 2
        }}
      >
        {/* <TextField
          value={value}
          sx={{
            width: 400
          }}
          placeholder="Search Payments"
          onChange={(e) => handleFilter(e.target.value)}
        /> */}
        <Box>
           <Typography component={"h1"} sx={{ fontSize: "28px", fontWeight: 500}} >Fees</Typography>
        </Box>
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
