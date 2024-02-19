// ** MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icon Imports
import Icon from 'components/icon';

const renderList = (arr) => {
  if (arr) {
    return (
      <>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="Tabler:'plus'" />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           Name:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.name}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           Registered:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.registered_date}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Created at: 
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.created_at}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Updated at:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.updated_at}</Typography>
        </Box>
      </Box>
      </>
     
    );
  } else {
    return null;
  }
};
const renderContactList = (arr) => {
  if (arr) {
    return (
      <>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Email:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.email}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           Phone.No:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.phone}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           Alt Phone.No
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.alternate_number}</Typography>
        </Box>
      </Box>
      <Box sx={{ columnGap: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Address:
          </Typography>
        </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>
        
        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Line 1:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.address_line_2}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Line 2:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.address_line_1}</Typography>
        </Box>
      </Box>
      </>
     
    );
  } else {
    return null;
  }
};

const renderSocialList = (arr) => {
  if (arr) {
    return (
      <>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Facebook:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.facebook}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           Instagram:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.instagram}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
           LinkedIn:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.linkedin}</Typography>
        </Box>
      </Box>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Pinterest:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{arr.pinterest}</Typography>
        </Box>
      </Box>
     
      </>
     
    );
  } else {
    return null;
  }
};

const renderDescription = (arr) => {
  if (arr) {
    return (
      <>
       <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon={'item.icon'} />
        </Box>

        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Facebook:
          </Typography> */}
          <Typography sx={{ color: 'text.secondary' }}>{arr.description}</Typography>
        </Box>
      </Box>
      
     
      </>
     
    );
  } else {
    return null;
  }
};
//     return arr.map((item, index) => {
//       return (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             '&:not(:last-of-type)': { mb: 3 },
//             '& svg': { color: `${item.color}.main` }
//           }}
//         >
//           <Icon fontSize="1.25rem" icon={item.icon} />

//           <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
//             {item.property.charAt(0).toUpperCase() + item.property.slice(1)}
//           </Typography>
//           <Typography sx={{ color: 'text.secondary' }}>{item.value.charAt(0).toUpperCase() + item.value.slice(1)}</Typography>
//         </Box>
//       );
//     });
//   } else {
//     return null;
//   }
// };
const AboutOverivew = (props) => {
  const { data } = props;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ display: 'flex' }} spacing={3}>
            <Grid xs={12} sm={4}>
              <Box sx={{ mb: 6 }}>
                <Typography variant="body2" sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  About
                </Typography>
                {renderList(data)}
              </Box>
            </Grid>
            <Grid xs={12} sm={4}>
              <Box sx={{ mb: 6 }}>
                <Typography variant="body2" sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  Contacts
                </Typography>
                {renderContactList(data)}
              </Box>
            </Grid>

            <div>
              <Typography variant="body2" sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Social Links
              </Typography>
              {renderSocialList(data)}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography variant="body2" sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Description
              </Typography>
              {renderDescription(data)}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AboutOverivew;
