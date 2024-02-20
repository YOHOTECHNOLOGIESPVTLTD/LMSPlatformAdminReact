// ** React Imports
import { Fragment, useState, forwardRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiStep from '@mui/material/Step';
import InputAdornment from '@mui/material/InputAdornment';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import { Controller, useForm } from 'react-hook-form';
import DialogContent from '@mui/material/DialogContent';

// ** Third Party Imports
import DatePicker from 'react-datepicker';
// import { popperPlacement } from '../institutes/pickers/index'
// ** Custom Component Imports
import CustomInput from './pickers/PickersCustomInput';
// ** Third Party Imports
import toast from 'react-hot-toast';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Imports
import StepperCustomDot from './add-new-institute/StepperCustomDot';

import CustomAvatar from 'components/mui/avatar';
// import CustomTextField from '@core/components/mui/text-field'
import { TextField as CustomTextField, TextField } from '@mui/material';

// ** Hook Import
import { useSettings } from 'hooks/useSettings';
// ** Util Import
import { hexToRGBA } from 'utils/hex-to-rgba';
import StepperWrapper from 'styles/mui/stepper';
// ** Styled Component

import Gallery from './add-new-institute/gallery';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const steps = [
  {
    icon: 'tabler:user',
    title: 'User Info',
    subtitle: 'Enter your Details'
  },
  {
    icon: 'tabler:building',
    title: 'Institute Info',
    subtitle: 'Enter your Institute Details'
  },
  {
    icon: 'tabler:link',
    title: 'Social Links',
    subtitle: 'Add Social Links'
  },
  {
    icon: 'tabler:lock',
    title: 'Login Info',
    subtitle: 'Set-up Login Credentials'
  }
];

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6)
    }
  }
}));

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

