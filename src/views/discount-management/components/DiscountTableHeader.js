// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Custom Component Import
// import { TextField } from '@mui/material';

// ** Icon Imports
import Icon from 'components/icon';

const DiscountTableHeader = (props) => {
  // ** Props
  const { toggle } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:'flex-end',
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
      }}
    >
      <Button onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2} }}>
        <Icon fontSize="1.125rem" icon="tabler:plus" />
        Add New 
      </Button>
    </Box>
  );
};

export default DiscountTableHeader;
