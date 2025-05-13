

import { forwardRef, useState, useEffect } from 'react';
// ** MUI Imports
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
// import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import TextField from 'components/mui/text-field';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
// import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';
import { updateInstitute } from 'features/institute-management/services/instituteService';
import toast from 'react-hot-toast';

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
  true: 'success',
  false: 'error'
};

const defaultPersonalValues = {
  state: '',
  city: '',
  pin_code: '',
  address_line_1: '',
  address_line_2: '',
  registered_date: new Date(),
  name: '',
  official_email: '',
  email: '',
  official_website: '',
  phone: '',
  alternate_number: '',
  description: ''
};
function convertDateFormat(input) {
  var originalDate = new Date(input);

  // Extract the year, month, and day components
  var year = originalDate.getFullYear();
  var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
  var day = ('0' + originalDate.getDate()).slice(-2);

  // Form the yyyy-mm-dd date string
  var formattedDateString = year + '-' + month + '-' + day;

  return formattedDateString;
}

const personalSchema = yup.object().shape({
  state: yup.string().required(),
  city: yup.string().required(),
  pin_code: yup.number().required(),
  address_line_1: yup.string().required(),
  address_line_2: yup.string().required(),
  registered_date: yup.date().nullable().required(),
  name: yup.string().required(),
  phone: yup.number().required(),
  alternate_number: yup.number().required(),
  description: yup.string().required(),
  official_email: yup.string().required(),
  email: yup.string().required(),
  official_website: yup.string().required(),
  instagram: yup.string().required(),
  facebook: yup.string().required()
  // subscription: yup.string().required()
});

