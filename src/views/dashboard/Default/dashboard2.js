import React, { useState,useEffect } from 'react';
import { Grid,Card,CardContent,Typography,Box,useTheme,TextField,MenuItem,Select,FormControl,InputLabel,
} from '@mui/material';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,BarChart,Bar,PieChart,Pie,Cell,
} from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// const METRIC_DATA_API = `${process.env.REACT_APP_PUBLIC_API_URL}'/dashboard'`;


const data = {
  metrics: {
    totalInstitutes: 150,
    totalUsers: 1200,
    activeSubscriptions: 320,
    newSupportTickets: 25
  },
  revenueTrends: [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 }
  ],
  userGrowth: [
    { month: "Jan", users: 2400 },
    { month: "Feb", users: 1398 },
    { month: "Mar", users: 9800 }
  ],
  institutePerformance: [
    { name: "Institute A", performance: 4000 },
    { name: "Institute B", performance: 3000 },
    { name: "Institute B", performance: 3000 },
  
  ],
  subscriptionDetails: [
    { name: "Active", value: 400 },
    { name:" inactive", value: 300 }
  ],      
  financialReports: { totalRevenue: 20000, totalExpenses: 15000, netProfit: 5000 }
};

const Dashboard2 = () => {
  const theme = useTheme();

  const [dateRange, setDateRange] = useState('');
  const [instituteType, setInstituteType] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [metrics, setMetrics] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [institutePerformanceData, setInstitutePerformanceData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [financialData, setFinancialData] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange, instituteType, subscriptionStatus]); // Refetch data when filters change

  const fetchDashboardData = async () => {
    try {
      // const response = await axios.get(METRIC_DATA_API, {
      //   params: {
      //     dateRange,
      //     instituteType,  
      //     subscriptionStatus,
      //   },
      // });
      // const data = response.data;
    
      setMetrics(data.metrics);
      setRevenueData(data.revenueTrends);
      setUserGrowthData(data.userGrowth);
      setInstitutePerformanceData(data.institutePerformance);
      setSubscriptionData(data.subscriptionDetails);
      setFinancialData(data.financialReports);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleInstituteTypeChange = (event) => {
    setInstituteType(event.target.value);
  };

  const handleSubscriptionStatusChange = (event) => {
    setSubscriptionStatus(event.target.value);
  };

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
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                  Total Institutes
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">
                  {metrics.totalInstitutes}
                </Typography>
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
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                  Total Users
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">
                  {metrics.totalUsers}
                </Typography>
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
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                  Active Subscriptions
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">
                  {metrics.activeSubscriptions}
                </Typography>
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
                <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                  New Support Tickets
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">
                  {metrics.newSupportTickets}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Cards Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Date Range
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  variant="outlined"
                >
                  <MenuItem value="last_7_days">Last 7 Days</MenuItem>
                  <MenuItem value="last_30_days">Last 30 Days</MenuItem>
                  <MenuItem value="last_90_days">Last 90 Days</MenuItem>
                </TextField>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Institute Type
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Institute Type</InputLabel>
                  <Select
                    value={instituteType}
                    onChange={handleInstituteTypeChange}
                    label="Institute Type"
                  >
                    <MenuItem value="school">School</MenuItem>
                    <MenuItem value="college">College</MenuItem>
                    <MenuItem value="university">University</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subscription Status
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Subscription Status</InputLabel>
                  <Select
                    value={subscriptionStatus}
                    onChange={handleSubscriptionStatusChange}
                    label="Subscription Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Graphs Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Graphs & Trends
        </Typography>
        <Grid container spacing={3}>
          {/* Revenue Trends Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue Trends (Monthly)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
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
                <Typography variant="h6" gutterBottom>
                  User Growth Trends (Monthly)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
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

          {/* Institute Performance Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Institute Performance
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={institutePerformanceData}>
                    <CartesianGrid stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill={theme.palette.info.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Subscription Details Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subscription Details
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Financial Reports Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Financial Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
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
                <MonetizationOnIcon fontSize="large" sx={{ color: theme.palette.success.main }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="textPrimary">
                    ${financialData.totalRevenue}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
                <MonetizationOnIcon fontSize="large" sx={{ color: theme.palette.error.main }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="textPrimary">
                    ${financialData.totalExpenses}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
                <MonetizationOnIcon fontSize="large" sx={{ color: theme.palette.warning.main }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="textSecondary">
                    Net Profit
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="textPrimary">
                    ${financialData.netProfit}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard2;