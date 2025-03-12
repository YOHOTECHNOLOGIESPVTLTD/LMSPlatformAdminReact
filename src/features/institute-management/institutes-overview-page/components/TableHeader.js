// ** MUI Imports
import * as React from 'react';
import {  Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, InputLabel, Select, TextField } from '@mui/material';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
// ** Icon Imports
// import { useDispatch } from 'react-redux';
// import { useState, useCallback } from 'react';


import { Link } from 'react-router-dom';
// import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';
const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  width:'70%',
  transform: 'translate(-50%, -50%)', 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const TableHeader = () => {
  // const { selectedBranchId } = props;

  // State for search value
  // const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  // const dispatch = useDispatch();

  // Callback function to handle search
  // const handleSearch = useCallback(
  //   (e) => {
  //     const searchInput = e.target.value;
  //     dispatch(getAllInstitutes({ search: searchInput, branch_id: selectedBranchId }));
  //     setSearchValue(searchInput);
  //     // Dispatch action to fetch branches with search input
  //   },
  //   [dispatch]
  // );

  const [plan, setPlan] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            justifyContent: "space-between"
          }}
        >
          {/* <TextField value={searchValue} placeholder="Search Category" onChange={(e) => handleSearch(e)} /> */}
          <Button sx={{backgroundColor:'#efe6e3', py:1}} onClick={handleOpen} startIcon={<FilterListIcon />}> Filter</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ display: 'flex', gap: 2, backgroundColor: 'white', p: 2, borderRadius: 5 }}>
              {/* Subscription Plan Select */}
              <FormControl fullWidth>
                <InputLabel >Subscription Plan</InputLabel>
                <Select  label="Subscription Plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </Select>
              </FormControl>

              {/* Status Select */}
              <FormControl fullWidth>
              <InputLabel > Status</InputLabel>
                <Select  label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>

              {/* Date Picker */}
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Box>

        </Box>
      </Modal>


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