const StepperCustomHorizontal = () => {
  // ** States
  const [email, setEmail] = useState('');
  const [google, setGoogle] = useState('');
  const [country, setCountry] = useState('');
  const [twitter, setTwitter] = useState('');
  const [username, setUsername] = useState('');
  const [address2, setAddress2] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [address1, setAddress1] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [language, setLanguage] = useState([]);
  const [date, setDate] = useState(new Date());

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  });

  // ** Hooks & Var
  const { settings } = useSettings();
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { direction } = settings;

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success('Successfully Added a new Institute');
    }
  };

  const handleReset = () => {
    setEmail('');
    setGoogle('');
    setCountry('');
    setTwitter('');
    setUsername('');
    setAddress2('');
    setFacebook('');
    setLinkedIn('');
    setLanguage([]);
    setAddress1('');
    setActiveStep(0);
    setState({ ...state, password: '', password2: '' });
  };

  // Handle Password
  const handlePasswordChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  // Handle Confirm Password
  const handleConfirmChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 });
  };

  // Handle Language
  const handleSelectChange = (event) => {
    setLanguage(event.target.value);
  };

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(
    'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  );
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

  const handleInputImageReset = () => {
    setInputValue('');
    setImgSrc('/images/avatars/15.png');
  };

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }));

  // ** States
  const [open, setOpen] = useState(false);

  // ** Hooks
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { phoneNumber: '' } });
  const toggle2FADialog = () => setOpen(!open);

  const on2FAFormSubmit = () => {
    toggle2FADialog();
    setValue('phoneNumber', '');
  };

  const close2FADialog = () => {
    toggle2FADialog();
    clearErrors('phoneNumber');
    setValue('phoneNumber', '');
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone Number is required'),
    alt_phone: Yup.string().required('Alt Phone Number is required')
    // Add validation for other fields if needed
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: '',
      phone: '',
      alt_phone: ''
      // Add initial values for other fields if needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    }
  });
  console.log(formik);

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end';
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  value={username}
                  placeholder="carterLeonard"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  name="userName"
                  label="Username"
                  value={username}
                  placeholder="carterLeonard"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  placeholder="carterleonard@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type="number"
                  name="phone"
                  label="Phone Number"
                  value={email}
                  placeholder="+91 8767879876"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type="number"
                  name="alt_phone"
                  label="Alt Phone Number"
                  value={email}
                  placeholder="+91 8767879876"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={imgSrc} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                      Upload your picture
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
            </Grid>
          </form>
        );
      case 1:
        return (
          <Grid container>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Full Name"
                value={username}
                placeholder="carterLeonard"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Issued:</Typography>
              <DatePicker
                id="issue-date"
                dateFormat={'dd/MM/yyyy'}
                value={date}
                selected={date}
                customInput={<CustomInput />}
                onChange={(date) => setDate(date)}
              />
              <DatePicker
                selected={date}
                id="basic-input"
                popperPlacement={popperPlacement}
                onChange={(date) => setDate(date)}
                placeholderText="Click to select a date"
                customInput={<CustomInput label="Registered" />}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField multiline rows={3} fullWidth label="Description" placeholder="Your Description Goes Here" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Address Line 1"
                placeholder="Leonard"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Address Line 2"
                placeholder="Carter"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="State"
                id="stepper-custom-horizontal-personal-select"
                SelectProps={{
                  value: country,
                  onChange: (e) => setCountry(e.target.value)
                }}
              >
                <MenuItem value="TamilNadu">TamilNadu</MenuItem>
                <MenuItem value="Kerala">Kerala</MenuItem>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
                <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="City"
                id="stepper-custom-horizontal-personal-select"
                SelectProps={{
                  value: country,
                  onChange: (e) => setCountry(e.target.value)
                }}
              >
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Banglore">Banglore</MenuItem>
                <MenuItem value="Erode">Erode</MenuItem>
                <MenuItem value="Coimbatore">Coimbatore</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label="Area Pincode" placeholder="600026" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Official Website"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="www.institutename.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label="Language"
                SelectProps={{
                  multiple: true,
                  value: language,
                  onChange: (e) => handleSelectChange(e)
                }}
                id="stepper-custom-horizontal-personal-multiple-select"
              >
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
              </CustomTextField>
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
          </Grid>
        );
      case 2:
        return (
          <Grid container key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Pintrest"
                value={google}
                onChange={(e) => setGoogle(e.target.value)}
                placeholder="https://plus.pintrest.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="LinkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/carterLeonard"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography color="dark" sx={{ fontWeight: 600 }}>
                Upload Gallery
              </Typography>
              <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
                Upload Your Gallery
              </Typography>
              <Gallery />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Create Password"
                value={state.password}
                id="stepper-custom-horizontal-account-password"
                onChange={handlePasswordChange('password')}
                type={state.showPassword ? 'text' : 'password'}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={state.password2}
                label="Confirm Password"
                id="stepper-custom-horizontal-account-password-2"
                onChange={handleConfirmChange('password2')}
                type={state.showPassword2 ? 'text' : 'password'}
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
            </Grid>
            <Grid item xs={12} sm={12} className="addNewInstitute">
              <Card>
                <CardHeader title="Two-steps verification" />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Two factor authentication is not enabled yet.
                  </Typography>
                  <Typography sx={{ mb: 6, width: ['100%', '100%', '75%'], color: 'text.secondary' }}>
                    Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to
                    log in.{' '}
                    <Box
                      href="/"
                      component={'a'}
                      onClick={(e) => e.preventDefault()}
                      sx={{ textDecoration: 'none', color: 'primary.main' }}
                    >
                      Learn more.
                    </Box>
                  </Typography>
                  <Button variant="contained" onClick={toggle2FADialog}>
                    Enable two-factor authentication
                  </Button>
                </CardContent>
              </Card>

              <Dialog fullWidth open={open} onClose={toggle2FADialog} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
                <DialogContent
                  sx={{
                    px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    py: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  <Box sx={{ mb: 12, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{ fontSize: '1.625rem' }}>
                      Enable One Time Password
                    </Typography>
                  </Box>

                  <CustomCloseButton onClick={close2FADialog}>
                    <Icon icon="tabler:x" fontSize="1.25rem" />
                  </CustomCloseButton>

                  <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>Verify Your Mobile Number for SMS</Typography>
                  <Typography sx={{ mt: 4, mb: 6 }}>
                    Enter your mobile phone number with country code and we will send you a verification code.
                  </Typography>

                  <form onSubmit={handleSubmit(on2FAFormSubmit)}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type="number"
                          value={value}
                          sx={{ mb: 4 }}
                          onChange={onChange}
                          label="Phone Number"
                          id="opt-phone-number"
                          placeholder="202 555 0111"
                          error={Boolean(errors.phoneNumber)}
                          {...(errors.phoneNumber && { helperText: 'Please enter a valid phone number' })}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">+1</InputAdornment>
                          }}
                        />
                      )}
                    />
                    <div>
                      <Button variant="contained" type="submit" sx={{ mr: 3.5 }}>
                        Submit
                      </Button>
                      <Button type="reset" variant="tonal" color="secondary" onClick={close2FADialog}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        );

      default:
        return 'Unknown Step';
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      );
    } else {
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant="caption" component="p">
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {getStepContent(activeStep)}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="tonal" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={!smallScreen ? <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} /> : null}
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar;

              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className="step-label">
                      <RenderAvatar
                        variant="rounded"
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: (theme) => theme.shadows[3] }),
                          ...(activeStep > index && { color: (theme) => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
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

export default StepperCustomHorizontal;
