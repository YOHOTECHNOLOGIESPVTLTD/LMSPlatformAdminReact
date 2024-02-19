import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ModuleView = ({ open, handleViewClose }) => {
  const savedPdfUrl = require('assets/pdf.pdf');

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleViewClose}
        aria-labelledby="user-view-View"
        aria-describedby="user-view-View-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <DialogTitle
          id="user-view-View"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          View Module Information
          <IconButton onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(1)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <iframe title="PDF Viewer" src={savedPdfUrl} width="100%" height="500px" />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleView;
