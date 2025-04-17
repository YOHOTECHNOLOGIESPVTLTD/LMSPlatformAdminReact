// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

// ** Custom Components
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';

// ** Utils Import
import { getInitials } from 'utils/get-initials';

// import { getUserById } from '../services/viewUserServices';

import UserEditDialog from '../UserEditDialog';

// import { MenuItem, TextField } from '@mui/material';

const UserViewLeft = ({ userData, id, setRefetch }) => {
  const statusColors = {
    1: 'success',
    pending: 'warning',
    0: 'error'
  };

  // ** States
  const [openEdit, setOpenEdit] = useState(false);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 8, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {userData?.institution_users?.image ? (
              <CustomAvatar
                src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${userData?.institution_users?.image}`}
                variant="rounded"
                alt={userData?.name}
                sx={{ width: 100, height: 100, mb: 4 }}
              />
            ) : (
              <CustomAvatar skin="light" variant="rounded" sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}>
                {userData?.name ? getInitials(userData?.name) : ''}
              </CustomAvatar>
            )}
            <Typography variant="h4" sx={{ mb: 2 }}>
              {userData?.name}
            </Typography>
            <CustomChip
              rounded
              skin="light"
              size="small"
              label={userData?.role_groups?.role?.name}
              color={'warning'}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase',fontWeight:'bold' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email   :</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.institution_users?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Designation:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.institution_users?.designation}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status :</Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={userData.is_active == '1' ? 'Active' : 'InActive'}
                  color={statusColors[userData.is_active]}
                  sx={{
                    textTransform: 'capitalize'
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{9898765645}</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit Details
            </Button>
          </CardActions>
        </Card>
        <UserEditDialog id={id} userData={userData} openEdit={openEdit} handleEditClose={handleEditClose} setRefetch={setRefetch} />
      </Grid>
    </Grid>
  );
};

export default UserViewLeft;
