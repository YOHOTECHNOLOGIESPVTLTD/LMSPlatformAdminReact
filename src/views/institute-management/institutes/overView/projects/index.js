// ** Next Import
// import Link from 'next/link'
import { Link } from 'react-router-dom'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'components/icon'

// ** Utils Import
import { getInitials } from 'utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'components/mui/chip'
import CustomAvatar from 'components/mui/avatar'
import OptionsMenu from 'components/option-menu'

const ProjectAvatar = ({ project }) => {
  const { title, avatar, avatarColor = 'primary' } = project
  if (avatar.length) {
    return <CustomAvatar src={avatar} sx={{ width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={avatarColor} sx={{ width: 38, height: 38 }}>
        {getInitials(title)}
      </CustomAvatar>
    )
  }
}

const Projects = () => {
  const data = [
    {
      members: 28,
      daysLeft: 28,
      comments: 15,
      totalTask: 344,
      hours: '380/244',
      tasks: '290/344',
      budget: '$18.2k',
      completedTask: 328,
      deadline: '28/2/22',
      chipColor: 'success',
      startDate: '14/2/21',
      budgetSpent: '$24.8k',
      title: 'Social Banners',
      client: 'Christian Jimenez',
      avatar: '/images/icons/project-icons/social-label.png',
      description: 'We are Consulting, Software Development and Web Development Services.',
      avatarGroup: [
        { avatar: '/images/avatars/11.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' }
      ]
    },
    {
      members: 12,
      daysLeft: 15,
      comments: 236,
      totalTask: 90,
      tasks: '12/90',
      hours: '98/135',
      budget: '$1.8k',
      completedTask: 38,
      deadline: '21/6/22',
      budgetSpent: '$2.4k',
      chipColor: 'warning',
      startDate: '18/8/21',
      title: 'Admin Template',
      client: 'Jeffrey Phillips',
      avatar: '/images/icons/project-icons/react-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/4.png', name: "Kaith D'souza" },
        { avatar: '/images/avatars/5.png', name: 'John Doe' },
        { avatar: '/images/avatars/6.png', name: 'Alan Walker' }
      ],
      description: "Time is our most valuable asset, that's why we want to help you save it by creating…"
    },
    {
      members: 23,
      daysLeft: 45,
      comments: 98,
      budget: '$420',
      totalTask: 140,
      tasks: '22/140',
      hours: '880/421',
      completedTask: 95,
      chipColor: 'error',
      budgetSpent: '$980',
      deadline: '8/10/21',
      title: 'App Design',
      startDate: '24/7/21',
      client: 'Ricky McDonald',
      avatar: '/images/icons/project-icons/vue-label.png',
      description: 'App design combines the user interface (UI) and user experience (UX).',
      avatarGroup: [
        { avatar: '/images/avatars/7.png', name: 'Jimmy Ressula' },
        { avatar: '/images/avatars/8.png', name: 'Kristi Lawker' },
        { avatar: '/images/avatars/9.png', name: 'Danny Paul' }
      ]
    },
    {
      members: 62,
      comments: 120,
      daysLeft: 126,
      totalTask: 420,
      budget: '2.43k',
      tasks: '237/420',
      hours: '1.2k/820',
      completedTask: 302,
      deadline: '12/9/22',
      budgetSpent: '$8.5k',
      chipColor: 'warning',
      startDate: '10/2/19',
      client: 'Hulda Wright',
      title: 'Create Website',
      avatar: '/images/icons/project-icons/html-label.png',
      description: 'Your domain name should reflect your products or services so that your...',
      avatarGroup: [
        { avatar: '/images/avatars/10.png', name: 'Andrew Tye' },
        { avatar: '/images/avatars/11.png', name: 'Rishi Swaat' },
        { avatar: '/images/avatars/12.png', name: 'Rossie Kim' }
      ]
    },
    {
      daysLeft: 5,
      members: 98,
      comments: 20,
      totalTask: 285,
      tasks: '29/285',
      budget: '28.4k',
      hours: '142/420',
      chipColor: 'error',
      completedTask: 100,
      deadline: '25/12/21',
      startDate: '12/12/20',
      budgetSpent: '$52.7k',
      client: 'Jerry Greene',
      title: 'Figma Dashboard',
      avatar: '/images/icons/project-icons/figma-label.png',
      description: 'Use this template to organize your design project. Some of the key features are…',
      avatarGroup: [
        { avatar: '/images/avatars/12.png', name: 'Kim Merchent' },
        { avatar: '/images/avatars/6.png', name: "Sam D'souza" },
        { avatar: '/images/avatars/4.png', name: 'Nurvi Karlos' }
      ]
    },
    {
      daysLeft: 4,
      comments: 16,
      budget: '$655',
      members: 23,
      totalTask: 290,
      tasks: '29/290',
      hours: '580/445',
      completedTask: 290,
      budgetSpent: '$1.3k',
      chipColor: 'success',
      deadline: '02/11/21',
      startDate: '17/8/21',
      title: 'Logo Design',
      client: 'Olive Strickland',
      avatar: '/images/icons/project-icons/xd-label.png',
      description: 'Premium logo designs created by top logo designers. Create the branding of business.',
      avatarGroup: [
        { avatar: '/images/avatars/8.png', name: 'Kim Karlos' },
        { avatar: '/images/avatars/11.png', name: 'Katy Turner' },
        { avatar: '/images/avatars/2.png', name: 'Peter Adward' }
      ]
    }
  ]
  return (
    <Grid container spacing={6}>
      {data &&
        Array.isArray(data) &&
        data.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Card>
                <CardHeader
                  avatar={<ProjectAvatar project={item} />}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    '& .MuiCardHeader-avatar': { mr: 3 }
                  }}
                  subheader={
                    <Typography sx={{ display: 'flex', flexDirectionL: 'column', color: 'text.secondary' }}>
                      <Typography component='span' sx={{ mr: 1, fontWeight: 500 }}>
                        Client:
                      </Typography>{' '}
                      {item.client}
                    </Typography>
                  }
                  action={
                    <OptionsMenu
                      iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                      options={[
                        'Rename Project',
                        'View Details',
                        'Add to Favorites',
                        { divider: true, dividerProps: { sx: { my: theme => `${theme.spacing(2)} !important` } } },
                        { text: 'Leave Project', menuItemProps: { sx: { color: 'error.main' } } }
                      ]}
                    />
                  }
                  title={
                    <Typography
                      to='/'
                      variant='h5'
                      component={Link}
                      onClick={e => e.preventDefault()}
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      mb: 4,
                      gap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <CustomChip
                      rounded
                      size='small'
                      skin='light'
                      sx={{ height: 60 }}
                      label={
                        <>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontWeight: 500 }}>{item.budgetSpent}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{`/${item.budget}`}</Typography>
                          </Box>
                          <Typography sx={{ color: 'text.secondary' }}>Total Budget</Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1, fontWeight: 500 }}>Start Date:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.startDate}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1, fontWeight: 500 }}>Deadline:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.deadline}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
                <CardContent>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 1, fontWeight: 500 }}>All Hours:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.hours}</Typography>
                    </Box>
                    <CustomChip
                      rounded
                      size='small'
                      skin='light'
                      color={item.chipColor}
                      label={`${item.daysLeft} days left`}
                    />
                  </Box>
                  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>{`Tasks: ${item.completedTask}/${item.totalTask}`}</Typography>
                    <Typography variant='body2'>
                      {`${Math.round((item.completedTask / item.totalTask) * 100)}% Completed`}
                    </Typography>
                  </Box>
                  <LinearProgress
                    color='primary'
                    variant='determinate'
                    sx={{ mb: 3, height: 10 }}
                    value={Math.round((item.completedTask / item.totalTask) * 100)}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                        {item.avatarGroup &&
                          item.avatarGroup.map((person, index) => {
                            return (
                              <Tooltip key={index} title={person.name}>
                                <CustomAvatar src={person.avatar} alt={person.name} sx={{ height: 32, width: 32 }} />
                              </Tooltip>
                            )
                          })}
                        <Avatar sx={{ height: 32, width: 32, fontWeight: 500, fontSize: '0.75rem' }}>
                          +{item.members}
                        </Avatar>
                      </AvatarGroup>
                    </Box>
                    <Box
                      to='/'
                      component={Link}
                      onClick={e => e.preventDefault()}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '& svg': { mr: 1.5, color: 'text.secondary' }
                      }}
                    >
                      <Icon fontSize='1.5rem' icon='tabler:message-dots' />
                      <Typography sx={{ color: 'text.secondary' }}>{item.comments}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Projects
