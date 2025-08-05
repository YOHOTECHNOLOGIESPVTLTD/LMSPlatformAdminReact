// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Import
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import ChatLog from './ChatLog';
import SendMsgForm from './SendMsgForm';
import UserProfileRight from './UserProfileRight';
import { getImageUrl } from 'themes/imageUtlis';

// ** Styled Components
const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}));

const ChatContent = (props) => {
  const {
    store,
    hidden,
    sendMsg,
    dispatch,
    mdAbove,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
    selectedTicket,
    handleSendMessages
  } = props;

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };
 
  const handleCloseTicket = () => {
    if (!selectedTicket) return;

    const confirmClose = window.confirm("Are you sure you want to close this ticket?");
    if (confirmClose) {
      console.log('Closing ticket:', selectedTicket._id);

       // You could call a function like:
  // dispatch(closeTicketAction(selectedTicket._id));

  // Or if using API directly:
  // axios.post(`/api/tickets/${selectedTicket._id}/close`).then(...)
    }
  };

  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat;
      if (!selectedChat || !selectedTicket) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 6,
              }}
            >
              <MuiAvatar
                sx={{
                  width: 110,
                  height: 110,
                  boxShadow: 3,
                  backgroundColor: 'background.paper'
                }}
              >
                <Icon icon="tabler:message" fontSize="3.125rem" />
              </MuiAvatar>
              <Typography sx={{ fontWeight: 500, fontSize: '1.2rem', mt: 2 }}>Select Ticket</Typography>
            </Box>

            <Box
              onClick={handleStartConversation}
              sx={{
                py: 2,
                px: 6,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                cursor: mdAbove ? 'default' : 'pointer',
              }}     
            >
              <Typography sx={{ fontWeight: 500, fontSize: '1.125rem', lineHeight: 'normal' }}>Start Conversation</Typography>
            </Box>
          </ChatWrapperStartChat>
        );
      } else {
        return (
          <Box
            sx={{
              width: 0,
              flexGrow: 1,
              height: '100%',
              backgroundColor: 'action.hover'
            }}
          >
            <Box
              sx={{
                px: 5,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#0CCE7F',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                color: 'white',
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <Icon icon="tabler:menu-2" />
                  </IconButton>
                )}
                <Box onClick={handleUserProfileRightSidebarToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ mr: 3 }}
                    badgeContent={
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          color: `${statusObj[selectedChat.contact?.status]}.main`,
                          boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                          backgroundColor: `${statusObj[selectedChat.contact?.status]}.main`
                        }}
                      />
                    }
                  >
                    {selectedTicket?.user?.image ? (
                      <MuiAvatar
                        sx={{ width: 38, height: 38 }}
                        src={getImageUrl(selectedTicket?.user?.image)}
                        alt={selectedTicket?.user?.first_name}
                      />
                    ) : (
                      <CustomAvatar
                        skin="light"
                        color={selectedChat.contact.avatarColor}
                        sx={{ width: 38, height: 38, fontSize: (theme) => theme.typography.body1.fontSize }}
                      >
                        {getInitials(selectedTicket?.user?.first_name ?? 'CHANDRAN')}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{selectedTicket?.user?.first_name + selectedTicket?.user?.last_name}</Typography>
                    <Typography sx={{ color: 'text.disabled' }}>{selectedTicket?.user?.role?.identity}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <OptionsMenu
                    menuProps={{ sx: { mt: 2 } }}
                    icon={<Icon icon="tabler:dots-vertical" />}
                    iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                    options={['Close Ticket']}
                    onClick={(option) => {
                      if (option === 'Close Ticket') handleCloseTicket();
                    }}
                  />
                </Box>

            </Box>

            {selectedChat && store.userProfile ? (
              <ChatLog hidden={hidden} data={{ ...selectedChat, userContact: store.userProfile }} selectedTicket={selectedTicket} />
            ) : null}

            <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} handleSendMessages={handleSendMessages} />

            <UserProfileRight
              store={store}
              hidden={hidden}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            />
          </Box>
        );
      }
    } else {
      return null;
    }
  };

  return renderContent();
};
export default ChatContent;