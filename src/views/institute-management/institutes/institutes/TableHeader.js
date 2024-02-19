// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Custom Component Import
// import CustomTextField from 'components/mui/text-field'
import { TextField } from '@mui/material';
import AddUserDrawer from './AddUserDrawer';
// ** Icon Imports
import Icon from 'components/icon';

const TableHeader = (props) => {
  // ** Props
  const { handleFilter, value, handleClickOpen } = props;

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
        <AddUserDrawer onClick={handleClickOpen} />
      </Box>
    </Box>
  );
};

export default TableHeader;
