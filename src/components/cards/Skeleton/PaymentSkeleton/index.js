import { Table, TableRow,TableBody, TableCell ,Card, Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import CustomSkeleton from '..';

const PaymentSkeleton = () => {
  return (
  <>
  <Grid item xs={12} >
     <Box sx={{ 
          px: 1,
          pb: 1,
          pt: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: "space-between",
          p: 2
     }} >
        <Box>
          <CustomSkeleton width={62} height={37}  />
        </Box>
        <Box>
          <CustomSkeleton width={143} height={36} />
        </Box>
     </Box>
  </Grid>
  <Grid item xs={12}>
    <Card sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Table sx={{ "& .MuiTableCell-body:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)": {  py: 2 } }}>
            <TableRow sx={{  height: "56px", borderBottom: "1px solid #e6e5e7", backgroundColor: "#F6F6F7", }}>
               <TableCell sx={{ width: "120px"}} ><CustomSkeleton width={100} height={36}  animation="wave"  /></TableCell>
               <TableCell sx={{ width: "140px"}}> <CustomSkeleton width={100} height={36}  animation="wave" /> </TableCell>
               <TableCell sx={{ width: "180px"}} > <CustomSkeleton width={160} height={36} animation="wave"  /> </TableCell>
               <TableCell sx={{ width: "200px" }}> <CustomSkeleton width={140} height={36} animation="wave"  /> </TableCell>
             </TableRow>
            <TableBody>
            <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}} >
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"  /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
             </TableRow>
             <TableRow sx={{ borderBottom: "1px solid #e6e5e7"}}>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave"    /></TableCell>
               <TableCell> <CustomSkeleton width={80} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={93} height={23}  animation="wave" /> </TableCell>
               <TableCell> <CustomSkeleton width={120} height={23} animation="wave"  /> </TableCell>
             </TableRow>
           </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  </Grid>
  </>
  );
};

export default PaymentSkeleton;
