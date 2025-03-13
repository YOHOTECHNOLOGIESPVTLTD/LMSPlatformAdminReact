// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// ** Custom Component Import
import CustomTextField from 'components/mui/text-field';

// ** Styled Components
const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1), // Increased padding for better spacing
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#202c33", // Use the default background
  boxShadow: theme.shadows[2], // Slightly stronger shadow
  marginTop: theme.spacing(1), // Add some top margin for spacing
}));

const Form = styled('form')(() => ({
  width: '100%', // Ensuring the form takes full width
}));

const StyledTextField = styled(CustomTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '20px', 
    backgroundColor: "#2A3942", 
    transition: 'background-color 0.3s ease, border 0.3s ease', 
    '&:hover': {
      backgroundColor: "#354A52", 
    },
    '&.Mui-focused': {
      backgroundColor: "#3C525A", 
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: 'none !important', 
    },
  },
}));


const SendButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px', // Rounded corners for the button
  marginLeft: theme.spacing(1), // Add left margin to the button
  backgroundColor: theme.palette.primary.main, // Primary theme color
  color: theme.palette.common.white, // White text color
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Darker shade on hover
  },
}));

const SendMsgForm = (props) => {
  // ** Props
  const {  handleSendMessages } = props;

  // ** State
  const [msg, setMsg] = useState('');

  // const handleSendMsg = (e) => {
  //   e.preventDefault();
  //   if (store && store.selectedChat && msg.trim().length) {
  //     dispatch(sendMsg({ ...store.selectedChat, message: msg }));
  //   }
  //   setMsg('');
  // };

  return (
    <Form onSubmit={(e) => { e.preventDefault(); handleSendMessages(msg,setMsg)}}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <StyledTextField
            fullWidth
            value={msg}
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                p: (theme) => theme.spacing(1.5, 2), // Adjust padding for input
              },
              '& .MuiInputBase-root': { border: '0 !important' }
            }}
          />
        </Box>
        <SendButton type="submit" variant="contained" >
          Send
        </SendButton>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
