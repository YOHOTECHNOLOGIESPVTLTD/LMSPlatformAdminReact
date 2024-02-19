// ** MUI Imports
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Custom Component Import
import { TextField } from '@mui/material';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports
import Icon from 'components/icon';
import axios from 'axios';

// Styles for the header
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

// Yup schema for form validation
const schema = yup.object().shape({
  tax_type: yup.string().required(),
  tax_rate: yup.string().required()
});

// Default form values
const defaultValues = {
  tax_rate: '',
  tax_type: ''
};

const TaxAddDrawer = (props, setLoading) => {
  // ** Props
  const { open, toggle } = props;

  // ** Hooks for form handling
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

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const requestData = {
        tax_rate: data.tax_rate,
        tax_type: data.tax_type
      };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/tax-management/taxes/create`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: requestData
      };

      await axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      toggle();
      reset();
    }
  };

  // Function to handle closing the sidebar
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
      {/* Header for the sidebar */}
      <Header>
        <Typography variant="h5">Add Tax</Typography>
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
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        {/* Form for adding a new tax */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tax Rate Input */}
          <Controller
            name="tax_rate"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Tax Rate"
                onChange={onChange}
                error={Boolean(errors.tax_rate)}
                {...(errors.tax_rate && { helperText: errors.tax_rate.message })}
              />
            )}
          />

          {/* Tax Type Select */}
          <Controller
            name="tax_type"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label="Tax Type"
                id="validation-billing-select"
                aria-describedby="validation-billing-select"
                error={Boolean(errors.tax_type)}
                {...(errors.tax_type && { helperText: errors.tax_type.message })}
                SelectProps={{ value: value, onChange: (e) => onChange(e) }}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
              </TextField>
            )}
          />

          {/* Form Submission Buttons */}
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

export default TaxAddDrawer;
