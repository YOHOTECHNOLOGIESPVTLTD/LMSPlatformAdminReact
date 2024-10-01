// ** MUI Imports
import { TextField, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ** Icon Imports
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';


import { Link } from 'react-router-dom';
import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';

const TableHeader = (props) => {
  const { selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllInstitutes({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <>
      <Grid container xs={12}>
        <Grid
          item
          xs={12}
          sx={{
            py: 4,
            rowGap: 2,
            columnGap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField value={searchValue} placeholder="Search Category" onChange={(e) => handleSearch(e)} />

          <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Box component={Link} to={'add'}>
              <Button variant="contained">+ Add Institute</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TableHeader;
