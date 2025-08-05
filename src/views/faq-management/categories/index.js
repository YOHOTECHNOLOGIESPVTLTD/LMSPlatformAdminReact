// ** MUI Imports
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';
// ** Custom Components Imports
import Grid from '@mui/material/Grid';
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';
import FaqCategoriesAddDrawer from 'features/faq-management/faq-categories/components/FaqCategoriesAddDrawer';
import FaqCategoriesEdit from 'features/faq-management/faq-categories/components/FaqCategoriesEdit';
import { useState } from 'react';
import FaqCategoriesTableHeader from 'features/faq-management/faq-categories/components/FaqCategoriesTableHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFaqCategories } from 'features/faq-management/faq-categories/redux/faqCategoryThunks';
import { selectFaqCategories, selectLoading } from 'features/faq-management/faq-categories/redux/faqCategorySelectors';
import { deleteFaqCategory, updateStatusFaqCategory } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import toast from 'react-hot-toast';
import FaqCategorySkelton from 'components/cards/Skeleton/Faq/FaqCategorySkelton';
import { IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesDataGrid = () => {
  // const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState(null);
  const [selectedFaqCategoryStatus, setSelectedFaqCategoryStatus] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const dispatch = useDispatch();
  const faqCategories = useSelector(selectFaqCategories);
  console.log('faqcategories', faqCategories);
  const faqCategoryLoading = useSelector(selectLoading);
  // const[allFaqCategory,setAllFaqCategory]=useState([])

  // console.log(faqCategories);
  useEffect(() => {
    const data = { page };
    dispatch(getAllFaqCategories(data));
  }, [dispatch, selectedBranchId, refetch, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    if (faqCategories?.data) {
      const filtered = faqCategories?.data?.filter((category) => category.identity.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredCategories(filtered);
    }
  }, [faqCategories, searchQuery]);
  useEffect(() => {
    if (faqCategories?.data?.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [faqCategories, currentPage]);
  // const handleRowClick = (params) => {

  //   setSelectedRow({
  //     id: params.uuid,
  //     title: params.identity,
  //     description: params.description
  //   });
  // };

  const handleStatusChange = (e, row) => {
    setSelectedFaqCategory(row);
    setSelectedFaqCategoryStatus(e.target.value);
    setStatusDialogOpen(true);
  };
  console.log('filterdcsgs', filteredCategories);

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedFaqCategoryStatus,
      id: selectedFaqCategory?.uuid
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

  const handleDelete = (itemId) => {
    // console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen);

  // ** Hooks
  // const handleFilter = useCallback((val) => {
  //   setValue(val);
  //   if (!val) {
  //     setFilteredData(studentCertificatesdata);
  //   } else {
  //     const filtered = studentCertificatesdata.filter(
  //       (item) =>
  //         item.title.toLowerCase().includes(val.toLowerCase()) ||
  //         item.description.toLowerCase().includes(val.toLowerCase()) ||
  //         item.course_name.toLowerCase().includes(val.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   }
  // }, []);
  // const handleFilter = useCallback(
  //   async (val) => {
  //     try {
  //       setValue(val);
  //       const result = await searchUsers(val);
  //       if (result.success) {
  //         console.log('Search results:', result.data);
  //         dispatch(setUsers(result.data));
  //       } else {
  //         console.log(result.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [dispatch]
  // );
  // if (!faqCategories) {
  //   return null;
  // }
  console.log('selectedROw', selectedRow);

  return (
    <>
      <Grid container>
        {/* Category filter and header */}
        <Grid item xs={12} sx={{ marginLeft: '15px' }}>
          <FaqCategoriesTableHeader
            faqCategories={faqCategories}
            // value={value}
            // handleFilter={handleFilter}
            searchQuery={searchQuery}
            handleFilter={(val) => setSearchQuery(val)}
            toggle={toggleAddUserDrawer}
            selectedBranchId={selectedBranchId}
          />
        </Grid>
        {faqCategoryLoading ? (
          <FaqCategorySkelton />
        ) : (
          <Grid item xs={12}>
            {/* Display categories */}
            <TableContainer component={Paper} sx={{ '& .MuiTableCell-root': { color: '#474747', borderBottom: '1px solid #ddd' } }}>
              <Table size="medium">
                <TableHead sx={{ backgroundColor: '#1565C0' }}>
                  <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold', color: 'white' } }}>
                    <TableCell>Cateogry Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories?.length > 0 ? (
                    filteredCategories?.map((category) => (
                      <TableRow
                        key={category._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { backgroundColor: '#E3F2FD', transition: '0.3s ease' }
                        }}
                      >
                        <TableCell>{category?.identity}</TableCell>
                        <TableCell>
                          <Switch
                            value={!category?.is_active}
                            checked={category?.is_active}
                            onChange={(e) => handleStatusChange(e, category)}
                          />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', gap: '5px' }}>
                          <Tooltip title={'Edit'}>
                            <IconButton
                              sx={{
                                backgroundColor: '#5f71fa33',
                                width: '36px',
                                height: '36px',
                                borderRadius: '18px',
                                ':hover': { backgroundColor: '#5f71fa80', transition: '.2s ease-in-out', transform: 'scale(1.2)' }
                              }}
                              onClick={() => {
                                setSelectedRow({
                                  id: category.uuid,
                                  title: category.identity,
                                  description: category.description
                                });

                                console.log('r', selectedRow);
                                toggleEditUserDrawer();
                              }}
                            >
                              <EditOutlinedIcon sx={{ width: '18px', height: '18px', color: '#5f71fa' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={'Delete'}>
                            <IconButton
                              onClick={() => handleDelete(category?.uuid)}
                              sx={{
                                backgroundColor: '#ff462633',
                                width: '36px',
                                height: '36px',
                                borderRadius: '18px',
                                ':hover': {
                                  backgroundColor: '#ff462680',
                                  transform: 'scale(1.2)',
                                  transition: 'transform 0.3s ease background-color 0.3s ease'
                                }
                              }}
                            >
                              <DeleteIcon sx={{ width: '23px', height: '23px', color: '#ff4626' }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>No Data Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {
              // faqCategories?.last_page !==1 &&
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Pagination
                  count={faqCategories?.last_page || 1}
                  page={page}
                  /* onChange={async(e,page) => {
                    const data = {
                      page : page 
                    }
                    dispatch(getAllFaqCategories(data))
                  }}*/
                  onChange={handlePageChange}
                />
              </Box>
            }
          </Grid>
        )}
        <FaqCategoriesAddDrawer open={addUserOpen} toggle={() => setAddUserOpen(!addUserOpen)} setRefetch={setRefetch} />
        <FaqCategoriesEdit
          open={editUserOpen}
          toggle={() => setEditUserOpen(!editUserOpen)}
          initialValues={selectedRow}
          setRefetch={setRefetch}
          selectedRow={selectedRow}
        />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          successDescription="Deleted successfully"
          failureDescription="failed"
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
