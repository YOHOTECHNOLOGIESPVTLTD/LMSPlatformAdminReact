// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PricingPlans from 'features/subscription-management/plans/components';
import { Card, Box } from '@mui/material';
import SubscriptionFeatures from 'features/subscription-management/features/components';
// import { getAllSubscriptions } from 'features/subscription-management/features/services/SubscriptionServices';
// import { useDispatch } from 'react-redux';
const Subscription = () => {
  // ** State
  const [value, setValue] = useState('plans');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ p: 2, justifyContent: 'end', display: 'flex' }}></Box>
      <TabContext value={value}>
        <TabList variant="" onChange={handleChange} aria-label="full width tabs example">
          <Tab value="plans" label="Plans" />
          <Tab value="features" label="Features" />
        </TabList>
        <TabPanel value="plans">
          <PricingPlans/>
        </TabPanel>
        <TabPanel value="features">
          <SubscriptionFeatures />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default Subscription;
