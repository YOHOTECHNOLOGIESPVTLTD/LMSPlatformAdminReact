import React from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';
import Icon from '../../../components/icon';

const TableHeader = (props) => {
  const { toggle, value, handleFilter } = props;

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={6} xs={12}></Grid>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            value={value}
            placeholder="Search User"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </Grid>
        <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Button fullWidth variant="contained" onClick={toggle}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableHeader;
