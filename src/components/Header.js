import React from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import Icon from 'components/icon';

const Header = ({ handleExport, handleFilter, searchQuery, handleSearch, title, handleAdd, addTitle }) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 0,
        paddingTop: 0,
        marginTop: 0,
        mt: 0,
        pt: 0
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 0,
          flexDirection: { xs: 'column', sm: 'row' },
          //   marginTop: { xs: 2, sm: 0 },
          textAlign: { xs: 'center', sm: 'right' }
        }}
      >
        <Grid
          sx={{
            mt: {
              xs: 2
            },
            flexDirection: { xs: 'row' },
            alignItems: 'center'
          }}
        >
          {handleFilter && (
            <Button sx={{ marginRight: 2 }} size="medium" variant="outlined" onClick={handleFilter}>
              <Icon icon="bi:filter" /> Filter
            </Button>
          )}
          {handleExport && (
            <Button sx={{ marginRight: 2 }} variant="outlined" size="medium" onClick={handleExport}>
              <Icon icon="material-symbols:download-sharp" /> Export
            </Button>
          )}
          {handleAdd && (
            <Button sx={{ marginRight: 2 }} variant="outlined" size="medium" fullWidth onClick={handleAdd}>
              <Icon icon="material-symbols:add" /> {addTitle}
            </Button>
          )}
        </Grid>
        {handleSearch && (
          <TextField
            sx={{
              width: {
                xs: 300
              }
            }}
            // fullWidth
            placeholder="Search..."
            inputProps={{
              style: {
                height: '10px'
              }
            }}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
