// ** MUI Imports
import { Box, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// ** Custom Component Import
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import { useState } from 'react';
import CategoryEditModal from './CategoryEditModal';

const CardStatsVertical = (props) => {
  // ** Props
  const { sx, category } = props;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(category?.is_active);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(deletingItemId);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setDeleteDialogOpen(true);
  };

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src={category?.logo} sx={{ width: 56, height: 56 }} />
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                onClick={() => {
                  setSelectedCategory(category);
                  setEditModalOpen(true);
                }}
                aria-label="capture screenshot"
                color="primary"
              >
                <Icon icon="tabler:edit" />
              </IconButton>
              <IconButton onClick={() => handleDelete()} aria-label="capture screenshot" color="error">
                <Icon icon="tabler:archive-filled" />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
            {category?.course_category_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.disabled' }}>
            {category?.course?.length} Courses
          </Typography>
          <Grid sx={{ mt: 1 }}>
            <TextField
              size="small"
              select
              fullWidth
              label="Status"
              SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
        </CardContent>
      </Card>
      <CategoryEditModal category={selectedCategory} open={isEditModalOpen} handleEditClose={handleEditClose} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </Grid>
  );
};

export default CardStatsVertical;
