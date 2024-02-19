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

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const ChatLog = (props) => {
  // ** Props
  const { data, hidden } = props;

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

  const mails = [
    {
      subject: 'Regarding Leave Approval',
      to: 'hr@example.com',
      from: 'employee@example.com',
      date: Date.now(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo nisi nec lectus ultricies, a euismod nibh eleifend. Ut lobortis erat vel dolor cursus rhoncus.'
    }
  ];

  const renderChats = () => {
    return (
      <>
        {/* First Mail Card */}
        <Card sx={{ maxWidth: 800, margin: 'auto', mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CustomAvatar
                skin="light"
                color={data.contact.avatarColor ? data.contact.avatarColor : undefined}
                sx={{ width: 48, height: 48, mr: 2 }}
                {...(data.contact.avatar
                  ? {
                      src: data.contact.avatar,
                      alt: data.contact.fullName
                    }
                  : {})}
              />
              <Typography variant="h5">{data.contact.fullName}</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Subject: {data.subject}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To: {data.contact.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Leave Type: {data.leaveType}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Start Date: {new Date(data.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              End Date: {new Date(data.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Reason: {data.reason}
            </Typography>
          </CardContent>
        </Card>

        {/* Second Mail Card with Mapping */}
        {mails.map((mail, index) => (
          <Card key={index} sx={{ maxWidth: 800, margin: 'auto', mb: 4 }}>
            <CardContent>
              <Typography variant="h5">{mail.subject}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                To: {mail.to}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                From: {mail.from}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Date: {new Date(mail.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">{mail.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (data && data.chat && data.chat.length) {
      scrollToBottom();
    }
  }, [data]);

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
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
    <Box sx={{ height: 'calc(100% - 8.875rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  );
};

export default ChatLog;
