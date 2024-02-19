import { Box, Card, CardHeader, Grid, Skeleton, Typography, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from 'components/mui/avatar';
import Icon from 'components/icon';

const ViewUserSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={4}>
        <Card>
          <CardContent sx={{ pt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Skeleton variant="rectangular" width={100} height={100} animation="wave" sx={{ mb: 4 }} />
            <Skeleton variant="text" width={200} height={32} animation="wave" />
            <Skeleton variant="text" width={100} height={24} animation="wave" sx={{ mt: 1, mb: 2 }} />
            <Skeleton variant="text" width={150} height={40} animation="wave" />
          </CardContent>
             {/* card content */}
          <Skeleton variant="rectangular" height={2} animation="wave" sx={{ my: '0 !important', mx: 6 }} />
            {/*  card content */}
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              <Skeleton width={100} height={20} animation="wave" />
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                  <Skeleton width={80} height={20} animation="wave" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <Skeleton width={150} height={20} animation="wave" />
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                  <Skeleton width={50} height={20} animation="wave" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <Skeleton width={150} height={20} animation="wave" />
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                  <Skeleton width={50} height={20} animation="wave" />
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Skeleton variant="circular" width={20} height={20} animation="wave" />
                  <Skeleton width={80} height={20} animation="wave" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                  <Skeleton width={50} height={20} animation="wave" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <Skeleton width={150} height={20} animation="wave" />
                </Typography>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                  <Skeleton width={70} height={20} animation="wave" />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <Skeleton width={100} height={20} animation="wave" />
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              <Skeleton width={100} height={25} animation="wave" />
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ display: 'flex', mb: 3, mt: 2, gap: 3 }}>
          <Skeleton variant="rectangular" width={150} height={45} animation="wave" />

          <Skeleton variant="rectangular" width={150} height={45} animation="wave" />
        </Box>
        <Card>
          <CardHeader title={<Skeleton variant="text" width={200} height={24} animation="wave" />} />
          <CardContent>
            <Grid container spacing={2}>
              {[1, 2,3,].map((item) => (
                <Grid key={item} item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="span">
                      <Skeleton variant="text" width={200} animation="wave" />
                    </Typography>
                    <Typography variant="caption" component="span">
                      <Skeleton variant="text" width={100} animation="wave" />
                    </Typography>
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar alt="Avatar" sx={{ width: 38, height: 38, mr: 1 }}>
                      <Skeleton variant="circular" width={38} height={38} animation="wave" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">
                        <Skeleton variant="text" width={100} animation="wave" />
                      </Typography>
                      <Typography variant="caption">
                        <Skeleton variant="text" width={100} animation="wave" />
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'warning.main' }}>
                      <Icon fontSize="1.25rem">
                        {' '}
                        {/* Replace with your icon component */}
                        <Skeleton variant="rectangular" width={24} height={24} animation="wave" />
                      </Icon>
                      <Typography variant="body2">
                        <Skeleton variant="text" width={100} animation="wave" />
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                      <Icon fontSize="1.25rem">
                        {' '}
                        {/* Replace with your icon component */}
                        <Skeleton variant="rectangular" width={24} height={24} animation="wave" />
                      </Icon>
                      <Typography variant="body2">
                        <Skeleton variant="text" width={100} animation="wave" />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewUserSkeleton;
