import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Card, Grid, Typography, Pagination } from '@mui/material';
// import { getInitials } from 'utils/get-initials';
// import CustomAvatar from '../../../components/mui/avatar';
import CustomChip from '../../../components/mui/chip';
import CardStatsHorizontalWithDetails from '../component/HorizontalCard';
import TableHeader from '../component/TableHeader';
import AddUserDrawer from '../component/AddUserDrawer';
import UserSkeleton from 'components/cards/Skeleton/UserSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { selectInstituteNotifications, selectLoading } from 'features/notification-management/notifications/redux/instituteNotificationSelectors';
import { getAllInstituteNotifications } from 'features/notification-management/notifications/redux/instituteNotificationThunks';
import client from "api/index"
import toast from 'react-hot-toast';
import { getErrorMessage } from 'utils/error-handler';
import { useSpinner } from 'context/spinnerContext';

const userStatusObj = {
  send: 'success',
  pending: 'warning',
  failed: 'secondary',
};




const Notifications = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const loading = useSelector(selectLoading)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [page,setPage] = useState(1)
  const { showSpinnerFn,hideSpinnerFn } = useSpinner()

  const dispatch = useDispatch()
  const notifications_list = useSelector(selectInstituteNotifications)
  console.log(notifications_list,"notification list")
 
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

  const getList = async (data) => {
    dispatch(getAllInstituteNotifications(data))
  }
  useEffect(() => {
  getList({ page });
}, [page]);

  // useEffect(() => {
  //   getList({ page: page})
  // },[dispath])

  //  useEffect(() => {
  //   getList({ page });
  // }, [getList, page]);

  
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const handleResendNotification = async (data) => {
    try {
      showSpinnerFn()
      const payload = { notification_id : data?._id , institute_id: data?.instituteId?._id,branch_id: data?.branch}
      await client.notification.resend(payload)
      toast.success("notification resend successfully",{ position: "top-center"})
    } catch (error) {
      const error_message = getErrorMessage(error)
      toast.error(error_message)
    }finally{
      hideSpinnerFn()
    }
  }


const RowOptions = ({data}) => (
  <Button size="small" variant="contained" onClick={() => handleResendNotification(data)} color="secondary">
    Resend
  </Button>
);

const columns = [
{
  flex: 0.12,
  minWidth: 120,
  field: 'Title',
  headerName: 'Title',
  renderCell: ({ row }) => (
    <Typography noWrap sx={{ color: 'text.secondary', }}>
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
      <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize',maxWidth: '200px', textWrap: "now-wrap",textOverflow: "ellipsis" }}>
        {row?.body}
      </Typography>
    </Box>
  ),
},
{
  flex: 0.2,
  field: ' institutes',
  minWidth: 190,
  headerName: ' institute',
  renderCell: ({ row }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {row?.instituteId?.institute_name || 'Institute name not available'}
        </Typography>
    </Box>
  ),
},
{
  flex: 0.12,
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
  flex: 0.12,
  minWidth: 100,
  sortable: false,
  field: 'actions',
  headerName: 'Actions',
  renderCell: ({ row }) => <RowOptions id={row?.id} data={row} />,
},
];


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
        <Typography variant="body1" color="textSecondary" 
               sx={{ fontWeight: 'bold',
                      fontSize: '20px' 
                   }}
        >
          No Data Available
        </Typography>
      </Box>
    );
  };
  console.log(notifications_list,"notification_list")
  return (
    <>
      {loading  ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {cardStatsData && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails title={'Total Notifications'} stats={notifications_list?.report?.total ?? 0} icon={'tabler:bell'} sx={{ minHeight: "102px", maxHeight: "102px" }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails
                    title={'Seen Notification'}
                    stats={notifications_list?.report?.read ?? 0}
                    avatarColor={'error'}
                    icon={'tabler:bell-minus'}
                    sx={{ minHeight: "102px", maxHeight: "102px" }}
                  />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <CardStatsHorizontalWithDetails
                    title={'Unseen Notification'}
                    stats={notifications_list?.report?.unread ?? 0}
                    avatarColor={'success'}
                    icon={'tabler:bell-ringing'}
                    sx={{ minHeight: "102px", maxHeight: "102px" }}
                  />
                </Grid>
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
                   backgroundColor : "#e8f5e9",
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none"
                }
              },
              "& .MuiDataGrid-columnHeaders" : {
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none",
                   backgroundColor: "#4caf50",  
                   color: "white",
                   fontWeight: "bold" ,   
              }
                 }}
                autoHeight 
                rowHeight={62}
                rows={notifications_list?.data ?? []}
                columns={columns}
                disableRowSelectionOnClick
               // hideFooterPagination
               // hideFooter
                pageSizeOptions={[5,10, 25, 50]}
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
          {
            notifications_list?.last_page !== 1 && !loading && 
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: "flex-end"}}>
                <Pagination
               count={notifications_list?.last_page }
                rowCount={100}
               page={page}
               color="primary"
               onChange={async(e,page) => {
                 const data = { page: page }
                 setPage(page)
                 getList(data)
               }}
               /> 
                {/* <Pagination
        count={notifications_list?.last_page ?? 1}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
      /> */}
            </Grid>
          }
          <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
      )}
    </>
  );
};

export default Notifications;
