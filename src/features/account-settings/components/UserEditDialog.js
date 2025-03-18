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
import toast from 'react-hot-toast';
// import { updateUser } from '../../services/userServices';
import { updateUser } from 'features/user-management/users-page/services/userServices';
import { getAllActiveGroups } from 'features/user-management/groups-page/services/groupService';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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
  designation: yup.string().required("Full the Designation must be required ").min(5)
  // role: yup.string().required()
});

const UserEditDialog = ({ openEdit, handleEditClose, userData, setRefetch }) => {
  const defaultValues = {
    full_name: '',
    user_name: '',
    email: '',
    contact: Number(''),
    designation: '',
    role: ''
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
  // Set form values when selectedBranch changes
  useEffect(() => {
    if (userData) {
      setValue('full_name', userData.name || '');
      setValue('user_name', userData.username || '');
      setValue('email', userData?.institution_users?.email || '');
      setValue('contact', userData?.institution_users?.mobile || '');
      setValue('designation', userData?.institution_users?.designation || '');
      setValue('role', userData?.role_groups?.role?.id || '');
    }
  }, [userData, setValue]);
  const handleClose = () => {
    setValue('full_name', '');
    setValue('user_name', '');
    setValue('email', '');
    setValue('contact', Number(''));
    setValue('designation', '');
    setValue('role', Number(''));
    handleEditClose();
    reset();
    setSelectedImage(null);
  };

  const image = require('assets/images/avatar/1.png');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [groups, setGroups] = useState([]);

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
    borderRadius: '50%',
    objectFit: 'cover',
    // borderRadius: theme.shape.borderRadius
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

  console.log(selectedImage);

  const onSubmit = async (data) => {
    console.log('Submitting form with data:', data);
    const InputData = new FormData();
    InputData.append('name', data.full_name);
    InputData.append('user_name', data.user_name);
    InputData.append('email', data.email);
    InputData.append('mobile', data.contact);
    InputData.append('designation', data.designation);
    InputData.append('role_id', data.role);
    InputData.append('image', selectedImage);
    InputData.append('id', userData.id);

    try {
    const result = await updateUser(InputData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    toast.error('An error occurred while updating. Please try again later.');
  }
  };
  const handleRoleSelection = (selectedRole) => {
    console.log("Selected Role:", selectedRole);
  
   
    if (selectedRole === "teacher") {
      alert("You selected the Teacher role!");
    } else if (selectedRole === "fullstack") {
      alert("You selected FullStack Developer!");
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
            <Grid item xs={12} sm={12} sx={{ alignItems: 'center', justifyContent: 'center' ,display: 'flex'}}>
              <Box sx={{ display:  'inline-block',position: 'relative' }}>
                {!selectedImage && (
                  <ImgStyled
                    src={
                      userData?.institution_users?.image
                        ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${userData?.institution_users?.image}`
                        : imgSrc
                    }
                    alt="Profile Pic"
                  />
                )}

                {selectedImage && <ImgStyled src={imgSrc} alt="Profile Pic" />}
               
                
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image"  sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        color: '#fff',
        minWidth: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      }}>
                  <CameraAltIcon fontSize="small"/>
                    <input
                      hidden
                      type="file"
                      value={inputValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                
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
                    helperText={errors.full_name?.message }
                    //  {...(errors.full_name && { helperText: errors.full_name.message })}
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
                    defaultValue={value}
                    label="User Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.user_name)}
                    helperText={errors.user_name?.message}
                    // {...(errors.user_name && { helperText: errors.user_name.message })}
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
                    defaultValue={value}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="johndoe@email.com"
                    helperText={errors.email?.message}
                    //  {...(errors.email && { helperText: errors.email.message })}
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
                    defaultValue={value}
                    label="Contact"
                    onChange={onChange}
                    placeholder="(397) 294-5153"
                    error={Boolean(errors.contact)}
                    helperText={errors.contact?.message  || 'Enter a valid contact number'}
                    //  {...(errors.contact && { helperText: errors.contact.message })}
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
                    defaultValue={value}
                    label="Designation"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.designation)}
                    helperText={errors.designation?.message ||  'Enter your job designation' }
                    //  {...(errors.designation && { helperText: errors.designation.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({field}) => (
                  <TextField
                    select
                    fullWidth
                    Value={field.value || userData?.role_groups?.role?.id || ""}
                    onChange={(e) => {
                      const selectedRole = e.target.value;
                      setValue("role", selectedRole);
                      // setValue('role', e.target.value);
                      handleRoleSelection(selectedRole);
                    }}
                  >
                     <MenuItem value="">FullStack  Developer</MenuItem> 
                     <MenuItem value="">Mern Stack  Developer</MenuItem> 
                     <MenuItem value="">software  Developer</MenuItem> 
                     <MenuItem value="">  software testing</MenuItem> 
                     <MenuItem value="">Teacher </MenuItem> 
                     <MenuItem value="">student </MenuItem> 
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
          <Button type="submit" variant="contained" 
          sx={{ mr: 2 , px: 3,
          py: 1.5,
          '&:hover': {
           backgroundColor: 'primary.dark', 
           }}}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}  
          sx={{
         px: 3,
         py: 1.5,
        '&:hover': {
         backgroundColor: 'primary.dark', 
          }
        }}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserEditDialog;
