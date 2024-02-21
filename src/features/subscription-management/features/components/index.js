// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

// ** Custom Component Import
import CustomTextField from 'components/mui/text-field';

// ** Third Party Imports
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports

const defaultValues = {
  plan_type: null,
  users: '',
  users_checkbox: false,
  admins: '',
  admins_checkbox: false,
  teachers: '',
  teachers_checkbox: false,
  batches: '',
  batches_checkbox: false,
  courses: '',
  courses_checkbox: false,
  classes: '',
  classes_checkbox: false,
  community_support: 'false'
  //   checkbox: false
};

const SubscriptionFeatures = () => {
  // ** States

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = () => toast.success('Form Submitted');

  return (
    <Box p={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="basic"
                  label="Select Plan"
                  SelectProps={{
                    value: value,
                    onChange: (e) => onChange(e)
                  }}
                  id="validation-basic-select"
                  error={Boolean(errors.select)}
                  aria-describedby="validation-basic-select"
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="users"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  value={value}
                  label="Number of Users"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.users)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.users && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="users_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited users"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="admins"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Admins"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.admins)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.admins && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="admins_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited admins"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="teachers"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Teachers"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.teachers)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.teachers && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="teachers_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited teachers"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="batches"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Batches"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.batches)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.batches && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="batches_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited batches"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="courses"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Courses"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.courses)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.courses && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited courses"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="classes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  type="number"
                  label="Number of Classes"
                  onChange={onChange}
                  placeholder="10"
                  error={Boolean(errors.classes)}
                  aria-describedby="validation-basic-first-name"
                  {...(errors.classes && { helperText: 'This field is required' })}
                />
              )}
            />
            <FormControl>
              <Controller
                name="courses_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    label="Check for unlimited classes"
                    sx={errors.checkbox ? { color: 'error.main' } : null}
                    control={<Checkbox {...field} name="validation-basic-checkbox" sx={errors.checkbox ? { color: 'error.main' } : null} />}
                  />
                )}
              />
              {errors.checkbox && (
                <FormHelperText
                  id="validation-basic-checkbox"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl error={Boolean(errors.radio)}>
              <FormLabel>Community Support</FormLabel>
              <Controller
                name="radio"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} aria-label="gender" name="validation-basic-radio">
                    <FormControlLabel
                      value="yes"
                      label="Yes"
                      sx={errors.radio ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                    />
                    <FormControlLabel
                      value="no"
                      label="No"
                      sx={errors.radio ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                    />
                  </RadioGroup>
                )}
              />
              {errors.radio && (
                <FormHelperText
                  id="validation-basic-radio"
                  sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubscriptionFeatures;
