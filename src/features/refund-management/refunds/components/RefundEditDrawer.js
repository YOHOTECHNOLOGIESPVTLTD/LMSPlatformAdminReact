// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  batch: yup.string().required('Batch is required'),
  students: yup.string().required('Student is required'),
  amount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  designation: '',
  fullName: '',
  userName: '',
  role: '',
  contact: Number('')
};

const RefundEditDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {}, []);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
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
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '80%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Edit Fees</Typography>
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

            <Grid item xs={12} sm={12}>
              <Controller
                name="batch"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    select
                    fullWidth
                    label="Batch"
                    id="batch-select"
                    defaultValue=""
                    error={Boolean(errors.batch)}
                    helperText={errors.batch?.message}
                  >
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="students"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    select
                    fullWidth
                    label="Student"
                    id="student-select"
                    defaultValue=""
                    error={Boolean(errors.students)}
                    helperText={errors.students?.message}
                  >
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Amount"
                    type="number"
                    error={Boolean(errors.amount)}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
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
    </DatePickerWrapper>
  );
};

export default RefundEditDrawer;
