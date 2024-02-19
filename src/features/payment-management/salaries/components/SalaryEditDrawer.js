// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  branch: yup.array().required('Branch is required').min(1, 'Select at least one branch'),
  course: yup.array().required('Course is required').min(1, 'Select at least one course'),
  batch: yup.array().required('Batch is required').min(1, 'Select at least one batch'),
  paymentId: yup.number().typeError('Payment Id must be a number').required('Payment Id is required'),
  paidAmount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required'),
  type: yup.string().required('Type is required'),
  staff: yup.string().required('Staff is required')
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  designation: '',
  fullName: '',
  userName: '',
  role: '',
  contact: Number('')
};

const SalaryEditDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  const handleBranchChange = (event) => {
    setSelectedBranches(event.target.value);
  };

  useEffect(() => {}, []);

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

  const onSubmit = (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
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

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseChange = (newValue) => {
    if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
      setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
    } else {
      setSelectedCourses(newValue);
    }
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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

            <Grid item xs={12} sm={12}>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    select
                    fullWidth
                    label="Branch"
                    id="select-multiple-checkbox"
                    error={Boolean(errors.branch) && !selectedBranches.length} // Render error if field is empty
                    helperText={!selectedBranches.length && errors.branch?.message} // Display error message only if field is empty
                    SelectProps={{
                      MenuProps,
                      multiple: true,
                      value: selectedBranches,
                      onChange: (e) => handleBranchChange(e),
                      renderValue: (selected) => selected.join(', ')
                    }}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={selectedBranches.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    sx={{ mb: 2 }}
                    multiple
                    id="select-multiple-chip"
                    options={courses}
                    getOptionLabel={(option) => option.course_name}
                    value={selectedCourses}
                    onChange={(event, newValue) => handleCourseChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Courses"
                        error={Boolean(errors.course) && !selectedCourses.length}
                        helperText={!selectedCourses.length && errors.course?.message}
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
                        {option.course_name}
                      </li>
                    )}
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <CustomChip
                          key={option.course_id}
                          label={option.course_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCourses(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))
                    }
                    isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    {...field}
                    fullWidth
                    select
                    label="Type"
                    error={Boolean(errors.type)}
                    helperText={errors.type?.message}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Ten">Ten</MenuItem>
                    <MenuItem value="Twenty">Twenty</MenuItem>
                    <MenuItem value="Thirty">Thirty</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="staff"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    {...field}
                    fullWidth
                    select
                    label="Staff"
                    error={Boolean(errors.staff)}
                    helperText={errors.staff?.message}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Ten">Ten</MenuItem>
                    <MenuItem value="Twenty">Twenty</MenuItem>
                    <MenuItem value="Thirty">Thirty</MenuItem>
                  </TextField>
                )}
              />
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

export default SalaryEditDrawer;
