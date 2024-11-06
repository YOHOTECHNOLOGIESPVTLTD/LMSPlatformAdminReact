import React, { useState } from 'react';
import {
  Tabs,
  Tab,
 
  CardContent,
  Box,
} from '@mui/material';
import InstituteProfile from 'features/institute-management/institute[id]-page/components/InstituteProfile';
import InstituteSocialmedia from './InstituteSocialmedia';
import InstituteProfileimage from './InstituteProfileimage';
import InstitutePassword from './InstitutePassword';
import InstituteDocument from './InstituteDocument';

const UserViewAccount = ({ institute }) => {
  const [tabIndex, setTabIndex] = useState(0);

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="institute tabs" sx={{ justifyContent: 'center', display: "flex" }}>
        <Tab sx={{ color: "#002B38", fontFamily: "Poppins", fontSize: '16px', fontWeight: 700 }} label="Personal Info" />
        <Tab sx={{ color: "#002B38", fontFamily: "Poppins", fontSize: '16px', fontWeight: 700 }} label="Profile" />
        <Tab sx={{ color: "#002B38", fontFamily: "Poppins", fontSize: '16px', fontWeight: 700 }} label="Social Media" />
        <Tab sx={{ color: "#002B38", fontFamily: "Poppins", fontSize: '16px', fontWeight: 700 }} label="Documents" />
        <Tab sx={{ color: "#002B38", fontFamily: "Poppins", fontSize: '16px', fontWeight: 700 }} label="Change Password" />
      </Tabs>
      <CardContent>
        {tabIndex === 0 && <InstituteProfile institute={institute} />}
        {tabIndex === 1 && <InstituteProfileimage institute={institute} />}
        {tabIndex === 2 && <InstituteSocialmedia institute={institute} />}
        {tabIndex === 3 && <InstituteDocument institute={institute} />}
        {tabIndex === 4 && <InstitutePassword institute={institute} />}
      </CardContent>
    </Box>
    
  );
};

export default UserViewAccount;