import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomAvatar from 'components/mui/avatar';
import InstituteIcon from 'assets/icons/Dashboard/instituteIcon';

const CardStatsModern = ({ sx, stats, title, subtitle, avatarSize = 56, avatarColor = 'primary', background }) => {
  return (
    <Card
      sx={{
        ...sx,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1rem',
        background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
        color: '#333',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        ':hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: '1.5rem' }}>
        <CustomAvatar
          skin="light"
          variant="rounded"
          sx={{
            width: avatarSize,
            height: avatarSize,
            background: `linear-gradient(135deg, ${background} 30%, ${avatarColor} 100%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InstituteIcon width="24px" height="24px" color="#fff" />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>{title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: avatarColor, fontSize: '1.75rem' }}>{stats}</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>{subtitle}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardStatsModern;
