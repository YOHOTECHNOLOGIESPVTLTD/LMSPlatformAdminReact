import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { useState } from 'react';

const DeleteGroupDialog = (props) => {
  const { open, setOpen, handleDeleteGroup } = props;
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
            <Typography>You wont be able to revert group!</Typography>
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
              handleDeleteGroup();
              handleConfirmation('yes');
            }}
          >
            Yes, Delete Group!
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
              {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
            </Typography>
            <Typography>{userInput === 'yes' ? 'Group has been deleted.' : 'Cancelled group deletion :)'}</Typography>
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

export default DeleteGroupDialog;
