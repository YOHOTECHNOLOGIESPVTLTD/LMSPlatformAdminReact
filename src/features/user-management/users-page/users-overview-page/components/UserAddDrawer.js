import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'components/icon';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { addUser, checkUserName } from '../../services/userServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  designation: '',
  fullName: '',
  userName: '',
  role: '',
  contact: Number(''),
  branch: []
};

const SidebarAddUser = (props) => {
  const { open, toggle, groups, setLoading } = props;
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

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
    password: yup.string().required(),
    designation: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.number().required(),
    contact: yup
      .number()
      .typeError('Contact Number field is required')
      .min(10, (obj) => showErrors('Contact Number', obj.value.length, obj.min))
      .required(),
    fullName: yup
      .string()
      .min(3, (obj) => showErrors('First Name', obj.value.length, obj.min))
      .required(),
    userName: yup
      .string()
      .min(3, (obj) => showErrors('User Name', obj.value.length, obj.min))
      .required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required')
  });

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

    bodyFormData.append('image', selectedImage);
    bodyFormData.append('name', data.fullName);
    bodyFormData.append('email', data.email);
    bodyFormData.append('mobile', data.contact);
    bodyFormData.append('username', data.userName);
    bodyFormData.append('password', data.password);
    bodyFormData.append('c_password', data.confirm_password);
    bodyFormData.append('designation', data.designation);
    bodyFormData.append('role_id', data.role);

    const isUserNameTaken = await checkUserName(data.userName);

    if (!isUserNameTaken.success) {
      setError('userName', {
        type: 'manual',
        message: 'Username is already taken'
      });
    } else if (isUserNameTaken.success) {
      const result = await addUser(bodyFormData);

      if (result.success) {
        setLoading((loading) => !loading);
        setError('');
        toggle();
        reset();
        toast.success('User created successfully');
      } else {
        let errorMessage = '';
        Object.values(result.message).forEach((errors) => {
          errors.forEach((error) => {
            errorMessage += `${error}\n`; // Concatenate errors with newline
          });
        });
        toast.error(errorMessage.trim());
        // toast.error(result.message);
      }
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

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h5">Add User</Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ImgStyled src={imgSrc} alt="Profile Pic" />
            <div>
              <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                Upload
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

          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Full Name"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.fullName)}
                {...(errors.fullName && { helperText: errors.fullName.message })}
              />
            )}
          />

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
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder="johndoe@email.com"
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name="contact"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                type="number"
                value={value}
                sx={{ mb: 4 }}
                label="Contact"
                onChange={onChange}
                placeholder="(397) 294-5153"
                error={Boolean(errors.contact)}
                {...(errors.contact && { helperText: errors.contact.message })}
              />
            )}
          />
          <Controller
            name="designation"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Designation"
                onChange={onChange}
                placeholder="Business Development Executive"
                error={Boolean(errors.designation)}
                {...(errors.designation && { helperText: errors.designation.message })}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                value={value}
                sx={{ mb: 4 }}
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
          <Controller
            name="userName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="UserName"
                onChange={async (e) => {
                  setValue('userName', e.target.value);
                  const result = await checkUserName(e.target.value);

                  if (result.success) {
                    setError('userName', {
                      type: 'manual',
                      message: ''
                    });
                  } else {
                    setError('userName', {
                      type: 'manual',
                      message: 'Username is already taken'
                    });
                  }
                }}
                placeholder="John Doe"
                error={Boolean(errors.userName)}
                {...(errors.userName && { helperText: errors.userName.message })}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Password"
                onChange={onChange}
                placeholder="************"
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Confirm Password"
                onChange={onChange}
                placeholder="************"
                error={Boolean(errors.confirm_password)}
                {...(errors.confirm_password && { helperText: errors.confirm_password.message })}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default SidebarAddUser;
