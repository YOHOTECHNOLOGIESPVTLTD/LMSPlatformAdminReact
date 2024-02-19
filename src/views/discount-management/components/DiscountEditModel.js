// ** MUI Imports
import Grid from '@mui/material/Grid';  // MUI Grid component for layout
import Button from '@mui/material/Button';  // MUI Button component for actions
import DialogActions from '@mui/material/DialogActions';  // MUI DialogActions component for dialog actions
import MenuItem from '@mui/material/MenuItem';  // MUI MenuItem component for menu items
import { TextField } from '@mui/material';  // MUI TextField component for input
import DialogContentText from '@mui/material/DialogContentText';  // MUI DialogContentText component for dialog content text
import DialogContent from '@mui/material/DialogContent';  // MUI DialogContent component for dialog content
import DialogTitle from '@mui/material/DialogTitle';  // MUI DialogTitle component for dialog title
import Dialog from '@mui/material/Dialog';  // MUI Dialog component for dialogs
import { useEffect, useState } from 'react';  // React useEffect and useState hooks
import axios from 'axios';  // Axios for making HTTP requests
import toast from 'react-hot-toast';  // React Hot Toast for notifications

// ... (Other imports)

// ==============================|| EDIT MODEL ||============================== //

// EditModel component
const DiscountEditModel = ({ toggle, open, discount }) => {
  console.log('discount ', discount);

  // State to manage edited discount details
  const [discountEdit, setDiscountEdit] = useState({
    discount_rate: '',
    discount_type: '',
  });

  // Fetch discount details when the component mounts or when the discount prop changes
  useEffect(() => {
    if (open && discount) {
      fetchDiscountDetails();
    }
  }, [open, discount]);

  // Function to fetch discount details
  const fetchDiscountDetails = async () => {
    try {
      // Set default values for edited discount details
      setDiscountEdit({
        discount_rate: '',
        discount_type: '',
      });
    } catch (error) {
      console.error('Error fetching discount details:', error);
    }
  };

  // Function to handle changes in discountEdit state
  const handleFieldChange = (field, value) => {
    setDiscountEdit((prevDiscountEdit) => ({
      ...prevDiscountEdit,
      [field]: value,
    }));
  };

  // Function to handle discount update
  const handleUpdate = async () => {
    try {
      // Prepare data for API request
      let data = {
        id: discount.id,
        discount_rate: discountEdit.discount_rate,
        discount_type: discountEdit.discount_type,
      };

      // API request configuration
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/discounts/update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: data,
      };

      // Make API request
      await axios
        .request(config)
        .then((response) => {
          if (response.data.status) {
            // Show success notification if the update is successful
            toast.success('Edited successfully');
          }
          if (response.data.status === false) {
            // Show error notification if the update fails
            toast.error('Failed to Edit');
          }
          console.log(response.data);
          toggle();  // Close the dialog
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      {/* Dialog title */}
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        }}
      >
        Edit Information
      </DialogTitle>

      {/* Dialog content */}
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(8)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
        }}
      >
        {/* Dialog content text */}
        <DialogContentText variant="body2" id="user-view-edit-description" sx={{ textAlign: 'center', mb: 7 }}>
          Updating user details will receive a privacy audit.
        </DialogContentText>

        {/* Form section */}
        <form>
          <Grid container spacing={3}>
            {/* Discount Rate input */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Discount Rate"
                defaultValue={discount.discount_rate}
                onChange={(e) => handleFieldChange('discount_rate', e.target.value)}
              />
            </Grid>

            {/* Discount Type select */}
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Discount Type"
                defaultValue={discount.discount_type}
                onChange={(e) => handleFieldChange('discount_type', e.target.value)}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      {/* Dialog actions */}
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        }}
      >
        {/* Submit button */}
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleUpdate}>
          Submit
        </Button>

        {/* Cancel button */}
        <Button variant="tonal" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountEditModel;
