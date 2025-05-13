import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AccordionActions, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import DeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';
import { useState } from 'react';
import HelpAddModal from './Modal/helpAddModal';
import HelpEditModal from './Modal/helpEditModal';
import pngImg from '../../../../assets/images/—Pngtree—flat meeting discussion people_5409602.png'
import pngImgs from '../../../../assets/images/—Pngtree—people working in a table_7537097 (1).png'

const MuiBox = styled(Box)(({ theme }) => ({
  display: 'flex',
 // marginTop: theme.spacing(6),
 marginTop: 0,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderRight: 0,
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 250,
    lineHeight: 1,
    minHeight: 40,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}));

const HelpPage = ({ data, activeTab, handleChange, helps, SetLoad }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (itemId) => {
    console.log('Edit clicked for item ID:', itemId);
    setEditModalOpen(true);
    setEditingItemId(itemId);
  };

  const handleAdd = (itemId) => {
    console.log('Add clicked for item ID:', itemId);
    setAddModalOpen(true);
    setAddingItemId(itemId);
  };

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeleteDialogOpen(true);
    setDeletingItemId(itemId);
  };

  const onDelete = async () => {
    const datainput = {
      id: deletingItemId
    };
    console.log(datainput);
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-management/platform-faqs/delete`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: datainput
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Create User : ', response.data.data);
        handleDeleteClose();
        SetLoad(true);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  const handleDeleteConfirm = async () => {
    await onDelete(deletingItemId);
    setDeleteDialogOpen(false);
  };

  const renderTabContent = () => {
    return helps?.map((tab, index) => {
      return (
        <TabPanel key={index} value={tab.module} sx={{ p: 3, pt: 0, width: '100%' }}>
          <Box key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin="light" variant="rounded" sx={{ height: 48, width: 48 }}>
                <Icon icon={'tabler:credit-card'} fontSize="2.25rem" />
              </CustomAvatar>
              <Box sx={{ ml: 4 }}>
                <Typography variant="h4">{tab.module}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{tab.module}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              {tab?.sub_module?.platformfaqs?.map((item) => {
                return (
                  <Accordion
                    sx={{ mt: 1, boxShadow: '0px 2px 6px 0px rgba(47, 43, 61, 0.14);', borderRadius: '6px', border: 'none' }}
                    key={item.id}
                  >
                    <AccordionSummary expandIcon={<Icon fontSize="1.25rem" icon="tabler:chevron-down" />}>
                      <Typography sx={{ fontWeight: '500' }}>{item?.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary' }}>{item?.description}</Typography>
                    </AccordionDetails>
                    <AccordionActions>
                      <IconButton onClick={() => handleEdit(item.id)} size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </AccordionActions>
                  </Accordion>
                );
              })}
            </Box>
          </Box>
        </TabPanel>
      );
    });
  };

  const renderTabs = () => {
    if (data !== null) {    
      return helps?.map((tab, index) => {
        if (tab?.sub_module?.platformfaqs?.length) {
          return <Tab key={index} value={tab.module} label={tab.module} icon={<Icon icon={'tabler:credit-card'} />} />;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <>
     
      <MuiBox>
        <TabContext value={activeTab}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TabList orientation="vertical" onChange={handleChange}>
              {renderTabs()}
            </TabList>
            <Box
              sx={{
               // mt: 1.0,
                gap: 45,
                display: 'flex',
                justifyContent: 'center',
                '& img': { maxWidth: '100%', 
                  display: { xs: 'none', md: 'block' },
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  boxShadow: 'none',
                 }
              }}
            >
              <img
                src={pngImg}
                alt="illustration"
                width="230"
              />
              <img
    src={pngImgs}
    alt="teamwork"
    width="230"
  /> 
            </Box>
          </Box>
          {renderTabContent()}
          {isEditModalOpen && (
            <HelpEditModal SetLoad={SetLoad} itemId={editingItemId} open={isEditModalOpen} handleEditClose={handleEditClose} />
          )}
        </TabContext>
      </MuiBox>

      <HelpAddModal SetLoad={SetLoad} open={isAddModalOpen} handleAddClose={handleAddClose} />

      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleSubmit={handleDeleteConfirm}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
       <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex' }}>
        <Box sx={{ rowGap: 2, flexWrap: 'wrap' }}>
          <Button onClick={() => handleAdd()} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Add New
          </Button>
        </Box>
      </Grid>
        
      <Grid container spacing={3} >
        <Grid item sm={3} xs={12}>
          <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline' ,textDecorationColor: 'blue'}}>Get Started</Typography>
        <Typography>To get started with creating a FAQ (Frequently Asked Questions) page, first identify the most common questions people have about your product, service, or topic by analyzing customer inquiries .</Typography>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline' ,textDecorationColor: 'blue'}}>Troubleshooting</Typography>
          <Typography>Troubleshooting FAQs can include information on how to identify and fix common problems, such as connectivity issues .</Typography>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline' ,textDecorationColor: 'blue'}}>Copyright and Legal</Typography>
          <Typography>A  Copyright and Legal  section in a FAQ would typically address questions about the intellectual property rights related to the content on a website . </Typography>
          </Grid>
      </Grid>
        
    </>
  );
};

export default HelpPage;
