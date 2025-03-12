// ** MUI Imports
import Box from '@mui/material/Box';
import { useEffect } from 'react';
// ** Custom Components Imports
import Grid from '@mui/material/Grid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';
import FaqAddDrawer from 'features/faq-management/faqs/components/FaqAddDrawer';
import FaqEdit from 'features/faq-management/faqs/components/FaqEdit';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FaqTableHeader from 'features/faq-management/faqs/components/FaqTableHeader';
import { getAllFaqs } from 'features/faq-management/faqs/redux/faqThunks';
import { selectFaqs, selectLoading } from 'features/faq-management/faqs/redux/faqSelectors';
import { getAllFaqCategorywithFaq } from 'features/faq-management/faq-categories/services/faqCategoryServices';
// import FaqAccordian from 'features/faq-management/faqs/components/FaqAccordian';
import { updateStatusFaq, deleteFaq } from 'features/faq-management/faqs/services/faqServices';
import toast from 'react-hot-toast';
import { IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip , Pagination} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';


const FaqDataGrid = () => {
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [faqCategories, setFaqCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedFaqStatus, setSelectedFaqStatus] = useState(null);
  const dispatch = useDispatch();

  const faqs = useSelector(selectFaqs);
  const faqLoading = useSelector(selectLoading);
  useEffect(() => {
    getFaqCategories();
  }, []);

  useEffect(() => {
    dispatch(getAllFaqs({page: currentPage}));
  }, [dispatch, refetch, currentPage]);

  const getFaqCategories = async () => {
    const result = await getAllFaqCategorywithFaq();
    setFaqCategories(result.data.data);
  };

 // console.log(deletingItemId,faqCategories);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
 

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId?.uuid);
    setDeleteDialogOpen(true);
  };

  const handleDeleteApi = async () => {
    const data = {
      id: deletingItemId
    };
    const response = await deleteFaq(data);
    if (response.success) {
      toast.success(response.message);
      //setRefetch((state) => !state);
      setRefetch(!refetch);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusChange = (e, row) => {
    setSelectedFaq(row);
    setSelectedFaqStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedFaqStatus,
      id: selectedFaq?.uuid
    };
    const response = await updateStatusFaq(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch(!refetch);
      // setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
   // console.log('Toggle drawer');
  };

  // ** Hooks


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
      {faqLoading || !faqs ? (
        <ContentSkeleton />
      ) : (
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
          <FaqAccordian faqCategories={faqCategories}/>
        </Grid> */}
          <Grid item xs={12}>
            <FaqTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          </Grid>
         
          <Grid item xs={12}>
            {/* Display categories */}
            <TableContainer component={Paper} sx={{ "& .MuiTableCell-root": { color: "#474747", borderBottom: '1px solid #ddd' } }} >
               <Table size="medium">
                 <TableHead sx={{ backgroundColor: "#1976D2"}} >
                   <TableRow sx={{ "& .MuiTableCell-head": {  fontWeight: "bold", color: "white" } }} >
                     <TableCell sx={{fontFamily:"poppins"}}>FAQ Name</TableCell>
                     <TableCell sx={{fontFamily:"poppins"}}>Category</TableCell>
                      <TableCell sx={{ fontFamily: "poppins" }}>Status</TableCell>
                      <TableCell sx={{ fontFamily: "poppins" }}>Action</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {
                    faqs?.data?.length > 0 ? (
                    faqs?.data?.map((faq) => (
                      <TableRow
                      key={faq._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: "#f0f0f0" } }}
                      >
                        <TableCell sx={{fontSize:"16px", fontFamily: "poppins" }}>{faq?.identity}</TableCell>
                        <TableCell sx={{ fontSize: "16px", fontFamily: "poppins" }}>{faq?.category?.identity}</TableCell>
                        <TableCell>
                          <Switch value={!faq?.is_active} checked={faq?.is_active} onChange={(e) => handleStatusChange(e,faq)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', gap: "5px"}}>
                          <Tooltip title={"Edit"} >
                           <IconButton  sx={{ backgroundColor: "#5f71fa33", width: "36px", height: "36px",borderRadius: "18px", ":hover": {  backgroundColor: "#5f71fa80", transition: ".2s ease-in-out",transform: "scale(1.2)"}}} onClick={()=>{
                             setSelectedRow(setSelectedRow({
                              id: faq.uuid, 
                              title: faq.identity, 
                              description: faq.description 
                            }))
                            toggleEditUserDrawer();
                           }} >
                             <EditOutlinedIcon sx={{ width: "18px", height: "18px",color:"#5f71fa"}} />
                           </IconButton>
                          </Tooltip>
                          <Tooltip title={"Delete"} >
                           <IconButton onClick={() => handleDelete(faq?.uuid)} sx={{ backgroundColor: "#ff462633", width: "36px", height: "36px", borderRadius: "18px", ":hover" : { backgroundColor: "#ff462680", transform: "scale(1.2)", transition: "transform 0.3s ease background-color 0.3s ease"  } }} >
                             <DeleteIcon sx={{ width: "23px", height: "23px",color: "#ff4626"}} />
                           </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ fontSize: "18px", fontFamily: "poppins" }}>
                        No Data Found
                      </TableCell>
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
            {
             faqs?.last_page > 1 &&  <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1}} >
                <Pagination
                  count={faqs?.last_page}
                  page={currentPage}
                  onChange={(e,page) => {
                    /*const data = {
                      page : page 
                    }
                    dispatch(getAllFaqs(data))*/
                    setCurrentPage(page)
                  }}
                />  
              </Box>
            }
          </Grid>
          <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} faqCategories={faqCategories} setRefetch={setRefetch} />
          <FaqEdit
            open={editUserOpen}
            toggle={toggleEditUserDrawer}
            initialValues={selectedRow}
            faqCategories={faqCategories}
            setRefetch={setRefetch}
          />
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
      )}
    </>
  );
};

export default FaqDataGrid;
