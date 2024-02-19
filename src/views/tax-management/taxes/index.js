// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** Icon Imports
import Icon from 'components/icon';
// Project imports
import MainCard from 'components/cards/MainCard';

import { useCallback, useEffect, useState } from 'react';
// Next Imports
import { Link } from 'react-router-dom';

// Custom Table Components Imports
// import DeleteDialog from 'ui-component/models/DeleteModel';
import SidebarAddUser from '../components/TaxAddDrawer';
import EditModel from '../components/TaxEditModel';
import TableHeader from '../components/TaxTableHeader';
// Utils Import
import axios from 'axios';

// SAMPLE PAGE

const Taxes = () => {
  // State
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Handle Edit dialog
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClickOpen = () => setOpenEdit(!openEdit);

  const [Taxes, setTaxes] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  // Handle Delete
  // const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [deletingItemId, setDeletingItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTaxes();
  }, [loading]);

  // const handleDelete = (itemId) => {
  //   console.log('Delete clicked for item ID:', itemId);
  //   setDeletingItemId(itemId);
  //   setDeleteDialogOpen(true);
  // };

  // const handleDeleteClose = () => {
  //   setDeleteDialogOpen(false);
  // };

  // const onDelete = async () => {
  //   const datainput = {
  //     id: deletingItemId
  //   };

  //   console.log(datainput);
  //   let config = {
  //     method: 'delete',
  //     maxBodyLength: Infinity,
  //     url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/tax-management/taxes/delete`,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     },
  //     params: datainput
  //   };

  //   await axios
  //     .request(config)
  //     .then((response) => {
  //       console.log('Delete Tax Response:', response.data.data);
  //       handleDeleteClose();
  //       setLoading(true);
  //     })
  //     .catch((error) => {
  //       console.log('Error deleting tax:', error);
  //     });
  // };

  // const handleDeleteConfirm = async () => {
  //   await onDelete(deletingItemId);
  //   setDeleteDialogOpen(false);
  // };

  useEffect(() => {
    getAllTaxes();
  }, []);

  const getAllTaxes = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/tax-management/taxes/show`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        setTaxes(response.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log('Error fetching taxes:', error);
      });
  };

  // Component for handling row options (View, Edit, Delete)
  const RowOptions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const rowOptionsOpen = Boolean(anchorEl);

    const handleRowOptionsClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

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
          <MenuItem component={Link} sx={{ '& svg': { mr: 2 } }} to="/apps/user/view/account" onClick={handleRowOptionsClose}>
            <Icon icon="tabler:eye" fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={() => { setSelectedId(id); setOpenEdit(true); }} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:edit" fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleDelete(id)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  // Columns configuration for the data grid
  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
            {row.id}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'Tax Rate',
      headerName: 'Tax Rate',
      renderCell: ({ row }) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.tax_rate}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 110,
      field: 'Tax Type',
      headerName: 'Tax Type',
      renderCell: ({ row }) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.tax_type}
        </Typography>
      )
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

  // Function to handle filter changes
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  // Function to toggle the add user drawer
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <MainCard title="Tax">
      <Grid item xs={12}>
        {/* Header for the data grid */}
        <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
        
        {/* Data Grid to display taxes */}
        <DataGrid
          autoHeight
          rowHeight={62}
          rows={Taxes}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />

        {/* Sidebar for adding a new user */}
        <SidebarAddUser setLoading={setLoading} open={addUserOpen} toggle={toggleAddUserDrawer} />
        
        {/* Edit Model for editing tax details */}
        <EditModel setLoading={setLoading} open={openEdit} toggle={handleEditClickOpen} tax={selectedId} />
        
        {/* Delete dialog for confirming tax deletion */}
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

export default Taxes;
