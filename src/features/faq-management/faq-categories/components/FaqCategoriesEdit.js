import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import { updateFaqCategory } from '../services/faqCategoryServices';
import toast from 'react-hot-toast';


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between',
  textAlign: "flex-start",
}));

const schema = yup.object().shape({
  identity: yup.string().min(3,'Title must be at least 3 characters long').required('Full up the Title  '),
  description: yup.string().min(5,'Description must be at least 5 characters long').required('Full up the Description  ')
});

const FaqCategoriesEdit = (props) => {
  const { open, toggle, setRefetch, initialValues } = props;

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (open) {
      setFormValues(initialValues);
    }
  }, [open, initialValues]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: formValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
 
  useEffect(() => {
    reset(formValues);
  }, [formValues, reset]);
 
  const onSubmit = async (data) => {
    const inputData = {
      identity: data.identity,
      description: data.description,
      id: initialValues.uuid
    };

    try{
    const result = await updateFaqCategory(inputData);
    if (result.success) {
      toast.success(result.message);
      toggle();
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  }
    catch (error) {
      toast.error('An error occurred while updating the FAQ category. Please try again.');
    }
  };

  const handleClose = () => {
    toggle();
  };
  // console.log(formValues,"formValues")
  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } , 
    } }}
    >
      <Header>
        <Box sx={{  textAlign: "flex-start",}}>
        <Typography variant="h3">Edit Faq Categories</Typography>
        </Box>

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
            },
            position: 'absolute',
            top: '16px',  
            right: '16px',
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) ,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate 
        style={{ width: '100%',
            maxWidth: '400px',
            padding: '16px',
            }}> 
          <Controller
            name="identity"
            control={control}
           //rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                placeholder="Enter the FAQ Title"
                error={Boolean(errors.title)}
                helperText={errors.identity?.message}
               // {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            //rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Description"
                onChange={onChange}
                placeholder="Enter the Description"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                // {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
               
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 3 }}>
  <Button
    type="submit"
    variant="contained"
    color="primary"
    sx={{
      minWidth: 120,
      padding: '0.6rem 1.5rem',
      fontWeight: 'bold',
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
      fontWeight: 'bold',
    }}
  >
    Cancel
  </Button>
</Box>

        </form>
      </Box>
    </Drawer>
  );
};

export default FaqCategoriesEdit;
