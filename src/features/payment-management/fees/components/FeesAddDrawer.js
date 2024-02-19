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
  course: yup.string().required('Course is required'),
  batch: yup.string().required('Batch is required'),
  students: yup.string().required('Students is required'),
  paymentId: yup.number().typeError('Payment Id must be a number').required('Payment Id is required'),
  paidAmount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
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

const FeesAddDrawer = (props) => {
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Add Fees</Typography>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
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
                name="course"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Select Course"
                    onChange={onChange}
                    SelectProps={{ value: value, onChange: onChange }}
                    error={Boolean(errors.course)}
                    {...(errors.course && { helperText: errors.course.message })}
                  >
                    <MenuItem value={'Web Development'}>Web Development</MenuItem>
                    <MenuItem value={'Android Development'}>Android Development</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="batch"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Select Batch"
                    onChange={onChange}
                    SelectProps={{ value: value, onChange: onChange }}
                    error={Boolean(errors.batch)}
                    {...(errors.batch && { helperText: errors.batch.message })}
                  >
                    <MenuItem value={'Batch 1'}>Batch 1</MenuItem>
                    <MenuItem value={'Batch 2'}>Batch 2</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="students"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Select Students"
                    onChange={onChange}
                    SelectProps={{ value: value, onChange: onChange }}
                    error={Boolean(errors.students)}
                    {...(errors.students && { helperText: errors.students.message })}
                  >
                    <MenuItem value={'Student 1'}>Student 1</MenuItem>
                    <MenuItem value={'Student 2'}>Student 2</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="paymentId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Payment Id"
                    type="number"
                    error={Boolean(errors.paymentId)}
                    helperText={errors.paymentId?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="paidAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Paid Amount"
                    type="number"
                    error={Boolean(errors.paidAmount)}
                    helperText={errors.paidAmount?.message}
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

export default FeesAddDrawer;
