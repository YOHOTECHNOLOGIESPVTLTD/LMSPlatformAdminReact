import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Icon from 'components/icon';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(6),
  justifyContent: 'space-between'
}));
const Img = styled('img')(({ theme }) => ({
    height: '15rem',
    borderRadius: theme.shape.borderRadius
  }))

const FeesViewDrawer = (props) => {
  const { open, toggle } = props;

  const handleClose = () => {
    toggle();
  };
  const theme = useTheme();

  return (
    <Grid>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">View Payments</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{my:4}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img alt="Stumptown Roasters" src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlsbHN8ZW58MHx8MHx8fDA%3D" />
          </CardContent>
        </Box>
        <Grid
          item
          xs={12}
          lg={4}
          spacing={6}
          sx={{ paddingRight: (theme) => theme.spacing(4), paddingLeft: (theme) => theme.spacing(4), mb: 2 }}
        >
          <Box sx={{ borderRadius: 1, border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Grid>
              <Box>
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 1,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>John</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>1 Jan 22 - 5 Jan 22</Typography>
                    </Box>
                    <Box
                      sx={{
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography sx={{ color: theme.palette.primary.main, fontWeight: '500', display: 'flex', alignItems: 'flex-end' }}>
                        1234 <Icon icon="mdi:arrow-up" />
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography sx={{ mr: 2, color: 'text.disabled', fontWeight: '500' }}>4 nights</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />

                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 2,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Accommodation</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>$1100</Typography>
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Cleaning</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>$100</Typography>
                    </Box>
                    <Box
                      sx={{
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Ota Fee</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>-$50</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography sx={{ fontWeight: 500 }}>$10,500</Typography>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
              </Box>
              <Box>
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 1,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Sarah</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>3 Jan 22 - 5 Jan 22</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography sx={{ color: theme.palette.primary.main, fontWeight: '500', display: 'flex', alignItems: 'flex-end' }}>
                        1234 <Icon icon="mdi:arrow-up" />
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography sx={{ mr: 2, color: 'text.disabled', fontWeight: '500' }}>4 nights</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />

                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        mb: 2,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Accommodation</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>$1100</Typography>
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Cleaning</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>$100</Typography>
                    </Box>
                    <Box
                      sx={{
                        rowGap: 1,
                        columnGap: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography>Ota Fee</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>-$50</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
                <CardContent sx={{ py: 2.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography sx={{ fontWeight: 500 }}>$500</Typography>
                  </Box>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
              </Box>
            </Grid>
            <Grid>
              <CardContent sx={{ py: 2.8 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>$3500</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Box>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default FeesViewDrawer;
