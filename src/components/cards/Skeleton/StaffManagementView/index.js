import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MuiTab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1, 1, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const StaffManagementView = () => {
  return (
    <>
      <Grid>
        <Card>
          {/* Placeholder for CardMedia */}
          <Skeleton
            variant="rectangular"
            sx={{
              height: { xs: 150, md: 250 }
            }}
          />
          <CardContent
            sx={{
              pt: 0,
              mt: -8,
              display: 'flex',
              alignItems: 'flex-end',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            {/* Placeholder for ProfilePicture */}
            {/* <Skeleton variant="circular" width={100} height={100} sx={{ mr: { xs: 0, md: 6 } }} /> */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                flexWrap: ['wrap', 'nowrap'],
                justifyContent: ['center', 'space-between']
              }}
            >
              <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: ['center', 'flex-start'],
                    alignItems: 'center'
                  }}
                >
                  {/* Placeholder for Name */}
                  {/* <Skeleton variant="text" width={200} height={40} sx={{ mr: 4 }} /> */}
                  {/* Placeholder for Job Title */}
                  {/* <Skeleton variant="text" width={100} height={20} sx={{ mr: 4 }} /> */}
                  {/* Placeholder for Location */}
                  {/* <Skeleton variant="text" width={100} height={20} sx={{ mr: 4 }} /> */}
                  {/* Placeholder for Joined Date */}
                  {/* <Skeleton variant="text" width={200} height={20} /> */}
                </Box>
              </Box>
              {/* Placeholder for Active Button */}
              {/* <Skeleton variant="rectangular" width={120} height={40} /> */}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid sx={{mt:2}}>
        <TabContext>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            aria-label="forced scroll tabs example"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            {/* Placeholder for Account Tab */}
            <Tab disabled  label={<Skeleton variant="text" width={90} height={50}/>} />
            {/* Placeholder for Security Tab */}
            <Tab disabled  label={<Skeleton variant="text" width={90} height={50}/>} />
            {/* Placeholder for Classes Tab */}
            <Tab disabled  label={<Skeleton variant="text" width={90} height={50}/>} />
            {/* Placeholder for Attendance Tab */}
            <Tab disabled  label={<Skeleton variant="text" width={90} height={50}/>} />
            {/* Placeholder for Activity Tab */}
            <Tab disabled  label={<Skeleton variant="text" width={90} height={50}/>} />
          </TabList>
        </TabContext>
      </Grid>
      <Grid sx={{mt:1}}>
      <Card>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
          <Skeleton width={100} height={50}/>
        </Typography>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              <Skeleton width={150} height={40}/>
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: '' }}>
        <Button variant='tonal' sx={{ mr: 2 }}>
          <Skeleton width={60} />
        </Button>
        <Button  variant='tonal'>
          <Skeleton width={70} />
        </Button>
      </CardActions>
    </Card>
      </Grid>
    </>
  );
};

export default StaffManagementView;
