// ** React Imports
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
import { fetchUserProfile, removeSelectedChat, selectChat, sendMsg } from 'features/help-center/tickets/components/AppChat';
import { useDispatch, useSelector } from 'react-redux';

// ** Utils Imports
import { formatDateToMonthShort } from 'utils/format';
import { getInitials } from 'utils/get-initials';

// ** Chat App Components Imports
// import TicketSkeleton from 'components/cards/Skeleton/TicketSkeleton';
import ChatContent from 'features/help-center/tickets/components/ChatContent';
import SidebarLeft from 'features/help-center/tickets/components/SidebarLeft';
import { getAllInstitutesTickets } from 'features/chat/redux/chatThunks';
import { selectTickets } from 'features/chat/redux/chatSelector';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'utils/error-handler';
import socket from 'utils/socket';
import { getuserDetails } from 'utils';

const StaffTicket = () => {
  // ** States
  const [userStatus, setUserStatus] = useState('online');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [selectedTicket,setSelectedTicket] = useState(null)
  const { showSpinnerFn, hideSpinnerFn } = useSpinner()
  const [Messages,setMessages] = useState([])

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state) => state.chat);
  const tickets = useSelector(selectTickets)

  // ** Vars
  const skin = 'default';
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const sidebarWidth = smAbove ? 400 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));

  const statusObj = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  };
  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getAllInstitutesTickets())
    // dispatch(fetchChatsContacts())
  }, [dispatch]);
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () => setUserProfileRightOpen(!userProfileRightOpen);
  const user = getuserDetails()
  console.log(tickets,"tickets");

  const handleSelectTickets = (ticket) => {
    try {
      showSpinnerFn()
      setSelectedTicket(ticket)
    } catch (error) {
      const error_message = getErrorMessage(error)
      toast.error(error_message)
    }finally{ 
      hideSpinnerFn()
    }
  }

  useEffect(() => {
    if (selectedTicket) {
      socket.connect();
      
      socket.on("connect", () => {
        console.log("Socket connected");
        socket.emit("joinTicket", selectedTicket.uuid);
      });
  
      socket.on("receiveMessage", (newMessage) => {
        console.log("Message received:", newMessage); 
        if(selectedTicket){
           setSelectedTicket((prev) => ({...prev,messages:[...prev.messages,newMessage]}))
        }
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
  
      return () => {
        socket.disconnect();
        socket.off("receiveMessage"); // Cleanup listener
      };
    }
  }, [selectedTicket]);
  
  console.log(Messages,"messages")

  const handleSendMessages = (message,setMessage) => {
     if(message?.trim()){
        const new_message = {
          ticket_id : selectedTicket?.uuid,
          text: message,
          timestamp: new Date(),
          senderType : "Users",
          user : user?._id
        }
        socket?.emit("sendTicketMessage",new_message)
        setMessages((prevMessage) => [...prevMessage,new_message])
        setMessage('')
     }else{
      toast.error("Message cannot empty")
     }
  }
  // const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);
  console.log(selectedTicket,"selected")
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {/* {loading ? (
            <TicketSkeleton />
          ) : ( */}
            <Box
              className="app-chat"
              sx={{
                width: '100%',
                display: 'flex',
                height: '82vh',
                flexDirection: 'row',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'background.paper',
                boxShadow: skin === 'bordered' ? 0 : 6,
                ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
              }}
            >
              <SidebarLeft
                store={tickets}
                hidden={hidden}
                mdAbove={mdAbove}
                dispatch={dispatch}
                statusObj={statusObj}
                userStatus={userStatus}
                selectChat={selectChat}
                getInitials={getInitials}
                sidebarWidth={sidebarWidth}
                setUserStatus={setUserStatus}
                leftSidebarOpen={leftSidebarOpen}
                removeSelectedChat={removeSelectedChat}
                userProfileLeftOpen={userProfileLeftOpen}
                formatDateToMonthShort={formatDateToMonthShort}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
                handleSelectTickets={handleSelectTickets}
                selectedTicket={selectedTicket}
              />
              <ChatContent
                store={store}
                hidden={hidden}
                sendMsg={sendMsg}
                mdAbove={mdAbove}
                dispatch={dispatch}
                statusObj={statusObj}
                getInitials={getInitials}
                sidebarWidth={sidebarWidth}
                userProfileRightOpen={userProfileRightOpen}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
                selectedTicket={selectedTicket}
                handleSendMessages={handleSendMessages}
              />
            </Box>
          {/* )} */}
        </Grid>
      </Grid>
    </>
  );
};
StaffTicket.contentHeightFixed = true;

export default StaffTicket;
