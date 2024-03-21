// ** React Imports
import { forwardRef, useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { getAllInstitutes } from 'features/institute-management/services/instituteService';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { addPayment } from '../services/paymentServices';
import { getAllPaymentSubscription } from '../services/paymentServices';


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  // institutes: yup.string().required('Institutes is required'),
  // batch: yup.string().required('Batch is required'),
  // student: yup.string().required('Students is required'),
  // payment_date: yup.string().required('Payment Date is required'),
  // paymentId: yup.number().typeError('Payment Id must be a number').required('Payment Id is required'),
  // paidAmount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const defaultValues = {
  institutes: '',
  plan_type:"",

  course: '',
  batch: '',
  student: '',
  payment_date: new Date(),
  paymentId: Number('0'),
  paidAmount: Number('0')
};

const PaymentAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');


  const [activeInstitutes, setActiveInstitutes] = useState([]);
  
  const [activePlans, setActivePlans] = useState([]);

  useEffect(() => {
    getActiveInstitutes();
    getActiveSubscriptions();
  }, []);
  

  const getActiveInstitutes = async () => {
    const result = await getAllInstitutes();

    console.log('active Institues : ', result.data);
    setActiveInstitutes(result.data.data);
  };

  const getActiveSubscriptions = async () => {
    const result = await getAllPaymentSubscription();

    console.log('active Institues : ', result.data);
    setActivePlans(result.data.data);
  };

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

  function convertDateFormat(input) {
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('payment_proof', selectedImage);
    bodyFormData.append('branch_id', data.branch);
    bodyFormData.append('payment_date', convertDateFormat(data.payment_date));
    bodyFormData.append('paid_amount', data.paidAmount);

    const result = await addPayment(bodyFormData);

    if (result.success) {
      toast.success(result.message);
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
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    // ** Props
    const { label, readOnly } = props;

    return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
  });

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

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="institutes"
                control={control}
                rules={{ required: 'Institutes field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeInstitutes}
                    getOptionLabel={(institutes) => institutes.name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.institute_id);
                      getActiveInstitutes(newValue?.institute_id);
                    }}
                    value={activeInstitutes.find((institutes) => institutes.institute_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Institutes" error={Boolean(errors.institutes)} helperText={errors.institutes?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
                <Controller
                  name="plan_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      options={['Day', 'Month', 'Year']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Plan Type"
                          error={Boolean(errors.plan_type)} helperText={errors.plan_type?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="Plans"
                control={control}
                rules={{ required: 'Plans field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activePlans}
                    getOptionLabel={(subscriptions) => subscriptions.name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.subscriptions_id);
                      getActivesubscriptions(newValue?.subscriptions_id);
                    }}
                    value={activePlans.find((subscriptions) => subscriptions.subscriptions_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Select subscriptions" error={Boolean(errors.subscriptions)} helperText={errors.subscriptions?.message} />
                    )}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={6} sx={{ mb: 2 }}>
              <Controller
                name="payment_date"
                control={control}
                rules={{ required: 'Payment Date field is required' }}
                render={({ field: {value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    id="date-time-picker"
                    timeFormat="HH:mm"
                    className="full-width-datepicker"
                    onChange={onChange}
                    placeholderText="Click to select a date"
                    customInput={<CustomInput label="Payment Date" />}
                  />
                )}
              />
              {errors.payment_date && (
                <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date.message}</p>
              )}
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

export default PaymentAddDrawer;
