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
  padding: theme.spacing(0.6),
  paddingRight: 20,
  boxShadow: theme.shadows[1],
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}));

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2)
}));

const SendMsgForm = (props) => {
  // ** Props
  const { store, dispatch, sendMsg } = props;

  // ** State
  const [msg, setMsg] = useState('');

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (store && store.selectedChat && msg.trim().length) {
      dispatch(sendMsg({ ...store.selectedChat, message: msg }));
    }
    setMsg('');
  };

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <CustomTextField
            fullWidth
            value={msg}
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              '& .Mui-focused': { boxShadow: 'none !important' },
              '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                p: (theme) => theme.spacing(1.875, 2.5)
              },
              '& .MuiInputBase-root': { border: '0 !important' }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
