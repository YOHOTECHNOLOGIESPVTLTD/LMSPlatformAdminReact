// ** React Imports
import { Fragment } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// ** Custom Component Imports
import Sidebar from 'components/sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';

const UserProfileRight = (props) => {
  const {
    store,
    hidden,

    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle
  } = props;

  // Dummy visitor information
  const visitorInfo = {
    fullName: 'John Doe',
    role: 'Visitor',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    location: 'New York, USA',
    locationTime: 'Mon - Fri 9AM - 5PM',
    language: 'English',
    ipAddress: '192.168.1.1',
    os: 'Windows 10',
    browser: 'Chrome'
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>;
    }
  };

  return (
    <Sidebar
      direction="right"
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        borderTopRightRadius: (theme) => theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        }
      }}
    >
      {store && store.selectedChat ? (
        <Fragment>
          <Box sx={{ position: 'relative' ,
            borderBottom: '1px solid #ccc',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: (theme) => theme.spacing(6, 6) }}>
              <Typography variant="h5" sx={{ textAlign: 'center',fontWeight: 'bold' }}>
                {visitorInfo.fullName}
              </Typography>
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', }}>{visitorInfo.role}</Typography>
            </Box>
          </Box>

          <Box sx={{ height: 'calc(100% - 13.3125rem)', px: 4 }}>
            <ScrollWrapper>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 3.5,mt: 3,  fontSize: '16px', color: 'text.disabled', textTransform: 'uppercase', lineHeight: 'normal' ,fontWeight: 'bold'}}>
                  Basic Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Name</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.fullName} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Email</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.email} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Phone</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.phoneNumber} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Location</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.location} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Location Time</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.locationTime} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Language</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.language} />
                    </ListItem>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ borderBottom: '1px solid #E0E0E0', mb: 3 }} />

              {/* Device Details */}
              <Box>
                <Typography variant="body2" sx={{ mb: 3.5, fontSize: '16px',fontWeight:'bold', color: 'text.disabled', textTransform: 'uppercase', lineHeight: 'normal' }}>
                  Device Details
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>IP Address</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.ipAddress} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Operating System</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.os} />
                    </ListItem>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography>Browser</Typography>
                  </Box>
                  <Box>
                    <ListItem disablePadding>
                      <ListItemText primary={visitorInfo.browser} />
                    </ListItem>
                  </Box>
                </Box>
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null}
    </Sidebar>
  );
};

export default UserProfileRight;
