import { Grid, Typography, Button, TextField, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import necessary icons
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { imagePlaceholder } from 'lib/placeholders';
import { getImageUrl } from 'themes/imageUtlis';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCities, selectCountries, selectStates } from 'features/cities/redux/locationSelectors';
import { loadCities, loadCountries, loadStates } from 'features/cities/redux/locationThunks';

const FormStep5AccountInfo = (props) => {
  const { handleAccountSubmit, onSubmit, accountControl, accountErrors, steps, handleBack, hanldeProfileImageChange } = props;
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const states = useSelector(selectStates);
  const cities = useSelector(selectCities);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCountryPhone, setSelectedCountryPhone] = useState('');
  // const [selectedState, setSelectedState] = useState('');
  // const [loadingCities, setLoadingCities] = useState(false);

  const defaultCountry = countries.filter((item) => item.iso2 === 'IN');
  // const defaultStates = states.filter((item) => item.iso2 === 'WB');
  // console.log(defaultStates);

  // const defaultCity = cities.filter((item) => item.name === 'Gopalpur');
  // console.log('defaultCity', defaultCity);

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
  console.log('selectedCountryPhone', selectedCountryPhone);
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
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('acc_form');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

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
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[4].title}
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 2 }}>
            {steps[4].subtitle}
          </Typography>
        </Grid>

        {/* Branch Details Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Branch Details
          </Typography>
        </Grid>

        {/* Branch Name */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="branch_name"
            control={accountControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label="Branch Name"
                value={value||formData.branchName}
                onChange={(e)=>{
                  onChange(e)
                  handleFormChange('branchName',e.target.value)
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
                value={value}
                onChange={onChange}
                placeholder="e.g. 123-456-7890"
                error={Boolean(accountErrors.phone)}
                helperText={accountErrors.phone && 'This field is required'}
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

        {/* Alternate Phone */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="alternate_phone"
            control={accountControl}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label="Alternate Phone"
                value={value}
                onChange={onChange}
                placeholder="e.g. 987-654-3210"
                error={Boolean(accountErrors.alternate_phone)}
                helperText={accountErrors.alternate_phone && 'Alternate Phone Number is required'}
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

        {/* Address Line 1 */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="address1"
            control={accountControl}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label="Address Line 1"
                value={value}
                onChange={onChange}
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
                value={value}
                onChange={onChange}
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
        {/*country */}
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

        {/* Pincode */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="pincode"
            control={accountControl}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label="Pincode"
                value={value}
                onChange={onChange}
                placeholder="e.g. 90001"
                error={Boolean(accountErrors.pincode)}
                helperText={accountErrors.pincode && 'pin code is required'}
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

        {/* Account Details Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Account Details
          </Typography>
        </Grid>

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
                value={value}
                onChange={onChange}
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
                value={value}
                onChange={onChange}
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
                value={value}
                onChange={onChange}
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
                value={value}
                onChange={onChange}
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

        {/* Buttons */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
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
