// React Imports
import { useState } from 'react';

// MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
// Component Imports
import CustomTabList from '@mui/lab/TabList';

import { getAllOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketThunks';
import { getAllClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketThunks';

import { Grid } from '@mui/material';
import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';

import OpenTicketCard from 'features/ticket-management/your-tickets/components/OpenTicketCard';
import ClosedTicketCard from 'features/ticket-management/your-tickets/components/ClosedTicketCard';

import TicketResolveDrawer from 'features/ticket-management/your-tickets/components/ResolveTicketDrawer';
import { selectOpenTickets, selectLoading } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketSelectors';
import { selectClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketSelectors';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const YourTicketsPage = () => {
  // States

  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectOpenTickets);
  const studentClosedTickets = useSelector(selectClosedTickets);
  const studentLoading = useSelector(selectLoading);

  console.log(studentOpenTickets)

  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllOpenTickets({ branch_id: selectedBranchId, type: 'opened' }));
  }, [selectedBranchId, dispatch, refetch]);
  useEffect(() => {
    dispatch(getAllClosedTickets({ branch_id: selectedBranchId, type: 'closed' }));
  }, [selectedBranchId, dispatch, refetch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };
  console.log(studentClosedTickets);

  return (
    <MainCard title="Your Tickets" sx={{ minHeight: '100vh' }}>
      {studentLoading ? (
        <TicketsCardsSkeleton />
      ) : (
        <TabContext value={value}>
          <CustomTabList pill="true" onChange={handleChange} aria-label="customized tabs example">
            <Tab value="open" label="Opened Tickets" />
            <Tab value="close" label="Closed Tickets" />
          </CustomTabList>
          <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
            <Grid container spacing={2}>
              {studentOpenTickets?.map((ticket, index) => (
                <OpenTicketCard
                  key={index}
                  ticket={ticket}
                  handleSelectedTicket={handleSelectedTicket}
                  onClick={() => setOpenResolveDrawer(true)}
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
            <Grid container spacing={2}>
              {studentClosedTickets?.map((ticket, index) => (
                <ClosedTicketCard key={index} ticket={ticket} />
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      )}

      <TicketResolveDrawer open={openResolveDrawer} toggle={handleCloseDrawer} setRefetch={setRefetch} ticket={selectedTicket} />
    </MainCard>
  );
};

export default YourTicketsPage;
