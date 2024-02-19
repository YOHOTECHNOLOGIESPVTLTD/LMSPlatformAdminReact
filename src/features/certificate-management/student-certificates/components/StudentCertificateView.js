import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CoursePdfInput from 'features/course-management/add-course/CoursePdfInput';

const StudentCertificateView = ({ open, handleViewClose }) => {
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
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          View Certificate Information
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(1)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <CoursePdfInput />
          </Grid>
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="error" onClick={handleViewClose}>
              Cancel
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCertificateView;
