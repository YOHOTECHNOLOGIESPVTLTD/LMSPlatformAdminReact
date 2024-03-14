import { Grid, TextField } from '@mui/material';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { getAllUsers } from '../../redux/userThunks';

const TableHeader = (props) => {
  const { toggle, selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      const data = {
        branch_id: selectedBranchId,
        search: searchInput
      };
      dispatch(getAllUsers(data));
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
      <Grid item sm={6} xs={12}></Grid>
      <Grid item sm={4} xs={12}>
        <TextField value={searchValue} fullWidth placeholder="Search User" onChange={(e) => handleSearch(e)} />
      </Grid>
      <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add User
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
