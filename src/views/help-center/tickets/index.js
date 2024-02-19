// material-ui

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
// ** Icon Imports
import Icon from 'components/icon';
// project imports
import MainCard from 'components/cards/MainCard';

import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material';
import { useState, useCallback } from 'react';
// ** Next Imports
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// ** Custom Components Imports
import CustomChip from 'components/mui/chip';
import CustomAvatar from 'components/mui/avatar';
import dummylist from 'features/help-center/tickets/dummylist';

// ** Custom Table Components Imports
import TableHeader from 'features/help-center/tickets/TableHeader';
import SidebarAddUser from 'features/help-center/tickets/AddUserDrawer';
import EditModel from 'features/help-center/tickets/EditModel';

// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ==============================|| SAMPLE PAGE ||============================== //

// ** renders client column

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    );
  }
};


const Tickets = () => {
  // ** State
  const [role, setRole] = useState('');
  const [plan, setPlan] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  // Handle Edit dialog
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClickOpen = () => setOpenEdit(!openEdit);
  const RowOptions = ({ id }) => {
    // ** Hooks
    const dispatch = useDispatch();

    // ** State
    const [anchorEl, setAnchorEl] = useState(null);
    const rowOptionsOpen = Boolean(anchorEl);

    const handleRowOptionsClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleRowOptionsClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = () => {
      dispatch(deleteUser(id));
      handleRowOptionsClose();
    };

    return (
      <>
        <IconButton size="small" onClick={handleRowOptionsClick}>
          <Icon icon="tabler:dots-vertical" />
        </IconButton>
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
          <MenuItem component={Link} sx={{ '& svg': { mr: 2 } }} to="/apps/user/view/account" onClick={handleRowOptionsClose}>
            <Icon icon="tabler:eye" fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={() => setOpenEdit(true)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:edit" fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };
  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography component={LinkStyled} to={``}>{`#${row.id}`}</Typography>
      )
    },
    {
      flex: 1,
      minWidth: 280,
      field: 'fullName',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { fullName, email } = row;
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                to=""
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
  
    {
      flex: 1,
      minWidth: 120,
      headerName: 'Created Date',
      field: 'created Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.createdDate}
          </Typography>
        );
      }
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'Closed Date',
      headerName: 'closed Date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.ClosedDate}
          </Typography>
        );
      }
    },
    {
      flex: 1,
      minWidth: 190,
      field: 'Issue',
      headerName: 'issue',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.issue}
          </Typography>
        );
      }
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'Solution',
      headerName: 'solution',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.solution}
          </Typography>
        );
      }
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        );
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} />
    }
  ];
  // const handleEditClose = () => setOpenEdit(false)

  // ** Hooks
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.user)
  // useEffect(() => {
  //   dispatch(
  //     fetchData({
  //       role,
  //       status,
  //       q: value,
  //       currentPlan: plan
  //     })
  //   )
  // }, [dispatch, plan, role, status, value])

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

  return (
    <MainCard title="Tickets">
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Search Filters" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <TextField
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
                </TextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
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
                </TextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
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
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={dummylist.data.users}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
        <SidebarAddUser open={addUserOpen} toggle={toggleAddUserDrawer} />
        <EditModel open={openEdit} toggle={handleEditClickOpen} />
      </Grid>
    </MainCard>
  );
};

export default Tickets;
