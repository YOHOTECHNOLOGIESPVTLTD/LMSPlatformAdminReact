import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router';
import { Grow } from '@mui/material';
import client from 'api/index';
import { getImageUrl } from 'themes/imageUtlis';
import { imagePlaceholder } from 'lib/placeholders';

const InstitutePaymentView = () => {
  const location = useLocation();
  const instituteId = location.state.id;
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPaymentDetails = async (data) => {
    const response = await client.payments.getWidId(data);
    setPaymentDetails(response?.data?.data);
    setLoading(false);
  };

  useEffect(() => {
    const data = { institute: instituteId };
    fetchPaymentDetails(data);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const { institute, currentSubscriptionPlan, subscriptionHistory, paymentHistory } = paymentDetails;



   console.log(paymentDetails,"paymentDetails")

   const subscriptionColumns = [
    { field: 'planId', headerName: 'Plan ID', width: 250 },
    { field: 'startDate', headerName: 'Start Date', width: 250 },
    { field: 'endDate', headerName: 'End Date', width: 250 },
    { field: 'status', headerName: 'Status', width: 220 },
  ];

  const paymentColumns = [
    { field: 'paymentId', headerName: 'Payment ID', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 250 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 250 },
    { field: 'paymentDate', headerName: 'Payment Date', width: 250 },
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
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
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
        </Box>

      </Container>
    </Grow>
  );
};

export default InstitutePaymentView;
