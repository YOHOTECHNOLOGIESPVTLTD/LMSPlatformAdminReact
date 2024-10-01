import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Drawer, IconButton, Typography, styled, Checkbox, Grid, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectInstitutes } from 'features/institute-management/redux/instituteSelectors';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import { getInstituteBrancheswithId } from 'features/notification-management/notifications/services/instituteNotificationServices';

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
  title: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required(),
  body: yup.string().required('Body field is required'),
  institutes: yup.array().min(1, 'Select at least one institute').required('instituteList field is required')
});

const defaultValues = {
  title: '',
  institutes: [],
  body: ''
};

const SidebarAddUser = (props) => {
  const { open, toggle } = props;
  const [branchList,setBranchList] = useState([])
  // const [inputValue, setInputValue] = useState('');
  // const image = require('../../../assets/images/avatar/1.png');
  // const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch()
  const instituteList = useSelector(selectInstitutes)
  const { show , hide } = useSpinner()

  useEffect(() => {
    dispatch(getAllInstitutes())
  }, [dispatch]);


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
    const filtered = data.institutes?.map((e) => e.id.toString());
    console.log(filtered);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);
    bodyFormData.append('institute_id', filtered);
    console.log(bodyFormData);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/notification/send`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: bodyFormData
    };
    await axios
      .request(config)
      .then((response) => {
        console.log('Create User : ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setError('');
    toggle();
    reset();
  };
  console.log(instituteList,"instituteList",setSelectedImage)
  // const ImgStyled = styled('img')(({ theme }) => ({
  //   width: 100,
  //   height: 100,
  //   marginRight: theme.spacing(2),
  //   borderRadius: theme.shape.borderRadius
  // }));

  // const ButtonStyled = styled(Button)(({ theme }) => ({
  //   [theme.breakpoints.down('sm')]: {
  //     width: '100%',
  //     textAlign: 'center'
  //   }
  // }));

  // const handleInputImageChange = (file) => {
  //   const reader = new FileReader();
  //   const { files } = file.target;
  //   if (files && files.length !== 0) {
  //     reader.onload = () => setImgSrc(reader.result);
  //     setSelectedImage(files[0]);
  //     reader.readAsDataURL(files[0]);
  //     if (reader.result !== null) {
  //       setInputValue(reader.result);
  //     }
  //   }
  // };

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
        <Typography variant="h3">Add Notification</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`,
              rotate: "90deg",
              transition: "roatate 0.3s ease-in"
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ImgStyled src={getImageUrl(imagePlaceholder)} alt="Profile Pic" />
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
          </Box> */}
           <Grid>
            <Controller
              name="institutes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  multiple
                  id="select-multiple-chip"
                  sx={{ mb: 4 }}
                  options={instituteList}
                  getOptionLabel={(option) => option.institute_name}
                  value={value}
                  onChange={async (e, newValue) => {
                    if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                      onChange(instituteList.filter((option) => option.id !== 'selectAll'));
                    } else {
                      try {
                        show()
                        onChange(newValue);
                        const data = { institute : newValue?.uuid}
                        const response = await getInstituteBrancheswithId(data)
                        console.log(response,"response")
                        setBranchList(response?.data)
                      } catch (error) {
                        toast.error(error?.message)
                      }finally{
                        hide()
                      }
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="instituteList"
                      error={Boolean(errors.institutes)}
                      {...(errors.institutes && { helperText: errors.institutes.message })}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.institute_name}
                    </li>
                  )}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <CustomChip
                        key={option._id}
                        label={option.institute_name}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          onChange(updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              )}
            />
          </Grid>
          <Grid>
            <Controller
              name="Branches"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  multiple
                  id="select-multiple-chip"
                  sx={{ mb: 4 }}
                  options={branchList}
                  getOptionLabel={(option) => option.branch_identity}
                  value={value}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                      onChange(instituteList.filter((option) => option.id !== 'selectAll'));
                    } else {
                      onChange(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="instituteList"
                      error={Boolean(errors.institutes)}
                      {...(errors.institutes && { helperText: errors.institutes.message })}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.branch_identity}
                    </li>
                  )}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <CustomChip
                        key={option.id}
                        label={option.branch_identity}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          onChange(updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              )}
            />
          </Grid>
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
                  {...(errors.title && { helperText: errors.title.message })}
                />
              )}
            />
          </Grid>
          <Grid>
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  multiline
                  id="textarea-outlined"
                  sx={{ mb: 4 }}
                  fullWidth
                  rows={4}
                  value={value}
                  onChange={onChange}
                  placeholder="Body"
                  label="Body"
                  error={Boolean(errors.body)}
                  {...(errors.body && { helperText: errors.body.message })}
                />
              )}
            />
          </Grid>
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
