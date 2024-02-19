import { Box, Card, CardContent, CardHeader, Checkbox, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AddGroupSkeleton = () => (
    <>
      <Card fullWidth maxWidth="md" scroll="body" sx={{ height: "100vh" }}>
      <CardHeader
  sx={{
    pb: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
    pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
  }}
  title={
    <Box sx={{ textAlign: 'center',display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Skeleton variant="text" width={200} />
    </Box>
  }
  subheader={
    <Box sx={{ textAlign: 'center',display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Skeleton variant="text" width={200} />
    </Box>
  }
/>

        <CardContent>
          <Grid sx={{ my: 2, gap: 2 }} container>
            <Grid xs={12} sm={5.9}>
              <Skeleton variant="text" height={56} />
            </Grid>
            <Grid xs={12} sm={5.9}>
              <Skeleton variant="text" height={56} />
            </Grid>
          </Grid>
          {/* <Typography variant="h4">Group Permissions</Typography> */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', textTransform: 'capitalize' }}>
                      <Skeleton variant="text" width={150} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 20 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', textTransform: 'capitalize' }}>
                        <Skeleton variant="text" width={150} />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
);

export default AddGroupSkeleton;
