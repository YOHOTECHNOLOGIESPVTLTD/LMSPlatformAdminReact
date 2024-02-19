// ** Next Import
// import Link from 'next/link'
import { Link } from 'react-router-dom';

// ** MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar'
// import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography'
// import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Imports
// import CustomChip from 'components/mui/chip'
// import OptionsMenu from 'components/option-menu'

const Teams = ({ data }) => {
  console.log(data);
  // const data= {instituteData}
  return (
    <Grid container spacing={6}>
      {/* {data && 
        data?.map((item, index) => { */}
      {/* return ( */}
      {JSON?.parse(data?.gallery).map((item, i) => (
        <Grid item xs={12} md={6} lg={4} key={i}>
          <Card>
            <CardContent>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={item.avatar} sx={{ mr: 2.5, height: 38, width: 38 }} />
                      <Typography variant='h5'>{item.title}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size='small' sx={{ color: 'text.disabled' }}>
                        <Icon fontSize='1.25rem' icon='tabler:star' />
                      </IconButton>
                      <OptionsMenu
                        iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                        options={[
                          'Rename Team',
                          'View Details',
                          'Add to Favorites',
                          { divider: true, dividerProps: { sx: { my: theme => `${theme.spacing(2)} !important` } } },
                          { text: 'Delete Team', menuItemProps: { sx: { color: 'error.main' } } }
                        ]}
                      />
                    </Box>
                  </Box> */}
              {/* <Typography sx={{ my: 4, color: 'text.secondary' }}>{item.description}</Typography> */}

              <Box sx={{ alignItems: 'center' }}>
                <Box sx={{ alignItems: 'center', objectFit: 'cover' }}>
                  <img src={item} alt="gallery" style={{ maxHeight: '170px', borderRadius: '10px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                  <Box
                    to="/"
                    component={Link}
                    onClick={(e) => e.preventDefault()}
                    sx={{
                      textDecoration: 'none'

                      // '&:not(:last-of-type)': { mr: 2.5 },
                      // '& .MuiChip-root': { cursor: 'pointer' }
                    }}
                  >
                    {/* <IconButton rounded size='small' skin='dark'  color='primary' label='edit'>
                          <Icon fontSize='1.25rem' icon='tabler:edit' />
                          </IconButton> */}
                    <IconButton rounded size="small" skin="dark" color="error" label="edit">
                      <Icon fontSize="1.25rem" icon="tabler:trash" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Teams;
