// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import PricingPlans from 'features/subscription-management/features/components';

const Subscription = () => {
  // ** State
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList variant="fullWidth" onChange={handleChange} aria-label="full width tabs example">
        <Tab value="plans" label="Plans" />
        <Tab value="features" label="Features" />
      </TabList>
      <TabPanel value="plans">
       <PricingPlans/>
      </TabPanel>
      <TabPanel value="features">
        <Typography>
            Features
        </Typography>
      </TabPanel>
    </TabContext>
  );
};

export default Subscription;
