// ** React Imports
import { Fragment, forwardRef, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Gallery from './gallery';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
// ** Icon Imports
import Icon from 'components/icon';

import { TextField as CustomTextField, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'react-datepicker/dist/react-datepicker.css';
import StepperCustomDot from './StepperCustomDot';

import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import StepperWrapper from 'styles/mui/stepper';

const steps = [
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Gallery Info',
    subtitle: 'Add Logo, Image, Gallery Information'
  },
  {
    title: 'Social Links',
    subtitle: 'Add Social Links'
  },
  {
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  }
];

const defaultAccountValues = {
  email: '',
  username: '',
  password: '',
  name: '',
  contact: '',
  confirm_password: ''
};

const defaultPersonalValues = {
  state: '',
  city: '',
  pin_code: '',
  address_line_one: '',
  address_line_two: '',
  registered_date: '',
  institute_name: '',
  official_email: '',
  official_website: '',
  phone: '',
  alt_phone: '',
  description: ''
};

const defaultSocialValues = {
  instagram: '',
  twitter: '',
  facebook: '',
  linkedIn: '',
  pinterest: ''
};
const defaultGalleryValues = {
  logo: '',
  image: '',
  gallery: ''
};

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField fullWidth inputRef={ref} {...props} />;
});

const accountSchema = yup.object().shape({
  username: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.number().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
});

const personalSchema = yup.object().shape({
  state: yup.string().required(),
  city: yup.string().required(),
  pin_code: yup.number().required(),
  address_line_one: yup.string().required(),
  address_line_two: yup.string().required(),
  registered_date: yup.string().required(),
  institute_name: yup.string().required(),
  phone: yup.number().required(),
  alt_phone: yup.number().required(),
  description: yup.string().required(),
  official_email: yup.string().required(),
  official_website: yup.string().required(),
  subscription: yup.string().required()
});

