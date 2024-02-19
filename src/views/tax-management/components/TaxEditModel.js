// ** MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Component for editing tax details
const TaxEditModel = ({ toggle, open, tax, setLoading }) => {
  // State to manage edited tax details
  const [taxEdit, setTaxEdit] = useState({
    tax_rate: '',
    tax_type: '',
  });

  // Fetch tax details when the dialog is open and tax ID is provided
  useEffect(() => {
    if (open && tax) {
      fetchTaxDetails();
    }
  }, [open, tax]);

  // Fetch tax details from the server
  const fetchTaxDetails = async () => {
    try {
      // Set the tax details in the state
      setTaxEdit({
        tax_rate: '',
        tax_type: '',
      });
    } catch (error) {
      console.error('Error fetching tax details:', error);
    }
  };

  // Handle changes in tax details fields
  const handleFieldChange = (field, value) => {
    setTaxEdit((prevTaxEdit) => ({
      ...prevTaxEdit,
      [field]: value,
    }));
  };

  // Handle the update of tax details
  const handleUpdate = async () => {
    // Prepare data for updating tax
    let data = {
      id: tax.id,
      tax_rate: taxEdit.tax_rate,
      tax_type: taxEdit.tax_type,
    };

    // Set up the configuration for the API request
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/tax-management/taxes/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: data
    };

    // Make the API request to update tax details
    await axios
      .request(config)
      .then((response) => {
        // Check the status of the response and show a toast message
        if (response.data.status) {
          toast.success('Edited successfully');
          setLoading(true);
        } else {
          toast.error('Failed to Edit');
        }
        // Log the response data and close the dialog
        console.log(response.data);
        toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // JSX structure for the dialog
  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      {/* Dialog Title */}
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit Information
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(8)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant="body2" id="user-view-edit-description" sx={{ textAlign: 'center', mb: 7 }}>
          Updating user details will receive a privacy audit.
        </DialogContentText>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Tax Rate"
                defaultValue={tax.tax_rate}
                onChange={(e) => handleFieldChange('tax_rate', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            <TextField
              select
              fullWidth
              label="Tax Type"
              defaultValue={tax.tax_type}
              onChange={(e) => handleFieldChange('tax_type', e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
            </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleUpdate}>
          Submit
        </Button>
        <Button variant="tonal" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaxEditModel;
