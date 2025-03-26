import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import InstituteProfile from 'features/institute-management/institute[id]-page/components/InstituteProfile';
import InstituteSocialmedia from './Profile/InstituteSocialmedia';
import InstituteProfileimage from './Profile/InstituteProfileimage';
import InstitutePassword from './Profile/InstitutePassword';
import InstituteDocument from './Profile/InstituteDocument';
import InstituteActivityLog from './InstituteActivityLog';

const UserViewAccount = ({ institute }) => {
  const [selectedSection, setSelectedSection] = useState(0);

  const sections = [
    { label: 'Personal Info', component: <InstituteProfile institute={institute} /> },
    { label: 'Profile', component: <InstituteProfileimage institute={institute} /> },
    { label: 'Social Media', component: <InstituteSocialmedia institute={institute} /> },
    { label: 'Documents', component: <InstituteDocument institute={institute} /> },
    { label: 'Change Password', component: <InstitutePassword institute={institute} /> },
    { label: 'InstituteActivityLog', component: <InstituteActivityLog institute={institute} /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          minWidth: { xs: '100%', md: '250px' },
          bgcolor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            mb: 2,
            color: '#002B38',
          }}
        >
          Settings
        </Typography>
        <List>
          {sections.map((section, index) => (
            <ListItemButton
              key={index}
              onClick={() => setSelectedSection(index)}
              sx={{
                borderRadius: '8px',
                mb: 1,
                bgcolor: selectedSection === index ? '#0CCE7F' : '#ffffff',
                color: selectedSection === index ? '#ffffff' : '#002B38',
                '&:hover': {
                  bgcolor: selectedSection === index ? '#0ab469' : '#f5f5f5',
                },
              }}
            >
              <ListItemText
                primary={section.label}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: { md: '0 8px 8px 0' },
        }}
      >
        {sections[selectedSection].component}
      </Box>
    </Box>
  );
};

export default UserViewAccount;
