import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { Box, Typography } from '@mui/material';
///
// ** React Imports
import { forwardRef, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
// import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader';
// import IconButton from '@mui/material/IconButton';
// import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

// ** Custom Component Import
// import CustomTextField from 'components/mui/text-field'
import { TextField as CustomTextField } from '@mui/material';

// ** Third Party Imports
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';

const defaultValues = {
  dob: null,
  email: '',
  radio: '',
  select: '',
  lastName: '',
  password: '',
  textarea: '',
  firstName: '',
  checkbox: false
};

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />;
});

export default function ProfileEdit({data}) {
//   const [state, setState] = useState({
//     password: '',
//     showPassword: false
//   });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

//   const handleClickShowPassword = () => {
//     setState({ ...state, showPassword: !state.showPassword });
//   };
  const onSubmit = () => toast.success('Form Submitted');

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleInputImageReset = () => {
    setInputValue('');
    setImgSrc('/images/avatars/15.png');
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };
  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(
    'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  );


  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="primary" size="small" color="primary" sx={{ mr: 3 }}>
        <Icon icon="tabler:edit" />
      </Button>
      <Dialog
        handleMaxWidthChange={handleMaxWidthChange}
        fullWidth={fullWidth}
        handleFullWidthChange={handleFullWidthChange}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          {/* <DialogContentText>You can set my maximum width and whether to adapt or not.</DialogContentText> */}
          <Card>
            <CardHeader title="Update details" />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="Full Name"
                      // defaultValue={data.name}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label="Full Name"
                          onChange={onChange}
                          placeholder="Leonard"
                          error={Boolean(errors.firstName)}
                          aria-describedby="validation-basic-first-name"
                          {...(errors.firstName && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="Username"
                      defaultValue='username'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label="Username"
                          onChange={onChange}
                          placeholder="Carter"
                          error={Boolean(errors.lastName)}
                          aria-describedby="validation-basic-last-name"
                          {...(errors.lastName && { helperText: 'This field is required' })}
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
                        <CustomTextField
                          fullWidth
                          type="email"
                          defaultValue={data?.email}
                        //   defaultValue='mail'
                          label="Email"
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="carterleonard@gmail.com"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="registeredDate"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          selected={value}
                          showYearDropdown
                          showMonthDropdown
                          onChange={(e) => onChange(e)}
                          placeholderText="MM/DD/YYYY"
                          customInput={
                            <CustomInput
                              defaultValue={data?.registered_date}
                              value={value}
                            //   defaultValue={}
                              onChange={onChange}
                              label="Registered Date"
                              error={Boolean(errors.dob)}
                              aria-describedby="validation-basic-dob"
                              {...(errors.dob && { helperText: 'This field is required' })}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="PhoneNo"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="number"
                          defaultValue={data?.phone}
                          value={value}
                          label="Phone No"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="+91 98765 43210"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="altPhone"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="number"
                          defaultValue={data?.alternate_number}
                          value={value}
                          label="Alt.Phone No"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="carterleonard@gmail.com"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="website"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="text"
                          defaultValue={data?.official_website}
                          value={value}
                          label="Official Website"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="carterleonard@gmail.com"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="address1"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="text"
                          defaultValue={data?.address_line_1}
                          value={value}
                          label="Address Line 1"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="carterleonard@gmail.com"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="address1"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="email"
                          defaultValue={data?.address_line_2}
                          value={value}
                          label="Address Line 2"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="carterleonard@gmail.com"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="select"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          select
                          fullWidth
                          defaultValue={data?.state}
                          label="State"
                          SelectProps={{
                            value: value,
                            onChange: (e) => onChange(e)
                          }}
                          id="validation-basic-select"
                          error={Boolean(errors.select)}
                          aria-describedby="validation-basic-select"
                          {...(errors.select && { helperText: 'This field is required' })}
                        >
                          <MenuItem value="UK">UK</MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Australia">Australia</MenuItem>
                          <MenuItem value="Germany">Germany</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="select"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          select
                          fullWidth
                          defaultValue=''
                          label="City"
                          SelectProps={{
                            value: {value},
                            onChange: (e) => onChange(e)
                          }}
                          id="validation-basic-select"
                          error={Boolean(errors.select)}
                          aria-describedby="validation-basic-select"
                          {...(errors.select && { helperText: 'This field is required' })}
                        >
                          <MenuItem value="UK">UK</MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Australia">Australia</MenuItem>
                          <MenuItem value="Germany">Germany</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="pincode"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="number"
                          defaultValue={data?.pin_code}
                          Value={value}
                          label="PIN Code"
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="6002767"
                          aria-describedby="validation-basic-email"
                          {...(errors.email && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ImgStyled src={imgSrc} alt="Profile Pic" />
                      <div>
                        <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                          Upload Your Logo
                          <input
                            hidden
                            type="file"
                            value={inputValue}
                            accept="image/png, image/jpeg"
                            onChange={handleInputImageChange}
                            id="account-settings-upload-image"
                          />
                        </ButtonStyled>
                        <ResetButtonStyled color="secondary" variant="tonal" onClick={handleInputImageReset}>
                          Reset
                        </ResetButtonStyled>
                        <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="textarea"
                    //   defaultValue={data?.description}

                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          rows={4}
                          fullWidth
                          multiline
                          {...field}
                          label="Description"
                  
                          error={Boolean(errors.textarea)}
                          aria-describedby="validation-basic-textarea"
                          {...(errors.textarea && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
              <FormControl error={Boolean(errors.radio)}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                      <FormControlLabel
                        value='female'
                        label='Female'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='male'
                        label='Male'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='other'
                        label='Other'
                        sx={errors.radio ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.radio && (
                  <FormHelperText
                    id='validation-basic-radio'
                    sx={{ mx: 0, color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}

                  <Grid item xs={12} sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}>
                    <FormControl>
                      <Controller
                        name="checkbox"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormControlLabel
                            label="Agree to our terms and conditions"
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                            control={
                              <Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />
                            }
                          />
                        )}
                      />
                      {errors.checkbox && (
                        <FormHelperText
                          id="validation-basic-checkbox"
                          sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                        >
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button color="error" variant="contained">
            <Icon icon="tabler:x" onClick={handleClose}></Icon>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
