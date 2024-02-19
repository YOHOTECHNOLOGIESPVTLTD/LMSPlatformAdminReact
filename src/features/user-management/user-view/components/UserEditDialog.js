import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getAllActiveGroups } from '../services/viewUserServices';

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
  full_name: yup
    .string()
    .min(3, (obj) => showErrors('Full name', obj.value.length, obj.min))
    .required(),
  user_name: yup
    .string()
    .min(3, (obj) => showErrors('User name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, (obj) => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  designation: yup.string().required(),
  role: yup.string().required()
});

const defaultValues = {
  full_name: '',
  user_name: '',
  email: '',
  contact: Number(''),
  designation: '',
  role: ''
};

const UserEditDialog = ({ openEdit, handleEditClose }) => {
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const handleClose = () => {
    setValue('full_name', '');
    setValue('user_name', '');
    setValue('email', '');
    setValue('contact', Number(''));
    setValue('designation', '');
    setValue('role', '');
    handleEditClose();
    reset();
  };

  const image = require('assets/images/avatar/1.png');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [groups, setGroups] = useState([]);
  console.log(selectedImage);
  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    try {
      const result = await getAllActiveGroups();
      if (result.success) {
        console.log('User Data:', result.data);
        setGroups(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 750 } }}
    >
      <form onSubmit={handleSubmit()}>
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit User Information
        </DialogTitle>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImgStyled src={imgSrc} alt="Profile Pic" />
                <div>
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                    Upload New Image
                    <input
                      hidden
                      type="file"
                      value={inputValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Full Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.full_name)}
                    {...(errors.full_name && { helperText: errors.full_name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="user_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="User Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.user_name)}
                    {...(errors.user_name && { helperText: errors.user_name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="johndoe@email.com"
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contact"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type="number"
                    value={value}
                    label="Contact"
                    onChange={onChange}
                    placeholder="(397) 294-5153"
                    error={Boolean(errors.contact)}
                    {...(errors.contact && { helperText: errors.contact.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="designation"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Designation"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.designation)}
                    {...(errors.designation && { helperText: errors.designation.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    value={value}
                    label="Select Role"
                    onChange={onChange}
                    SelectProps={{ value: value, onChange: onChange }}
                    error={Boolean(errors.role)}
                    {...(errors.role && { helperText: errors.role.message })}
                  >
                    {groups?.map((group, index) => (
                      <MenuItem key={index} value={group?.role?.id}>
                        {group?.role?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Submit
          </Button>
          <Button variant="tonal" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserEditDialog;