const InstituteProfile = ({ institute }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const {
    // reset,
    control: personalControl,
    setValue,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    mode: 'onChange',
    resolver: yupResolver(personalSchema)
  });

  useEffect(() => {
    if (institute) {
      setValue('name', institute?.institute_name || '');
      setValue('registered_date', new Date(institute?.registered_date) || new Date());
      setValue('state', institute?.contact_info.address.state || '');
      setValue('city', institute?.contact_info.address.city || '');
      setValue('pin_code', institute?.contact_info.address.pin_code || '');
      setValue('address_line_1', institute?.contact_info.address.address1 || '');
      setValue('address_line_2', institute?.contact_info.address.address2 || '');
      setValue('phone', institute?.contact_info.phone_no || '');
      setValue('alternate_number', institute?.contact_info.alternate_no || '');
      setValue('official_email', institute?.admin?.email || '');
      setValue('official_website', institute?.official_website || '');
      setValue('description', institute?.description || '');
      setValue('instagram', institute?.contact_info.instagram_id || '');
      setValue('facebook', institute?.contact_info.facebook_id || '');
      setValue('email', institute?.email || '');
      setValue('linkedin', institute?.contact_info.linkedin_id || '');
      setValue('twitter', institute?.contact_info.twitter_id || '');
    }
  }, [institute, setValue]);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', data.name);
    bodyFormData.append('email', data.email);
    bodyFormData.append('phone', data.phone);
    bodyFormData.append('alternate_number', data.alternate_number);
    bodyFormData.append('registered_date', convertDateFormat(data.registered_date));
    bodyFormData.append('state', data.state);
    bodyFormData.append('address_line_1', data.address_line_1);
    bodyFormData.append('address_line_2', data.address_line_2);
    bodyFormData.append('official_website', data.official_website);
    bodyFormData.append('instagram', data.instagram);
    bodyFormData.append('facebook', data.facebook);
    bodyFormData.append('linkedin', data.linkedin);
    bodyFormData.append('twitter', data.twitter);
    bodyFormData.append('pinterest', data.pinterest);
    bodyFormData.append('city', data.city);
    bodyFormData.append('pincode', data.pincode);
    bodyFormData.append('description', data.description);
    bodyFormData.append('id', institute?.id);

    // bodyFormData.append('instagram', data.instagram);
    // bodyFormData.append('id', props.initialValues.id);
    console.log(bodyFormData);

    const result = await updateInstitute(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      handleEditClose();
    } else {
      let errorMessage = '';
      toast.error(errorMessage.trim());
    }
  };

  // const onSubmit = (data) => {
  //   // console.log(data);
  // };
  console.log(institute, "institute ")
  if (data) {
    return (
    
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                        Institute ID:
                      </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{institute?.id}</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Institute Code:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>RAJ00876</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Institute Name:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{institute?.institute_name}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Official Email:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{institute?.email}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Status:
                    </Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={institute?.is_active ? 'Active' : 'Inactive'}
                      color={statusColors[institute?.is_active]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Contact:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>+91 {institute?.contact_info.phone_no}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Alternate Number:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>+91 {institute?.contact_info.alternate_no}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Registered date:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{institute?.registered_date}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: '#000', fontFamily: 'Poppins', fontSize: '14px' }}>
                      Address:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {institute?.contact_info.address.address1}, {institute?.contact_info.address.address2}, {institute?.contact_info.address.state}, {institute?.contact_info.address.city}, {institute?.contact_info.address.pincode}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
             

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" sx={{ mr: 2,minWidth: 100 }} onClick={handleEditClickOpen}>
                  Edit
                </Button>
                <Button color="error" variant="contained" sx={{ minWidth: 100 }} onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>

              {/* EditInstituteDialouge */}
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
                    //pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(2)} !important`],
                    pb: (theme) => `${theme.spacing(3)} !important`,
                    px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(6)} !important`]
                  }}
                >
                  <form onSubmit={handlePersonalSubmit(onSubmit)} >
                    <Grid container spacing={4} sx={{
                            // Text color inside the input
                            input: {
                              color: 'black', // Indigo
                            },

                            // Label color
                            label: {
                              color: 'black',
                            },

                            // Label when focused
                            '& label.Mui-focused': {
                              color: '#3949ab', // Darker Indigo
                            },

                            // Outline color
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                borderColor: '#3949ab',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#3949ab',
                                borderWidth: '2px',
                              },
                            },
                          }}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="name"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                            fullWidth
                            defaultValue={institute?.institute_name}
                            label="Institute Name"
                            onChange={onChange}
                            placeholder="doe"
                            error={Boolean(personalErrors['name'])}
                            aria-describedby="stepper-linear-personal-name"
                            {...(personalErrors['name'] && { helperText: 'This field is required' })}
                            
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
                              defaultValue={institute?.registered_date}
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
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              // value={value}
                             
                              defaultValue={institute?.contact_info.address.state}
                              label="State"
                               placeholder="state"
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
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.contact_info.address.city}
                              label="City"
                              onChange={onChange}
                              error={Boolean(personalErrors.city)}
                              aria-describedby="stepper-linear-personal-city-helper"
                              {...(personalErrors?.city && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="pin_code"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.contact_info.address.pincode}
                              label="Pin Code"
                              type="number"
                              onChange={onChange}
                              placeholder="600076"
                              error={Boolean(personalErrors['pin_code'])}
                              aria-describedby="stepper-linear-personal-pin_code"
                              {...(personalErrors['pin_code'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="address_line_1"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.contact_info.address.address1}
                              label="Address Line One"
                              onChange={onChange}
                              placeholder=".........."
                              error={Boolean(personalErrors['address_line_1'])}
                              aria-describedby="stepper-linear-personal-address_line_1"
                              {...(personalErrors['address_line_1'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="address_line_2"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.contact_info.address.address2}
                              label="Address Line Two"
                              onChange={onChange}
                              placeholder=".........."
                              error={Boolean(personalErrors['address_line_2'])}
                              aria-describedby="stepper-linear-personal-address_line_2"
                              {...(personalErrors['address_line_2'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="phone"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              type="number"
                              defaultValue={institute?.contact_info.phone_no}
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
                          name="alternate_number"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.contact_info.alternate_no}
                              type="number"
                              label="Alt Phone Number"
                              onChange={onChange}
                              placeholder="9876543211"
                              error={Boolean(personalErrors['alternate_number'])}
                              aria-describedby="stepper-linear-personal-alternate_number"
                              {...(personalErrors['alternate_number'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="official_email"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.admin?.email}
                              label="Official Email"
                              onChange={onChange}
                              placeholder="jhon@gmail.com"
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
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.official_website}
                              label="Official Website"
                              onChange={onChange}
                              placeholder="website"
                              error={Boolean(personalErrors['official_website'])}
                              aria-describedby="stepper-linear-personal-official_website"
                              {...(personalErrors['official_website'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>

                      {/* <Grid item xs={12} sm={6}>
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
                      </Grid> */}

                      <Grid item xs={12} sm={12}>
                        <Controller
                          name="description"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              defaultValue={institute?.description}
                              label="description"
                              onChange={onChange}
                              placeholder="enter the somethings"
                              error={Boolean(personalErrors['description'])}
                              aria-describedby="stepper-linear-personal-description"
                              {...(personalErrors['description'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="instagram"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.social_media?.instagram_id}
                              label="Insta"
                              onChange={onChange}
                              placeholder="INSTA"
                              error={Boolean(personalErrors['instagram'])}
                              aria-describedby="stepper-linear-personal-instagram"
                              {...(personalErrors['instagram'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="facebook"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.social_media?.facebook_id}
                              label="Facebook URL"
                              onChange={onChange}
                              placeholder="FbLink"
                              error={Boolean(personalErrors['facebook'])}
                              aria-describedby="stepper-linear-personal-facebook"
                              {...(personalErrors['facebook'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="email"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.email}
                              label="Email"
                              onChange={onChange}
                              placeholder="mail"
                              error={Boolean(personalErrors['email'])}
                              aria-describedby="stepper-linear-personal-email"
                              {...(personalErrors['email'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="linkedin"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.social_media?.linkedin_id}
                              label="LinkedIn"
                              onChange={onChange}
                              placeholder="in"
                              error={Boolean(personalErrors['linkedin'])}
                              aria-describedby="stepper-linear-personal-linkedin"
                              {...(personalErrors['linkedIn'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="twitter"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.social_media?.twitter_id}
                              label="Twitter URL"
                              onChange={onChange}
                              placeholder="twitter"
                              error={Boolean(personalErrors['twitter'])}
                              aria-describedby="stepper-linear-personal-twitter"
                              {...(personalErrors['twitter'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid> 
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="pinterest"
                          control={personalControl}
                          rules={{ required: true }}
                          render={({ field: { onChange } }) => (
                            <TextField
                              fullWidth
                              defaultValue={institute?.social_media?.pinterest_id}
                              label="Pinterest URL"
                              onChange={onChange}
                              placeholder="pin"
                              error={Boolean(personalErrors['pinterest'])}
                              aria-describedby="stepper-linear-personal-pinterest"
                              {...(personalErrors['pinterest'] && { helperText: 'This field is required' })}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleEditClose}>
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
            
          </Grid>
        </Grid>
    );
  } else {
    return null;
  }
};

export default InstituteProfile;
