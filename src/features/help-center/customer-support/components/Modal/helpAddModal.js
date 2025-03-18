import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};
const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required(),
  description: yup.string().required('Enter the description field must required').min(10),
  sub_module: yup.string().required('Enter the  Sub-module must required').min(3, 'Sub-module must be at least 3 characters'),
  module: yup.string().required('must fill the module name').min(5)
});

const defaultValues = {
  title: '',
  description: '',
  module: ''
};

const HelpAddModal = ({ open, handleAddClose, itemId, SetLoad }) => {
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('id', itemId);
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    bodyFormData.append('module', data.module);
    bodyFormData.append('sub_module', data.sub_module);
    console.log(bodyFormData);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/platform-management/platform-faqs/create`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: bodyFormData
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Create User : ', response.data);
        handleAddClose();
        SetLoad(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setError('');
    toggle();
    reset();
  };
  const handleClose = () => {
    setValue('title', '');
    setValue('description', '');
    setValue('id', '');
    setValue('module', '');
    handleAddClose();
    reset();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            position: 'relative',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Add Help Information
          <IconButton
    aria-label="close"
    onClick={handleClose}
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500]
    }}
  >
    <CloseIcon />
  </IconButton>
        </DialogTitle>
        
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
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
                    placeholder="John Doe"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    //{...(errors.title && { helperText: errors.title.message })}
                  />
                )}
              />
            </Grid>
            <Grid>
              <Controller
                name="module"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Enter the module"
                    label="module"
                    error={Boolean(errors.module)}
                    helperText={errors.module?.message}
                   // {...(errors.module && { helperText: errors.module.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="sub_module"
                control={control}
                render={({ field }) => (
                  <TextField
                  sx={{ mb: 3 }}
                    {...field}
                    fullWidth
                    label="Sub-Module"
                    error={Boolean(errors.sub_module)}
                    helperText={errors.sub_module?.message}
                  />
                )}
              />
            </Grid>

            <Grid>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    multiline
                    id="textarea-outlined"
                    sx={{ mb: 3 }}
                    fullWidth
                    rows={4}
                    value={value}
                    onChange={onChange}
                    placeholder="Enter the description"
                    label="description"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  //  {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" sx={{ mr: 3,width: '150px', fontWeight: 'bold', }}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mr: 3,width: '150px', fontWeight: 'bold', }}>
              Cancel
            </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpAddModal;
