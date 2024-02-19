import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateCourseCategory } from '../services/courseCategoryServices';

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
  category_name: yup
    .string()
    .min(3, (obj) => showErrors('Category Name', obj.value.length, obj.min))
    .required()
});

const CategoryEditModal = ({ open, handleEditClose, category }) => {
  const image =
    'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg=';

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  console.log('selected', selectedImage);
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

  const onSubmit = async (data) => {
    console.log(data);
    const inputData = new FormData();
    inputData.append('id', category?.id);
    inputData.append('logo', selectedImage);
    inputData.append('course_category_name', data?.category_name);

    try {
      const result = await updateCourseCategory(inputData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
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
              <Grid item xs={12} sm={12}>
                <Controller
                  name="category_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      defaultValue={category?.course_category_name}
                      sx={{ mb: 4 }}
                      label="Category Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.course)}
                      {...(errors.course && { helperText: errors.course.message })}
                    />
                  )}
                />
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                  Submit
                </Button>
                <Button variant="tonal" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryEditModal;
