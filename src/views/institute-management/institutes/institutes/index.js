// material-ui

// project imports
import MainCard from 'components/cards/MainCard';
////////////////////////////////////////////////////
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import CustomChip from '@mui/material/Chip';
import CustomAvatar from '@mui/material/Avatar';
import CustomTextField from '@mui/material/TextField';
import Icon from 'components/icon';
import CardStatsHorizontalWithDetails from 'components/card-statistics/card-stats-horizontal-with-details';

// ** Utils Import
import { getInitials } from 'utils/get-initials';

// ** Custom Table Components Imports
import TableHeader from './TableHeader';
import { Button } from '@mui/material';
// import AddUserDrawer from './AddUserDrawer'
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //
// const userRoleObj = {
//   admin: { icon: 'tabler:device-laptop', color: 'secondary' },
//   author: { icon: 'tabler:circle-check', color: 'success' },
//   editor: { icon: 'tabler:edit', color: 'info' },
//   maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
//   subscriber: { icon: 'tabler:user', color: 'warning' }
// }

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

// ** renders client column
const renderClient = (row) => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar skin="light" color={row.avatarColor} sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: 10 }}>
        {getInitials(row?.name ? row.name : 'John Doe')}
      </CustomAvatar>
    );
  }
};

// const RowOptions = ({ id }) => {
const RowOptions = ({ id }) => {
  // ** Hooks
  // const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  // const handleRowOptionsClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  // const authToken = localStorage.getItem('token')
  // const [allInstitutes,setAllInstitutes] = useState(null)

  return (
    <>
      <Link to={`profile/${id}`} state={{ id: id }}>
        <Button
          size="small"
          //  onClick={GetInstituteById}
          // onClick={handleRowOptionsClose}

          variant="outlined"
          color="secondary"
        >
          {/* <Icon icon='tabler:eye' /> */}
          View
        </Button>
      </Link>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          // component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href="/apps/user/view/account"
          onClick={handleRowOptionsClose}
        >
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
      </Menu>
    </>
  );
};

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'fullName',
    headerName: 'Name',
    renderCell: ({ row }) => {
      // const { fullName, email } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              // component={Link}
              href="/apps/user/view/account"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {row?.name}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {row?.email}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'billing',
    headerName: 'Username',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.institute_code}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    field: 'phone',
    minWidth: 170,
    headerName: 'Phone',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={userRoleObj[row.role].color || 'primary'}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </CustomAvatar> */}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.phone}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'City',
    field: 'City',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row?.city}
        </Typography>
      );
    }
  },

  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      const userStatus = `${row.is_active}` === 1 ? 'Active' : 'Inactive';
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={userStatus}
          color={userStatusObj[userStatus]}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
];

