// ** React Imports
// ** React Imports
// import { useState } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'


const EditModel = ({toggle,open}) => {

    // Handle Edit dialog
//   const [openEdit, setOpenEdit] = useState(false)
//   const handleEditClickOpen = () => setOpenEdit(!openEdit);
//   const toggle = () => setOpenEdit(false)
  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit User Information
      </DialogTitle>
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(8)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant="body2" id="user-view-edit-description" sx={{ textAlign: 'center', mb: 7 }}>
          Updating user details will receive a privacy audit.
        </DialogContentText>
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" placeholder="John Doe"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                placeholder="John.Doe"
                // defaultValue={data.username}
                InputProps={{ startAdornment: <InputAdornment position="start">@</InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="email" label="Billing Email" defaultValue placeholder="john.doe@gmail.com" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Status">
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="TAX ID" defaultValue="Tax-8894" placeholder="Tax-8894" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Contact" placeholder="723-348-2344"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Language" defaultValue="English">
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Country" defaultValue="USA">
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Spain">Spain</MenuItem>
                <MenuItem value="Russia">Russia</MenuItem>
                <MenuItem value="France">France</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Use as a billing address?"
                control={<Switch defaultChecked />}
                sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant="contained" sx={{ mr: 2 }} onClick={toggle}>
          Submit
        </Button>
        <Button variant="tonal" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModel;
