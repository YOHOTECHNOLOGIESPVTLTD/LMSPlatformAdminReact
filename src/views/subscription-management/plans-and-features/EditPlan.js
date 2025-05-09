// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid';
// import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// ** Custom Component Import
import CustomTextField from 'components/mui/text-field';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { updateSubscriptionFeature } from 'features/subscription-management/features/services/subscriptionFeaturesServices';
// import { addSubscriptionFeature } from '../services/subscriptionFeaturesServices';
//import { imagePlaceholder } from 'lib/placeholders';
// ** Icon Imports

const defaultValues = {
  plan_name: '',
  plan_price: '',
  support_level: null,
  description: '',
  plan_duration: '',
  plan_duration_type: null,
  students: '',
  students_checkbox: false,
  admins: '',
  admins_checkbox: false,
  teachers: '',
  teachers_checkbox: false,
  batches: '',
  batches_checkbox: false,
  courses: '',
  courses_checkbox: false,
  classes: '',
  classes_checkbox: false
  //   checkbox: false
};

const EditPlan = () => {
  const location = useLocation();
  const planId = location.state.id;
  console.log('planId',planId)
  const planData = location.state.plans;
  console.log('plans:', planData);
  console.log('planId:', planId);
  // ** StatesforInput
  const [studentInputChecked, setStudentInputChecked] = useState(false);
  const [adminInputChecked, setAdminInputChecked] = useState(false);
  const [teachersInputChecked, setTeachersInputChecked] = useState(false);
  const [batchesInputChecked, setBatchesInputChecked] = useState(false);
  const [coursesInputChecked, setCoursesInputChecked] = useState(false);
  const [classesInputChecked, setClassesInputChecked] = useState(false);
  // ** StatesforInputCheckBox
  const [studentInputBoxChecked, setStudentInputBoxChecked] = useState(false);
  const [adminInputBoxChecked, setAdminInputBoxChecked] = useState(false);
  const [teachersInputBoxChecked, setTeachersInputBoxChecked] = useState(false);
  const [batchesInputBoxChecked, setBatchesInputBoxChecked] = useState(false);
  const [coursesInputBoxChecked, setCoursesInputBoxChecked] = useState(false);
  const [classesInputBoxChecked, setClassesInputBoxChecked] = useState(false);
  //errorState
  const [studentError, setStudentError] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [teachersError, setTeachersError] = useState('');
  const [batchesError, setBatchesError] = useState('');
  const [coursesError, setCoursesError] = useState('');
  const [classesError, setClassesError] = useState('');
  // const counts = planData?.features.map((feature) => feature.count);
  // console.log('counts', counts);

  const filteredData = (key) => {
    const response = planData?.features?.filter((item) => item.feature.identity === key);
    // console.log('res', response[0].count);
    return response[0]?.count;
  };

  useEffect(() => {
    if (planData) {
      setValue('id',planId)
      setValue('plan_duration_type', planData?.duration.unit);
      setValue('plan_name', planData?.identity);
      setValue('plan_price', planData?.price);
      setValue('description', planData?.description);
      setValue('support_level', planData?.support_level);
      setValue('plan_duration', planData?.duration?.value);
      setValue(
        'students',
        planData?.features?.filter((item) => item.feature.identity === 'Admin')
      );
      setValue('admins', filteredData('Admins'));
      // setValue('staffs', planData?.features?.no_of_staffs);
      setValue('students', filteredData('Students'));
      setValue('batches', filteredData('Teachers'));
      setValue('courses', filteredData('Courses'));
      setValue('classes', filteredData('Batches'));
      if (planData?.features?.no_of_students) {
        setStudentInputBoxChecked(true);
      }
      if (planData?.features?.no_of_teachers) {
        setTeachersInputBoxChecked(true);
      }
      if (planData?.features?.no_of_classes) {
        setClassesInputBoxChecked(true);
      }
      if (planData?.features?.no_of_courses) {
        setCoursesInputBoxChecked(true);
      }
      if (planData?.features?.no_of_admins) {
        setAdminInputBoxChecked(true);
      }
      if (planData?.features?.no_of_batches) {
        setBatchesInputBoxChecked(true);
      }
    }
    if (planData?.features?.student_is_unlimited) {
      setStudentInputChecked(true);
    }
    if (planData?.features?.teacher_is_unlimited) {
      setTeachersInputChecked(true);
    }
    if (planData?.features?.class_is_unlimited) {
      setClassesInputChecked(true);
    }
    if (planData?.features?.admin_is_unlimited) {
      setAdminInputChecked(true);
    }
    if (planData?.features?.batches_is_unlimited) {
      setBatchesInputChecked(true);
    }
    if (planData?.features?.course_is_unlimited) {
      setCoursesInputChecked(true);
    }
  }, [planData]);

  // const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState('https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg');

  const handleInputImageReset = () => {
    setSelectedImage('');
    setImgSrc('https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg');
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
  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    console.log('submitted data',data);
    
    setErrorMessage('');

    if (!studentInputBoxChecked && !studentInputChecked) setStudentError(true);
    if (!adminInputBoxChecked && !adminInputChecked) setAdminError(true);
    if (!teachersInputBoxChecked && !teachersInputChecked) setTeachersError(true);
    if (!batchesInputBoxChecked && !batchesInputChecked) setBatchesError(true);
    if (!coursesInputBoxChecked && !coursesInputChecked) setCoursesError(true);
    if (!classesInputBoxChecked && !classesInputChecked) setClassesError(true);

    if (studentError || adminError || teachersError || batchesError || coursesError || classesError) return;

    var bodyFormData = new FormData();
    bodyFormData.append('planId', planId);
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('plan_name', data?.plan_name);
    bodyFormData.append('plan_price', data?.plan_price);
    bodyFormData.append('support_level', data?.support_level);
    bodyFormData.append('plan_duration', data?.plan_duration);
    bodyFormData.append('plan_duration_type', data?.plan_duration_type);
    bodyFormData.append('description', data?.description);
    bodyFormData.append('no_of_students', data?.students);
    bodyFormData.append('no_of_admins', data?.admins);
    bodyFormData.append('no_of_teachers', data?.teachers);
    bodyFormData.append('no_of_batches', data?.batches);
    bodyFormData.append('no_of_courses', data?.courses);
    bodyFormData.append('no_of_classes', data?.classes);
    bodyFormData.append('student_is_unlimited', studentInputChecked ? '1' : '');
    bodyFormData.append('teacher_is_unlimited', teachersInputChecked ? '1' : '');
    bodyFormData.append('admin_is_unlimited', adminInputChecked ? '1' : '');
    bodyFormData.append('course_is_unlimited', coursesInputChecked ? '1' : '');
    bodyFormData.append('batches_is_unlimited', batchesInputChecked ? '1' : '');
    bodyFormData.append('class_is_unlimited', classesInputChecked ? '1' : '');

    try {
      const result = await updateSubscriptionFeature(bodyFormData);
      if (result.success) {
        navigate(-1);
      } else {
        setErrorMessage(result.message || 'Failed to update subscription.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An unexpected error occurred while updating the subscription.');
    }
  };

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      // if (reader.result !== null) {
      //   setInputValue(reader.result);
      // }
    }
  };
  // console.log(studentInputChecked);
  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  // const onSubmit = () => toast.success('Form Submitted');

  return (
    <Box p={1}>
      {errorMessage && <Typography sx={{ color: 'red', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>{errorMessage}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: 180,
                  height: 200,
                  border: '2px dashed #1976d2',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: '#f9f9f9',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 3,
                  ':hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#1565c0',
                    boxShadow: 3,
                    transform: 'scale(1.05)'
                  },
                  ':focus-within': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {selectedImage || planData?.image ? (
                  <ImgStyled
                    src={
                      selectedImage
                        ? imgSrc
                        : `${process.env.REACT_APP_PUBLIC_API_URL.replace(/\/$/, '')}/${planData?.image.replace(/^\//, '')}`
                    }
                    alt="Profile Pic"
                    sx={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      boxShadow: 2,
                      marginBottom: '12px'
                    }}
                  />
                ) : null}

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: selectedImage ? 1 : 2
                  }}
                >
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                    sx={{
                      width: '75px',
                      height: '40px',
                      left: '4%',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px'
                    }}
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>

                  <ResetButtonStyled
                    color="error"
                    variant="tonal"
                    onClick={handleInputImageReset}
                    sx={{
                      width: '65px',
                      right: '4%',
                      height: '40px',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px'
                    }}
                  >
                    Reset
                  </ResetButtonStyled>
                </Box>

                {!selectedImage && !planData?.image && (
                  <Typography sx={{ mt: 2, color: 'text.disabled', fontSize: '12px', textAlign: 'center' }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="text"
                  label="Plan Name"
                  placeholder="Enter plan name here"
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="standard"
                  inputProps={{ maxLength: 18 }}
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: '1.2rem', transition: 'all 0.3s ease' }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': { transform: 'scale(1.05)' },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FF6D00' },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInput-underline:after': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.plan_name)}
                  helperText={errors.plan_name ? 'This field is required' : ''}
                  aria-label="Enter plan name"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Plan Price"
                  placeholder="Enter price"
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="standard"
                  inputProps={{ min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: '1.2rem', transition: 'all 0.3s ease' }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': { transform: 'scale(1.05)' },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FF6D00' },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInput-underline:after': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.plan_price)}
                  helperText={errors.plan_price ? 'This field is required' : ''}
                  aria-label="Enter plan price"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="support_level"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Support Level"
                  value={field.value || 'basic'}
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: '1.2rem', transition: 'all 0.3s ease' }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': { transform: 'scale(1.05)' },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem',
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FF6D00' },
                    '&:hover .MuiInput-underline:before': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInput-underline:after': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.support_level)}
                  helperText={errors.support_level ? 'This field is required' : ''}
                  aria-label="Select support level"
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  rows={4}
                  fullWidth
                  inputProps={{ maxLength: 35 }}
                  multiline
                  {...field}
                  label="Plan Description"
                  placeholder="Enter plan description"
                  sx={{
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        transition: 'border-color 0.3s ease-in-out'
                      },
                      '&:hover fieldset': {
                        borderColor: 'black'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6D00 !important'
                      }
                    },
                    '& .MuiInputBase-input': {
                      color: '#000'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#333',
                      padding: '0 4px',
                      transition: 'color 0.3s ease-in-out, transform 0.2s ease-in-out',
                      '&.Mui-focused': {
                        color: '#FF6D00 !important',
                        transform: 'scale(1.1)'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#d32f2f'
                    }
                  }}
                  error={Boolean(errors.description)}
                  helperText={errors.description ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_duration"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Duration"
                  placeholder="Enter duration"
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="standard"
                  inputProps={{ min: 0, maxLength: 5 }}
                  onWheel={(e) => e.target.blur()}
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: '1.2rem', transition: 'all 0.3s ease' }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': { transform: 'scale(1.05)' },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FF6D00' },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInput-underline:after': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.plan_duration)}
                  helperText={errors.plan_duration ? 'This field is required' : ''}
                  aria-label="Enter plan duration"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_duration_type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Duration Type"
                  placeholder="Select duration type"
                  value={field.value || 'day'}
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: '1.2rem', transition: 'all 0.3s ease' }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': { transform: 'scale(1.05)' },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem',
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#FF6D00' },
                    '&:hover .MuiInput-underline:before': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInput-underline:after': { borderBottom: '2px solid #FF6D00' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.plan_duration_type)}
                  helperText={errors.plan_duration_type ? 'This field is required' : ''}
                  aria-label="Select duration type"
                >
                  <MenuItem value="day">Days</MenuItem>
                  <MenuItem value="monthly">Months</MenuItem>
                  <MenuItem value="yearly">Year</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="students"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Students"
                  placeholder="Enter number of students"
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue('students', value);
                    setStudentInputBoxChecked(value !== '');
                    setStudentError(false);
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.students)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="students_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Students"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={studentInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setStudentInputChecked(isChecked);
                          field.onChange(isChecked);
                          setStudentError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {studentError && (
                <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Student data cannot be empty</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="admins"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Admins"
                  placeholder="Enter number of admins"
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue('admins', value);
                    setAdminInputBoxChecked(value !== '');
                    setAdminError(false);
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.admins)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="admins_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Admins"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={adminInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setAdminInputChecked(isChecked);
                          field.onChange(isChecked);
                          setAdminError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {adminError && <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Admin data cannot be empty</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="teachers"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Teachers"
                  placeholder="Enter number of teachers"
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== '') {
                      setTeachersInputBoxChecked(true);
                      setTeachersError(false);
                    } else {
                      setTeachersInputBoxChecked(false);
                    }
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.teachers)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="teachers_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Teachers"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={teachersInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setTeachersInputChecked(isChecked);
                          field.onChange(isChecked);
                          setTeachersError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {teachersError && (
                <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Teacher data cannot be empty</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="batches"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Batches"
                  placeholder="Enter number of batches"
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== '') {
                      setBatchesInputBoxChecked(true);
                      setBatchesError(false);
                    } else {
                      setBatchesInputBoxChecked(false);
                    }
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.batches)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="batches_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Batches"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={batchesInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setBatchesInputChecked(isChecked);
                          field.onChange(isChecked);
                          setBatchesError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {batchesError && <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Batch data cannot be empty</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="courses"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Courses"
                  placeholder="Enter number of courses"
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== '') {
                      setCoursesInputBoxChecked(true);
                      setCoursesError(false);
                    } else {
                      setCoursesInputBoxChecked(false);
                    }
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.courses)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="courses_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Courses"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={coursesInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setCoursesInputChecked(isChecked);
                          field.onChange(isChecked);
                          setCoursesError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {coursesError && (
                <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Course data cannot be empty</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="classes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Number of Classes"
                  placeholder="Enter number of classes"
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== '') {
                      setClassesInputBoxChecked(true);
                      setClassesError(false);
                    } else {
                      setClassesInputBoxChecked(false);
                    }
                  }}
                  disabled={false}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onWheel={(e) => e.target.blur()}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }
                  }}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:focus-within': {
                      transform: 'scale(1.05)'
                    },
                    '& .MuiInputBase-input': {
                      color: '#000',
                      padding: '8px 0px',
                      fontSize: '1rem'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#FF6D00'
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
                    },
                    '&:hover .MuiInput-underline:before': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: '2px solid #FF6D00'
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9E9E9E',
                      opacity: '1',
                      fontSize: '1rem'
                    }
                  }}
                  error={Boolean(errors.classes)}
                />
              )}
            />

            <FormControl sx={{ mt: 2 }}>
              <Controller
                name="classes_checkbox"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for Unlimited Classes"
                    sx={{
                      color: '#333',
                      fontSize: '1rem',
                      fontWeight: '500',
                      '&:hover': {
                        color: '#FF6D00'
                      }
                    }}
                    control={
                      <Checkbox
                        {...field}
                        checked={classesInputChecked}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setClassesInputChecked(isChecked);
                          field.onChange(isChecked);
                          setClassesError(false);
                        }}
                        sx={{
                          color: '#FF9800',
                          '&.Mui-checked': {
                            color: '#E65100',
                            transform: 'scale(1.1)',
                            transition: '0.2s'
                          }
                        }}
                      />
                    }
                  />
                )}
              />
              {classesError && <Typography sx={{ color: 'error.main', fontSize: '0.85rem', mt: 1 }}>Class data cannot be empty</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditPlan;
