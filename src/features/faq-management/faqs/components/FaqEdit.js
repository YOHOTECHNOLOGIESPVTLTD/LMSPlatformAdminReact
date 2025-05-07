// ** React Imports
import { useEffect } from 'react';
// ** MUI Imports
import { Button, Typography } from '@mui/material';
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
// import Autocomplete from '@mui/material/Autocomplete';
import { updateFaq } from '../services/faqServices';
import toast from 'react-hot-toast';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  description: yup.string().required('Enter the Description').min(10, 'Description must be at least 10 characters long'),
  // category: yup.object().required('Category is required'),
  title: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required('Enter the title name ')
});

const FaqEdit = (props) => {
  // ** Props
  const { open, toggle, setRefetch,selectedRow} = props;
  // ** State
  const defaultValues = {
    description: '',
    title: ''
    // category: {}
  };
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  //console.log(props.initialValues?.institute_faq_module);

  useEffect(() => {
    if (open) {
      reset(props.initialValues || defaultValues);
    }
  }, [open, reset, props.initialValues]);

  const onSubmit = async (data) => {
    const inputData = { identity: data.title, description: data.description,id:selectedRow?.id};
    console.log('ipData',inputData)
    const result = await updateFaq(inputData);
    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
    //console.log(data);
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };
  // console.log(props,defaultValues)
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
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Edit Faq{' '}
        </Typography>
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
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                placeholder="Enter FAQ Title"
                error={Boolean(errors.title)}
                {...(errors.title && { helperText: errors.title.message })}
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
                label="description"
                onChange={onChange}
                placeholder="Provide a detailed description"
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />

          {/* <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Autocomplete
                fullWidth
                sx={{ mb: 4 }}
                value={props.initialValues?.institute_faq_module}
                onChange={(e, newValue) => {
                  onChange(newValue);
                }}
                getOptionLabel={(option) => option.title}
                options={faqCategories}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" error={Boolean(errors.category)} helperText={errors.category?.message} />
                )}
              />
            )}
          /> */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mr: 3,
                backgroundColor: '#6d788d',
                color: '#fff',
                '&:hover': { backgroundColor: '#5a667a' }
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{
                color: '#fff',
                border: '1px solid #6d788d',
                backgroundColor: '#6d788d',
                '&:hover': { backgroundColor: '#5a667a', borderColor: '#5a667a' }
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

export default FaqEdit;
