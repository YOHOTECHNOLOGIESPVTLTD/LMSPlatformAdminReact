// ** React Imports
import { useEffect, useRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { getuserDetails } from 'utils';
import { getImageUrl } from 'themes/imageUtlis';

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ChatLog = (props) => {
  // ** Props
  const { hidden, selectedTicket } = props;
  const user = getuserDetails();

  // ** Ref
  const chatArea = useRef(null);
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      } else {
        chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight;
      }
    }
  };

  const formatMessageDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date(); 

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        //year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  // Function to render chat messages with WhatsApp-like styling
  const renderMessages = () => {
    if (selectedTicket && selectedTicket.messages && selectedTicket.messages.length > 0) {
      return selectedTicket.messages.map((message, index) => {
        const isCurrentUser = message.sender === user._id;
  
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
              mb: 3,
            }}
          >
            {!isCurrentUser && (
              <CustomAvatar
                skin="light"
                color={message.sender.avatarColor || undefined}
                sx={{ width: 36, height: 36, mr: 2 }}
                {...(selectedTicket?.user?.image
                  ? { src: getImageUrl(selectedTicket?.user?.image), alt: message.sender.fullName }
                  : {})}
              />
            )}
            <Card
              sx={{
                maxWidth: '70%',
                backgroundColor: isCurrentUser ? '#dcf8c6' : '#ffffff',
                borderRadius: isCurrentUser
                  ? '15px 15px 0 15px' // Top right rounded for user
                  : '15px 15px 15px 0', // Top left rounded for others
                boxShadow: 1,
                p: 2,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {!isCurrentUser && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {message.sender.fullName}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    display: 'flex',
                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                    mt: 1,
                  }}
                >{formatMessageDate(message.date)}
                  {/* {new Date(message.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} */}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      });
    } else {
      return (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No messages
        </Typography>
      );
    }
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [selectedTicket]);

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box
          ref={chatArea}
          sx={{
            p: 5,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100% - 8.875rem)',
        backgroundColor: '#f5f5f5',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <ScrollWrapper>{renderMessages()}</ScrollWrapper>
    </Box>
  );
};

export default ChatLog;
