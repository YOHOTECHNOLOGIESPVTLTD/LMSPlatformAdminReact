// ** MUI Imports
import Box from '@mui/material/Box';
import {Pagination} from '@mui/material';
import { useEffect } from 'react';
// ** Custom Components Imports
import Grid from '@mui/material/Grid';
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';
import FaqCategoriesAddDrawer from 'features/faq-management/faq-categories/components/FaqCategoriesAddDrawer';
import FaqCategoriesEdit from 'features/faq-management/faq-categories/components/FaqCategoriesEdit';
import {  useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
 // const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
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

  //console.log(faqCategories);
  useEffect(() => {
    const data = { page: currentPage , search: searchQuery }
    dispatch(getAllFaqCategories(data));
    
  }, [dispatch, selectedBranchId, refetch, currentPage, searchQuery]);


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
/*
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
*/
  // const handlePageChange = (event, page) => {
  //   setCurrentPage(page); 
  // };

  if (!faqCategories) {
    return null;
  }

  return (
    <>
      <Grid container>
        
        {/* Category filter and header */}
        <Grid item xs={12} sx={{ marginLeft: "15px" }}>
          <FaqCategoriesTableHeader
           // value={value}
           // handleFilter={handleFilter}
               value={searchQuery}
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
            <TableContainer component={Paper} sx={{ "& .MuiTableCell-root": { color: "#474747", borderBottom: '1px solid #ddd' } }} >
               <Table size="medium">
                 <TableHead sx={{ backgroundColor: "#1976D2"}} >
                   <TableRow sx={{ "& .MuiTableCell-head": {  fontWeight: "bold", color: "white" } }} >
                     <TableCell>Cateogry Name</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell>Action</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {
                     faqCategories?.data?.length > 0 ? (
                    faqCategories?.data?.map((category) => (
                      <TableRow
                      key={category._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: "#f0f0f0" } }}
                      >
                        <TableCell>{category?.identity}</TableCell>
                        <TableCell>
                          <Switch value={!category?.is_active} checked={category?.is_active} onChange={(e) => handleStatusChange(e,category)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', gap: "5px"}}>
                          <Tooltip title={"Edit"} >
                           <IconButton sx={{ backgroundColor: "#5f71fa33", width: "36px", height: "36px",borderRadius: "18px", ":hover": {  backgroundColor: "#5f71fa80", transition: ".2s ease-in-out",transform: "scale(1.2)"}}} onClick={()=>{
                             setSelectedRow(setSelectedRow({
                              id: category.uuid, 
                              title: category.identity, 
                              description: category.description 
                            }))
                            toggleEditUserDrawer();
                           }} >
                             <EditOutlinedIcon sx={{ width: "18px", height: "18px",color:"#5f71fa"}} />
                           </IconButton>
                          </Tooltip>
                          <Tooltip title={"Delete"} >
                           <IconButton onClick={() => handleDelete(category?.uuid)} sx={{ backgroundColor: "#ff462633", width: "36px", height: "36px", borderRadius: "18px", ":hover" : { backgroundColor: "#ff462680", transform: "scale(1.2)", transition: "transform 0.3s ease background-color 0.3s ease"  } }} >
                             <DeleteIcon sx={{ width: "23px", height: "23px",color: "#ff4626"}} />
                           </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No data found</TableCell>
                    </TableRow>
                  )
                   }
                 </TableBody>
               </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Pagination
              count={faqCategories?.last_page || 1}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
            />
          </Box>
           
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
