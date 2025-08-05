import MuiTimeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import OptionsMenu from 'components/option-menu';
import { useState, useEffect } from 'react';
// import { getUserActivityLog } from 'features/user-management/users-page/services/userServices';


const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewAccount = ({ id }) => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    getUserLog(id);
  }, [id]);

  const getUserLog = async (userId) => {
    try {
      const data = { user_id: userId };
      const result = await getUserActivityLog(data);
      if (result.success) {
        console.log('ActivityLog:', result.data);
        setActivityLog(result.data);
      } else {
        console.error('Error fetching logs:', result.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const handleOptionClick = (option) => {
    console.log(`Selected Option: ${option}`);
    switch (option) {
      case 'Share timeline':
        alert('Sharing timeline...');
        break;
      case 'Suggest edits':
        alert('Suggesting edits...');
        break;
      case 'Report bug':
        alert('Reporting bug...');
        break;
      default:
        alert('Unknown action');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Typography variant="h3" fontWeight="bold">User Activity Timeline</Typography>}
            action={
              <OptionsMenu
                options={['Share timeline', 'Suggest edits', 'Report bug']}
                onOptionSelect={handleOptionClick} 
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
              />
            }
          />
          <CardContent>
            <Timeline>
              {activityLog.length > 0 ? (
                activityLog.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="warning" />
                      {index < activityLog.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ mb: (theme) => `${theme.spacing(3)} !important` }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="h6" sx={{ mr: 2 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          Today
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 3 }}>
                        {item.description}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2,fontWeight:'bold' }}>
                  No Activity Available.
                </Typography>
              )}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewAccount;
