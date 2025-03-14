import { Grid, Typography, InputAdornment, Button, TextField, Paper } from '@mui/material';
import { Controller } from 'react-hook-form';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import DatePicker from 'react-datepicker';
import './index.css';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { loadCitiesForFromA, loadCountries, loadStates } from 'features/cities/redux/locationThunks';
import { selectCitiesForFormA, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import { useEffect, useState } from 'react';

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
  const [storedState, setStoredState] = useState('');
  const [storedCity, setStoredCity] = useState('');

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (defaultCountry.length) {
      dispatch(loadStates(defaultCountry[0].iso2));
    }
  }, [countries]);

  useEffect(() => {
    const savedData = localStorage.getItem('institute_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.registered_date) {
        parsedData.registered_date = new Date(parsedData.registered_date);
      }
      setFormData(parsedData);
      personalReset(parsedData);
    }
  }, [personalReset]);
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (defaultCountry.length) {
      dispatch(loadCitiesForFromA(defaultCountry[0].iso2, stateCode));
    }
  };
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log('city Id', cityId);
  };

  const handleFormChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('institute_form', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleStoredState = (e) => {
    const ss = states.find((state) => state.iso2 === e.target.value);
    console.log('ss', ss);
    setStoredState(ss.name)
  };

  const handleStoredCity=(e)=>{
    const stc=cities.filter((city)=>city.id===e.target.value)
    console.log('stc',stc);
    setStoredCity(stc[0].name)
  }
  console.log('sssn', storedState);
  console.log('stcc',storedCity);
  

  return (
    <form
      key={1}
      onSubmit={handlePersonalSubmit((data) => {
        onSubmit(data);
      })}
    >
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[0].title}
          </Typography>
          <Typography variant="caption" component="p">
            {steps[0].subtitle}
          </Typography>
        </Grid>

        {/* Group 1: Institute Information */}
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Institute Details
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="institute_name"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.institute_name}
                        label="Institute Name"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('institute_name', e.target.value);
                        }}
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
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.description}
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
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Address Information
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="address_line_one"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.address_line_one}
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
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.address_line_two}
                        label="Address Line Two"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('address_line_two', e.target.value);
                        }}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        type="text"
                        value={value || formData.phone}
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
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.alt_phone}
                        type="text"
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
                        sx={{ backgroundColor: personalErrors['Country'] ? '#FFFFFF' : '#f5f5f5' }}
                        error={Boolean(personalErrors.state)}
                        aria-describedby="stepper-linear-personal-state-helper"
                        {...(personalErrors.Country && { helperText: personalErrors?.Country?.message })}
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
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        value={value || formData.length ? formData.state : ''}
                        label="State"
                        onChange={(e) => {
                          onChange(storedState);
                          handleStateChange(e);
                          handleFormChange('state', e.target.value);
                          handleStoredState(e);
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        value={value || formData.length ? formData.city : ''}
                        label="City"
                        onChange={(e) => {
                          onChange(storedCity);
                          handleCityChange(e);
                          handleFormChange('city', e.target.value);
                          handleStoredCity(e);
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pin_code"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.pin_code}
                        label="Pin Code"
                        type="text"
                        onChange={(e) => {
                          onChange(e);
                          handleFormChange('pin_code', e.target.value);
                        }}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 3: Contact Information */}
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Social Details
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="official_email"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value || formData.official_email}
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
                        value={value || formData.official_website}
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
        <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              Subscription Information
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Group 5: Description */}
        {/* <Grid container item>
          <Grid xs={3}>
            <Typography variant="h4" sx={{ mt: 2 }}>
              Description
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                
              </Grid>
            </Paper>
          </Grid>
        </Grid> */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="secondary" onClick={handleBack}>
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
