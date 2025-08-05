import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';

const StyledBox1 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover
}));

const StyledBox2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover
}));

const HelpFooter = () => {
  const [showNumber, setShowNumber] = useState(false);
  const [showMail, setShowMail] = useState(false);

  const handleNumberClick = () => {
    setShowNumber(!showNumber);
  };

  const handleMailClick = () => {
    setShowMail(!showMail);
  };

 

  return (
    <Box sx={{ mt:3, textAlign: 'center' }}>
      
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleNumberClick} sx={{ mb: 4 }}>
            Contact Number
          </Button>
          {showNumber && (
            <StyledBox1>
              <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
                <Icon fontSize="1.75rem" icon="tabler:phone" />
              </CustomAvatar>
              <Typography variant="h4" sx={{ mb: 1.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                + (810) 2548 2568
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>We are always happy to help!</Typography>
            </StyledBox1>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" color="secondary" onClick={handleMailClick} sx={{ mb: 4 }}>
            Contact Mail
          </Button>
          {showMail && (
            <StyledBox2>
              <CustomAvatar skin="light" variant="rounded" sx={{ mb: 2.5, height: 38, width: 38 }}>
                <Icon fontSize="1.75rem" icon="tabler:mail" />
              </CustomAvatar>
              <Typography variant="h4" sx={{ mb: 1.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                hello@help.com
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Best way to get answer faster!</Typography>
            </StyledBox2>
          )}
        </Grid>
       

      </Grid>
      <CustomChip rounded size="small" skin="light" color="primary" label="Question" />
      <Typography variant="h4" sx={{ my: 2 }}>
        You still have a question?
      </Typography>
      <Typography sx={{ mb: 6, color: 'text.secondary' }}>
        If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!
      </Typography>

    </Box>
  );
};

export default HelpFooter;
