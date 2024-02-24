// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import Dialog from '@mui/material/Dialog';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import CustomTextField from 'components/mui/text-field';
import { Controller, useForm } from 'react-hook-form';
import { DialogActions } from '@mui/material';
import { Fragment } from 'react';

const CreatePlan = ({ handleDialogClose, open }) => {
  // ** States
  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //   imageupload
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);

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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
  };

  return (
    <Fragment>
      {/* <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Selected: {selectedValue}
      </Typography> */}
      <Dialog onClose={handleDialogClose} fullWidth aria-labelledby="responsive-dialog-title" open={open}>
        {/* <DialogTitle id="simple-dialog-title">Add New Plan</DialogTitle> */}
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container xs={12} spacing={3}>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
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
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="name_of_plan"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Plan Name"
                      onChange={onChange}
                      placeholder="Basic Plan"
                      error={Boolean(errors.firstName)}
                      aria-describedby="validation-basic-first-name"
                      {...(errors.firstName && { helperText: 'This field is required' })}
                    />
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
                      multiline
                      {...field}
                      label="About Plan"
                      error={Boolean(errors.textarea)}
                      aria-describedby="validation-basic-textarea"
                      {...(errors.textarea && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="duration"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Duration"
                      onChange={onChange}
                      placeholder="120 days"
                      error={Boolean(errors.firstName)}
                      aria-describedby="validation-basic-first-name"
                      {...(errors.firstName && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions className="dialog-actions-dense" >
          <Button variant="contained" color="error" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreatePlan;
