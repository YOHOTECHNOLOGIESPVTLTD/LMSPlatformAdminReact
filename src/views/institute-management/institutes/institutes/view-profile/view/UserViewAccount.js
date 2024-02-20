import { forwardRef, useState } from 'react';
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import TextField from 'components/mui/text-field';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Teacher Profile',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
};

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField fullWidth inputRef={ref} {...props} />;
});

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const defaultPersonalValues = {
  state: '',
  city: '',
  pin_code: '',
  address_line_one: '',
  address_line_two: '',
  registered_date: '',
  institute_name: '',
  official_email: '',
  official_website: '',
  phone: '',
  alt_phone: '',
  description: ''
};

const personalSchema = yup.object().shape({
  state: yup.string().required(),
  city: yup.string().required(),
  pin_code: yup.number().required(),
  address_line_one: yup.string().required(),
  address_line_two: yup.string().required(),
  registered_date: yup.string().required(),
  institute_name: yup.string().required(),
  phone: yup.number().required(),
  alt_phone: yup.number().required(),
  description: yup.string().required(),
  official_email: yup.string().required(),
  official_website: yup.string().required(),
  subscription: yup.string().required()
});

const UserViewAccount = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });

  const {
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Handle Password
  const handleNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };

  if (data) {
    return (
      <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ pb: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={data.status}
                      color={statusColors[data.status]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tax ID:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>+1 {data.contact}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Language:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>English</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: '' }}>
                <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                  Edit
                </Button>
                <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>
              <Dialog
                open={openEdit}
                onClose={handleEditClose}
                aria-labelledby="user-view-edit"
                aria-describedby="user-view-edit-description"
                sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
              >
                <DialogTitle
                  id="user-view-edit"
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem !important',
                    px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
                    pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
                  }}
                >
                  Edit institute Information
                </DialogTitle>
                <DialogContent
                  sx={{
                    pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(2)} !important`],
                    pb: (theme) => `${theme.spacing(2)} !important`,
                    px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
                  }}
                >
                  <form onSubmit={handlePersonalSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="institute_name"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              fullWidth
                              value={value}
                              label="Institute Name"
                              onChange={onChange}
                              placeholder="Leonard"
                              error={Boolean(personalErrors['institute_name'])}
                              aria-describedby="stepper-linear-personal-institute_name"
                              {...(personalErrors['institute_name'] && { helperText: 'This field is required' })}
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
                              dateFormat={'dd/MM/yyyy'}
                              value={value}
                              selected={value}
                              customInput={
                                <CustomInput
                                  label="Registered Date"
                                  error={Boolean(personalErrors['registered_date'])}
                                  aria-describedby="stepper-linear-personal-registered_date"
                                  {...(personalErrors['registered_date'] && { helperText: 'This field is required' })}
                                />
                              }
                              onChange={onChange}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="State"
                              onChange={onChange}
                              error={Boolean(personalErrors.state)}
                              aria-describedby="stepper-linear-personal-state-helper"
                              {...(personalErrors.state && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="City"
                              onChange={onChange}
                              error={Boolean(personalErrors.city)}
                              aria-describedby="stepper-linear-personal-city-helper"
                              {...(personalErrors.city && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="Pin Code"
                              type="number"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['pin_code'])}
                              aria-describedby="stepper-linear-personal-pin_code"
                              {...(personalErrors['pin_code'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="Address Line One"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['address_line_one'])}
                              aria-describedby="stepper-linear-personal-address_line_one"
                              {...(personalErrors['address_line_one'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="Address Line Two"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['address_line_two'])}
                              aria-describedby="stepper-linear-personal-address_line_two"
                              {...(personalErrors['address_line_two'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              type="number"
                              value={value}
                              label="Phone Number"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['phone'])}
                              aria-describedby="stepper-linear-personal-phone"
                              {...(personalErrors['phone'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              type="number"
                              label="Alt Phone Number"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['alt_phone'])}
                              aria-describedby="stepper-linear-personal-alt_phone"
                              {...(personalErrors['alt_phone'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="Official Email"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['official_email'])}
                              aria-describedby="stepper-linear-personal-official_email"
                              {...(personalErrors['official_email'] && { helperText: 'This field is required' })}
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
                            <TextField
                              fullWidth
                              value={value}
                              label="Official Website"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['official_website'])}
                              aria-describedby="stepper-linear-personal-official_website"
                              {...(personalErrors['official_website'] && { helperText: 'This field is required' })}
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
                              label="Subscription"
                              id="custom-select"
                              error={Boolean(personalErrors['official_website'])}
                              aria-describedby="stepper-linear-personal-official_website"
                              {...(personalErrors['official_website'] && { helperText: 'This field is required' })}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
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
                            <TextField
                              fullWidth
                              value={value}
                              multiline
                              rows={3}
                              label="Description"
                              onChange={onChange}
                              placeholder="Carter"
                              error={Boolean(personalErrors['description'])}
                              aria-describedby="stepper-linear-personal-description"
                              {...(personalErrors['description'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="tonal" color="secondary" onClick={handleEditClose}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </DialogContent>
              </Dialog>

              <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
              <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item spacing={2} xs={12} md={12}>
                <Card>
                  <CardHeader title="Change Password" />
                  <CardContent>
                    <Alert icon={false} severity="warning" sx={{ mb: 4 }}>
                      <AlertTitle sx={{ fontWeight: 500, fontSize: '1.125rem', mb: (theme) => `${theme.spacing(2.5)} !important` }}>
                        Ensure that these requirements are met
                      </AlertTitle>
                      Minimum 8 characters long, uppercase & symbol
                    </Alert>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="New Password"
                            placeholder="············"
                            value={values.newPassword}
                            id="user-view-security-new-password"
                            onChange={handleNewPasswordChange('newPassword')}
                            type={values.showNewPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    aria-label="toggle password visibility"
                                  >
                                    <Icon fontSize="1.25rem" icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            placeholder="············"
                            label="Confirm New Password"
                            value={values.confirmNewPassword}
                            id="user-view-security-confirm-new-password"
                            type={values.showConfirmNewPassword ? 'text' : 'password'}
                            onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    onMouseDown={(e) => e.preventDefault()}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmNewPassword}
                                  >
                                    <Icon fontSize="1.25rem" icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button type="submit" variant="contained">
                            Change Password
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
