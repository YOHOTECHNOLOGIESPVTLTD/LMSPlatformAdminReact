// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import Dialog from '@mui/material/Dialog';
import { DialogContent, Grid, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import CustomTextField from 'components/mui/text-field';
import { Controller, useForm } from 'react-hook-form';
import { DialogActions } from '@mui/material';
import { Fragment } from 'react';
import MenuItem from '@mui/material/MenuItem';

const CreatePlan = ({ handleDialogClose, open }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imgSrc, setImgSrc] = useState('https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg');

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
    plan_name:'',
    plan_description:'',
    plan_duration:'',
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setErrorMessage(''); 
    if (!data.plan_name || !data.plan_description || !data.plan_duration) {
      setErrorMessage('All fields are required. Please fill them in.');
      return;
    }
    console.log('subData', data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
  };


  return (
    <Fragment>
      <Dialog onClose={handleDialogClose} aria-labelledby="responsive-dialog-title" open={open}>
        {/* <DialogTitle id="simple-dialog-title">Add New Plan</DialogTitle> */}
        <DialogContent>
        {errorMessage && (
            <Box sx={{ color: 'red', textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
              {errorMessage}
            </Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container xs={12} spacing={3}>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                  name="plan_name"
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
                  name="plan_description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label="Plan Description"
                      error={Boolean(errors.textarea)}
                      aria-describedby="validation-basic-textarea"
                      {...(errors.textarea && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
                      placeholder="120 days"
                      error={Boolean(errors.firstName)}
                      aria-describedby="validation-basic-first-name"
                      {...(errors.firstName && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <Controller
              name="Duration Type"
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
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions className="dialog-actions-dense" sx={{ justifyContent: 'center', display: 'flex' }}>
          <Button variant="tonal" color="error" onClick={handleDialogClose} sx={{ mx: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ mx: 2 }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreatePlan;
