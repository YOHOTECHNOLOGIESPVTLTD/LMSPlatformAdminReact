import { Grid, Typography, InputAdornment, Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import DatePicker from 'react-datepicker';
import './index.css';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { loadCities, loadCountries, loadStates } from 'features/cities/redux/locationThunks';
import { selectCities, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import { useEffect } from 'react';
import { useState } from 'react';

const FormStep1PersonalInfo = ({
  personalControl,
  CustomTextField,
  CustomInput,
  handleBack,
  handlePersonalSubmit,
  onSubmit,
  steps,
  personalErrors,
  plans
}) => {
  console.log(personalErrors, 'personal Errors');

  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const states = useSelector(selectStates);
  const cities = useSelector(selectCities);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCountryPhone, setSelectedCountryPhone] = useState('');
  // const [selectedState, setSelectedState] = useState('');
  // const [loadingCities, setLoadingCities] = useState(false);

  const defaultCountry = countries.filter((item) => item.iso2 === 'IN');
  const defaultStates = states.filter((item) => item.iso2 === 'WB');
  console.log(defaultStates);

  const defaultCity = cities.filter((item) => item.name === 'Gopalpur');
  console.log('defaultCity', defaultCity);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    const defaultCountryCode = defaultCountry.length ? defaultCountry[0].iso2 : '';
    console.log('DCCC', defaultCountryCode);
    if (defaultCountryCode) {
      setSelectedCountryCode(defaultCountryCode);
      dispatch(loadStates(defaultCountryCode));
    }
  }, [countries]);
  // useEffect(() => {
  //   const DSC = defaultStates.length ? defaultStates[0].iso2 : '';
  //   if (DSC) {
  //     setSelectedState(DSC);
  //     setLoadingCities(true);
  //     dispatch(loadCities(selectedCountryCode, DSC)).then(() => {
  //       setLoadingCities(false);
  //     });
  //   }
  // }, [dispatch, selectedCountryCode, states]);
  useEffect(() => {
    if (cities.length > 0) {
      const defaultCity = cities.filter((item) => item.name === 'Gopalpur');
      console.log('defaultCity', defaultCity);
    }
  }, [cities]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    console.log('cc', countryCode);
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
      // setSelectedState(stateCode);
      dispatch(loadCities(selectedCountryCode, stateCode));
    } else {
      console.error('Country code not found for the selected state');
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log('Selected city ID:', cityId);
  };
  console.log('Countries', countries);
  console.log('Countriess', states);
  console.log('Countriesss', cities);
  console.log('selectedCountryCode', selectedCountryCode);

  return (
    <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[0].title}
          </Typography>
          <Typography variant="caption" component="p">
            {steps[0].subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="institute_name"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Institute Name"
                onChange={onChange}
                placeholder="Enter institute name"
                error={Boolean(personalErrors['institute_name'])}
                sx={{ backgroundColor: personalErrors['institute_name'] ? '#FFFFFF' : '#f5f5f5' }}
                aria-describedby="stepper-linear-personal-institute_name"
                {...(personalErrors['institute_name'] && { helperText: personalErrors?.institute_name?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddBusinessOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="registered_date"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                id="issue-date"
                maxDate={new Date()}
                dateFormat={'dd/MM/yyyy'}
                value={value}
                selected={value}
                placeholderText="select date"
                customInput={
                  <CustomInput
                    label="Registered Date"
                    error={Boolean(personalErrors['registered_date'])}
                    aria-describedby="stepper-linear-personal-registered_date"
                    sx={{ backgroundColor: personalErrors['registered_date'] ? '#FFFFFF' : '#f5f5f5' }}
                    {...(personalErrors['registered_date'] && { helperText: personalErrors?.registered_date?.message })}
                  />
                }
                onChange={onChange}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="address_line_one"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Address Line One"
                onChange={onChange}
                placeholder="123 Main St"
                sx={{ backgroundColor: personalErrors['address_line_one'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['address_line_one'])}
                aria-describedby="stepper-linear-personal-address_line_one"
                {...(personalErrors['address_line_one'] && { helperText: personalErrors?.address_line_one?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationAltOutlinedIcon color="#3B4056" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="address_line_two"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Address Line Two"
                onChange={onChange}
                placeholder="Apt, Suite, or Floor"
                sx={{ backgroundColor: personalErrors['address_line_two'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['address_line_two'])}
                aria-describedby="stepper-linear-personal-address_line_two"
                {...(personalErrors['address_line_two'] && { helperText: personalErrors?.address_line_two?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationAltOutlinedIcon color="#3B4056" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="phone"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type="text"
                value={value}
                label="Phone Number"
                onChange={onChange}
                placeholder="12345 67890"
                sx={{ backgroundColor: personalErrors['phone'] ? '#FFFFFF' : '#f5f5f5' }}
                autoComplete="off"
                error={Boolean(personalErrors['phone'])}
                aria-describedby="stepper-linear-personal-phone"
                {...(personalErrors['phone'] && { helperText: personalErrors?.phone?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon color="#3B4056" />+{defaultCountry.length ? defaultCountry[0].phonecode : selectedCountryPhone}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="alt_phone"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                type="text"
                label="Alt Phone Number"
                onChange={onChange}
                placeholder="12345 67890"
                autoComplete="off"
                sx={{ backgroundColor: personalErrors['alt_phone'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['alt_phone'])}
                aria-describedby="stepper-linear-personal-alt_phone"
                {...(personalErrors['alt_phone'] && { helperText: personalErrors?.alt_phone?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon color="#3B4056" />+{defaultCountry.length ? defaultCountry[0].phonecode : selectedCountryPhone}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="County"
            control={personalControl}
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
                sx={{ backgroundColor: personalErrors['state'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors.state)}
                aria-describedby="stepper-linear-personal-state-helper"
                {...(personalErrors.state && { helperText: personalErrors?.state?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicOutlinedIcon sx={{ color: '#3B4056' }} />
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

        <Grid item xs={12} sm={12}>
          <Controller
            name="state"
            control={personalControl}
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
                sx={{ backgroundColor: personalErrors['state'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors.state)}
                aria-describedby="stepper-linear-personal-state-helper"
                {...(personalErrors['state'] && { helperText: personalErrors?.state?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicOutlinedIcon sx={{ color: '#3B4056' }} />
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
        <Grid item xs={12} sm={12}>
          <Controller
            name="city"
            control={personalControl}
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
                sx={{ backgroundColor: personalErrors['city'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors.city)}
                aria-describedby="stepper-linear-personal-city-helper"
                {...(personalErrors['city'] && { helperText: personalErrors?.city?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
                // disabled={loadingCities}
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
        <Grid item xs={12} sm={12}>
          <Controller
            name="pin_code"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Pin Code"
                type="text"
                onChange={onChange}
                placeholder="123 456"
                sx={{ backgroundColor: personalErrors['pin_code'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['pin_code'])}
                aria-describedby="stepper-linear-personal-pin_code"
                {...(personalErrors['pin_code'] && { helperText: personalErrors?.pin_code?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPostOfficeOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="official_email"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Official Email"
                onChange={onChange}
                placeholder="example@domain.com"
                sx={{ backgroundColor: personalErrors['official_email'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['official_email'])}
                aria-describedby="stepper-linear-personal-official_email"
                {...(personalErrors['official_email'] && { helperText: personalErrors?.official_email?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="official_website"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Official Website"
                onChange={onChange}
                placeholder="https://your-institute-name.com"
                sx={{ backgroundColor: personalErrors['official_website'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['official_website'])}
                aria-describedby="stepper-linear-personal-official_website"
                {...(personalErrors['official_website'] && { helperText: personalErrors?.official_website?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="subscription"
            control={personalControl}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="subscription"
                placeholder="Select subscription plan"
                sx={{ backgroundColor: personalErrors['subscription'] ? '#FFFFFF' : '#f5f5f5' }}
                id="custom-select"
                error={Boolean(personalErrors['subscription'])}
                aria-describedby="stepper-linear-personal-official_website"
                {...(personalErrors['subscription'] && { helperText: personalErrors?.official_website?.message })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SubscriptionsOutlinedIcon sx={{ color: '#3B4056' }} />
                    </InputAdornment>
                  )
                }}
              >
                {plans?.map((plan) => (
                  <MenuItem value={plan._id} key={plan._id}>
                    {plan.identity}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="description"
            control={personalControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                multiline
                rows={3}
                autoComplete={'off'}
                label="Description"
                onChange={onChange}
                placeholder="Enter a brief description"
                sx={{ backgroundColor: personalErrors['description'] ? '#FFFFFF' : '#f5f5f5' }}
                error={Boolean(personalErrors['description'])}
                aria-describedby="stepper-linear-personal-description"
                {...(personalErrors['description'] && { helperText: personalErrors?.description?.message })}
                InputProps={{
                  startAdornment: <InputAdornment>{/* <DescriptionOutlinedIcon sx={{ color: '#3B4056' }} /> */}</InputAdornment>
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

export default FormStep1PersonalInfo;
