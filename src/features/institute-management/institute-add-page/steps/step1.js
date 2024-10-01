import { Grid, Typography, InputAdornment, Button, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import DatePicker from "react-datepicker"
import "./index.css"
import MenuItem from '@mui/material/MenuItem';


const FormStep1PersonalInfo = ({personalControl,CustomTextField,CustomInput,handleBack,handlePersonalSubmit,onSubmit,steps,personalErrors,plans}) => {
console.log(personalErrors,"personal Errors")
return(
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
      <Grid item xs={12} sm={6}>
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
              aria-describedby="stepper-linear-personal-institute_name"
              {...(personalErrors['institute_name'] && { helperText: personalErrors?.institute_name?.message })}
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start" >
                    <AddBusinessOutlinedIcon sx={{ color: "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
              placeholderText='select date'
              customInput={
                <CustomInput
                  label="Registered Date"
                  error={Boolean(personalErrors['registered_date'])}
                  aria-describedby="stepper-linear-personal-registered_date"
                  {...(personalErrors['registered_date'] && { helperText: personalErrors?.registered_date?.message })}
                />
              }
              onChange={onChange}

            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
              error={Boolean(personalErrors['address_line_one'])}
              aria-describedby="stepper-linear-personal-address_line_one"
              {...(personalErrors['address_line_one'] && { helperText: personalErrors?.address_line_one?.message })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
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
              value={value}
              label="Address Line Two"
              onChange={onChange}
              placeholder="Apt, Suite, or Floor"
              error={Boolean(personalErrors['address_line_two'])}
              aria-describedby="stepper-linear-personal-address_line_two"
              {...(personalErrors['address_line_two'] && { helperText: personalErrors?.address_line_two?.message })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
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
              type="number"
              value={value}
              label="Phone Number"
              onChange={onChange}
              placeholder="+91 12345 67890"
              autoComplete="off"
              error={Boolean(personalErrors['phone'])}
              aria-describedby="stepper-linear-personal-phone"
              {...(personalErrors['phone'] && { helperText: personalErrors?.phone?.message })}
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start"  >
                     <PhoneOutlinedIcon color='#3B4056' />
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
              value={value}
              type="number"
              label="Alt Phone Number"
              onChange={onChange}
              placeholder="+91 12345 67890"
              autoComplete="off"
              error={Boolean(personalErrors['alt_phone'])}
              aria-describedby="stepper-linear-personal-alt_phone"
              {...(personalErrors['alt_phone'] && { helperText: personalErrors?.alt_phone?.message })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <PhoneOutlinedIcon color="#3B4056" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Controller
          name="state"
          control={personalControl}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label="State"
              onChange={onChange}
              placeholder='Enter state'
              error={Boolean(personalErrors.state)}
              aria-describedby="stepper-linear-personal-state-helper"
              {...(personalErrors.state && { helperText: personalErrors?.state?.message })}
              InputProps = {{
                startAdornment: (
                  <InputAdornment position="start" >
                    <PublicOutlinedIcon sx={{ color: "#3B4056"}}  />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="city"
          control={personalControl}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label="City"
              onChange={onChange}
              placeholder='Enter city'
              error={Boolean(personalErrors.city)}
              aria-describedby="stepper-linear-personal-city-helper"
              {...(personalErrors.city && { helperText: personalErrors?.city?.message })}
              InputProps = {{
                startAdornment:(
                  <InputAdornment position="start" >
                     <LocationCityOutlinedIcon sx={{ color : "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            />
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
              value={value}
              label="Pin Code"
              type="number"
              onChange={onChange}
              placeholder="123 456"
              error={Boolean(personalErrors['pin_code'])}
              aria-describedby="stepper-linear-personal-pin_code"
              {...(personalErrors['pin_code'] && { helperText: personalErrors?.pin_code?.message })}
              InputProps = {{
                startAdornment:(
                  <InputAdornment position="start" >
                    <LocalPostOfficeOutlinedIcon sx={{ color: "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
              error={Boolean(personalErrors['official_email'])}
              aria-describedby="stepper-linear-personal-official_email"
              {...(personalErrors['official_email'] && { helperText: personalErrors?.official_email?.message })}
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start" >
                    <ContactMailOutlinedIcon sx={{ color: "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
              error={Boolean(personalErrors['official_website'])}
              aria-describedby="stepper-linear-personal-official_website"
              {...(personalErrors['official_website'] && { helperText: personalErrors?.official_website?.message })}
              InputProps = {{
                startAdornment: (
                  <InputAdornment position="start" >
                     <LanguageOutlinedIcon sx={{ color: "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
              id="custom-select"
              error={Boolean(personalErrors["subscription"])}
              aria-describedby="stepper-linear-personal-official_website"
              {...(personalErrors["subscription"] && { helperText: personalErrors?.official_website?.message })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                     <SubscriptionsOutlinedIcon sx={{ color: "#3B4056"}} />
                  </InputAdornment>
                )
              }}
            >
            {
                plans?.map((plan)=>
                  <MenuItem value={plan._id} key={plan._id}  >{plan.identity}</MenuItem>
                )
            }
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
              autoComplete={"off"}
              label="Description"
              onChange={onChange}
              placeholder="Enter a brief description"
              error={Boolean(personalErrors['description'])}
              aria-describedby="stepper-linear-personal-description"
              {...(personalErrors['description'] && { helperText: personalErrors?.description?.message })}
              InputProps ={{
                startAdornment : (
                  <InputAdornment >
                    <DescriptionOutlinedIcon sx={{ color : "#3B4056"}} />
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
)
}

export default FormStep1PersonalInfo