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
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  description: yup.string().required('Enter the Description must required').min(10, 'Description must be at least 10 characters long'),
  identity: yup.string().min(3,'Title  must be at least 3 characters').required('Full Up the title ')
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
    formState: { errors },
    reset
  } = useForm({
    defaultValues: formValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const isConfirmed = window.confirm("Are you sure you want to save changes?");
    if (!isConfirmed) return;
    
    const inputData = {
      identity: data.identity,
      description: data.description,
      id: initialValues.uuid
    };

    const result = await updateFaqCategory(inputData);
    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Edit Faq Categories</Typography>
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
          <Controller
            name="identity"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.title)}
                helperText={errors.identity?.message}
               // {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Description"
                onChange={onChange}
                placeholder="Business Development Executive"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                //{...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
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
    Save Changes
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
  );
};

export default FaqCategoriesEdit;
