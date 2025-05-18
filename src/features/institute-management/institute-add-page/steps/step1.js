import { Grid, Typography, InputAdornment, Button, TextField, Paper } from '@mui/material';
import { Controller } from 'react-hook-form';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import DatePicker from 'react-datepicker';
import './index.css';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitiesForFromA, loadCountries, loadStates } from 'features/cities/redux/locationThunks';
import { selectCitiesForFormA, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import { useEffect, useState } from 'react';
import { IconMail, IconMapPin } from '@tabler/icons-react';

const FormStep1PersonalInfo = ({
  personalControl,
  CustomTextField,
  CustomInput,
  handleBack,
  handlePersonalSubmit,
  onSubmit,
  steps,
  personalErrors,
  plans,
  personalReset
}) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  console.log('countries', countries);

  const states = useSelector(selectStates);
  const cities = useSelector(selectCitiesForFormA);
  console.log('cities', cities);

  const defaultCountry = countries.filter((country) => country.iso2 === 'IN');

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  useEffect(() => {
    if (formData.stateCode && defaultCountry.length) {
      dispatch(loadCitiesForFromA(defaultCountry[0].iso2, formData.stateCode));
    }
    // eslint-disable-next-line
  }, [formData.stateCode, defaultCountry.length]);

  // useEffect(()=>{
  //   dispatch(loadCitiesForFromA(defaultCountry[0].iso2,storedState.iso2))
  // },[])

  useEffect(() => {
    if (defaultCountry.length) {
      dispatch(loadStates(defaultCountry[0].iso2));
    }
  }, [countries]);

  // Modify the useEffect that loads saved data
  useEffect(() => {
    const savedData = localStorage.getItem('institute_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.registered_date) {
        parsedData.registered_date = new Date(parsedData.registered_date);
      }
      if (parsedData.stateCode && defaultCountry.length) {
        dispatch(loadCitiesForFromA(defaultCountry[0].iso2, parsedData.stateCode));
      }

      setFormData(parsedData);
      personalReset(parsedData);
    }
  }, [personalReset, defaultCountry.length, dispatch]);
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (defaultCountry.length) {
      dispatch(loadCitiesForFromA(defaultCountry[0].iso2, stateCode));
    }
  };
  const handleFormChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('institute_form', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  console.log('formData', formData);

  return (
    <form
      key={1}
      onSubmit={handlePersonalSubmit((data) => {
        onSubmit(data);
      })}
    >
      <Grid container spacing={5}>
        <Grid item xs={6} sx={{ ml: '45%' }}>
          <Typography variant="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[0].title}
          </Typography>
          <Typography variant="caption" component="p" sx={{ ml: '10px' }}>
            {steps[0].subtitle}
          </Typography>
        </Grid>

        {/* Group 1: Institute Information */}
        <Grid container item gap={10}>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Enter Your Institute Details Here
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="institute_name"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.institute_name}
                        label="Institute Name"
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('institute_name', e.target.value);
                        }}
                        placeholder="Enter institute name"
                        error={Boolean(personalErrors['institute_name'])}
                        sx={{ backgroundColor: personalErrors['institute_name'] ? '#FFFFFF' : '#f5f5f5' }}
                        aria-describedby="stepper-linear-personal-institute_name"
                        {...(personalErrors['institute_name'] && { helperText: personalErrors?.institute_name?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
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
                        value={value || formData.registered_date}
                        selected={formData.registered_date || value || null}
                        placeholderText="select date"
                        customInput={
                          <CustomInput
                            label="Registered Date"
                            error={Boolean(personalErrors['registered_date'])}
                            aria-describedby="stepper-linear-personal-registered_date"
                            sx={{ backgroundColor: personalErrors['registered_date'] ? '#FFFFFF' : '#f5f5f5' }}
                            {...(personalErrors['registered_date'] && { helperText: personalErrors?.registered_date?.message })}
                            FormHelperTextProps={{
                              sx: {
                                fontSize: '15px',
                                color: 'red'
                              }
                            }}
                          />
                        }
                        onChange={(date) => {
                          onChange(date);
                          handleFormChange('registered_date', date);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="description"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.description}
                        onBlur={onBlur}
                        multiline
                        rows={3}
                        autoComplete={'off'}
                        label="Description"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('description', e.target.value);
                        }}
                        placeholder="Enter a brief description"
                        sx={{ backgroundColor: personalErrors['description'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['description'])}
                        aria-describedby="stepper-linear-personal-description"
                        {...(personalErrors['description'] && { helperText: personalErrors?.description?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment>{/* <DescriptionOutlinedIcon sx={{ color: '#3B4056' }} /> */}</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 2: Address Information */}
        <Grid container item gap={10}>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Enter your Address Information here
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="address_line_one"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.address_line_one}
                        onBlur={onBlur}
                        label="Address Line One"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('address_line_one', e.target.value);
                        }}
                        placeholder="123 Main St"
                        sx={{ backgroundColor: personalErrors['address_line_one'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['address_line_one'])}
                        aria-describedby="stepper-linear-personal-address_line_one"
                        {...(personalErrors['address_line_one'] && { helperText: personalErrors?.address_line_one?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="address_line_two"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.address_line_two}
                        label="Address Line Two"
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('address_line_two', e.target.value);
                        }}
                        placeholder="Apt, Suite, or Floor"
                        sx={{ backgroundColor: personalErrors['address_line_two'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['address_line_two'])}
                        aria-describedby="stepper-linear-personal-address_line_two"
                        {...(personalErrors['address_line_two'] && { helperText: personalErrors?.address_line_two?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        type="number"
                        value={value || formData.phone}
                        onBlur={onBlur}
                        label="Phone Number"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('phone', e.target.value);
                        }}
                        placeholder="12345 67890"
                        sx={{ backgroundColor: personalErrors['phone'] ? '#FFFFFF' : '#f5f5f5' }}
                        autoComplete="off"
                        error={Boolean(personalErrors['phone'])}
                        aria-describedby="stepper-linear-personal-phone"
                        {...(personalErrors['phone'] && { helperText: personalErrors?.phone?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon color="#3B4056" />+{defaultCountry.length ? defaultCountry[0].phonecode : ''}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="alt_phone"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.alt_phone}
                        onBlur={onBlur}
                        type="number"
                        label="Alt Phone Number"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('alt_phone', e.target.value);
                        }}
                        placeholder="12345 67890"
                        autoComplete="off"
                        sx={{ backgroundColor: personalErrors['alt_phone'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['alt_phone'])}
                        aria-describedby="stepper-linear-personal-alt_phone"
                        {...(personalErrors['alt_phone'] && { helperText: personalErrors?.alt_phone?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon color="#3B4056" />+{defaultCountry.length ? defaultCountry[0].phonecode : ''}
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="County"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        disabled
                        value={value || defaultCountry.length ? defaultCountry[0].iso2 : ''}
                        label="Country"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        placeholder="Enter country"
                        sx={{ backgroundColor: personalErrors['Country'] ? '#FFFFFF' : '#EBEBE4' }}
                        // error={Boolean(personalErrors.state)}
                        aria-describedby="stepper-linear-personal-state-helper"
                        // {...(personalErrors.Country && { helperText: personalErrors?.Country?.message })}
                        // FormHelperTextProps={{
                        //   sx: {
                        //     fontSize: '15px',
                        //     color: 'red'
                        //   }
                        // }}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur} }) => (
                      <TextField
                        fullWidth
                        select
                        value={formData.stateCode || ''}
                        label="State"
                        onChange={(e) => {
                          const selectedState = states.find((state) => state.iso2 === e.target.value);
                          onChange(selectedState.name);
                          handleStateChange(e);
                          handleFormChange('stateCode', e.target.value);
                          handleFormChange('state', selectedState.name);
                        }}
                        onBlur={onBlur}
                        placeholder="Select state"
                        sx={{
                          backgroundColor: personalErrors['state'] ? '#FFFFFF' : '#f5f5f5',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: personalErrors['state'] ? '#f44336' : 'rgba(0, 0, 0, 0.23)'
                            },
                            '&:hover fieldset': {
                              borderColor: personalErrors['state'] ? '#f44336' : 'rgba(0, 0, 0, 0.5)'
                            }
                          }
                        }}
                        error={Boolean(personalErrors.state)}
                        aria-describedby="stepper-linear-personal-state-helper"
                        helperText={personalErrors?.state?.message}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        SelectProps={{
                          onClose: () => onBlur(),
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                maxHeight: 300,
                                '& .MuiMenuItem-root': {
                                  padding: '8px 16px',
                                  '&:hover': {
                                    backgroundColor: 'rgba(63, 81, 181, 0.08)'
                                  }
                                }
                              }
                            }
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconMapPin stroke={2} sx={{ color: personalErrors['state'] ? '#f44336' : '#3B4056' }} />
                            </InputAdornment>
                          )
                        }}
                      >
                        {states.map((state) => (
                          <MenuItem
                            key={state.iso2}
                            value={state.iso2}
                            onClick={(e) => {
                              e.stopPropagation();
                              onChange(state.name);
                              handleFormChange('stateCode', state.iso2);
                              handleFormChange('state', state.name);
                            }}
                            sx={{
                              fontSize: '0.875rem',
                              minHeight: '36px'
                            }}
                          >
                            {state.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur} }) => (
                      <TextField
                        fullWidth
                        select
                        value={formData.cityCode || ''}
                        label="City"
                        onChange={(e) => {
                          const selectedCity = cities.find((city) => city.id === e.target.value);
                          if (selectedCity) {
                            onChange(selectedCity.name);
                            handleFormChange('cityCode', e.target.value);
                            handleFormChange('city', selectedCity.name);
                          }
                        }}
                        onBlur={onBlur}
                        placeholder="Select city"
                        sx={{
                          backgroundColor: personalErrors['city'] ? '#FFFFFF' : '#f5f5f5',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: personalErrors['city'] ? '#f44336' : 'rgba(0, 0, 0, 0.23)'
                            },
                            '&:hover fieldset': {
                              borderColor: personalErrors['city'] ? '#f44336' : 'rgba(0, 0, 0, 0.5)'
                            }
                          }
                        }}
                        error={Boolean(personalErrors.city)}
                        aria-describedby="stepper-linear-personal-city-helper"
                        helperText={personalErrors?.city?.message}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        SelectProps={{
                          onClose: () => onBlur(),
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                maxHeight: 300,
                                '& .MuiMenuItem-root': {
                                  padding: '8px 16px',
                                  '&:hover': {
                                    backgroundColor: 'rgba(63, 81, 181, 0.08)'
                                  }
                                }
                              }
                            }
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCityOutlinedIcon sx={{ color: personalErrors['city'] ? '#f44336' : '#3B4056' }} />
                            </InputAdornment>
                          )
                        }}
                      >
                        {cities.map((city) => (
                          <MenuItem
                            key={city.id}
                            value={city.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onChange(city.name);
                              handleFormChange('cityCode', city.id);
                              handleFormChange('city', city.name);
                            }}
                            sx={{
                              fontSize: '0.875rem',
                              minHeight: '36px'
                            }}
                          >
                            {city.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pin_code"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.pin_code}
                        onBlur={onBlur}
                        label="Pin Code"
                        type="number"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('pin_code', e.target.value);
                        }}
                        placeholder="123 456"
                        sx={{ backgroundColor: personalErrors['pin_code'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['pin_code'])}
                        aria-describedby="stepper-linear-personal-pin_code"
                        {...(personalErrors['pin_code'] && { helperText: personalErrors?.pin_code?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonPinCircleIcon sx={{ color: '#3B4056' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 3: Contact Information */}
        <Grid container item gap={10}>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Enter your Contact Details here
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="official_email"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.official_email}
                        onBlur={onBlur}
                        label="Official Email"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('official_email', e.target.value);
                        }}
                        placeholder="example@domain.com"
                        sx={{ backgroundColor: personalErrors['official_email'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['official_email'])}
                        aria-describedby="stepper-linear-personal-official_email"
                        {...(personalErrors['official_email'] && { helperText: personalErrors?.official_email?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconMail stroke={2} sx={{ color: '#3B4056' }} />
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
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.official_website}
                        onBlur={onBlur}
                        label="Official Website"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('official_website', e.target.value);
                        }}
                        placeholder="https://your-institute-name.com"
                        sx={{ backgroundColor: personalErrors['official_website'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors['official_website'])}
                        aria-describedby="stepper-linear-personal-official_website"
                        {...(personalErrors['official_website'] && { helperText: personalErrors?.official_website?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 4: Subscription Information */}
        <Grid container item gap={10}>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              Enter your Subscription Information here
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="subscription"
                    control={personalControl}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        label="subscription"
                        placeholder="Select subscription plan"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('subscription', e.target.value);
                        }}
                        sx={{ backgroundColor: personalErrors['subscription'] ? '#FFFFFF' : '#f5f5f5' }}
                        id="custom-select"
                        error={Boolean(personalErrors['subscription'])}
                        aria-describedby="stepper-linear-personal-official_website"
                        {...(personalErrors['subscription'] && { helperText: personalErrors?.subscription?.message })}
                        FormHelperTextProps={{
                          sx: {
                            fontSize: '15px',
                            color: 'red'
                          }
                        }}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            sx={{
              width: '100px',
              '&:hover': {
                backgroundColor: 'orange'
              }
            }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            sx={{
              width: '100px',
              '&:hover': {
                backgroundColor: 'orange'
              }
            }}
            variant="contained"
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormStep1PersonalInfo;
