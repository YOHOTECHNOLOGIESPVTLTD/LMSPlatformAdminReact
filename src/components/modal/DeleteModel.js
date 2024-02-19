// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// ** Icon Imports
import Icon from 'components/icon';

const DeleteDialog = (props) => {
  // ** Props
  const { open, setOpen, handleSubmit, description, title, successDescription, failureDescription } = props;

  // ** States
  const [userInput, setUserInput] = useState('yes');
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleSecondDialogClose = () => setSecondDialogOpen(false);

  const handleConfirmation = (value) => {
    handleClose();
    setUserInput(value);
    setSecondDialogOpen(true);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent
          sx={{
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 5, color: 'warning.main' }
            }}
          >
            <Icon icon="tabler:alert-circle" fontSize="5.5rem" />
            <Typography variant="h4" sx={{ mb: 3, color: 'text.secondary' }}>
              Are you sure?
            </Typography>
            <Typography>{description}!</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => {
              handleSubmit();
              handleConfirmation('yes');
            }}
          >
            Yes, {title}!
          </Button>
          <Button variant="tonal" color="secondary" onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent
          sx={{
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 5,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon fontSize="5.5rem" icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
              {userInput === 'yes' ? 'Rejected!' : 'Cancelled'}
            </Typography>
            <Typography>{userInput === 'yes' ? successDescription : `${failureDescription} :)`}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 3 }}>
          <Button variant="contained" color="success" onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
