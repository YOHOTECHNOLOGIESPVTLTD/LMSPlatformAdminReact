// ** React Imports
import { useEffect, useState } from 'react';
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
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllPaymentSubscription, updatePayment } from '../services/paymentServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  payment_method: yup.string().required('Payment Method is required'),
  subscriptions: yup.string().required('Subscription Plan is required'),
  transactionId: yup.number().typeError('Transaction Id must be a number').required('Transaction Id is required')
});

const defaultValues = {
  payment_method: '',
  subscriptions: '',
  transactionId:''
};

const PaymentEditDrawer = (props) => {
  // ** Props
  const { open, toggle ,selectedRows} = props;


  const [activePlans, setActivePlans] = useState([]);

  useEffect(() => {

    getActiveSubscriptions();
  }, []);

  const getActiveSubscriptions = async () => {
    const result = await getAllPaymentSubscription();

    console.log('active Subsciptions : ', result.data);
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

  useEffect(() => {
    if (selectedRows) {
      setValue('transactionId', selectedRows?.transactionId || '');
      setValue('subscriptions', selectedRows?.subscriptions || '');
      setValue('payment_method', selectedRows?.payment_method || '');
    }
  }, [selectedRows]);

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('subscription_plan_id', data.subscriptions);
    bodyFormData.append('payment_reference_no', data.transactionId);
    bodyFormData.append('payment_method', data.payment_method);
    bodyFormData.append('institute_subscription_id', selectedRows.id);


    const result = await updatePayment(bodyFormData);

    if (result.success) {
      toast.success(result.message);
    } else {
      // let errorMessage = '';
      // Object.values(result.message).forEach((errors) => {
      //   errors.forEach((error) => {
      //     errorMessage += `${error}\n`; // Concatenate errors with newline
      //   });
      // }
      // );
      // toast.error(errorMessage.trim());
      toast.error(result.message);
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
          <Typography variant="h5">Edit Payments</Typography>
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
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="payment_method"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    options={['Net Banking', 'Upi', 'Year']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Payment Method"
                        error={Boolean(errors.payment_method)}
                        helperText={errors.payment_method?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="subscriptions"
                control={control}
                rules={{ required: 'Plans field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activePlans}
                    getOptionLabel={(subscriptions) => subscriptions.plan_name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.id);
                      // getActivesubscriptions(newValue?.id);
                    }}
                    value={activePlans.find((subscriptions) => subscriptions.id === value) || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subscription Plan"
                        error={Boolean(errors.subscriptions)}
                        helperText={errors.subscriptions?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="transactionId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Transaction Id"
                    type="number"
                    error={Boolean(errors.transactionId)}
                    helperText={errors.transactionId?.message}
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

export default PaymentEditDrawer;
