// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { useEffect } from 'react';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import FaqCategoriesAddDrawer from 'features/faq-management/faq-categories/components/FaqCategoriesAddDrawer';
import FaqCategoriesEdit from 'features/faq-management/faq-categories/components/FaqCategoriesEdit';
import { useCallback, useState } from 'react';
import FaqCategoriesTableHeader from 'features/faq-management/faq-categories/components/FaqCategoriesTableHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFaqCategories } from 'features/faq-management/faq-categories/redux/faqCategoryThunks';
import { selectFaqCategories, selectLoading } from 'features/faq-management/faq-categories/redux/faqCategorySelectors';
import { deleteFaqCategory, updateStatusFaqCategory } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import toast from 'react-hot-toast';

const CategoriesDataGrid = () => {
  const [value, setValue] = useState('');

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState(null);
  const [selectedFaqCategoryStatus, setSelectedFaqCategoryStatus] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const dispatch = useDispatch();
  const faqCategories = useSelector(selectFaqCategories);
  const faqCategoryLoading = useSelector(selectLoading);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllFaqCategories(data));
  }, [dispatch,selectedBranchId, refetch]);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleStatusChange = (e, row) => {
    setSelectedFaqCategory(row);
    setSelectedFaqCategoryStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      status: selectedFaqCategoryStatus,
      id: selectedFaqCategory?.id
    };
    const response = await updateStatusFaqCategory(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteApi = async () => {
    const data = {
      id: deletingItemId
    };
    const response = await deleteFaqCategory(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  // ** Hooks

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 2.2,
      field: 'title',
      headerName: 'Category Name',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  textAlign: 'justify',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', mt: 1.3, fontSize: '13px' }}>
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select value={row.is_active} onChange={(e) => handleStatusChange(e, row)}>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ gap: 1 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                // to: `/apps/invoice/edit/${row.id}`,
                text: 'Edit',
                icon: <Icon icon="tabler:edit" />,
                menuItemProps: {
                  onClick: () => {
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => {
                    handleDelete(row?.id);
                  }
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      <Grid container>
        {/* Category filter and header */}
        <Grid item xs={12}>
          <FaqCategoriesTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        {faqCategoryLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            {/* Display categories */}
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={faqCategories}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}
        <FaqCategoriesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />
        <FaqCategoriesEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} setRefetch={setRefetch} />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleDeleteApi}
        />
        <StatusDialog
          open={statusOpen}
          setOpen={setStatusDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
    </>
  );
};

export default CategoriesDataGrid;
