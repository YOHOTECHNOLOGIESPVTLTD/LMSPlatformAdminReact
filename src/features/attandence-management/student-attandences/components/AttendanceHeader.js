// ** MUI Imports
import Box from '@mui/material/Box';

// ** Custom Component Import
import { TextField } from '@mui/material';

const AttendanceHeader = (props) => {
  const { value, handleFilter } = props;
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
          justifyContent: 'space-between'
        }}
      >
        <TextField
          value={value}
          sx={{
            width: 400
          }}
          placeholder="Search Fee"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}></Box>
      </Box>
    </>
  );
};

export default AttendanceHeader;
