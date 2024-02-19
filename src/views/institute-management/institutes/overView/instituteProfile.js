// ** React Imports
import { useEffect, useState } from 'react';
import axios from 'axios';


// ** Next Import
// import { useRouter } from 'next/router'
// import useRouter from 'react-router-dom'
// ** MUI Components
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiTabList from '@mui/lab/TabList';
import CircularProgress from '@mui/material/CircularProgress';
import ActivityTimeline from './profile/ActivityTimeline';
import {useLocation} from 'react-router-dom'

// ** Icon Imports
import Icon from 'components/icon';
// ** Demo Components
import Teams from './teams';
import Profile from './profile';
// import Projects from './projects';
import Connections from './connections';
import UserProfileHeader from './UserProfileHeader';
// import IconButton from 'theme/overrides/icon-button';
import ProfileEdit from './profile/profileEdit';
// import { Button, IconButton } from '@mui/material';
// import { useSearchParams } from 'react-router-dom';

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}));

const InstituteProfile = () => {
  const location = useLocation();

  useEffect(() => {
    setInstituteID(location.state.id);
  }, [location]);

  console.log(location);

  const [instituteID, setInstituteID] = useState(location?.state?.id);
  const data =  {
    about: [
      { property: 'Full Name', value: 'John Doe', icon: 'tabler:user' },
      { property: 'Status', value: 'active', icon: 'tabler:check' },
      { property: 'Role', value: 'Developer', icon: 'tabler:crown' },
      { property: 'Country', value: 'USA', icon: 'tabler:flag' },
      { property: 'Language', value: 'English', icon: 'tabler:language' }
    ],
    contacts: [
      { property: 'Contact', value: '(123) 456-7890', icon: 'tabler:phone-call' },
      { property: 'Skype', value: 'john.doe', icon: 'tabler:brand-skype' },
      { property: 'Email', value: 'john.doe@example.com', icon: 'tabler:mail' }
    ],
    teams: [
      { property: 'Backend Developer', value: '(126 Members)', icon: 'tabler:brand-github', color: 'primary' },
      { property: 'React Developer', value: '(98 Members)', icon: 'tabler:brand-react', color: 'info' }
    ],
    overview: [
      { property: 'Task Compiled', value: '13.5k', icon: 'tabler:check' },
      { property: 'Connections', value: '897', icon: 'tabler:users' },
      { property: 'Projects Compiled', value: '146', icon: 'tabler:layout-grid' }
    ],
    connections: [
      {
        isFriend: false,
        connections: '45',
        name: 'Cecilia Payne',
        avatar: '/images/avatars/8.png'
      },
      {
        isFriend: true,
        connections: '1.32k',
        name: 'Curtis Fletcher',
        avatar: '/images/avatars/3.png'
      },
      {
        isFriend: true,
        connections: '125',
        name: 'Alice Stone',
        avatar: '/images/avatars/12.png'
      },
      {
        isFriend: false,
        connections: '456',
        name: 'Darrell Barnes',
        avatar: '/images/avatars/7.png'
      },
      {
        isFriend: false,
        connections: '1.2k',
        name: 'Eugenia Moore',
        avatar: '/images/avatars/6.png'
      }
    ],
    teamsTech: [
      {
        members: 72,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'React Developers',
        avatar: '/images/icons/project-icons/react-label.png'
      },
      {
        members: 122,
        chipText: 'Support',
        ChipColor: 'primary',
        title: 'Support Team',
        avatar: '/images/icons/project-icons/support-label.png'
      },
      {
        members: 7,
        ChipColor: 'info',
        chipText: 'Designer',
        title: 'UI Designer',
        avatar: '/images/icons/project-icons/figma-label.png'
      },
      {
        members: 289,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'Vue.js Developers',
        avatar: '/images/icons/project-icons/vue-label.png'
      },
      {
        members: 24,
        chipText: 'Marketing',
        ChipColor: 'secondary',
        title: 'Digital Marketing',
        avatar: '/images/icons/project-icons/twitter-label.png'
      }
    ]
  }

  // ** State
  const tab = "profile"
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true)
console.log(activeTab)
  // ** Hooks
  // const router = useRouter()
  const hideText = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleChange = (event, value) => {
    setIsLoading(false);
    setActiveTab(value);
    // router
    //   .push({
    //     pathname: `/pages/user-profile/${value.toLowerCase()}`
    //   })
    //   .then(() => setIsLoading(false))
  };
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const [instituteData, setinstituteData] = useState([]);


const authToken = localStorage.getItem('token')

  const GetInstituteById = async () => {

    console.log('instituteId',instituteID);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url:`${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/institute-management/institutes/read-by-id`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      params: { id: instituteID }
    };
    await axios
      .request(config)
      .then((response) => {
        // console.log(response.data.data);
        setinstituteData(response.data.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
    // setOpen(true);
  };
  console.log('instituteData:',instituteData)

  useEffect(() => {
    GetInstituteById();
  }, [])
  


  const tabContentList = {
    profile: <Profile data={instituteData} />,
    teams: <Teams data={instituteData} />,
    projects: <Connections data={instituteData} />,
    connections: <ActivityTimeline data={instituteData} instituteID={instituteID} />
  };

  return (
    <Grid container spacing={6}>
      

      <Grid item xs={12}>
        <UserProfileHeader  instituteData={instituteData} />
       
      </Grid>
      
      {/* {activeTab === undefined ? null : ( */}
      <Grid item xs={12}>
    
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{justifyContent:'space-between',display:'flex'}}>
              <TabList variant="scrollable" scrollButtons="auto" onChange={handleChange} aria-label="customized tabs example">
                <Tab
                  value="profile"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize="1.125rem" icon="tabler:user-check" />
                      {!hideText && 'Profile'}
                    </Box>
                  }
                />
                <Tab
                  value="teams"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize="1.125rem" icon="tabler:layout-grid" />
                      {!hideText && 'Gallery'}
                    </Box>
                  }
                />
                <Tab
                  value="projects"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize="1.125rem" icon="tabler:lock" />
                      {!hideText && 'Security'}
                    </Box>
                  }
                />
                <Tab
                  value="connections"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize="1.125rem" icon="tabler:link" />
                      {!hideText && 'Activity'}
                    </Box>
                  }
                />
              </TabList>
              <ProfileEdit data={instituteData} />
            </Grid>
            <Grid item xs={12} >
           
              {isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                 
                </TabPanel>
              )}
            </Grid>
          </Grid>
        
        </TabContext>
      </Grid>
      {/* )} */}

    </Grid>
  );
};

export default InstituteProfile;
