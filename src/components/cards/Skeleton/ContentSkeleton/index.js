import { Card, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { gridSpacing } from 'store/constant';

const ContentSkeleton = () => {
  return (
    <>
      <Grid container sx={{ml:1.5}}>
        <Grid item xs={12} sm={12}>
  
          <Card sx={{mt:3}}>
            <Grid container md={12} sx={{p:2}} spacing={gridSpacing} >
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={20} width={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                          <Grid item xs zeroMinWidth>
                            <Skeleton variant="rectangular" height={20} />
                          </Grid>
                          <Grid item>
                            <Skeleton variant="rectangular" height={16} width={16} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default ContentSkeleton;
