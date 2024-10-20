// ** MUI Components
import { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// ** Icon Imports
// import { Link } from 'react-router-dom';
import { instituteChangeStatus } from 'features/institute-management/services/instituteService';
import toast from 'react-hot-toast';
import StatusDialog from 'components/modal/DeleteModel';
import { imagePlaceholder } from 'lib/placeholders';
import { getImageUrl } from 'themes/imageUtlis';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}));

const UserViewLeft = ({ institute }) => {
  const [statusOpen, setStatusDialogOpen] = useState(false);

  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        alt="profile-header"
        image="https://th.bing.com/th/id/R.2609fa18d5091dc020ae92e8ffde827d?rik=EFdtfi8dYkunsA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fBeautiful-Gradient-Wallpaper.jpg&ehk=wHC%2bBEdWF6fKy71W%2byG8l40bZoD6JV35mjLfEsDFAdQ%3d&risl=&pid=ImgRaw&r=0"
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -5,
          display: 'flex',

          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'space-between'
        }}
      >
        <ProfilePicture src={`${institute?.logo?getImageUrl(institute?.logo):imagePlaceholder}`} alt="profile-picture" />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            mt: 1,
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box
            sx={{
              mt: 1.75,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: ['center', 'flex-start']
            }}
          >
            <Typography variant="h3" sx={{ mr: 4, mt: 5 }}>
              {institute?.institute_name}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mr: 4,
                mt: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 300
              }}
            >
              {institute?.description}
            </Typography>
          </Box>

          <TextField
            select
            label="Status"
            sx={{ ml: 3 }}
            defaultValue={institute?.is_active}
            onChange={async (e) => {
              const data = {
                id: institute?.uuid,
                status: e.target.value
              };
              const result = await instituteChangeStatus(data);
              setStatusDialogOpen(true);
              if (result.success) {
                toast.success(result.message);
              } else {
                toast.error(result.message);
              }
            }}
          >
            <MenuItem value={'true'}>Active</MenuItem>
            <MenuItem value={'false'}>Inactive</MenuItem>
          </TextField>

          {/* <Box component={Link} to={`user-management`} target="_blank" variant="contained" sx={{ '& svg': { mr: 2 } }}>
            Go to Dashboard
          </Box> */}
          <StatusDialog
            open={statusOpen}
            setOpen={setStatusDialogOpen}
            description="Are you sure you want to Change Status"
            title="Status"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserViewLeft;
