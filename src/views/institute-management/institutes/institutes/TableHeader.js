// ** MUI Imports
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ** Icon Imports

import Icon from 'components/icon';

import { Link } from 'react-router-dom';

const TableHeader = (props) => {
  const { handleFilter, value } = props;

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Button color="secondary" variant="tonal" startIcon={<Icon icon="tabler:upload" />}>
        Export
      </Button>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField value={value} sx={{ mr: 2 }} placeholder="Search Institutes" onChange={(e) => handleFilter(e.target.value)} />
        <Box component={Link} to={'add'}>
          <Button variant="contained">+ Add Institutes </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TableHeader;
