// ** MUI Imports
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// ** Custom Component Import
// import { TextField } from '@mui/material';

const PaymentCardHeader = () => {
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
      </Box>
    </>
  );
};

export default PaymentCardHeader;
