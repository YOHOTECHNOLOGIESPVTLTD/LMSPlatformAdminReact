import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField as CustomTextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateBranch } from '../../services/branchServices';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const branchSchema = yup.object().shape({
  branchName: yup.string().required('Branch Name is required'),
  phone: yup.number().required('Phone No. is required'),
  alternatePhone: yup.number().required('Alternate Phone No. is required'),
  address: yup.string().required('Address is required'),
  pinCode: yup.number().required('PIN Code is required'),
  landmark: yup.string().required('Landmark is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required')
});

const BranchEditModal = ({ open, handleEditClose, selectedBranch, setSelectedBranch }) => {
  useEffect(() => {
    if (selectedBranch) {
      setValue('branchName', selectedBranch.branch_name || '');
      setValue('phone', selectedBranch.phone_number || '');
      setValue('alternatePhone', selectedBranch.alternate_number || '');
      setValue('address', selectedBranch.address || ''); // Set default value to 'location'
      setValue('pinCode', selectedBranch.pin_code || '');
      setValue('landmark', selectedBranch.landmark || '');
      setValue('city', selectedBranch.city || '');
      setValue('state', selectedBranch.state || '');
    }
  }, [selectedBranch]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(branchSchema)
  });

  const onSubmit = async (data) => {
    const dummyData = {
      branch_name: data.branchName,
      id: selectedBranch.id,
      address: data.address,
      city: data.city,
      state: data.state,
      pin_code: data.pinCode,
      landmark: data.landmark,
      phone_number: data.phone,
      alternate_number: data.alternatePhone
    };
    console.log(data);
    try {
      const result = await updateBranch(dummyData);

      if (result.success) {
        toast.success(result.message);
        handleClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    handleEditClose();
    setSelectedBranch(null);
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
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`]
          }}
        >
          Edit Branch
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(2)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="branchName"
                    control={control}
                    defaultValue={selectedBranch ? selectedBranch.branch_name : ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Branch Name"
                        placeholder="carterLeonard"
                        error={Boolean(errors.branchName)}
                        helperText={errors.branchName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Phone No."
                        placeholder="123-456-7890"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="alternatePhone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Alternate Phone No."
                        placeholder="123-456-7890"
                        error={Boolean(errors.alternatePhone)}
                        helperText={errors.alternatePhone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    value={selectedBranch ? selectedBranch.address : ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        multiline
                        rows={3}
                        fullWidth
                        label="Address"
                        placeholder="1456, Liberty Street"
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pinCode"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="number"
                        label="PIN Code"
                        placeholder="612503"
                        error={Boolean(errors.pinCode)}
                        helperText={errors.pinCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="landmark"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Landmark"
                        placeholder="Nr. Wall Street"
                        error={Boolean(errors.landmark)}
                        helperText={errors.landmark?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="City"
                        placeholder="Kumbakonam"
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="State"
                        placeholder="TamilNadu"
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                      Update
                    </Button>
                    <Button variant="tonal" color="error" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BranchEditModal;
