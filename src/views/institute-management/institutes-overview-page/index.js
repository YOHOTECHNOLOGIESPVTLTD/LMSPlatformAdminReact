// import axios from 'axios';
import { useEffect, useState } from 'react';
// ** MUI Imports
import CustomAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import CustomChip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import InstituteSkeleton from 'components/cards/Skeleton/InstituteSkeleton';
import Icon from 'components/icon';
import OptionsMenu from 'components/option-menu';
// import { Button } from '@mui/material';
import InstituteCard from 'features/institute-management/institutes-overview-page/instituteCard';

import InstituteHeaderSection from 'features/institute-management/institutes-overview-page/components/InstituteHeaderSection';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Table Components Imports
// import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TableHeader from 'features/institute-management/institutes-overview-page/components/TableHeader';
import { selectInstitutes, selectLoading } from 'features/institute-management/redux/instituteSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';
import StatusDialog from 'components/modal/DeleteModel';
import toast from 'react-hot-toast';
import { instituteChangeStatus } from 'features/institute-management/services/instituteService';
import { useSpinner } from 'context/spinnerContext';
import UserSkeleton from 'components/cards/Skeleton/UserSkeleton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Institutes = () => {
  // const [plan, setPlan] = useState('');
  // const [value, setValue] = useState('');
  // const [status, setStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });
  // const [allInstitutes, setAllInstitutes] = useState('');
 

  const [selectedInstitutes, setSelectedInstitutes] = useState(null);
  const [selectedInstitutesStatus, setSelectedInstitutesStatus] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { showSpinnerFn, hideSpinnerFn } = useSpinner();

  const dispatch = useDispatch();
  const allInstitutes = useSelector(selectInstitutes);
  console.log(allInstitutes)
  const instituteLoading = useSelector(selectLoading);

  useEffect(() => {
    showSpinnerFn();
    dispatch(getAllInstitutes());
    hideSpinnerFn();
  }, [dispatch, getAllInstitutes, selectedBranchId, refetch]);

  console.log(allInstitutes);

  // const handleFilter = useCallback((val) => {
  //   setValue(val);
  // }, []);

  // const handlePlanChange = useCallback((e) => {
  //   setPlan(e.target.value);
  // }, []);

  // const handleStatusChange = useCallback((e) => {
  //   setStatus(e.target.value);
  // }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  // const userStatusObj = {
  //   1: 'success',
  //   0: 'error'
  // };

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
  //   // ** State
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const rowOptionsOpen = Boolean(anchorEl);

  //   const handleRowOptionsClose = () => {
  //     setAnchorEl(null);
  //   };

  //   return (
  //     <>
  //       <Link to={`profile/${id}`} state={{ id: id }}>
  //         <Button size="small" variant="outlined" color="secondary">
  //           View
  //         </Button>
  //       </Link>

  //       <Menu
  //         keepMounted
  //         anchorEl={anchorEl}
  //         open={rowOptionsOpen}
  //         onClose={handleRowOptionsClose}
  //         anchorOrigin={{
  //           vertical: 'bottom',
  //           horizontal: 'right'
  //         }}
  //         transformOrigin={{
  //           vertical: 'top',
  //           horizontal: 'right'
  //         }}
  //         PaperProps={{ style: { minWidth: '8rem' } }}
  //       >
  //         <MenuItem sx={{ '& svg': { mr: 2 } }} href="/apps/user/view/account" onClick={handleRowOptionsClose}>
  //           <Icon icon="tabler:eye" fontSize={20} />
  //           View
  //         </MenuItem>
  //       </Menu>
  //     </>
  //   );
  // };

  const RowOptions = ({ row }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState(null);

    const handleRowOptionsOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleRowOptionsClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Box sx={{ gap: 0 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': {} } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" />,
                menuItemProps: {
                  component: Link,
                  to: `${row?.uuid}`,
                  state: { id: row?.uuid }
                }
              }
            ]}
            onClick={handleRowOptionsOpen}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
            sx={{ '& svg': { mr: 2 } }}
            component={Link}
            to={`${row?.name}`}
            state={{ id: row?.id }}
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
      // flex: 1.5,
      minWidth: 200,
      field: 'id',
      headerName: 'id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.id}
          </Typography>
        );
      }
    },
    {
      // flex: 2,
      minWidth: 300,
      field: 'institute',
      headerName: 'Institute',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
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
      // flex: 2,
      minWidth: 300,
      headerName: 'Contact & Address',
      field: 'Contact',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: 'flex',

              alignItems: 'flex-start',
              flexDirection: 'column',
              flexWrap: 1,
              py: 2
            }}
          >
            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              +91 {row?.contact_info.phone_no}
            </Typography>
            <div>
              <Typography
                sx={{ display: 'flex', color: 'text.secondary', textTransform: 'capitalize', flexShrink: 1, wordWrap: 'break-word', mt: 1 }}
              >
                {row?.address_line_1} {row?.address_line_2} {row?.city} {row?.state} {row?.pin_code}
              </Typography>
            </div>
          </Box>
        );
      }
    },

    {
      // flex: 1.3,
      minWidth: 200,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        // const userStatus = `${row.is_active}` === 1 ? 'Active' : 'Inactive';
        return (
          <CustomTextField select value={row.is_active} onChange={(e) => handleStatusChange(e, row)}>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </CustomTextField>
        );
      }
    },
    {
      // flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ];

  const handleStatusChange = (e, row) => {
    setSelectedInstitutes(row);
    setSelectedInstitutesStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    showSpinnerFn();
    const data = {
      status: selectedInstitutesStatus,
      id: selectedInstitutes?.id
    };
    const response = await instituteChangeStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
      hideSpinnerFn();
    }
  };
  console.log(allInstitutes, 'allInstitutes');
  // ** State
  return (
    <>
      {instituteLoading ? (
        <InstituteSkeleton />
      ) : (
        <Grid container spacing={3}>
          {/* User Header Section */}
          <Grid item xs={12}>
            <InstituteHeaderSection users={allInstitutes?.data} groups={allInstitutes?.data} />
          </Grid>

          {/* User Filter Card */}
          {/* <Grid item xs={12}>
          <Card sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
            <CardContent>
              <Grid container spacing={3}>
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
                      displayEmpty: true
                      // onChange: (e) => handleStatusChange(e)
                    }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item sm={4} xs={12}>
                <Button color="secondary" variant="tonal" startIcon={<Icon icon="tabler:upload" />}>
                  Export
                 </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> */}

          <Grid item xs={12}>
            <TableHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
          </Grid>

          {/* Display Skeleton or User Body Section based on loading state */}

          <Grid container spacing={3} sx={{ paddingLeft: '24px' }}>
            {allInstitutes?.data?.map((institute, index) => (
              <InstituteCard institute={institute} key={institute?._id} index={index} />
            ))}
          </Grid>
         { allInstitutes.last_page >=1&& <Grid container spacing={3} sx={{ pl: 5, mt: 1 ,alignItems:'right' ,justifyContent:'right'}}>
            <Stack spacing={2}>
              <Pagination count={allInstitutes.last_page } color="primary" />
            </Stack>
          </Grid>
          }

          {instituteLoading ? (
            <UserSkeleton />
          ) : (
            <Grid item xs={12} sx={{ display: 'none' }}>
              <Card>
                <Divider sx={{ m: '0 !important' }} />
                <DataGrid
                  autoHeight
                  // rowHeight={90}
                  getRowHeight={() => 'auto'}
                  rows={allInstitutes}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                />
              </Card>
            </Grid>
          )}

          {/* StatusDialog Drawer */}
          <StatusDialog
            open={statusOpen}
            setOpen={setStatusDialogOpen}
            description="Are you sure you want to Change Status"
            title="Status"
            handleSubmit={handleStatusChangeApi}
          />
        </Grid>
      )}
    </>
  );
};

export default Institutes;
