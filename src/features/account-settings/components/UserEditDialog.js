import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
// import { getAllActiveGroups } from 'features/user-management/groups-page/services/groupService';
import { updateUserDetails } from 'features/authentication/forgot-password-page/service/forgotPasswordService';
import { handleFileUpload } from 'features/fileUpload';
import { getImageUrl } from 'themes/imageUtlis';

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
  first_name: yup
    .string()
    .min(3, (obj) => showErrors('First name', obj.value.length, obj.min))
    .required(),
  last_name: yup
    .string()
    .min(3, (obj) => showErrors('Last name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, (obj) => showErrors('User name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required(),
  phone_number: yup
    .number()
    .typeError('Phone Number field is required')
    .min(10, (obj) => showErrors('Phone Number', obj.value.length, obj.min))
    .required()
  // designation: yup.string().required(),
  // role: yup.string().required()
});

const UserEditDialog = ({ openEdit, handleEditClose, userData, setRefetch }) => {
  const defaultValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: Number('')
    // designation: '',
    // role: ''
  };

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

  useEffect(() => {
    if (userData) {
      const fullName = userData.name || '';
      const [firstName, lastName] = fullName.split(' ');
      setValue('first_name', firstName || '');
      setValue('last_name', lastName || '');
      setValue('username', userData?.username || '');
      setValue('email', userData?.institution_users?.email || '');
      setValue('phone_number', userData?.institution_users?.mobile || '');

      const existingImage = userData?.image;
      if (existingImage) {
        setResImage(existingImage); 
        setImgSrc(getImageUrl(existingImage));
      }

      reset(userData);
    }
  }, [userData, setValue]);

  const handleClose = () => {
    setValue('first_name', '');
    setValue('last_name', '');
    setValue('username', '');
    setValue('email', '');
    setValue('phone_number', Number(''));
    // setValue('designation', '');
    // setValue('role', '');
    handleEditClose();
    reset();
    setSelectedImage(null);
  };

  const image = require('assets/images/avatar/1.png');
  // const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [resImage, setResImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  // const [groups, setGroups] = useState([]);

  // useEffect(() => {
  //   getAllGroups();
  // }, []);

  // const getAllGroups = async () => {
  //   try {
  //     const result = await getAllActiveGroups();
  //     if (result.success) {
  //       setGroups(result.data);
  //     } else {
  //       console.log(result.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const handleInputImageChange = async (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      const file = files[0];
      reader.onload = () => {
        setImgSrc(reader.result);
        // setInputValue(reader.result);
      };

      const selectedFile = files[0];
      setSelectedImage(selectedFile);
      reader.readAsDataURL(selectedFile);

      const formData = new FormData();
      formData.append('file', file);
      const response = await handleFileUpload(formData);
      if (response?.data?.status === 'success') {
        setResImage(response?.data?.data?.file);
      }
      // setValue('image',response?.data?.data?.file)
      if (response) console.log('profile upload', response);
    }
  };
  console.log('resImgae', resImage);

  console.log('selectedImage', selectedImage);

  const onSubmit = async (data) => {
    console.log('Form submitted', data);
    const InputData = new FormData();
    InputData.append('first_name', data.first_name);
    InputData.append('last_name', data.last_name);
    InputData.append('username', data.username);
    InputData.append('email', data.email);
    InputData.append('phone_number', data.phone_number);
    InputData.append('designation', data.designation);
    // InputData.append('role_id', data.role);
    InputData.append('image', resImage);
    InputData.append('id', userData.id);
    // console.log('INput DATA',InputData);

    try {
      const response = await updateUserDetails(InputData);
      console.log('resulttt', response);
      if (response.status === 'success') {
        toast.success(response.message);
        setRefetch((state) => !state);
        handleEditClose();
      } else {
        console.log(response, 'result');
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error, 'error');
      if (error?.response) {
        toast.error(error.response.data.message || 'An error occurred');
        console.log('error', error);
      } else {
        toast.error(error || 'An error occurred');
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {!selectedImage && (
                  <ImgStyled
                    src={userData?.image ? getImageUrl(userData?.image) : imgSrc}
                    alt="Profile Pic"
                    sx={{ backgroundColor: 'lightgrey' }}
                  />
                )}
                {selectedImage && <ImgStyled src={imgSrc} alt="Profile Pic" />}
                <div>
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                    Upload New Image
                    <input
                      hidden
                      type="file"
                      // value={inputValue}Valu
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
                name="first_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="First Name"
                    onChange={onChange}
                    placeholder="John"
                    sx={{ backgroundColor: '#f5f5f5' }}
                    error={Boolean(errors.first_name)}
                    {...(errors.first_name && { helperText: errors.first_name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Last Name"
                    onChange={onChange}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    placeholder="Doe"
                    error={Boolean(errors.last_name)}
                    {...(errors.last_name && { helperText: errors.last_name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="User Name"
                    onChange={onChange}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    placeholder="johndoe"
                    error={Boolean(errors.username)}
                    {...(errors.username && { helperText: errors.username.message })}
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
                    value={value}
                    label="Email"
                    onChange={onChange}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    placeholder="johndoe@email.com"
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type="text"
                    value={value}
                    label="Phone Number"
                    onChange={onChange}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    placeholder="(397) 294-5153"
                    error={Boolean(errors.phone_number)}
                    {...(errors.phone_number && { helperText: errors.phone_number.message })}
                  />
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