const apiData = {
  statsSquare: [
    {
      stats: '97.8k',
      title: 'Orders',
      avatarColor: 'error',
      icon: 'tabler:briefcase'
    },
    {
      stats: '3.4k',
      title: 'Review',
      avatarColor: 'success',
      icon: 'tabler:message-dots'
    }
  ],
  statsHorizontal: [
    {
      stats: '86%',
      icon: 'tabler:cpu',
      title: 'CPU Usage'
    },
    {
      stats: '1.24gb',
      icon: 'tabler:server',
      title: 'Memory Usage',
      avatarColor: 'success'
    },
    {
      stats: '0.2%',
      avatarColor: 'error',
      title: 'Downtime Ratio',
      icon: 'tabler:chart-pie-2'
    },
    {
      stats: '128',
      title: 'Issues Found',
      avatarColor: 'warning',
      icon: 'tabler:alert-octagon'
    }
  ],
  statsVertical: [
    {
      stats: '1.28k',
      chipColor: 'error',
      chipText: '-12.2%',
      avatarColor: 'error',
      title: 'Total Profit',
      subtitle: 'Last week',
      avatarIcon: 'tabler:credit-card'
    },
    {
      stats: '24.67k',
      chipText: '+25.7%',
      title: 'Total Sales',
      chipColor: 'success',
      subtitle: 'Last week',
      avatarColor: 'success',
      avatarIcon: 'tabler:credit-card'
    }
  ],
  statsWithAreaChart: [
    {
      stats: '92.6k',
      avatarIcon: 'tabler:users',
      title: 'Subscribers Gained',
      chartSeries: [{ data: [40, 4, 58, 12, 35, 10, 84] }]
    },
    {
      stats: '36.5%',
      chartColor: 'error',
      avatarColor: 'error',
      title: 'Quarterly Sales',
      avatarIcon: 'tabler:shopping-cart',
      chartSeries: [{ data: [44, 75, 24, 57, 6, 84] }]
    },
    {
      stats: '97.5k',
      chartColor: 'warning',
      avatarColor: 'warning',
      title: 'Orders Received',
      avatarIcon: 'tabler:package',
      chartSeries: [{ data: [30, 84, 11, 76, 0, 49, 9] }]
    },
    {
      stats: '91.8k',
      chartColor: 'success',
      avatarColor: 'success',
      title: 'Revenue Generated',
      avatarIcon: 'tabler:credit-card',
      chartSeries: [{ data: [6, 35, 25, 61, 32, 84, 70] }]
    }
  ],
  statsHorizontalWithDetails: [
    {
      stats: '21,459',
      title: 'Session',
      trendDiff: '+29',
      icon: 'tabler:user',
      subtitle: 'Total Users'
    },
    {
      stats: '4,567',
      trendDiff: '+18',
      title: 'Paid Users',
      avatarColor: 'error',
      icon: 'tabler:user-plus',
      subtitle: 'Last week analytics'
    },
    {
      stats: '19,860',
      trendDiff: '-14',
      trend: 'negative',
      title: 'Active Users',
      avatarColor: 'success',
      icon: 'tabler:user-check',
      subtitle: 'Last week analytics'
    },
    {
      stats: '237',
      trendDiff: '+42',
      title: 'Pending Users',
      avatarColor: 'warning',
      icon: 'tabler:user-exclamation',
      subtitle: 'Last week analytics'
    }
  ]
};

const Institutes = () => {
  const [role, setRole] = useState('');
  const [plan, setPlan] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [allInstitutes, setAllInstitutes] = useState('');

  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handlePlanChange = useCallback((e) => {
    setPlan(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  // ** State
  const token = localStorage.getItem('token');
  console.log(token, 'authToken');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  async function getAllInstitutes() {
    try {
      await axios
        .get('http://115.246.236.90:8000/api/platform/admin/institute-management/institutes/read', { headers })
        .then((response) => {
          // Handle the response data here
          console.log('Response:', response.data.data);
          setAllInstitutes(response.data.data);
        });
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getAllInstitutes();
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ mb: 2 }}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <MainCard title="Institutes">
        <Grid container spacing={6.5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Search Institutes" />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item sm={4} xs={12}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue="Select Role"
                      SelectProps={{
                        value: role,
                        displayEmpty: true,
                        onChange: (e) => handleRoleChange(e)
                      }}
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="author">Author</MenuItem>
                      <MenuItem value="editor">Editor</MenuItem>
                      <MenuItem value="maintainer">Maintainer</MenuItem>
                      <MenuItem value="subscriber">Subscriber</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue="Select Plan"
                      SelectProps={{
                        value: plan,
                        displayEmpty: true,
                        onChange: (e) => handlePlanChange(e)
                      }}
                    >
                      <MenuItem value="">Select Plan</MenuItem>
                      <MenuItem value="basic">Basic</MenuItem>
                      <MenuItem value="company">Company</MenuItem>
                      <MenuItem value="enterprise">Enterprise</MenuItem>
                      <MenuItem value="team">Team</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue="Select Status"
                      SelectProps={{
                        value: status,
                        displayEmpty: true,
                        onChange: (e) => handleStatusChange(e)
                      }}
                    >
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </CustomTextField>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ m: '0 !important' }} />
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={allInstitutes}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                // allInstitutes={allInstitutes}
              />
            </Card>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Institutes;
