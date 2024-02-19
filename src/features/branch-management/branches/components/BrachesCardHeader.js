import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import { TextField } from '@mui/material';

const TableHeader = (props) => {
  const { value, handleFilter } = props;
  return (
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
        placeholder="Search Branch"
        onChange={(e) => handleFilter(e.target.value)}
      />
      <Box
        component={Link}
        to="add"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', textDecoration: 'none', mt: { xs: 3, sm: 0 } }}
      >
        <Button variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
          Add New Branch
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
