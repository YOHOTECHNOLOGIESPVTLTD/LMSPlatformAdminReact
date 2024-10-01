import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import InstituteIcon from 'assets/icons/Dashboard/instituteIcon';

const CardStatsHorizontalWithDetails = (props) => {
  const { sx,  stats, title, subtitle, avatarSize = 56, avatarColor = 'primary', background } = props;
  
  return (
    <Card
      sx={{
        ...sx,
        position: 'relative', 
        overflow: 'hidden', 
        borderRadius: '0.625rem',
        backgroundClip: 'padding-box',
        cursor: 'text',
        boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
        maxWidth: '330px',
        borderBottom: `2px solid ${avatarColor}`,
        transition: 'transform 0.3s ease-in-out',
        ':hover': {
          transform: 'translateY(-5px)', 
        },
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderBottom: `2px solid ${avatarColor}`,
          borderRadius: '0.625rem',
          transition: 'all 0.2s ease-in-out',
          zIndex: -1,
        },
        ':hover::after': {
          borderBottomWidth: '3px', 
          borderBottomColor: avatarColor, 
        },
      }}
    >
      <CardContent sx={{ gap: 3, display: 'flex'}}>
        <CustomAvatar
          skin="light"
          variant="rounded"
          sx={{ width: avatarSize, height: avatarSize, backgroundColor: background }}
        >
          <InstituteIcon width="20px" height="20px" color={avatarColor} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary', fontWeight: 500,  }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ color : avatarColor, fontSize: "16px"}} >{stats}</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardStatsHorizontalWithDetails;
