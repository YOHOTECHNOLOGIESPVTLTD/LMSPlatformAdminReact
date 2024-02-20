// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
// ** Icon Imports

import Icon from 'components/icon';

import UserViewAccount from './UserViewAccount';
import UserViewConnection from './UserViewConnection';

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 1),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const UserViewRight = ({ tab, invoiceData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState('account');
  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value="account" label="Profile" icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />} />
        <Tab value="activity" label="Activity" icon={<Icon fontSize="1.125rem" icon="tabler:link" />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        <>
          <TabPanel sx={{ p: 0 }} value="account">
            <UserViewAccount invoiceData={invoiceData} />
          </TabPanel>

          <TabPanel sx={{ p: 0 }} value="activity">
            <UserViewConnection />
          </TabPanel>
        </>
      </Box>
    </TabContext>
  );
};

export default UserViewRight;
