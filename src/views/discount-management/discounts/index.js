// ** MUI Imports
import Box from '@mui/material/Box'; // MUI Box component for layout
import Grid from '@mui/material/Grid'; // MUI Grid component for layout
import IconButton from '@mui/material/IconButton'; // MUI IconButton component for clickable icons
import Menu from '@mui/material/Menu'; // MUI Menu component for displaying a menu
import MenuItem from '@mui/material/MenuItem'; // MUI MenuItem component for menu items
import Typography from '@mui/material/Typography'; // MUI Typography component for text
import { DataGrid } from '@mui/x-data-grid'; // MUI DataGrid component for displaying tabular data
import Icon from 'components/icon'; // Custom Icon component

import MainCard from 'components/cards/MainCard'; // Custom MainCard component for main content

// project imports
import SidebarAddUser from '../components/DiscountAddDrawer'; // Custom SidebarAddUser component for adding a user
import EditModel from '../components/DiscountEditModel'; // Custom EditModel component for editing a model
import TableHeader from '../components/DiscountTableHeader'; // Custom TableHeader component for table headers
// import DeleteDialog from 'ui-component/models/DeleteModel';

// ** Utils Import
import axios from 'axios'; // Axios for making HTTP requests

// ** Next Imports
import { Link } from 'react-router-dom'; // React Router Link component for navigation
import { useCallback, useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const Discounts = () => {
  // ** State
  const [value, setValue] = useState(''); // State to hold the filter value
  const [addUserOpen, setAddUserOpen] = useState(false); // State to manage Add User Drawer
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 }); // State for pagination
  const [openEdit, setOpenEdit] = useState(false); // State to manage Edit dialog
 
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Fetch discounts on initial load and when loading state changes
  useEffect(() => {
    getAllDiscount();
  }, [loading]);

  const [Discount, setDiscount] = useState([]); // State to hold the list of discounts
  const [selectedId, setSelectedId] = useState(''); // State to hold the selected discount id

  useEffect(() => {
    getAllDiscount();
  }, []); // Fetch discounts on initial load

  // Handle Delete dialog open
  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  // // Handle Delete dialog close
  // const handleDeleteClose = () => {
  //   setDeleteDialogOpen(false);
  // };

  // // Handle actual deletion
  // const onDelete = async () => {
  //   const datainput = {
  //     id: deletingItemId
  //   };

  //   console.log(datainput);
  //   let config = {
  //     method: 'delete',
  //     maxBodyLength: Infinity,
  //     url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/discounts/delete`,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     },
  //     params: datainput
  //   };

  //   await axios
  //     .request(config)
  //     .then((response) => {
  //       console.log('Delete Discount:', response.data.data);
  //       handleDeleteClose();
  //       setLoading(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // Confirm deletion
  // const handleDeleteConfirm = async () => {
  //   await onDelete(deletingItemId);
  //   setDeleteDialogOpen(false);
  // };

  // Fetch all discounts from the API
  const getAllDiscount = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/discounts/show`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        setDiscount(response.data.data);
        setLoading(true);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Row options component for the DataGrid
  const RowOptions = ({ id }) => {
    console.log(id);

    const [anchorEl, setAnchorEl] = useState(null);
    const rowOptionsOpen = Boolean(anchorEl);

    // Open row options menu
    const handleRowOptionsClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    // Close row options menu
    const handleRowOptionsClose = () => {
      setAnchorEl(null);
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
          {/* View option */}
          <MenuItem component={Link} sx={{ '& svg': { mr: 2 } }} to="/apps/user/view/account" onClick={handleRowOptionsClose}>
            <Icon icon="tabler:eye" fontSize={20} />
            View
          </MenuItem>

          {/* Edit option */}
          <MenuItem
            onClick={() => {
              setSelectedId(id);
              setOpenEdit(true);
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon="tabler:edit" fontSize={20} />
            Edit
          </MenuItem>

          {/* Delete option */}
          <MenuItem onClick={() => handleDelete(id)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  // DataGrid columns
  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'id',
      headerName: 'id',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {row.id}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'Discount Rate',
      headerName: 'Discount Rate',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.discount_rate}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 110,
      field: 'Discount Type',
      headerName: 'Discount Type',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.discount_type}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row} />
    }
  ];

  // Handle filter change
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  // Toggle Add User Drawer
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <MainCard title="Discounts">
      <Grid item xs={12}>
        <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
        <DataGrid
          autoHeight
          rowHeight={62}
          rows={Discount}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
        <SidebarAddUser setLoading={setLoading} open={addUserOpen} toggle={toggleAddUserDrawer} />
        <EditModel setLoading={setLoading} open={openEdit} toggle={setOpenEdit} discount={selectedId} />
        {/* <DeleteDialog
          setLoading={setLoading}
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          handleSubmit={handleDeleteConfirm}
          description="Are you sure you want to delete this item?"
          title="Delete"
        /> */}
      </Grid>
    </MainCard>
  );
};

export default Discounts;
