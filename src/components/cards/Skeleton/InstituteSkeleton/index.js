import { Skeleton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
// import { gridSpacing } from 'store/constant';
import CustomSkeleton from '..';
const InstituteSkeleton = () => {
  return (
    <>
      <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {[...Array(3)].map((index) => (
            <Grid
              sx={{ width: '389px', boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}
              height={'103px'}
              key={index + 'skelton' + '00' + 1}
            >
              <CustomSkeleton width={389} height={103} />
            </Grid>
          ))}
        </Grid>
        <Card>
          <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'space-between' }}>
            <Skeleton variant="rectangular" height={25} width={75} sx={{ backgroundColor: 'grey', my: 2 }} />
            <Skeleton variant="rectangular" height={25} width={75} sx={{ backgroundColor: 'grey', my: 2 }} />
          </CardContent>

          {/* <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, gap: 5, justifyContent: 'left' }}>
            <CustomSkeleton width={389} height={183} />
            <CustomSkeleton width={389} height={183} />
          </CardContent> */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {[...Array(3)].map((index) => (
            <Grid
              sx={{ width: '389px', boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}
              height={'103px'}
              key={index + 'skelton' + '00' + 1}
            >
              <CustomSkeleton width={389} height={183} />
            </Grid>
          ))}
        </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)", mt: "20px"}} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Table sx={{ "& .MuiTableCell-body:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)": {  py: 2 } }}>
                    <TableRow sx={{  height: "56px", borderBottom: "1px solid #e6e5e7", backgroundColor: "#F6F6F7", }}>
                      <TableCell sx={{ width: "120px"}} ><CustomSkeleton width={100} height={36}  animation="wave"  /></TableCell>
                      <TableCell sx={{ width: "140px"}}> <CustomSkeleton width={100} height={36}  animation="wave" /> </TableCell>
                      <TableCell sx={{ width: "180px"}} > <CustomSkeleton width={160} height={36} animation="wave"  /> </TableCell>
                      <TableCell sx={{ width: "200px" }}> <CustomSkeleton width={140} height={36} animation="wave"  /> </TableCell>
                      <TableCell sx={{ width: "200px" }}> <CustomSkeleton width={140} height={36} animation="wave"  /> </TableCell>
                     </TableRow>
                    <TableBody>
                     <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell> 
                     </TableRow>
                     <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}} >
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"  /></TableCell>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                     </TableRow>
                     <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"  /></TableCell>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                     </TableRow>
                     <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"    /></TableCell>
                      <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                      <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
                     </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Card>
         </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default InstituteSkeleton;
