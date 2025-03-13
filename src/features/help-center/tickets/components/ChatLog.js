// ** React Imports
import { useEffect, useRef } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Custom Components Imports
import CustomAvatar from "components/mui/avatar";
import PerfectScrollbarComponent from "react-perfect-scrollbar";
import { getuserDetails } from "utils";
import { getImageUrl } from "themes/imageUtlis";

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ChatMessage = styled(Box)(({ theme, isCurrentUser }) => ({
  maxWidth: "75%",
  padding: theme.spacing(1.5, 2),
  borderRadius: isCurrentUser
    ? "10px 10px 0px 10px" 
    : "10px 10px 10px 0px",
  backgroundColor: isCurrentUser ? "#dcf8c6" : "#ffffff", 
  boxShadow: theme.shadows[1],
  wordBreak: "break-word",
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

  useEffect(() => {
    scrollToBottom();
  }, [selectedTicket]);

  const renderMessages = () => {
    if (selectedTicket && selectedTicket.messages?.length > 0) {
      return selectedTicket.messages.map((message, index) => {
        const isCurrentUser = message.sender === user._id;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: isCurrentUser ? "flex-end" : "flex-start",
              mb: 1.5,
            }}
          >
            {!isCurrentUser && (
              <CustomAvatar
                skin="light"
                color={message.sender.avatarColor || undefined}
                sx={{ width: 36, height: 36, mr: 1 }}
                {...(selectedTicket?.user?.image
                  ? { src: getImageUrl(selectedTicket?.user?.image), alt: message.sender.fullName }
                  : {})}
              />
            )}
            <ChatMessage isCurrentUser={isCurrentUser}>
              {!isCurrentUser && (
                <Typography variant="subtitle2" color="textSecondary">
                  {message.sender.fullName}
                </Typography>
              )}
              <Typography variant="body1" sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                   {message.content}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5, fontSize: "0.75rem" }}
              >
                {new Date(message.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </ChatMessage>
          </Box>
        );
      });
    } else {
      return (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No messages
        </Typography>
      );
    }
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box
          ref={chatArea}
          sx={{
            p: 3,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
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
        height: "calc(100% - 8.875rem)",
        backgroundColor: "#f5f5f5", 
        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.05)",
        paddingBottom: "10px",
      }}
    >
      <ScrollWrapper>{renderMessages()}</ScrollWrapper>
    </Box>
  );
};

export default ChatLog;
