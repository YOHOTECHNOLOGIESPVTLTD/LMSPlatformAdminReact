// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
// ** Custom Component Import
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCardHeader = (props) => {
  // ** Props
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
          placeholder="Search Course"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Box
          component={Link}
          to="add"
          sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 }, textDecoration: 'none' }}
        >
          <Button variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add New Course
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CourseCardHeader;
