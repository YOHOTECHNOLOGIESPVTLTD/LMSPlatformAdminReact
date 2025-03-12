import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router';
import { Grow } from '@mui/material';
import client from 'api/index';
import { getImageUrl } from 'themes/imageUtlis';
import { imagePlaceholder } from 'lib/placeholders';
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField,  } from '@mui/material';

const InstitutePaymentView = () => {
  const location = useLocation();
  const instituteId = location.state.id;
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subreqDetails, setsubreqDetails] = useState(null);
  const [clicked, setclicked] = useState(false);


  // const [open, setOpen] = useState(false);
  // const [selectedPayment, setSelectedPayment] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);


  const handleOpen = (payment) => {
    console.log("cliked open"+JSON.stringify(payment));

    setSelectedPayment(payment);
    setOpenDialog(true);

  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  const handleConfirmPayment = async() => {

    console.log("cklicked"+instituteId );
   
    // const response1 = await client.update.update(data);

    console.log('Processing payment for:', selectedPayment);
    const transid =  selectedPayment.transactionid

    const data =  { paymentstatus: "Completed", payment_id:transid,instituteId:instituteId }

    await client.payments.approve(data);
 
    document.getElementById("payment-history-heading")?.focus();
   handleClose();
   window.location.reload();

    // Add actual payment processing logic here
  };
  const [openRejectDialog, setOpenRejectDialog] = useState(false); 
const [selectedId, setSelectedId] = useState(null); 
const [rejectReason, setRejectReason] = useState("");

  const handleApprove = async(id) => {
    console.log(`Approved subscription request with ID: ${id}`);
    const data = { institute_Id: instituteId,isapproved: true,reason:"" };
    await client.subscription.approve(data);

    // Add API call or state update logic here
    setclicked(true)

  };
  
  const handleReject = (id) => {
    console.log(`Rejected subscription request with ID: ${id}`);
    
    setclicked(true)
    setSelectedId(id);
    setOpenRejectDialog(true);

  };
 
  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
  
    console.log(`Rejecting request ID: ${selectedId} with reason: ${rejectReason}`);
  
    try {
       const data = { institute_Id: instituteId,isapproved: false,reason:rejectReason };

       await client.subscription.approve(data);
      setclicked(false); 
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  
    setOpenRejectDialog(false); // Close the dialog
    setRejectReason(""); // Reset the reason
  };
  const fetchPaymentDetails = async (data) => {
    const response = await client.payments.getWidId(data);
    const response1 = await client.subscription.getWidId(data);

    setPaymentDetails(response?.data?.data);
    setsubreqDetails(response1?.data?.data);

    setLoading(false);
  };

 
  useEffect(() => {
    const data = { institute: instituteId };
    fetchPaymentDetails(data);
  }, [clicked]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const { institute, currentSubscriptionPlan, subscriptionHistory, paymentHistory } = paymentDetails;

   console.log(paymentDetails,"paymentDetails")
   console.log(subreqDetails,"sub")
  //  console.log(subreqDetails[0].is_readed,"sub")

   const subReqColumns = [
    { field: "newSubscriptionId", headerName: "New Subscription ID", width: 300,headerAlign: "center", 
      align: "center" },
    { field: "reqdate", headerName: "Requested Date", width: 300 ,headerAlign: "center", 
      align: "center"},

    {
      field: "actions",
      headerName: "Actions",
      width: 250,headerAlign: "center", 
    align: "center",
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => handleApprove(params.row.id)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => handleReject(params.row.id)}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];


  const subReqRows =
  subreqDetails.length > 0 && !subreqDetails[0].is_readed
    ? subreqDetails.map((request) => ({
        id: request.id, // Unique identifier for actions
        newSubscriptionId: request.newsubscription,
        reqdate: new Date(request.updatedAt).toLocaleDateString(),

      }))
    : []; // Empty array if there are no upgrade requests

// Conditional rendering message

   const subscriptionColumns = [
    { field: 'planId', headerName: 'Plan ID', width: 250 },
    { field: 'startDate', headerName: 'Start Date', width: 250 },
    { field: 'endDate', headerName: 'End Date', width: 250 },
    { field: 'status', headerName: 'Status', width: 220 },
  ];

  const paymentColumns = [
    { field: 'paymentId', headerName: 'Payment ID', width: 200 ,headerAlign: "left", 
      align: "left"},
    { field: 'amount', headerName: 'Amount', width: 150 ,headerAlign: "left", 
      align: "left"},
    { field: 'paymentStatus', headerName: 'Payment Status', width: 200 ,headerAlign: "left", 
      align: "left"},
    { field: 'paymentMethod', headerName: 'Payment Method', width: 250 ,headerAlign: "left", 
      align: "left"},
    { field: 'paymentDate', headerName: 'Payment Date', width: 200 ,headerAlign: "left", 
      align: "left"},
    { field: 'transactionid', headerName: 'Payment id', width: 300 ,headerAlign: "left", 
      align: "left"},

      {
        field: 'pay',
        headerName: 'Pay',
        width: 200,
        renderCell: (params) => {
          if (params.row.paymentStatus !== 'Completed') {
            return (
              <Button variant="contained" color="success" onClick={() => handleOpen(params.row)}>
                Paid
              </Button>
            );
          }
          return <Typography color="textSecondary">Paid</Typography>;
        },
      },
    ];

  const subscriptionRows = subscriptionHistory.map((history, index) => ({
    id: index,
    planId: history.planId,
    startDate: new Date(history.startDate).toLocaleDateString(),
    endDate: new Date(history.endDate).toLocaleDateString(),
    status: history.isActive ? 'Active' : 'Expired',
  }));

  const paymentRows = paymentHistory.map((payment, index) => ({
    id: index,
    paymentId: payment.paymentId || '-',
    amount: payment.amount || '-',
    paymentStatus: payment.status || '-',
    paymentMethod: payment.paymentMethod || '-',
    transactionid: payment._id || '-',

    paymentDate: payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : '-',
  }));


  return (
    <Grow in>
      <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
  {/* Left Side: Institute Details */}
      <Grid item xs={12} md={6}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Institute Details
        </Typography>
          <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        // backgroundColor: '#f5f5f5',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
        },
        minHeight: '250px',
        maxHeight: "250px"
      }}
    >
      <Grid container spacing={2}>
        {/* Center and resize image */}
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={institute?.image ? getImageUrl(institute?.image) : imagePlaceholder}
              alt={institute?.institute_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Name:</strong> {institute.institute_name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Email:</strong> {institute.email}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Address:</strong>{' '}
                    {`${institute.contact_info.address.address1}, ${institute.contact_info.address.address2}, ${institute.contact_info.address.city}, ${institute.contact_info.address.state} - ${institute.contact_info.address.pincode}`}
                  </Typography>
        </Grid>
      </Grid>
          </Paper>
      </Grid>

  {/* Right Side: Current Subscription Plan */}
  <Grid item xs={12} md={6}>
    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
      Current Subscription Plan
    </Typography>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#e3f2fd',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
        },
        maxHeight: '250px',
        minHeight: "250px"
      }}
    >
      <Grid container spacing={2}>
        {/* Center and resize subscription plan image */}
        <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={currentSubscriptionPlan?.planId?.image ? getImageUrl(currentSubscriptionPlan?.planId?.image) : imagePlaceholder}
              alt={currentSubscriptionPlan?.planId?.identity}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>


        <Grid item xs={12} sm={8}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Plan:</strong> {currentSubscriptionPlan.planId.identity}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Start Date:</strong> {new Date(currentSubscriptionPlan.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>End Date:</strong> {new Date(currentSubscriptionPlan.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem', fontWeight: 500 }}>
                    <strong>Status:</strong>{' '}
                    <Box
                      component="span"
                      sx={{
                        color: currentSubscriptionPlan.isActive ? '#4caf50' : '#f44336',
                        fontWeight: 'bold',
                      }}
                    >
                      {currentSubscriptionPlan.isActive ? 'Active' : 'Inactive'}
                    </Box>
                  </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
</Grid>
<Box mt={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Subscription upgrade Request
          </Typography>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
           {subReqRows.length > 0 ? ( <Box sx={{ width: '100%' }}>
              <DataGrid
                sx={{ 
                  "& .MuiDataGrid-row" : {
                    border : "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                    ":hover" : {
                       backgroundColor : "#f5f5f7",
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                    }
                  },
                  "& .MuiDataGrid-columnHeaders" : {
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                  },
                  "& .MuiDataGrid-footerContainer" : {
                    border : "1px solid #e6e5e7"
                }
                 }}
                rows={subReqRows}
                columns={subReqColumns}
                autoHeight
                disableSelectionOnClick
                disableColumnMenu
                hideFooterPagination
                disableColumnFilter={true}
              />
            </Box> ) : (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "#666",
          padding: "20px",
        }}
       >
      There is no upgrade request
      </Typography>
    )}
          </Paper>
        </Box> 

{/* Reject Reason Dialog */}
<Dialog open={openRejectDialog} onClose={() => setOpenRejectDialog(false)}>
  <DialogTitle>Reject Subscription Request</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Rejection Reason"
      type="text"
      fullWidth
      variant="outlined"
      value={rejectReason}
      onChange={(e) => setRejectReason(e.target.value)} // Update the reason state
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenRejectDialog(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleRejectConfirm} color="error" variant="contained">
      Confirm Reject
    </Button>
  </DialogActions>
</Dialog>

<Box mt={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Subscription History
          </Typography>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <DataGrid
                sx={{ 
                  "& .MuiDataGrid-row" : {
                    border : "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                    ":hover" : {
                       backgroundColor : "#f5f5f7",
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                    }
                  },
                  "& .MuiDataGrid-columnHeaders" : {
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                  },
                  "& .MuiDataGrid-footerContainer" : {
                    border : "1px solid #e6e5e7"
                }
                 }}
                rows={subscriptionRows}
                columns={subscriptionColumns}
                autoHeight
                disableSelectionOnClick
                disableColumnMenu
                hideFooterPagination
                disableColumnFilter={true}
              />
            </Box>
          </Paper>
        </Box>

        <Box mt={4}>
          <Typography  id="payment-history-heading" variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Payment History
          </Typography>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              backgroundColor: "white",
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{  width: '100%' }}>
              <DataGrid 
                 sx={{ 
                  "& .MuiDataGrid-row" : {
                    border : "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                    ":hover" : {
                       backgroundColor : "#f5f5f7",
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                    }
                  },
                  "& .MuiDataGrid-columnHeaders" : {
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                  },
                  "& .MuiDataGrid-footerContainer" : {
                    border : "1px solid #e6e5e7"
                }
                 }}
                rows={paymentRows}
                columns={paymentColumns}
                autoHeight
                disableSelectionOnClick
                disableColumnMenu
                hideFooterPagination
                disableColumnFilter={true}
              />
            </Box>
          </Paper>
          <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          Are you sure you want to proceed with this payment?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
       
      </Container>
    </Grow>
  );
};

export default InstitutePaymentView;
