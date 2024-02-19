// ** MUI Imports
import Box from '@mui/material/Box';
// ** Custom Component Import
import { TextField } from '@mui/material';

const StudentAttendanceCardHeader = (props) => {
  const { value, handleFilter } = props;
  return (
    <>
      <Box
        sx={{
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
          placeholder="Search Student"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </Box>
    </>
  );
};

export default StudentAttendanceCardHeader;
