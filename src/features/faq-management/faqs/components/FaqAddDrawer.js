// ** React Imports
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import DatePickerWrapper from 'styles/libs/react-datepicker';
// import { addStudentFee } from '../services/studentFeeServices';
import Autocomplete from '@mui/material/Autocomplete';
import { addFaq } from '../services/faqServices';
import toast from 'react-hot-toast';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  name: yup.string().required('Category Name is required').min(4, 'Category Name  must be at least 10 characters long'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters long'),
  category: yup.object().required('Category is required')
});

const defaultValues = {
  name: '',
  description: '',
  category: null
};

const FaqAddDrawer = (props) => {
  // ** Props
  const { open, toggle, faqCategories, setRefetch } = props;
  // ** State

  const {
    handleSubmit,
    control,
    //setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
   // console.log(data);

    const inputData = {
      identity: data.name,
      description: data.description,
      category: data.category?.uuid  || null
    };
    const result = await addFaq(inputData);
    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
      setRefetch((state) => !state);
    } else {
      toast.error(result.message || 'An error occurred');
    }
  };

  const handleClose = () => {
    //setValue('contact', Number(''));
    toggle();
    reset();
  };
 // console.log(faqCategories,"faqCategories")
  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 },
       
       } }}
      >
        <Header>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Add Faq</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Title"
                     placeholder="Enter FAQ Title"
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                   // {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="description"
                     placeholder="Enter a brief description"
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  //  {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    fullWidth
                    sx={{ mb: 2 }}
                    getOptionLabel={(option) => {
                      console.log(option, 'option')
                      option?.identity}
                    }
                    onChange={(e, newValue) => {
                      onChange(newValue);
                    }}
                    options={faqCategories  || []}
                     noOptionsText="No categories available"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Category"
                         placeholder="Choose a category"
                        error={Boolean(errors.category)}
                        helperText={errors.category?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, justifyContent: "center" }}>
  <Button 
    type="submit" 
    variant="contained" 
    sx={{ 
      mr: 3, 
      backgroundColor: "#6d788d", 
      color: "#fff", 
      '&:hover': { backgroundColor: "#5a667a" } 
    }}
  >
    Submit
  </Button>
  <Button 
    variant="contained" 
    size="medium" 
    sx={{ 
      color: "#fff", 
      border: "1px solid #6d788d", 
      backgroundColor: "#6d788d", 
      '&:hover': { backgroundColor: "#5a667a", borderColor: "#5a667a" } 
    }} 
    onClick={handleClose}
  >
    Cancel
  </Button>
</Box>

          </form>
        </Box>
      </Drawer>
    </DatePickerWrapper>
  );
};

export default FaqAddDrawer;
