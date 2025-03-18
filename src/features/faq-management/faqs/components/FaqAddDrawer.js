import { Button, Grid, Typography, TextField, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'components/icon';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import Autocomplete from '@mui/material/Autocomplete';
import { addFaq } from '../services/faqServices';
import toast from 'react-hot-toast';
import { useState} from 'react';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  name: yup.string().required('Title is required').min(4, 'Title must be at least 4 characters long'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters long'),
  category: yup.object().required('Category is required')
});

const defaultValues = {
  name: '',
  description: '',
  category: null
};

const FaqAddDrawer = (props) => {
  const { open, toggle, faqCategories, setRefetch } = props;
   const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = !faqCategories || faqCategories.length === 0;

  const {
    handleSubmit,
    control,
    // setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const isConfirmed = window.confirm("Are you sure you want to submit the form?");
    if (!isConfirmed) return;

    setIsSubmitting(true);
    const inputData = {
      identity: data.name,
      description: data.description,
      category: data.category?.uuid|| null 
    };

    try {
    const result = await addFaq(inputData);
    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
    } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Something went wrong");
        } finally {
          setIsSubmitting(false);
        }
  };

  const handleClose = () => {
    toggle();
    reset();
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Add FAQ</Typography>
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
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" height={56} sx={{ mb: 3, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mb: 3, borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={56} sx={{ mb: 3, borderRadius: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Skeleton variant="rounded" width={100} height={40} sx={{ mr: 2 }} />
                <Skeleton variant="rounded" width={100} height={40} />
              </Box>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      sx={{ mb: 2 }}
                      label="Title"
                      placeholder="Enter FAQ title"
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={value}
                      sx={{ mb: 2 }}
                      label="Description"
                      placeholder="Enter a brief description"
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
               <Grid item xs={12} sm={12}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      fullWidth
                      sx={{ mb: 2 }}
                      getOptionLabel={(option) => option?.identity || ''}
                      onChange={(e, newValue) => onChange(newValue)}
                      value={value}
                      options={faqCategories}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Category"
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
                  disabled={isSubmitting}
                  sx={{
                    mr: 3,
                    backgroundColor: "#6d788d",
                    color: "#fff",
                    '&:hover': { backgroundColor: "#5a667a" }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
          )}
        </Box>
      </Drawer>
    </DatePickerWrapper>
  );
};

export default FaqAddDrawer;

