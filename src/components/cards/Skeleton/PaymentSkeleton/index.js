import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';

const PaymentSkeleton = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton height={25} width={200} />} />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ pt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" height={56} width={250} animation="wave" />
              </Grid>
              <Grid container justifyContent="flex-end" mt={3} xs={12} sm={6}>
                <Skeleton variant="rectangular" height={50} width={100} animation="wave" />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container md={12} spacing={gridSpacing}>
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
          </CardContent>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton variant="rectangular" height={25} width={75} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PaymentSkeleton;
