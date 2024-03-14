import { forwardRef, useState } from 'react';
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
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
  1: 'success',

  0: 'error'
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

const UserViewAccount = ({ institute }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

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

  if (data) {
    return (
      <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Grid container>
                  <Grid item md={4}>
                    <CardContent sx={{ pb: 4 }}>
                      <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                        Institute Details
                      </Typography>
                      <Box sx={{ pt: 4 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Institute ID:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.institute_id}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Institute Code:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.institute_code}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Institute Name:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Official Email:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                          <CustomChip
                            rounded
                            skin="light"
                            size="small"
                            label={institute?.is_active === '1' ? 'Active' : 'Inactive'}
                            color={statusColors[institute?.is_active]}
                            sx={{
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>+91 {institute?.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alternate Number:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>+91 {institute?.alternate_number}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {institute?.address_line_1}, {institute?.address_line_2},{institute?.state}, {institute?.city},{' '}
                            {institute?.pin_code}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                  <Grid item md={5}>
                    <CardContent sx={{ pb: 4 }}>
                      <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                        Social Links
                      </Typography>
                      <Box sx={{ pt: 4 }}>
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Official Website:</Typography>
                          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{institute?.official_website}</Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Facebook:</Typography>
                          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{institute?.facebook}</Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>LinkedIn:</Typography>
                          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{institute?.linkedin}</Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Instagram:</Typography>
                          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{institute?.instagram}</Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Pinterest:</Typography>
                          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{institute?.pinterest}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="h4" sx={{ textTransform: 'uppercase', mt: 4 }}>
                        Primary Branch Details
                      </Typography>
                      <Box sx={{ pt: 4 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Branch Name:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.branch?.branch_name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Location:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {institute?.branch?.address}, {institute?.branch?.state}, {institute?.branch?.city},{' '}
                            {institute?.branch?.pin_code}
                          </Typography>
                        </Box>
                      </Box>{' '}
                    </CardContent>
                  </Grid>
                  <Grid item md={3}>
                    <CardContent sx={{ pb: 4 }}>
                      <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                        Admin Details
                      </Typography>
                      <Box sx={{ pt: 4 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Fullname:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.user?.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.user?.username}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{institute?.user?.institution_users?.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>Admin</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                          <CustomChip
                            rounded
                            skin="light"
                            size="small"
                            label={institute?.user?.is_active === '1' ? 'Active' : 'Inactive'}
                            color={statusColors[institute?.user?.is_active]}
                            sx={{
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>+91 {institute?.user?.institution_users?.mobile}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
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
        </Grid>
      </DatePickerWrapper>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
