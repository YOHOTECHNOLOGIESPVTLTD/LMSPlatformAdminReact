import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {  Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import AuthOtpForm from '../auth-forms/AuthOtp';
import Logo from 'components/logo';
// import AuthFooter from 'components/cards/AuthFooter';
import { useAtom } from 'jotai';
import { stepsAtomWithPersistence } from 'store/atoms/authorized-atom';
import { login_step, otp_step } from 'lib/constants';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const [step,setStep] = useAtom(stepsAtomWithPersistence)

  const map_to_models = {
     [login_step] : AuthLogin ,
     [otp_step] : AuthOtpForm 
  }
  const Component = map_to_models[step] ?? AuthLogin
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 1 }} onClick={() => setStep(otp_step)} >
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={"#002B38"}
                          // color={theme.palette.secondary.main}
                           gutterBottom variant={matchDownSM ? 'h3' : 'h2'} onClick={() => setStep(login_step)} >
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" color={"#6B7280"} fontSize="14px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                          Please enter your credentials to sign in!
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Component />
                  </Grid>
              
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          {/* <AuthFooter /> */}
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
