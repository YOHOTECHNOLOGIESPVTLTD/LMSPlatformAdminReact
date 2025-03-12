import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  TextField,
  MenuItem,
  Collapse,
  Button
} from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DASHBOARD_API_ENDPOINT = "http://localhost:3001/api/institutes/platform/report";

const Dashboard2 = () => {
  const theme = useTheme();

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [metrics, setMetrics] = useState({
    totalInstitutes: 0,
    totalUsers: 0,
    activeSubscriptions: 0,
    inactiveSubscriptions: 0,
    newSupportTickets: 0
  });
  const [revenueData, setRevenueData] = useState([]);
  const [revenueDatas, setRevenueDatas] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);  
  

  useEffect(() => {
    fetchDashboardData();
  }, [month, year]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(DASHBOARD_API_ENDPOINT, {
        params: {
          month: month,
          year: year,
        }
      });
  
      const data = response.data;
      console.log(data)
      // Map API response to state variables
      setMetrics({
        totalInstitutes: data.totalInstituteCount,
        totalUsers: data.instituteSubscriptions.length,
        activeSubscriptions: data.activeSubscriptions,
        inactiveSubscriptions: data.inactiveSubscriptions,
        newSupportTickets: data.supportTickets.studentTickets + data.supportTickets.teachingTickets + data.supportTickets.staffTickets + data.supportTickets.adminTickets
      });
  
      console.log(revenueDatas, "data")
      console.log(data.revenue, "data1")
      setRevenueDatas(data.revenue)
  
      const monthData = [{ month: "Jan", index: 0 }, { month: "Feb", index: 1 }, { month: "Mar", index: 2 }, { month: "Apr", index: 3 }, { month: "May", index: 4 }, { month: "Jun", index: 5 }, { month: "Jul", index: 6 }, { month: "Aug", index: 7 }, { month: "Sep", index: 8 }, { month: "Oct", index: 9 }, { month: "Nov", index: 10 }, { month: "Dec", index: 11 }]
  
      let revenueData;
      if (month === '') {
        // If no specific month is selected, show data for all months
        revenueData = monthData.map((item, index) => ({
          month: item.month,
          revenue: data.revenue[index]
        }));
      } else {
        // Map revenue data for the selected month
        const revenueTrends = data.revenue.filter((item, index) => index === monthData.find((item2) => item2.month === month).index)
        console.log(revenueTrends[0])
  
        revenueData = [
          {
            month: month,
            revenue: revenueTrends[0]
          }
        ];
      }
  
      setRevenueData(revenueData);
  
      // Map subscription data
      const subscriptionDetails = [
        { name: 'Active', value: data.activeSubscriptions },
        { name: 'Inactive', value: data.inactiveSubscriptions }
      ];
      setSubscriptionData(subscriptionDetails);
  
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Box sx={{ padding: '32px', minHeight: '100vh' }}>
      {/* Button to Toggle Filters */}
      <Button variant="contained" onClick={toggleFilters} sx={{ mb: 2 }}>
        <FilterListIcon color='primary' sx={{ pr: 1 }} />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {/* Filter Cards Section */}
      <Collapse in={showFilters}>
        <Box sx={{ mt: 0 }}>
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={3}>
            {/* Month Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Month
                  </Typography>
                  <TextField select fullWidth value={month} onChange={handleMonthChange} variant="outlined">
                    <MenuItem value="Jan">January</MenuItem>
                    <MenuItem value="Feb">February</MenuItem>
                    <MenuItem value="Mar">March</MenuItem>
                    <MenuItem value="Apr">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="Jun">June</MenuItem>
                    <MenuItem value="Jul">July</MenuItem>
                    <MenuItem value="Aug">August</MenuItem>
                    <MenuItem value="Sep">September</MenuItem>
                    <MenuItem value="Oct">October</MenuItem>
                    <MenuItem value="Nov">November</MenuItem>
                    <MenuItem value="Dec">December</MenuItem>
                  </TextField>
                </CardContent>
              </Card>
            </Grid>

            {/* Year Filter */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Year
                  </Typography>
                  <TextField select fullWidth value={year} onChange={handleYearChange} variant="outlined">
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                  </TextField>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      {/* Quick Stats Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
  {/* Total Institutes Card */}
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        background: 'linear-gradient(135deg,rgb(244, 189, 175) 0%,rgb(221, 212, 205) 100%)',
        borderRadius: '12px',
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.05)',
          boxShadow: theme.shadows[6],
          animation: 'iglow 1.5s infinite',
        },
        '@keyframes iglow': {
          '0%': { boxShadow: '0 0 10px rgb(130, 223, 144)' },
          '50%': { boxShadow: '0 0 20px rgb(80, 184, 80)' },
          '100%': { boxShadow: '0 0 10px  rgb(130, 223, 144)' },
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#35312e', p: 3 }}>
        <AccountBalanceIcon fontSize="large" sx={{ color: '#03c203', fontSize: '2.5rem' }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="semi-bold" color="inherit">
            Total Institutes
          </Typography>
          <Typography  sx={{textAlign:"center", paddingTop:"10px"}} variant="h3" fontWeight="bold" color="#03c203">
            {metrics.totalInstitutes}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Institute Subscriptions Card */}
  <Grid item xs={12} sm={6} md={3}>
  {/* rgb(195, 227, 120) 0%,rgb(99, 137, 242) */}
    <Card
      sx={{
        background: 'linear-gradient(135deg,rgb(244, 189, 175) 0%,rgb(221, 212, 205) 100%)',
        borderRadius: '12px',
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.05)',
          boxShadow: theme.shadows[6],
          animation: 'sglow 1.5s infinite',
        },
        '@keyframes sglow': {
          '0%': { boxShadow: '0 0 10px rgb(233, 112, 112)' },
          '50%': { boxShadow: '0 0 20px rgb(229, 77, 77)' },
          '100%': { boxShadow: '0 0 10px rgb(233, 112, 112)' },
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#35312e', p: 3 }}>
        <PeopleIcon fontSize="large" sx={{ color: '#f60101', fontSize: '2.5rem' }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="semi-bold" color="inherit">
            Institute Subscriptions
          </Typography>
          <Typography  sx={{textAlign:"center", paddingTop:"10px"}} variant="h3" fontWeight="bold" color="#f60101">
            {metrics.totalUsers}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Active Subscriptions Card */}
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        background: 'linear-gradient(135deg,rgb(244, 189, 175) 0%,rgb(221, 212, 205)100%)',
        borderRadius: '12px',
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.05)',
          boxShadow: theme.shadows[6],
          animation: 'glows 1.5s infinite',
        },
        '@keyframes glows': {
          '0%': { boxShadow: '0 0 10px rgb(195, 185, 236)' },
          '50%': { boxShadow: '0 0 20px #626bc5' },
          '100%': { boxShadow: '0 0 10px rgb(195, 185, 236)' },
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#35312e', p: 3 }}>
        <PaymentsIcon fontSize="large" sx={{ color: '#626bc5', fontSize: '2.5rem' }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="semi-bold" color="inherit">
            Active Subscriptions
          </Typography>
          <Typography  sx={{textAlign:"center", paddingTop:"10px"}} variant="h3" fontWeight="bold" color="#626bc5">
            {metrics.activeSubscriptions}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* New Support Tickets Card */}
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        background: 'linear-gradient(135deg,rgb(244, 189, 175) 0%,rgb(221, 212, 205) 100%)',
        borderRadius: '12px',
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.05)',
          boxShadow: theme.shadows[6],
          animation: 'glow 1.5s infinite',
        },
        '@keyframes glow': {
          '0%': { boxShadow: '0 0 10px rgb(233, 120, 147)' },
          '50%': { boxShadow: '0 0 20px rgb(211, 49, 95)' },
          '100%': { boxShadow: '0 0 10px rgb(233, 120, 147)' },
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#35312e', p: 3 }}>
        <SupportAgentIcon fontSize="large" sx={{ color: '#df0945', fontSize: '2.5rem' }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="semi-bold" color="inherit" sx={{ paddingTop:"-5px"}}>
            New Support Tickets
          </Typography>
          <Typography sx={{textAlign:"center", paddingTop:"10px"}} variant="h3" fontWeight="bold" color="#df0945" >
            {metrics.newSupportTickets}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grid>
</Grid>
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
                <Typography variant="h4" gutterBottom>
                  Revenue Trends (Monthly)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                <AreaChart
          width={500}
          height={400}
          data={revenueData? revenueData : data.revenue}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Subscription Details Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Subscription Details
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={subscriptionData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label>
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
    </Box>
  );
};

export default Dashboard2;