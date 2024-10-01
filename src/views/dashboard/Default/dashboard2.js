import React from 'react';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const data = [
  { month: 'Jan', revenue: 4000, users: 2400, subscriptions: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398, subscriptions: 2210 },
  { month: 'Mar', revenue: 2000, users: 9800, subscriptions: 2290 },
  { month: 'Apr', revenue: 2780, users: 3908, subscriptions: 2000 },
  { month: 'May', revenue: 1890, users: 4800, subscriptions: 2181 },
];

const Dashboard2 = () => {
  const theme = useTheme();
  
  
  return (
    <Box sx={{ padding: '32px', minHeight: '100vh' }}>
      {/* Quick Stats Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              boxShadow: theme.shadows[3],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-8px)' },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalanceIcon fontSize="large" sx={{ color: theme.palette.success.main }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">Total Institutes</Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">150</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              boxShadow: theme.shadows[3],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-8px)' },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">Total Users</Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">1200</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              boxShadow: theme.shadows[3],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-8px)' },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PaymentsIcon fontSize="large" sx={{ color: theme.palette.warning.main }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">Active Subscriptions</Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">320</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              boxShadow: theme.shadows[3],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'translateY(-8px)' },
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SupportAgentIcon fontSize="large" sx={{ color: theme.palette.error.main }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">New Support Tickets</Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">25</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphs Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Graphs & Trends</Typography>
        <Grid container spacing={3}>
          {/* Revenue Trends Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Revenue Trends (Monthly)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid stroke="#e0e0e0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* User Growth Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>User Growth Trends (Monthly)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid stroke="#e0e0e0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard2;
