import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import CustomAvatar from 'components/mui/avatar';
import { getInitials } from 'utils/get-initials';

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(5)
}));

const ChatLog = (props) => {
  const { data, hidden } = props;
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

  const formattedChatData = () => {
    let chatLog = [];
    if (Array.isArray(data.chat)) {
      chatLog = data.chat;
    }
    const formattedChatLog = [];
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : 11;

    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: []
    };
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          time: msg.time,
          msg: msg.message,
          feedback: msg.feedback
        });
      } else {
        chatMessageSenderId = msg.senderId;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              time: msg.time,
              msg: msg.message,
              feedback: msg.feedback
            }
          ]
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });

    return formattedChatLog;
  };

  const renderMsgFeedback = (isSender, feedback) => {
    if (isSender) {
      if (feedback.isSent && !feedback.isDelivered) {
        return (
          <Box component="span" sx={{ display: 'flex', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
            <Icon icon="tabler:check" fontSize="1.125rem" />
          </Box>
        );
      } else if (feedback.isSent && feedback.isDelivered) {
        return (
          <Box
            component="span"
            sx={{
              display: 'flex',
              '& svg': { mr: 1.5, color: feedback.isSeen ? 'success.main' : 'text.secondary' }
            }}
          >
            <Icon icon="tabler:checks" fontSize="1.125rem" />
          </Box>
        );
      } else {
        return null;
      }
    }
  };
  useEffect(() => {
    if (data && data.chat && data.chat.length) {
      scrollToBottom();
    }
  }, [data]);

  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      const isSender = item.senderId === data.userContact.id;

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== formattedChatData().length - 1 ? 4 : undefined
          }}
        >
          <div>
            <CustomAvatar
              skin="light"
              color={data.contact.avatarColor ? data.contact.avatarColor : undefined}
              sx={{
                width: 32,
                height: 32,
                ml: isSender ? 3 : undefined,
                mr: !isSender ? 3 : undefined,
                fontSize: (theme) => theme.typography.body1.fontSize
              }}
              {...(data.contact.avatar && !isSender
                ? {
                    src: data.contact.avatar,
                    alt: data.contact.fullName
                  }
                : {})}
              {...(isSender
                ? {
                    src: data.userContact.avatar,
                    alt: data.userContact.fullName
                  }
                : {})}
            >
              {data.contact.avatarColor ? getInitials(data.contact.fullName) : null}
            </CustomAvatar>
          </div>

          <Box className="chat-body" sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {item.messages.map((chat, index, { length }) => {
              const time = new Date(chat.time);

              return (
                <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3 } }}>
                  <div>
                    <Typography
                      sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        maxWidth: '100%',
                        width: 'fit-content',
                        wordWrap: 'break-word',
                        p: (theme) => theme.spacing(2.25, 4),
                        ml: isSender ? 'auto' : undefined,
                        borderTopLeftRadius: !isSender ? 0 : undefined,
                        borderTopRightRadius: isSender ? 0 : undefined,
                        color: isSender ? 'common.white' : 'text.primary',
                        backgroundColor: isSender ? 'primary.main' : 'background.paper'
                      }}
                    >
                      {chat.msg}
                    </Typography>
                  </div>
                  {index + 1 === length ? (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {renderMsgFeedback(isSender, chat.feedback)}
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {time ? new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

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
