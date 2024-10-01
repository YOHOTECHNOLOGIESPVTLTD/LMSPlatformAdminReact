import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
// import { getInitials } from 'utils/get-initials';
// import CustomAvatar from '../../../components/mui/avatar';
import CustomChip from '../../../components/mui/chip';
import CardStatsHorizontalWithDetails from '../component/HorizontalCard';
import TableHeader from '../component/TableHeader';
import AddUserDrawer from '../component/AddUserDrawer';
import UserSkeleton from 'components/cards/Skeleton/UserSkeleton';

const userStatusObj = {
  send: 'success',
  pending: 'warning',
  failed: 'secondary',
};

// const renderClient = (row) => {
//   if (row?.image) {
//     return <CustomAvatar src={row?.image} sx={{ mr: 2.5, width: 38, height: 38 }} />;
//   } else {
//     return (
//       <CustomAvatar
//         skin="light"
//         sx={{
//           mr: 2.5,
//           width: 38,
//           height: 38,
//           fontWeight: 500,
//           fontSize: (theme) => theme.typography.body1.fontSize,
//         }}
//       >
//         {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
//       </CustomAvatar>
//     );
//   }
// };

const RowOptions = () => (
  <Link to="profile">
    <Button size="small" variant="outlined" color="secondary">
      Resend
    </Button>
  </Link>
);

const columns = [
  {
    flex: 0.1,
    minWidth: 100,
    headerName: 'Id',
    field: 'employee_id',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
        {row?.institute_id}
      </Typography>
    ),
  },
  // {
  //   flex: 0.1,
  //   minWidth: 100,
  //   headerName: 'Image',
  //   field: 'Image',
  //   renderCell: ({ row }) => (
  //     <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
  //       {renderClient({ profile_image: row?.image })}
  //     </Typography>
  //   ),
  // },
  {
    flex: 0.12,
    minWidth: 120,
    field: 'Title',
    headerName: 'Title',
    renderCell: ({ row }) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row?.title}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    field: 'Body',
    minWidth: 190,
    headerName: 'Body',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {row?.body}
        </Typography>
      </Box>
    ),
  },
  {
    flex: 0.2,
    field: ' institutes',
    minWidth: 190,
    headerName: ' institutes',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {row?.institute?.map((item, index) => (
          <Typography key={index} noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {item?.name}
          </Typography>
        ))}
      </Box>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => (
      <CustomChip
        rounded
        skin="light"
        size="small"
        label={row.status}
        color={userStatusObj[row.status]}
        sx={{ textTransform: 'capitalize' }}
      />
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row?.id} />,
  },
];

const Notifications = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const [value, setValue] = useState('');
  const [inActiveUser, setInActiveUser] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const getAllGroups = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/notification/get-all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGroups(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/notification/get-all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.Data);
      setActiveUser(response.data.active);
      setInActiveUser(response.data.inActive);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cardStatsData = {
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

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllGroups();
  }, []);

  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const CustomNoRowsOverlay = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: '18px',
        }}
      >
        <Typography variant="body1" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {loading ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {cardStatsData && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails title={'Total Notifications'} stats={users?.length ?? 0} icon={'tabler:bell'} sx={{ minHeight: "102px", maxHeight: "102px" }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails
                    title={'Seen Notification'}
                    stats={groups?.length ?? 0}
                    avatarColor={'error'}
                    icon={'tabler:bell-minus'}
                    sx={{ minHeight: "102px", maxHeight: "102px" }}
                  />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails
                    title={'Unseen Notification'}
                    stats={activeUser}
                    avatarColor={'success'}
                    icon={'tabler:bell-ringing'}
                    sx={{ minHeight: "102px", maxHeight: "102px" }}
                  />
                </Grid>
                {console.log(inActiveUser,"inActiveUser")}
                {/* <Grid item xs={12} md={3} sm={6}>
                  <CardStatsHorizontalWithDetails
                    title={'Blocked Users'}
                    stats={inActiveUser ?? 0}
                    avatarColor={'warning'}
                    icon={'tabler:user-exclamation'}
                    sx={{ minHeight: "102px", maxHeight: "102px" }}
                  />
                </Grid> */}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
              <DataGrid
                sx={{ 
                  p: 2,
                  "& .MuiDataGrid-iconButtonContainer" : {
                    display: "none",
                    ":hover" : {
                      display: "none"
                    }
                  },
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
              }
                 }}
                autoHeight
                rowHeight={62}
                rows={users}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                disableColumnFilter={true}
                disableColumnMenu={true}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay
                }}
              />
            </Card>
          </Grid>
          <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
      )}
    </>
  );
};

export default Notifications;
