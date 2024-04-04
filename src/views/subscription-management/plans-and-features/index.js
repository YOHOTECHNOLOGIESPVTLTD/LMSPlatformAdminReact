// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PricingPlans from 'features/subscription-management/plans/components';
import { Card, Box } from '@mui/material';
import SubscriptionFeatures from 'features/subscription-management/features/components';
import { getAllSubscriptionPlans } from 'features/subscription-management/plans/redux/subscriptionPlansThunks';
import { useDispatch } from 'react-redux';
const Subscription = () => {
  // ** State
  const dispatch = useDispatch()
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  return (
    <Card>
      <Box sx={{ p: 2, justifyContent: 'end', display: 'flex' }}></Box>
      <TabContext value={value}>
        <TabList variant="" onChange={handleChange} aria-label="full width tabs example">
          <Tab value="1" label="Plans" />
          <Tab value="2" label=" + Create New Plans" />
        </TabList>
        <TabPanel value="1">
          <PricingPlans/>
        </TabPanel>
        <TabPanel value="2">
          <SubscriptionFeatures />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default Subscription;
