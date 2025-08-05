import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Icon from 'components/icon';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userChangePassword } from 'features/user-management/users-page/services/userServices';

const UserViewSecurity = ({ id }) => {
  console.log(id);
  
  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('userData');
  const userData = JSON.parse(user);
  console.log('usersssss', userData);

  const handleNewPasswordChange = (prop) => (event) => {
    const password = event.target.value;
    setValues({ ...values, [prop]: password });
    checkPasswordStrength(password);
    setPasswordsMatch(password === values.confirmNewPassword);
    setValues({ ...values, [prop]: event.target.value });
    if (prop === 'newPassword') {
      checkPasswordStrength(event.target.value);
    }
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleConfirmNewPasswordChange = (prop) => (event) => {
    const confirmPassword = event.target.value;
    setValues({ ...values, [prop]: confirmPassword });
    setPasswordsMatch(values.newPassword === confirmPassword);
  };

  const checkPasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      strength = 'Strong';
    } else if (password.length >= 6) {
      strength = 'Medium';
    }
    setPasswordStrength(strength);
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.newPassword === '' || values.confirmNewPassword === '') {
      toast.error('Please fill out both fields');
      return;
    }

    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength !== 'Strong') {
      toast.error('Password strength must be Strong');
      return;
    }

    setLoading(true);

    try {
      const data = {
        user_id: id,
        c_password: values.confirmNewPassword,
        password: values.newPassword
      };
      
      const result = await userChangePassword(data);

      if (result.success) {
        toast.success(result.message || 'Password changed successfully!');
        setValues({
          newPassword: '',
          confirmNewPassword: '',
          showNewPassword: false,
          showConfirmNewPassword: false
        });
        setPasswordsMatch(true);
        setPasswordStrength('');
      } else {
        toast.error(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong while changing password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
          <CardHeader title={
    <Typography variant="h5" sx={{ color: 'blue', fontWeight: 'bold',fontSize: '1.5rem' }}>
      Change Password
    </Typography>
  } />
          <CardContent>
            <Alert icon={false} severity="warning" sx={{ mb: 4 }}>
              <AlertTitle sx={{ fontWeight: 500, fontSize: '1.125rem', mb: (theme) => `${theme.spacing(2.5)} !important` }}>
                Password requirements:
              </AlertTitle>
              Minimum 8 characters, at least 1 uppercase letter and 1 number.
            </Alert>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    placeholder="Enter New Password"
                    value={values.newPassword}
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
                  <Typography variant="body2" color={passwordStrength === 'Strong' ? 'success.main' : passwordStrength === 'Medium' ? 'warning.main' : 'error'}>
                    {passwordStrength}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Re-enter new password"
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
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
                  {!passwordsMatch && (
                    <Typography variant="caption" color="error">
                      Passwords do not match
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !passwordsMatch || passwordStrength !== 'Strong'}
                  >
                    {loading ? 'Updating...' : 'Reset Password'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewSecurity;
