// ** MUI Imports
import Drawer from '@mui/material/Drawer';  // MUI Drawer component for a sidebar
import Button from '@mui/material/Button';  // MUI Button component for actions
import MenuItem from '@mui/material/MenuItem';  // MUI MenuItem component for menu items
import { styled } from '@mui/material/styles';  // MUI styled utility for custom styling
import IconButton from '@mui/material/IconButton';  // MUI IconButton component for clickable icons
import Typography from '@mui/material/Typography';  // MUI Typography component for text
import Box from '@mui/material/Box';  // MUI Box component for layout

// ** Custom Component Import
import { TextField } from '@mui/material';  // MUI TextField component for input

// ** Third Party Imports
import * as yup from 'yup';  // Yup for form validation
import { yupResolver } from '@hookform/resolvers/yup';  // Yup resolver for React Hook Form
import { useForm, Controller } from 'react-hook-form';  // React Hook Form for form management

// ** Icon Imports
import Icon from 'components/icon';  // Custom Icon component
import axios from 'axios';  // Axios for making HTTP requests

// ... (Other imports)

// ==============================|| SIDEBAR ADD USER ||============================== //

// Styled Header component using MUI Box
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

// Yup schema for form validation
const schema = yup.object().shape({
  discount_rate: yup.string().required(),
  discount_type: yup.string().required()
});

// Default form values
const defaultValues = {
  discount_rate: '',
  discount_type: ''
};

// SidebarAddUser component
const DiscountAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Prepare data for API request
      const requestData = {
        discount_rate: data.discount_rate,
        discount_type: data.discount_type
      };

      // API request configuration
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/discounts/create`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: requestData
      };

      // Make API request
      await axios
        .request(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      // Close the sidebar and reset the form after submission
      toggle();
      reset();
    }
  };

  // Close sidebar
  const handleClose = () => {
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      {/* Header section */}
      <Header>
        <Typography variant="h5">Add Discounts</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.primary.main}, 0.16)`
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>

      {/* Form section */}
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Discount Rate input */}
          <Controller
            name="discount_rate"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Discount Rate"
                onChange={onChange}
                error={Boolean(errors.discount_rate)}
                {...(errors.discount_rate && { helperText: errors.discount_rate.message })}
              />
            )}
          />

          {/* Discount Type select */}
          <Controller
            name="discount_type"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label="Discount Type"
                id="validation-billing-select"
                aria-describedby="validation-billing-select"
                error={Boolean(errors.discount_type)}
                {...(errors.discount_type && { helperText: errors.discount_type.message })}
                SelectProps={{ value: value, onChange: (e) => onChange(e) }}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="percentage">percentage</MenuItem>
              </TextField>
            )}
          />

          {/* Form submission buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default DiscountAddDrawer;