const socialSchema = yup.object().shape({});
const gallerySchema = yup.object().shape({});

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  });

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  });

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  });
  const {
    reset: galleryReset,
    control: galleryControl,
    handleSubmit: handleGallerySubmit,
    formState: { errors: galleryErrors }
  } = useForm({
    defaultValues: defaultGalleryValues,
    resolver: yupResolver(gallerySchema)
  });
  console.log(galleryControl);
  console.log(defaultPersonalValues);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
    galleryReset({ logo: '', image: '', gallery: [] });
    accountReset({ email: '', username: '', password: '', confirm_password: '', name: '', contact: '' });
    personalReset({
      state: '',
      city: '',
      pin_code: Number(''),
      address_line_one: '',
      address_line_two: '',
      registered_date: '',
      institute_name: '',
      official_email: '',
      official_website: '',
      subscription: '',
      phone: Number(''),
      alt_phone: Number(''),
      description: ''
    });
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);

    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }

  const onSubmit = async () => {
    const accountData = accountControl?._formValues;
    const personalData = personalControl?._formValues;
    const socialData = socialControl?._formValues;
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      let data = new FormData();
      data.append('institutename', personalData?.institute_name);
      data.append('email', personalData?.official_email);
      data.append('description', personalData?.description);
      data.append('address_line_1', personalData?.address_line_one);
      data.append('address_line_2', personalData?.address_line_two);
      data.append('city', personalData?.city);
      data.append('state', personalData?.state);
      data.append('pin_code', personalData?.pin_code);
      data.append('phone', personalData?.phone);
      data.append('alternate_number', personalData?.alt_phone);
      data.append('official_website', personalData?.official_website);
      data.append('facebook', socialData?.facebook);
      data.append('linkedin', socialData?.linkedIn);
      data.append('instagram', socialData?.instagram);
      data.append('twitter', socialData?.twitter);
      data.append('name', accountData?.name);
      data.append('registered_date', convertDateFormat(personalData?.registered_date));
      data.append('logo', logo);
      data.append('image', instituteImage);
      data.append('gallery', galleryImages);
      data.append('user_email', accountData?.email);
      data.append('user_mobile', accountData?.contact);
      data.append('username', accountData?.username);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/institute-management/institutes/create`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: data
      };

      await axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          toast.success('Form Submitted');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 });
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

  const [logo, setLogo] = useState('');
  const [instituteImage, setInstituteImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  // const [date] = useState(new Date());
  const [logoSrc, setLogoSrc] = useState(
    'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  );
  const [instituteSrc, setInstituteSrc] = useState(
    'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  );
  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setLogoSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setLogo(files[0]);
    }
  };

  const handleInstituteImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setInstituteSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setInstituteImage(files[0]);
    }
  };

  console.log('Gallery : ', galleryImages, 'Institute Image :', instituteImage, 'logo :', logo);

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc('/images/avatars/15.png');
  };
  const handleInstituteImageReset = () => {
    setInstituteImage('');
    setInstituteSrc('/images/avatars/15.png');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="institute_name"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Institute Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(personalErrors['institute_name'])}
                      aria-describedby="stepper-linear-personal-institute_name"
                      {...(personalErrors['institute_name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="registered_date"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      id="issue-date"
                      dateFormat={'dd/MM/yyyy'}
                      value={value}
                      selected={value}
                      customInput={
                        <CustomInput
                          label="Registered Date"
                          error={Boolean(personalErrors['registered_date'])}
                          aria-describedby="stepper-linear-personal-registered_date"
                          {...(personalErrors['registered_date'] && { helperText: 'This field is required' })}
                        />
                      }
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="state"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="State"
                      onChange={onChange}
                      error={Boolean(personalErrors.state)}
                      aria-describedby="stepper-linear-personal-state-helper"
                      {...(personalErrors.state && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="City"
                      onChange={onChange}
                      error={Boolean(personalErrors.city)}
                      aria-describedby="stepper-linear-personal-city-helper"
                      {...(personalErrors.city && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="pin_code"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Pin Code"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['pin_code'])}
                      aria-describedby="stepper-linear-personal-pin_code"
                      {...(personalErrors['pin_code'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address_line_one"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Address Line One"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_one'])}
                      aria-describedby="stepper-linear-personal-address_line_one"
                      {...(personalErrors['address_line_one'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address_line_two"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Address Line Two"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_two'])}
                      aria-describedby="stepper-linear-personal-address_line_two"
                      {...(personalErrors['address_line_two'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Phone Number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['phone'])}
                      aria-describedby="stepper-linear-personal-phone"
                      {...(personalErrors['phone'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="alt_phone"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      type="number"
                      label="Alt Phone Number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['alt_phone'])}
                      aria-describedby="stepper-linear-personal-alt_phone"
                      {...(personalErrors['alt_phone'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="official_email"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Official Email"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['official_email'])}
                      aria-describedby="stepper-linear-personal-official_email"
                      {...(personalErrors['official_email'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="official_website"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Official Website"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['official_website'])}
                      aria-describedby="stepper-linear-personal-official_website"
                      {...(personalErrors['official_website'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="subscription"
                  control={personalControl}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Subscription"
                      id="custom-select"
                      error={Boolean(personalErrors['official_website'])}
                      aria-describedby="stepper-linear-personal-official_website"
                      {...(personalErrors['official_website'] && { helperText: 'This field is required' })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="description"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      label="Description"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['description'])}
                      aria-describedby="stepper-linear-personal-description"
                      {...(personalErrors['description'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
          // </DatePickerWrapper>
        );
      case 1:
        return (
          <form key={2} onSubmit={handleGallerySubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="dark" sx={{ fontWeight: 600 }}>
                  Upload Institute Logo
                </Typography>
                <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
                  Upload logo here
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={logoSrc} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                      Upload your Logo
                      <input
                        hidden
                        type="file"
                        // value={logo}
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
              <Grid item xs={12} sm={6}>
                <Typography color="dark" sx={{ fontWeight: 600 }}>
                  Upload Institute Image
                </Typography>
                <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
                  Upload Image here
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={instituteSrc} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="account-settings-institute-image">
                      Upload your image
                      <input
                        hidden
                        type="file"
                        // value={instituteImage}
                        accept="image/png, image/jpeg"
                        onChange={handleInstituteImageChange}
                        id="account-settings-institute-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color="secondary" variant="tonal" onClick={handleInstituteImageReset}>
                      Reset
                    </ResetButtonStyled>
                    <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography color="dark" sx={{ fontWeight: 600 }}>
                  Upload Gallery
                </Typography>
                <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
                  Upload Your Gallery
                </Typography>
                <Gallery setGalleryImages={setGalleryImages} galleryImages={galleryImages} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="twitter"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Twitter"
                      onChange={onChange}
                      error={Boolean(socialErrors.twitter)}
                      placeholder="https://twitter.com/carterLeonard"
                      aria-describedby="stepper-linear-social-twitter"
                      {...(socialErrors.twitter && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="facebook"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Facebook"
                      onChange={onChange}
                      error={Boolean(socialErrors.facebook)}
                      placeholder="https://facebook.com/carterLeonard"
                      aria-describedby="stepper-linear-social-facebook"
                      {...(socialErrors.facebook && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="instagram"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Instagram"
                      onChange={onChange}
                      error={Boolean(socialErrors.instagram)}
                      aria-describedby="stepper-linear-social-instagram"
                      placeholder="https://plus.instagram.com/carterLeonard"
                      {...(socialErrors.instagram && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="linkedIn"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="LinkedIn"
                      onChange={onChange}
                      error={Boolean(socialErrors.linkedIn)}
                      placeholder="https://linkedin.com/carterLeonard"
                      aria-describedby="stepper-linear-social-linkedIn"
                      {...(socialErrors.linkedIn && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="pinterest"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Pinterest"
                      onChange={onChange}
                      error={Boolean(socialErrors.pinterest)}
                      placeholder="https://pinterest.com/carterLeonard"
                      aria-describedby="stepper-linear-social-pinterest"
                      {...(socialErrors.pinterest && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 3:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Name"
                      onChange={onChange}
                      placeholder="carterLeonard"
                      error={Boolean(accountErrors.name)}
                      aria-describedby="stepper-linear-account-name"
                      {...(accountErrors.name && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="email"
                      value={value}
                      label="Email"
                      onChange={onChange}
                      error={Boolean(accountErrors.email)}
                      placeholder="carterleonard@gmail.com"
                      aria-describedby="stepper-linear-account-email"
                      {...(accountErrors.email && { helperText: accountErrors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="contact"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Contact Number"
                      onChange={onChange}
                      error={Boolean(accountErrors.contact)}
                      placeholder="6368393954"
                      aria-describedby="stepper-linear-account-contact"
                      {...(accountErrors.contact && { helperText: accountErrors.contact.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="username"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Username"
                      onChange={onChange}
                      placeholder="carterLeonard"
                      error={Boolean(accountErrors.username)}
                      aria-describedby="stepper-linear-account-username"
                      {...(accountErrors.username && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="password"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Password"
                      onChange={onChange}
                      id="stepper-linear-account-password"
                      error={Boolean(accountErrors.password)}
                      type={state.showPassword ? 'text' : 'password'}
                      {...(accountErrors.password && { helperText: accountErrors.password.message })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                              onMouseDown={(e) => e.preventDefault()}
                              aria-label="toggle password visibility"
                            >
                              <Icon fontSize="1.25rem" icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="confirm_password"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label="Confirm Password"
                      id="stepper-linear-account-confirm_password"
                      type={state.showPassword2 ? 'text' : 'password'}
                      error={Boolean(accountErrors['confirm_password'])}
                      {...(accountErrors['confirm_password'] && {
                        helperText: accountErrors['confirm_password'].message
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onMouseDown={(e) => e.preventDefault()}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                            >
                              <Icon fontSize="1.25rem" icon={state.showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return getStepContent(activeStep);
    }
  };

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              if (index === activeStep) {
                labelProps.error = false;
                if (
                  (accountErrors.email || accountErrors.username || accountErrors.password || accountErrors['confirm_password']) &&
                  activeStep === 3
                ) {
                  labelProps.error = true;
                } else if ((personalErrors['registered_date'] || personalErrors['first-name']) && activeStep === 0) {
                  labelProps.error = true;
                } else if (galleryErrors.logo || (galleryErrors.gallery && activeStep === 1)) {
                  labelProps.error = true;
                } else if (
                  (socialErrors.instagram || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true;
                } else {
                  labelProps.error = false;
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className="step-label">
                      <Typography className="step-number">{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className="step-title">{step.title}</Typography>
                        <Typography className="step-subtitle">{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default StepperLinearWithValidation;
