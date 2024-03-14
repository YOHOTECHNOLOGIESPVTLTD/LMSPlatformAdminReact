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
// import { userChangePassword } from '../../../user-view/services/viewUserServices';
import { userChangePassword } from '../../services/userServices';

const UserViewSecurity = ({ id }) => {
  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleConfirmNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.newPassword === values.confirmNewPassword && values.newPassword !== '' && values.confirmNewPassword !== '') {
      try {
        let data = {
          user_id: id,
          password: values.confirmNewPassword,
          c_password: values.newPassword
        };
        const result = await userChangePassword(data);
        if (result.success) {
          toast.success(result.message);
          setValues({
            newPassword: '',
            confirmNewPassword: '',
            showNewPassword: false,
            showConfirmNewPassword: false
          });
          setPasswordsMatch(true);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Change Password" />
          <CardContent>
            <Alert icon={false} severity="warning" sx={{ mb: 4 }}>
              <AlertTitle sx={{ fontWeight: 500, fontSize: '1.125rem', mb: (theme) => `${theme.spacing(2.5)} !important` }}>
                Ensure that these requirements are met
              </AlertTitle>
              Minimum 8 characters long, uppercase & symbol
            </Alert>

            <form onSubmit={handleSubmit}>
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
                  {!passwordsMatch && (
                    <Typography variant="caption" color="error">
                      Passwords do not match
                    </Typography>
                  )}
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
  );
};

export default UserViewSecurity;
