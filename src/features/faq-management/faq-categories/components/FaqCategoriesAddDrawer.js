// ** MUI Imports
import { Button, Grid, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import { addFaqCategory } from '../services/faqCategoryServices';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Full the Category Name is required').min(3, 'Category Name must be at least 3 characters'),
  description: yup.string().required('Enter the Description must be  required')
});

const defaultValues = {
  name: '',
  description: ''
};

const FaqCategoriesAddDrawer = (props) => {
  // ** Props
  const { open = false, toggle, setRefetch } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const isConfirmed = window.confirm('Are you sure you want to submit the form?');
    if (!isConfirmed) return;

    setIsSubmitting(true);
    const InputData = {
      identity: data.name,
      description: data.description
    };

    try {
      const result = await addFaqCategory(InputData);
      console.log('API Response:', result, isSubmitting);

      if (result.success) {
        toast.success(result.message);
        setRefetch((state) => !state);
        reset();
        toggle();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    //setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-faq-category-modal" aria-describedby="modal-to-add-faq-category">
      <Box
        sx={{
          width: { xs: '100%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          mx: 'auto',
          mt: { xs: '20vh', sm: '15vh' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              position: 'absolute',
              top: '125px',
              marginLeft: '-40px',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              transition: 'rotate .2s ease-in-out',
              rotate: '0deg',
              '&:hover': {
                // backgroundColor: (theme) => theme.palette.secondary.main,
                // rotate: '-90deg',
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Box>
        <Box sx={{ textAlign: 'flex-start', borderBottom: '2px solid #ddd', pb: 1, mb: 3 }}>
          <Typography variant="h3">Add Faq Categories</Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                padding: 2
              }}
            >
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
                      placeholder="Enter FAQ Title"
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
                      value={value}
                      sx={{ mb: 2 }}
                      label="Description"
                      placeholder="Enter the Description"
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: 120,
                    padding: '0.6rem 1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  Submit
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  sx={{
                    minWidth: 120,
                    padding: '0.6rem 1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaqCategoriesAddDrawer;
