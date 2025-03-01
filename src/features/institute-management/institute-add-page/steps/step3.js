import { Grid, Typography, InputAdornment, Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useEffect, useState } from 'react';

const FormStep3SocialLinks = (props) => {
  const { handleSocialSubmit, handleBack, onSubmit, CustomTextField, socialControl, socialErrors, steps, socialReset } = props;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('social_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      socialReset(parsedData);
    }
  }, [socialReset]);

  const handleFormChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('social_form', JSON.stringify(updatedData));
      return updatedData;
    });
  };
  return (
    <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[2].title}
          </Typography>
          <Typography variant="caption" component="p">
            {steps[2].subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="twitter"
            control={socialControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.twitter}
                label="Twitter"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('twitter', e.target.value);
                }}
                error={Boolean(socialErrors.twitter)}
                placeholder="https://twitter.com/carterLeonard"
                aria-describedby="stepper-linear-social-twitter"
                {...(socialErrors.twitter && { helperText: 'This field is required' })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <XIcon sx={{ mr: '5px' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="facebook"
            control={socialControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.facebook}
                label="Facebook"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('facebook', e.target.value);
                }}
                error={Boolean(socialErrors.facebook)}
                placeholder="https://facebook.com/carterLeonard"
                aria-describedby="stepper-linear-social-facebook"
                {...(socialErrors.facebook && { helperText: 'This field is required' })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <FacebookIcon sx={{ mr: '5px' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="instagram"
            control={socialControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.instagram}
                label="Instagram"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('instagram', e.target.value);
                }}
                error={Boolean(socialErrors.instagram)}
                aria-describedby="stepper-linear-social-instagram"
                placeholder="https://plus.instagram.com/carterLeonard"
                {...(socialErrors.instagram && { helperText: 'This field is required' })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <InstagramIcon sx={{ mr: '5px' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="linkedIn"
            control={socialControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.linkedIn}
                label="LinkedIn"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('linkedIn', e.target.value);
                }}
                error={Boolean(socialErrors.linkedIn)}
                placeholder="https://linkedin.com/carterLeonard"
                aria-describedby="stepper-linear-social-linkedIn"
                {...(socialErrors.linkedIn && { helperText: 'This field is required' })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <LinkedInIcon sx={{ mr: '5px' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="pinterest"
            control={socialControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.pinterest}
                label="pinterest"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('pinterest', e.target.value);
                }}
                error={Boolean(socialErrors.pinterest)}
                placeholder="https://pinterest.com/carterLeonard"
                aria-describedby="stepper-linear-social-pinterest"
                {...(socialErrors.pinterest && { helperText: 'This field is required' })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <PinterestIcon sx={{ mr: '5px' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="tonal" color="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormStep3SocialLinks;
