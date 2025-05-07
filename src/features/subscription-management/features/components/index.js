import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { IconButton } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
// import * as yup from "yup"

import CustomTextField from 'components/mui/text-field';

import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { addSubscriptionFeature } from '../services/subscriptionFeaturesServices';
import { handleFileUpload } from 'features/fileUpload';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useSpinner } from 'context/spinnerContext';
import { getImageUrl } from 'themes/imageUtlis';

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

// const new_plan_schema = yup.object().shape({
//   plan_name : yup.string().required("plan name is required"),
//   price : yup.number().required("plan price is required"),
//   support_level : yup.string().required("support is required"),
//   description : yup.string().required("description is required"),
//   duration : yup.number().required("duration is required"),

// })

const SubscriptionFeatures = () => {
  // const [customFields, setCustomFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleAddField = () => {
  //   setCustomFields([...customFields, { id: Date.now(), name: "", value: "" }]);
  // };

  // const handleRemoveField = (id) => {
  //   setCustomFields(customFields.filter((field) => field.id !== id));
  // };

  // const handleFieldChange = (id, key, value) => {
  //   setCustomFields((prevFields) =>
  //     prevFields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
  //   );
  // };

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

  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const { showSpinnerFn, hideSpinnerFn } = useSpinner();
  const navigate = useNavigate();

  const handleInputImageReset = () => {
    setSelectedImage('');
    setImgSrc('');
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 200,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  // const ButtonStyled = styled(Button)(({ theme }) => ({
  //   [theme.breakpoints.down('sm')]: {
  //     width: '100%',
  //     textAlign: 'center'
  //   }
  // }));
  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));
  const onSubmit = async (eventOrData, data) => {
    // Check if the first argument is an event
    if (eventOrData?.preventDefault) {
      eventOrData.preventDefault();
    }

    const formData = eventOrData?.target ? data : eventOrData; // Handle different call types
    console.log(isSubmitting, 'is');
    // if (isSubmitting) return;
    setIsSubmitting(true);

    console.log(
      !studentInputBoxChecked && !studentInputChecked,
      !adminInputBoxChecked && !adminInputChecked,
      !teachersInputBoxChecked && !teachersInputChecked,
      !batchesInputBoxChecked && !batchesInputChecked,
      !coursesInputBoxChecked && !coursesInputChecked,
      !classesInputBoxChecked && !classesInputChecked
    );

    // Error Handling for Required Fields
    if (!studentInputBoxChecked && !studentInputChecked) setStudentError(true);
    if (!adminInputBoxChecked && !adminInputChecked) setAdminError(true);
    if (!teachersInputBoxChecked && !teachersInputChecked) setTeachersError(true);
    if (!batchesInputBoxChecked && !batchesInputChecked) setBatchesError(true);
    if (!coursesInputBoxChecked && !coursesInputChecked) setCoursesError(true);
    if (!classesInputBoxChecked && !classesInputChecked) setClassesError(true);

    const allFeatures = [
      { feature: 'Admins', count: formData?.admins },
      { feature: 'Students', count: formData?.students },
      { feature: 'Teachers', count: formData?.teachers },
      { feature: 'Batches', count: formData?.batches },
      { feature: 'Courses', count: formData?.courses },
      { feature: 'Classes', count: formData?.classes }
      // ...customFields.map((field) => ({
      //   feature: field.name,
      //   count: field.value,
      // })),
    ];

    const subscription_data = {
      identity: formData?.plan_name,
      image: selectedImage,
      description: formData?.description,
      features: allFeatures,
      duration: { value: formData?.plan_duration, unit: formData?.plan_duration_type },
      price: formData.plan_price
    };

    console.log('subData :', subscription_data);

    try {
      showSpinnerFn();
      const result = await addSubscriptionFeature(subscription_data);
      toast.success(result.message);
      navigate(-1);
    } catch (error) {
      if (error?.message.includes('E11000 duplicate key error')) {
        toast.error(`A plan with the name "${formData.plan_name}" already exists. Choose a different name.`);
      } else {
        toast.error(error?.message || 'Something went wrong.');
      }
    } finally {
      hideSpinnerFn();
      setIsSubmitting(false);
      console.log('Process Completed');
    }
  };

  const handleInputImageChange = async (file) => {
    try {
      showSpinnerFn();
      const { files } = file.target;
      const data = new FormData();
      data.append('file', files[0]);
      const response = await handleFileUpload(data);
      setSelectedImage(response.data.data.file);
      setImgSrc(response.data.data.file);
      toast.success('Subscription image uploaded successfully');
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinnerFn();
    }
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues
    //  resolver : yupResolver(new_plan_schema)
  });
  console.log(errors, 'errors');
  return (
    <Box p={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 180,
                  height: 180,
                  border: '2px dashed #1976d2',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: '#f9f9f9',
                  position: 'relative',
                  overflow: 'hidden',
                  ':hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#1565c0',
                    boxShadow: 3,
                    transform: 'scale(1.05)'
                  },
                  ':focus-within': {
                    transform: 'scale(1.1)'
                  },
                  padding: 2
                }}
                component="label"
                htmlFor="account-settings-upload-image"
              >
                {!imgSrc ? (
                  <>
                    <Typography variant="h1" color="#1976d2" fontWeight="Normal" fontSize="5rem">
                      +
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: '500' }}>
                      Upload Profile Picture
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      PNG or JPEG (Max 800K)
                    </Typography>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <ImgStyled
                      src={getImageUrl(imgSrc)}
                      alt="Profile Pic"
                      sx={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        boxShadow: 2
                      }}
                    />
                    <ResetButtonStyled
                      color="error"
                      variant="contained"
                      onClick={handleInputImageReset}
                      sx={{
                        fontSize: '0.75rem',
                        padding: '4px 8px'
                      }}
                    >
                      Reset
                    </ResetButtonStyled>
                  </Box>
                )}
                <input
                  hidden
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleInputImageChange}
                  id="account-settings-upload-image"
                />
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

          {/* {customFields.map((field) => (
  <Grid container item xs={12} spacing={2} key={field.id} sx={{ position: "relative", paddingTop: 2 }}>
    
    <IconButton
      color="error"
      onClick={() => handleRemoveField(field.id)}
      sx={{
        position: "absolute",
        right: -30, 
        top: 0,
        zIndex: 10,
      }}
    >
      <RemoveCircleIcon />
    </IconButton>

    <Grid container item xs={12} spacing={2} alignItems="center">
      
      <Grid item xs={6}>
        <Controller
          name={`field_name_${field.id}`}
          control={control}
          render={({ field: nameField }) => (
            <TextField
              {...nameField}
              fullWidth
              label="Field Name"
              placeholder="Enter Field Name"
              onChange={(e) => {
                nameField.onChange(e);
                handleFieldChange(field.id, "name", e.target.value);
              }}
              variant="standard" 
              InputLabelProps={{
                shrink: true,
                sx: { fontSize: "1.2rem", transition: "all 0.3s ease" },
              }}
              sx={{
                bgcolor: "white", 
                "& .MuiInputBase-root": { bgcolor: "white" },
                "& .MuiInputBase-input": { color: "#000", fontSize: "1rem", padding: "8px 0px" },
                "& .MuiInputLabel-root": { color: "#000", fontWeight: "500", fontSize: "1.2rem" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FF6D00" },
                "& .MuiInput-underline:before": { borderBottom: "2px solid black !important" }, 
                "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #FF6D00 !important" }, 
                "& .MuiInput-underline:after": { borderBottom: "2px solid #FF6D00 !important" }, 
                "& .MuiInputBase-input::placeholder": { color: "#9E9E9E", fontSize: "1rem" },
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name={`field_value_${field.id}`}
          control={control}
          render={({ field: valueField }) => (
            <TextField
              {...valueField}
              fullWidth
              label="Value"
              placeholder="Enter Values"
              onChange={(e) => {
                valueField.onChange(e);
                handleFieldChange(field.id, "value", e.target.value);
              }}
              type="number"
              inputProps={{ maxLength: 5, min: 0 }}
              onWheel={(e) => e.target.blur()} 
              variant="standard" 
              InputLabelProps={{
                shrink: true,
                sx: { fontSize: "1.2rem", transition: "all 0.3s ease" },
              }}
              sx={{
                bgcolor: "white", 
                "& .MuiInputBase-root": { bgcolor: "white" },
                "& .MuiInputBase-input": { color: "#000", fontSize: "1rem", padding: "8px 0px" },
                "& .MuiInputLabel-root": { color: "#000", fontWeight: "500", fontSize: "1.2rem" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FF6D00" },
                "& .MuiInput-underline:before": { borderBottom: "2px solid black !important" }, 
                "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #FF6D00 !important" }, 
                "& .MuiInput-underline:after": { borderBottom: "2px solid #FF6D00 !important" }, 
                "& .MuiInputBase-input::placeholder": { color: "#9E9E9E", fontSize: "1rem" },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  </Grid>
))} */}

          {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleAddField}>
                Add Field
              </Button>
            </Grid> */}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="error" onClick={() => setCustomFields([])} sx={{ mx: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ mx: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubscriptionFeatures;
