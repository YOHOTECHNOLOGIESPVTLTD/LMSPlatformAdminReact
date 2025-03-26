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
// ** Icon Imports
import OptionsMenu from 'components/option-menu';
import { useEffect, useState } from 'react';
// import { GetInstituteActivityLog } from 'features/institute-management/services/instituteService';
import client from './../../../../api/index';
import { Chip } from '@mui/material';
// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const InstituteActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const data = {
      page:"1",
    };
    getActivityLog(data);
  }, []);

  const getActivityLog = async (data) => {
    const response = await client.activity.get(data);      
      console.log(response.data);
      console.log(response.data.status);
    if (response.data.status=="success") {
      setActivityLog(response.data.data);
    }
  };


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="User Activity Timeline"
            action={
              <OptionsMenu
                options={['Share timeline', 'Suggest edits', 'Report bug']}
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
              />
            }
          />
          <CardContent>
          <Timeline>
              {activityLog.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="warning" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ mb: (theme) => `${theme.spacing(3)} !important`,px:2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Chip  color='primary' label={item.title}/>
                       
                    </Box>
                    <Box
                      sx={{
                        p: 3, // Padding
                        border: '1px solid #e0e0e0', // Subtle border for structure
                        borderRadius: 4, // Rounded corners for modern look
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                        backgroundColor: '#ffffff', // Clean white background
                        maxWidth: '450px', // Restrict width for compactness
                        margin: 'auto', // Center alignment
                        mt: 3, // Margin-top for spacing
                        '&:hover': {
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' // Slight hover effect
                        }
                      }}
                    >
                      <Box sx={{display:"flex", justifyContent:"space-between"}}>

                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2, // Margin-bottom
                          color: '#3f51b5', // Primary color
                          fontWeight: 'bold' // Bold text
                        }}
                      >
                        {item.model}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {new Date(item?.timestamp).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true // Use false for 24-hour format
                        })}
                      </Typography>
                      </Box>
                      <Typography variant="body1" sx={{
                          color: '#616161', // Neutral text color
                          lineHeight: 1.6 // Better readability
                        }}>
                        {item.action}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#616161', // Neutral text color
                          lineHeight: 1.6 // Better readability
                        }}
                      >
                        {item.details}
                      </Typography>
                    
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            {/* <Timeline>
              {activityLog.map((log, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="warning" />
                    <TimelineConnector />
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
                        {log?.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        Today
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {log?.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt="Avatar" src="/images/avatars/3.png" sx={{ width: 38, height: 38, mr: 3 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                          Leona Watkins (Client)
                        </Typography>
                        <Typography variant="caption">CEO of Infibeam</Typography>
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InstituteActivityLog;
