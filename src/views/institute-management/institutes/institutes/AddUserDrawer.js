import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import ValidateStepper from './ValidatedStepper';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        + New Institute
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ style: { maxWidth: 'none' } }} 
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontSize: 17 }}>
          {'Add New Institute'}
        </DialogTitle>
        <DialogContent>
          <ValidateStepper />
        </DialogContent>
      </Dialog>
    </>
  );
}
