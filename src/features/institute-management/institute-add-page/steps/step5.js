import { Grid, Typography, Button, TextField, InputAdornment, IconButton, MenuItem, Paper, Divider } from '@mui/material';
import { Controller } from 'react-hook-form';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { imagePlaceholder } from 'lib/placeholders';
import { getImageUrl } from 'themes/imageUtlis';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCities, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import { loadCities, loadCountries, loadStates } from 'features/cities/redux/locationThunks';

const FormStep5AccountInfo = (props) => {
  const { handleAccountSubmit, onSubmit, accountControl, accountErrors, steps, handleBack, hanldeProfileImageChange, accountReset } = props;
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const states = useSelector(selectStates);
  const cities = useSelector(selectCities);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCountryPhone, setSelectedCountryPhone] = useState('');
  const defaultCountry = countries.filter((item) => item.iso2 === 'IN');

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    const defaultCountryCode = defaultCountry.length ? defaultCountry[0].iso2 : '';
    if (defaultCountryCode) {
      setSelectedCountryCode(defaultCountryCode);
      dispatch(loadStates(defaultCountryCode));
    }
  }, [countries]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountryCode(countryCode);
    dispatch(loadStates(countryCode));

    countries.filter((item) => {
      if (item.iso2 === countryCode) {
        setSelectedCountryPhone(item.phonecode);
      }
    });
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (selectedCountryCode) {
      dispatch(loadCities(selectedCountryCode, stateCode));
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log('Selected city ID:', cityId);
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('acc_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      accountReset(parsedData, { keepErrors: true, shouldValidate: true });
    }
  }, [accountReset]);

  const handleFormChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('acc_form', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
      <Grid container spacing={5}>
        {/* Step Title */}
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ fontWeight: 600, color: 'text.primary', textAlign: 'center' }}>
            {steps[4].title}
          </Typography>
          <Typography variant="body2" display={10} component="p" sx={{ my: 1, textAlign: 'center' }}>
            {steps[4].subtitle}
          </Typography>
        </Grid>
        <Divider sx={{ borderBottomWidth: 2, borderColor: 'primary.main' }} />

        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Branch Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="branch_name"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Branch Name"
                          value={value || formData.branchName}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('branch_name', e.target.value);
                          }}
                          placeholder="e.g. Carter Branch"
                          error={Boolean(accountErrors.branch_name)}
                          helperText={accountErrors.branch_name && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="phone"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Phone"
                          value={value || formData.phone}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('phone', e.target.value);
                          }}
                          placeholder="e.g. 123-456-7890"
                          error={Boolean(accountErrors.phone)}
                          helperText={accountErrors.phone && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon />+{defaultCountry.length ? defaultCountry[0].phonecode : selectedCountryPhone}
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Alternate Phone */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="alternate_phone"
                      control={accountControl}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Alternate Phone"
                          value={value || formData.alt_phone}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('alternate_phone', e.target.value);
                          }}
                          placeholder="e.g. 987-654-3210"
                          error={Boolean(accountErrors.alternate_phone)}
                          helperText={accountErrors.alternate_phone && 'Alternate Phone Number is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon />+{defaultCountry.length ? defaultCountry[0].phonecode : selectedCountryPhone}
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Address Line 1 */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="address1"
                      control={accountControl}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Address Line 1"
                          value={value || formData.address1}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('address1', e.target.value);
                          }}
                          placeholder="e.g. 123 Main St"
                          error={Boolean(accountErrors.address1)}
                          helperText={accountErrors.address1 && 'Address line one is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Address Line 2 */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="address2"
                      control={accountControl}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Address Line 2"
                          value={value || formData.address2}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('address2', e.target.value);
                          }}
                          placeholder="e.g. Suite 101"
                          error={Boolean(accountErrors.address2)}
                          helperText={accountErrors.address2 && 'Address Line 2 is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Country */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="County"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          select
                          disabled
                          value={value || selectedCountryCode ? selectedCountryCode : defaultCountry.length ? defaultCountry[0].iso2 : ''}
                          label="Country"
                          defaultValue={defaultCountry.length ? defaultCountry[0].name : ''}
                          onChange={(e) => {
                            onChange(e);
                            handleCountryChange(e);
                          }}
                          placeholder="Enter state"
                          sx={{ backgroundColor: accountErrors['state'] ? '#FFFFFF' : '#f5f5f5' }}
                          error={Boolean(accountErrors.state)}
                          aria-describedby="stepper-linear-personal-state-helper"
                          {...(accountErrors.state && { helperText: accountErrors?.state?.message })}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{ color: '#3B4056' }} />
                              </InputAdornment>
                            )
                          }}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.iso2} value={country.iso2}>
                              (+{country.phonecode}) {country.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="state"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          select
                          value={value}
                          label="State"
                          onChange={(e) => {
                            onChange(e);
                            handleStateChange(e);
                          }}
                          placeholder="Enter state"
                          sx={{ backgroundColor: accountErrors['state'] ? '#FFFFFF' : '#f5f5f5' }}
                          error={Boolean(accountErrors.state)}
                          aria-describedby="stepper-linear-personal-state-helper"
                          {...(accountErrors && { helperText: accountErrors?.state?.message })}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{ color: '#3B4056' }} />
                              </InputAdornment>
                            )
                          }}
                        >
                          {states.map((state) => (
                            <MenuItem key={state.iso2} value={state.iso2}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* City */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="city"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          select
                          value={value}
                          label="City"
                          onChange={(e) => {
                            onChange(e);
                            handleCityChange(e);
                          }}
                          placeholder="Enter city"
                          sx={{ backgroundColor: accountErrors['city'] ? '#FFFFFF' : '#f5f5f5' }}
                          error={Boolean(accountErrors.city)}
                          aria-describedby="stepper-linear-personal-city-helper"
                          {...(accountErrors.city && { helperText: accountErrors?.city?.message })}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{ color: '#3B4056' }} />
                              </InputAdornment>
                            )
                          }}
                        >
                          {cities.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                              {city.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Pincode */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="pincode"
                      control={accountControl}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Pincode"
                          value={value || formData.pincode}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('pincode', e.target.value);
                          }}
                          placeholder="e.g. 90001"
                          error={Boolean(accountErrors.pincode)}
                          helperText={accountErrors.pincode && 'Pin code is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Group 2: Account Details */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Grid container spacing={4}>
              {/* Left Side: Group Name */}
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Account Details
                </Typography>
              </Grid>

              {/* Right Side: Fields */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="first_name"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="First Name"
                          value={value || formData.firstName}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('first_name', e.target.value);
                          }}
                          placeholder="e.g. Carter"
                          error={Boolean(accountErrors.first_name)}
                          helperText={accountErrors.first_name && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="last_name"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={value || formData.lastName}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('last_name', e.target.value);
                          }}
                          placeholder="e.g. Leonard"
                          error={Boolean(accountErrors.last_name)}
                          helperText={accountErrors.last_name && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          type="email"
                          label="Email"
                          value={value || formData.email}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('email', e.target.value);
                          }}
                          placeholder="e.g. carterleonard@gmail.com"
                          error={Boolean(accountErrors.email)}
                          helperText={accountErrors.email && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="phone_number"
                      control={accountControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          type="tel"
                          label="Phone Number"
                          value={value || formData.phn}
                          onChange={(e) => {
                            onChange(e);
                            handleFormChange('phone_number', e.target.value);
                          }}
                          placeholder="e.g. 123-456-7890"
                          error={Boolean(accountErrors.phone_number)}
                          helperText={accountErrors.phone_number && 'This field is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Image */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="image"
                      control={accountControl}
                      render={({ field: { value } }) => (
                        <TextField
                          fullWidth
                          type="file"
                          label="Profile Image"
                          onChange={hanldeProfileImageChange}
                          error={Boolean(accountErrors.image)}
                          helperText={accountErrors.image && 'Profile image is required'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton component="label">
                                  <img
                                    src={value ? getImageUrl(value) : imagePlaceholder}
                                    alt="Profile Preview"
                                    style={{ width: '24px', height: '24px' }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          aria-describedby="stepper-linear-account-image"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back{' '}
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              localStorage.removeItem('institute_form');
              localStorage.removeItem('social_form');
              localStorage.removeItem('docs_form');
              localStorage.removeItem('acc_form');
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormStep5AccountInfo;
