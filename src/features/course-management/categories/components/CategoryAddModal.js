import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, Grid, styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addCourseCategory } from '../services/courseCategoryServices';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};
const schema = yup.object().shape({
  course: yup
    .string()
    .min(3, (obj) => showErrors('Course', obj.value.length, obj.min))
    .required()
});

const defaultValues = {
  course: ''
};

const CategoryAddModal = ({ open, handleAddClose }) => {
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
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const branches = [
    { branch_id: '1', branch_name: 'Branch 1' },
    { branch_id: '2', branch_name: 'Branch 2' },
    { branch_id: '3', branch_name: 'Branch 3' }
  ];
  console.log(selectedImage);
  const handleClose = () => {
    setValue('course', '');
    handleAddClose();
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

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('logo', selectedImage);
    bodyFormData.append('course_category_name', data.course);
    bodyFormData.append('branch_id', selectedBranchId);

    const result = await addCourseCategory(bodyFormData);

    if (result.success) {
      reset();
      handleAddClose();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 600 } }}
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
          Add Category Information
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

              <Controller
                name="course"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Course Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.course)}
                    {...(errors.course && { helperText: errors.course.message })}
                  />
                )}
              />
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="select-multiple-chip"
                options={[{ branch_id: 'selectAll', branch_name: 'Select All' }, ...branches]}
                getOptionLabel={(option) => option.branch_name}
                value={selectedBranches}
                onChange={(e, newValue) => {
                  if (newValue && newValue.some((option) => option.branch_id === 'selectAll')) {
                    setSelectedBranches(branches.filter((option) => option.branch_id !== 'selectAll'));
                  } else {
                    setSelectedBranches(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Branches"
                    InputProps={{
                      ...params.InputProps,
                      style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                    }}
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
                    {option.branch_name}
                  </li>
                )}
                renderTags={(value) => (
                  <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {value.map((option, index) => (
                      <CustomChip
                        key={option.branch_id}
                        label={option.branch_name}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          setSelectedBranches(updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))}
                  </div>
                )}
                isOptionEqualToValue={(option, value) => option.branch_id === value.branch_id}
                selectAllText="Select All"
                SelectAllProps={{ sx: { fontWeight: 'bold' } }}
              />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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

export default CategoryAddModal;
