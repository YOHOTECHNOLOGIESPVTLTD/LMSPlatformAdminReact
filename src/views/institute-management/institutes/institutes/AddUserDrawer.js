import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import StepperCustomHorizontal from './CustomHorizondalStepper';
import { Grid } from '@mui/material';
import ValidateStepper from './ValidatedStepper';
export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment style={{ maxWidth: '1500px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        + New Institute
      </Button>
      <Dialog
        className="addNewInstitute"
        // fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontSize: 17 }}>
          {'Add New Institute'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item>
              {/* <StepperCustomHorizontal /> */}
              <ValidateStepper />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
