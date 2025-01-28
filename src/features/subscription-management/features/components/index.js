import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card } from '@mui/material';
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
  const { showSpinnerFn, hideSpinnerFn } = useSpinner()
  const navigate = useNavigate()

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

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));
  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));
  const onSubmit = async (data) => {
    if (studentInputBoxChecked === false && studentInputChecked === false) {
      setStudentError(true);
    }
    if (adminInputBoxChecked === false && adminInputChecked === false) {
      setAdminError(true);
    }
    if (teachersInputBoxChecked === false && teachersInputChecked === false) {
      setTeachersError(true);
    }
    if (batchesInputBoxChecked === false && batchesInputChecked === false) {
      setBatchesError(true);
    }
    if (coursesInputBoxChecked === false && coursesInputChecked === false) {
      setCoursesError(true);
    }
    if (classesInputBoxChecked === false && classesInputChecked === false) {
      setClassesError(true);
    }
    const subscription_data = {
      identity : data?.plan_name,
      image : selectedImage,
      description : data?.description,
      features : [
        {feature : "Admins",count : data?.admins },
        {feature : "Students", count : data?.students },
        {feature : "Teachers", count : data?.teachers },
        { feature : "Batches", count : data?.batches },
        { feature : "Courses", count : data?.courses }
      ],
      duration : {value:data?.plan_duration,unit:data?.plan_duration_type},
      price : data.plan_price
    }
    const log = studentInputChecked === true ?'1':''
    console.log('subData', log);
   
    try {
      showSpinnerFn()
      const result = await addSubscriptionFeature(subscription_data);
      toast.success(result.message);
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error?.message)
    }finally{
      hideSpinnerFn()
    }    
  };

  const handleInputImageChange = async (file) => {
    try {
      showSpinnerFn()
      const { files } = file.target;
      const data = new FormData()
      data.append("file",files[0])
      const response = await handleFileUpload(data)
      setSelectedImage(response.data.data.file)
      setImgSrc(response.data.data.file)
      toast.success("Subscription image uploaded successfully")
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hideSpinnerFn()
    }
   
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: defaultValues,
    //  resolver : yupResolver(new_plan_schema) 
    });

  return (
    <Box p={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: "30px" }}>
              <Card sx={{ display: 'flex', flexDirection: "column", alignItems: "center", boxShadow: 3, 
              transition: 'box-shadow 0.3s ease-in-out', padding: "30px",
              ':hover': {
                boxShadow: 6, // Increase the shadow level on hover
              },}}
              >
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                  Upload Profile picture
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <Typography sx={{ mt: 4, color: 'text.disabled', justifyContent: 'center', display: 'flex' }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
                </Card>
                {
                  imgSrc &&
                  <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: "5px"}}>
                  <ImgStyled  src={getImageUrl(imgSrc)} alt="Profile Pic" />
                  <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                </Box>
                }
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Controller
            name="plan_name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Plan Name"
                sx={{
                  "& .MuiInputBase-input": {
                    border: "2px solid #a9a9a9", 
                    borderRadius: "4px",
                    padding: "10px",
                    backgroundColor: "white",
                    color: "#000", 
                  },
                  "& .MuiInputLabel-root": {
                    color: "#333", 
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#9e9e9e", 
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#d32f2f",
                  },
                  "& .MuiFormControl-root": {
                    marginTop: "10px", 
                  },
                }}
                onChange={onChange}
                inputProps={{ maxLength: 18, placeholder: "Enter plan name here" }} 
                error={Boolean(errors.plan_name)}
                aria-describedby="validation-basic-first-name"
                {...(errors.plan_name && { helperText: 'This field is required' })}
              />
            )}
          />

          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_price"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label="Plan Price"
                  onChange={onChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", 
                      padding: "10px",
                      backgroundColor: "white",
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333",
                      backgroundColor: "white" 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  error={Boolean(errors.plan_price)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.plan_price && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="support_level"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="months"
                  label="Support Level"
                  SelectProps={{
                    value: value,
                    onChange: (e) => onChange(e)
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px",
                      padding: "10px",
                      backgroundColor: "white",
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} >
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
                  sx={{
                    backgroundColor: "white",
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px",
                      padding: "10px", 
                      backgroundColor: "white", 
                      color: "#000", 
                      ":focused" : {
                           backgroundColor: "white"
                      },
                      ":hover" : {
                        backgroundColor: "white"
                      }
                    },
                    "& .MuiInputBase-root.Mui-focused" : {
                          boxShadow : "none",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    ":focus": {
                      boxShadow: "none",
                      backgroundColor: "white"
                    }
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  error={Boolean(errors.textarea)}
                  // aria-describedby="validation-basic-textarea"
                  {...(errors.textarea && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_duration"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  value={value}
                  label="Duration"
                  onChange={onChange}
                  placeholder="120"
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", 
                      padding: "10px",
                      backgroundColor: "white", 
                      color: "#000", 
                    },
                    '& .MuiInputBase-multiline' : {
                         backgroundColor: "white" 
                    },
                    '& .MuiFilledInput-root' : {
                      backgroundColor: "white"
                    },
                    "& .css-13giocf-MuiInputBase-root-MuiFilledInput-root" : {
                      backgroundColor: 'white'
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  error={Boolean(errors.plan_duration)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.plan_duration && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="plan_duration_type"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="days"
                  label="Duration Type"
                  SelectProps={{
                    value: value,
                    onChange: (e) => onChange(e)
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", 
                      padding: "10px",
                      backgroundColor: "white", 
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="day">Days</MenuItem>
                  <MenuItem value="monthly">Months</MenuItem>
                  <MenuItem value="yearly">Year</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Controller
              name="students"
              control={control}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  value={value}
                  label="Number of Students"
                  onChange={(e) => {
                    setValue('students', e.target.value);
                    if (e.target.value !== '') {
                      setStudentInputBoxChecked(true);
                      setStudentError(false);
                    } else {
                      setStudentInputBoxChecked(false);
                    }
                  }}
                  placeholder="Enter number of students"
                  inputProps={{ maxLength: 5, min: 0 }}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px",
                      padding: "10px",
                      backgroundColor: "white", 
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  error={Boolean(errors.students)}
                  aria-describedby="validation-students"
                  disabled={studentInputBoxChecked}
                />
              )}
            />
            <FormControl>
              <Controller
                name="students_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited users"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => {
                          // setStudentError(false);
                          // setStudentInputChecked((state) => !state);
                          console.log(setStudentInputChecked)
                        }}
                        disabled={studentInputBoxChecked}
                      />
                    }
                  />
                )}
              />
             
              {studentError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Student data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="admins"
              control={control}
              // rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Admins"
                  onChange={(e) => {
                    setValue('admins', e.target.value);
                    if (e.target.value !== '') {
                      setAdminInputBoxChecked(true);
                      setAdminError(false);
                    } else {
                      setAdminInputBoxChecked(false);
                    }
                  }}
                  placeholder="Enter number of admins"
                  inputProps={{ maxLength: 5, min: 0 }}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", // Rounded corners
                      padding: "10px", // Custom padding
                      backgroundColor: 'white',
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  // error={Boolean(errors.admins)}
                  aria-describedby="validation-basic-first-name"
                  disabled={adminInputChecked}
                  // {...(errors.admins && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="admins_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited admins"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    disabled={adminInputBoxChecked}
                    control={
                      <Checkbox
                        {...field}
                        onChange={() => {
                          setAdminError(false);
                          setAdminInputChecked((state) => !state);
                        }}
                        name="validation-basic-checkbox"
                        sx={ { color: errors.checkbox ? 'error.main'  : null, "& .MuiButtonBase-root-MuiCheckbox-root" : { color: "black"} }}
                      />
                    }
                  />
                )}
              />
              {adminError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Admin data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="teachers"
              control={control}
              // rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Teachers"
                  onChange={(e) => {
                    setValue('teachers', e.target.value);
                    if (e.target.value !== '') {
                      setTeachersInputBoxChecked(true);
                      setTeachersError(false);
                    } else {
                      setTeachersInputBoxChecked(false);
                    }
                  }}
                  disabled={teachersInputChecked}
                  placeholder="Enter number of teachers"
                  inputProps={{ maxLength: 5, min: 0 }}
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", // Rounded corners
                      padding: "10px", // Custom padding
                       backgroundColor: "white",
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  error={Boolean(errors.teachers)}
                  aria-describedby="validation-basic-first-name"
                  // {...(errors.teachers && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="teachers_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited teachers"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}

                        name="validation-basic-checkbox"
                        onChange={() => {
                          setTeachersError(false);
                          setTeachersInputChecked((state) => !state);
                        }}
                        disabled={teachersInputBoxChecked}
                        sx={{"& .MuiCheckbox-root.Mui-checked":{border: "1px solid #a9a9a9"}}}
                      />
                    }
                  />
                )}
              />
             
              {teachersError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Teacher data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="batches"
              control={control}
              // rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Batches"
                  onChange={(e) => {
                    setValue('batches', e.target.value);
                    if (e.target.value !== '') {
                      setBatchesInputBoxChecked(true);
                      setBatchesError(false);
                    } else {
                      setBatchesInputBoxChecked(false);
                    }
                  }}
                  disabled={batchesInputChecked}
                  placeholder="Enter number of batches"
                  inputProps={{ maxLength: 5, min: 0 }}

                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", // Rounded corners
                      padding: "10px", // Custom padding
                      backgroundColor: "white", 
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  // error={Boolean(errors.batches)}
                  aria-describedby="validation-basic-first-name"
                  // {...(errors.batches && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="batches_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited batches"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => {
                          setBatchesError(false);
                          setBatchesInputChecked((state) => !state);
                        }}
                        disabled={batchesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              
              {batchesError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Teacher data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="courses"
              control={control}
              // rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Courses"
                  onChange={(e) => {
                    setValue('courses', e.target.value);
                    if (e.target.value !== '') {
                      setCoursesInputBoxChecked(true);
                      setCoursesError(false);
                    } else {
                      setCoursesInputBoxChecked(false);
                    }
                  }}
                  disabled={coursesInputChecked}
                  placeholder="Enter number of courses"
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", // Rounded corners
                      padding: "10px", // Custom padding
                      backgroundColor: 'white',
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  inputProps={{ maxLength: 5, min: 0 }}
                  // error={Boolean(errors.courses)}
                  aria-describedby="validation-basic-first-name"
                  // {...(errors.courses && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited courses"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => {
                          setCoursesInputChecked((state) => !state);
                          setCoursesError(false);
                        }}
                        disabled={coursesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {coursesError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Course data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="classes"
              control={control}
              // rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Classes"
                  placeholder="Enter number of classes"
                  sx={{
                    "& .MuiInputBase-input": {
                      border: "2px solid #a9a9a9", 
                      borderRadius: "4px", // Rounded corners
                      padding: "10px", // Custom padding
                      backgroundColor: "white",
                      color: "#000", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "#333", 
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9e9e9e", 
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#d32f2f",
                    },
                    "& .MuiFormControl-root": {
                      marginTop: "10px", 
                    },
                  }}
                  inputProps={{ maxLength: 5, min: 0 }}
                  onChange={(e) => {
                    setValue('classes', e.target.value);
                    if (e.target.value !== '') {
                      setClassesInputBoxChecked(true);
                      setClassesError(false);
                    } else {
                      setClassesInputBoxChecked(false);
                    }
                  }}
                  disabled={classesInputChecked}
                  // error={Boolean(errors.classes)}
                  aria-describedby="validation-basic-first-name"
                  // {...(errors.classes && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited classes"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={
                      <Checkbox
                        {...field}
                        name="validation-basic-checkbox"
                        sx={errors.checkbox ? { color: 'error.main' } : null}
                        onChange={() => {
                          setClassesInputChecked((state) => !state);
                          setClassesError(false);
                        }}
                        disabled={classesInputBoxChecked}
                      />
                    }
                  />
                )}
              />
              {classesError && (
                <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                  Class data cannot be empty
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubscriptionFeatures;
