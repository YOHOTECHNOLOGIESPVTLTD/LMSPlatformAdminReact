import { Grid, Typography, Button, TextField, InputAdornment, IconButton, MenuItem, Paper } from '@mui/material';
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
import { selectCitiesForFormB, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import {  loadCitiesForFormB, loadCountries, loadStates } from 'features/cities/redux/locationThunks';

const FormStep5AccountInfo = (props) => {
  const { handleAccountSubmit, onSubmit, accountControl, accountErrors, steps, handleBack, hanldeProfileImageChange, accountReset } = props;
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const states = useSelector(selectStates);
  const cities = useSelector(selectCitiesForFormB);
  const [selectedCountryCode, setSelectedCountryCode] = useState('IN'); // Default to India
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  // const [selectedCountryPhone, setSelectedCountryPhone] = useState('');

  const defaultCountry = countries.find((item) => item.iso2 === 'IN');

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountryCode) {
      dispatch(loadStates(selectedCountryCode));
    }
  }, [selectedCountryCode]);


  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountryCode(countryCode);
    setSelectedStateCode('');
    setSelectedCityId('');
  };
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedState = states.find((state) => state.iso2 === stateCode);

    if (selectedState) {
      handleFormChange('state', selectedState.name);
      dispatch(loadCitiesForFormB(selectedCountryCode, stateCode));
    }
  };
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('acc_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      accountReset(parsedData);
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
    <form key={5} onSubmit={handleAccountSubmit(onSubmit)}>
      <Grid container spacing={5}>
        {/* Step Title */}
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[4].title}
          </Typography>
          <Typography variant="caption" component="p">
            {steps[4].subtitle}
          </Typography>
        </Grid>

        {/* Group 1: Branch Details */}
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Branch Details
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Branch Name */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="branch_name"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value || formData.branch_name}
                        label="Branch Name"
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
                              <AccountCircleIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || formData.phone}
                        label="Phone"
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
                              <PhoneIcon sx={{ color: '#3B4056' }} />+{defaultCountry ? defaultCountry.phonecode : ''}
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
                        }}
                      />
                    )}
                  />
                </Grid>
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
                              <PhoneIcon sx={{ color: '#3B4056' }} />+{defaultCountry ? defaultCountry.phonecode : ''}
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
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value || formData.address1}
                        label="Address Line 1"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('address1', e.target.value);
                        }}
                        placeholder="e.g. 123 Main St"
                        error={Boolean(accountErrors.address1)}
                        helperText={accountErrors.address1 && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || formData.address2}
                        label="Address Line 2"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('address2', e.target.value);
                        }}
                        placeholder="e.g. Suite 101"
                        error={Boolean(accountErrors.address2)}
                        helperText={accountErrors.address2 && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Country */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="country"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        disabled
                        value={value || selectedCountryCode}
                        label="Country"
                        onChange={(e) => {
                          onChange(e);
                          handleCountryChange(e);
                        }}
                        error={Boolean(accountErrors.country)}
                        helperText={accountErrors.country && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || selectedStateCode}
                        label="State"
                        onChange={(e) => {
                          onChange(e);
                          handleStateChange(e);
                        }}
                        error={Boolean(accountErrors.state)}
                        helperText={accountErrors.state && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || selectedCityId}
                        label="City"
                        onChange={(e) => {
                          onChange(e);
                          handleCityChange(e);
                        }}
                        error={Boolean(accountErrors.city)}
                        helperText={accountErrors.city && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value || formData.pincode}
                        label="Pincode"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('pincode', e.target.value);
                        }}
                        placeholder="e.g. 123456"
                        error={Boolean(accountErrors.pincode)}
                        helperText={accountErrors.pincode && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 2: Account Details */}
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Contact Details
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
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
                        value={value || formData.first_name}
                        label="First Name"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('first_name', e.target.value);
                        }}
                        placeholder="e.g. John"
                        error={Boolean(accountErrors.first_name)}
                        helperText={accountErrors.first_name && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || formData.last_name}
                        label="Last Name"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('last_name', e.target.value);
                        }}
                        placeholder="e.g. Doe"
                        error={Boolean(accountErrors.last_name)}
                        helperText={accountErrors.last_name && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || formData.email}
                        label="Email"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('email', e.target.value);
                        }}
                        placeholder="e.g. john.doe@example.com"
                        error={Boolean(accountErrors.email)}
                        helperText={accountErrors.email && 'This field is required'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
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
                        value={value || formData.phone_number}
                        label="Phone Number"
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
                              <PhoneIcon sx={{ color: '#3B4056' }} />+{defaultCountry ? defaultCountry.phonecode : ''}
                            </InputAdornment>
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Profile Image */}
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
                          ),
                          sx: { backgroundColor: '#f5f5f5' }
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Navigation Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormStep5AccountInfo;
