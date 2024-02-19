import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, TextField as CustomTextField, Grid, styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import CourseValidate from 'features/course-management/add-course/components/CourseValidate';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  Course_duration: yup.number().required(),
  course_name: yup.string().required(),
  Course_Price: yup.number().required(),
  description: yup.string().required(),
  course_overview: yup.string().required(),
  Learning_Format: yup.array().min(1, 'Select at least one Learning Format').required(),
  Course_Category: yup.string().required()
});

const defaultValues = {
  Course_duration: '',
  course_name: '',
  Course_Price: '',
  description: '',
  course_overview: '',
  Learning_Format: [],
  Course_Category: ''
};

const groups = [
  { id: '1', name: 'Offline Class' },
  { id: '2', name: 'Online class' },
  { id: '3', name: 'Hybrid' }
];

const CourseEditModal = ({ open, handleEditClose }) => {
  const image =
    'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg=';

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  console.log(selectedImage);
  const handleClose = () => {
    setValue('course', '');
    setValue('status', '');
    handleEditClose();
    reset();
  };

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
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(onSubmit);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit Category Information
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(errors.course_name)}
                      aria-describedby="stepper-linear-personal-course_name"
                      {...(errors.course_name && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Course_duration"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Duration"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.Course_duration)}
                      {...(errors.Course_duration && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Course_Price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Course Price"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.Course_Price)}
                      {...(errors.Course_Price && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Course_Category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      select
                      fullWidth
                      label="Course Category"
                      id="validation-billing-select"
                      error={Boolean(errors.Course_Category)}
                      {...(errors.Course_Category && { helperText: 'This field is required' })}
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="percentage">Percentage</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="Learning_Format"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      id="select-multiple-chip"
                      options={groups}
                      getOptionLabel={(option) => option.name}
                      value={value}
                      onChange={(e, newValue) => {
                        if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                          onChange(groups.filter((option) => option.id !== 'selectAll'));
                        } else {
                          onChange(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Learning Format"
                          error={Boolean(errors.Learning_Format)}
                          {...(errors.Learning_Format && { helperText: errors.Learning_Format.message })}
                        />
                      )}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      renderTags={(value) =>
                        value.map((option, index) => (
                          <CustomChip
                            key={option.id}
                            label={option.name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              onChange(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      selectAllText="Select All"
                      SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_overview"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      label="Course Overview"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.course_overview)}
                      {...(errors.course_overview && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="description"
                  control={control}
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
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <CourseValidate />
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant="tonal" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseEditModal;
