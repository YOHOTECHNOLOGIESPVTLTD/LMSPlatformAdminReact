import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import { useState } from 'react'
// ** Icon Imports
import Icon from 'components/icon'

// ** Custom Components Imports
import CustomChip from 'components/mui/chip'

// ** Demo Components
import ChangePasswordCard from './security/ChangePasswordCard'
import TwoFactorAuthentication from './security/TwoFactorAuthentication'
import { Button } from '@mui/material'

const apiKeyList = [
  {
    title: 'Userame',
    access: 'Read Only',
    date: '28 Apr 2021, 18:20 GTM+4:10',
    key: 'myusername34'
  },
  {
    title: 'Password',
    access: 'Read Only',
    date: '12 Feb 2021, 10:30 GTM+2:30',
    key: 'admin@123'
  },
  // {
  //   title: 'Server Key 3',
  //   access: 'Full Access',
  //   date: '28 Dec 2021, 12:21 GTM+4:10',
  //   key: '2e915e59-3105-47f2-8838-6e46bf83b711'
  // }
]

const recentDeviceData = [
  {
    location: 'Switzerland',
    device: 'HP Spectre 360',
    date: '10, July 2021 20:07',
    browserName: 'Chrome on Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'info.main' } }}>
        <Icon icon='tabler:brand-windows' />
      </Box>
    )
  },
  {
    location: 'Australia',
    device: 'iPhone 12x',
    date: '13, July 2021 10:10',
    browserName: 'Chrome on iPhone',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'error.main' } }}>
        <Icon icon='tabler:device-mobile' />
      </Box>
    )
  },
  {
    location: 'Dubai',
    device: 'Oneplus 9 Pro',
    date: '14, July 2021 15:15',
    browserName: 'Chrome on Android',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'success.main' } }}>
        <Icon icon='tabler:brand-android' />
      </Box>
    )
  },
  {
    location: 'India',
    device: 'Apple iMac',
    date: '16, July 2021 16:17',
    browserName: 'Chrome on MacOS',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'secondary.main' } }}>
        <Icon icon='tabler:brand-apple' />
      </Box>
    )
  },
  {
    location: 'Switzerland',
    device: 'HP Spectre 360',
    date: '20, July 2021 21:01',
    browserName: 'Chrome on Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'info.main' } }}>
        <Icon icon='tabler:brand-windows' />
      </Box>
    )
  },
  {
    location: 'Dubai',
    device: 'Oneplus 9 Pro',
    date: '21, July 2021 12:22',
    browserName: 'Chrome on Android',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, display: 'flex', '& svg': { color: 'success.main' } }}>
        <Icon icon='tabler:brand-android' />
      </Box>
    )
  }
]


const TabConnections = () => {
const [showCard, setShowCard] = useState(false);

const changePassowrd =()=>{
  setShowCard(!showCard);
}
  return (
    <Grid container spacing={6}>
         <Grid item xs={12}>
      <Card>
        <Box sx={{justifyContent:'space-between',display:'flex'}}>
        <CardHeader title='User Credentials'/>
      
      <Button onclick={changePassowrd} sx={{mr:2}}>    {showCard ? 'x Cancel' : 'Edit'}
</Button>
        </Box>
  
        
        <CardContent>
          {apiKeyList.map(item => {
            return (
              <Box
                key={item.key}
                sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover', '&:not(:last-child)': { mb: 4 } }}
              >
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h4' sx={{ mr: 4 }}>
                    {item.title}
                  </Typography>
                  <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color='primary'
                    label={item.access}
                    sx={{ textTransform: 'uppercase' }}
                  />
                </Box>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2.5, color: 'text.secondary', fontWeight: 500 }}>{item.key}</Typography>
                  <Box component='span' sx={{ display: 'flex', cursor: 'pointer', color: 'text.disabled' }}>
                    <Icon icon='tabler:copy' />
                  </Box>
                </Box>
                <Typography sx={{ color: 'text.disabled' }}>Created on {item.date}</Typography>
              </Box>
            )
          })}
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12}>

    {showCard && (
      <ChangePasswordCard/>   
      )}
     
    </Grid>
    <Grid item xs={12}>
      <TwoFactorAuthentication />
    </Grid>
    {/* <Grid item xs={12}>
      <CreateApiKey />
    </Grid> */}

    {/* API Key List & Access Card*/}
 

    {/* Recent Devices Card*/}
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Recent Devices' />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Browser</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Device</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Location</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Recent Activities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              {recentDeviceData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.browserIcon}
                      <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                        {row.browserName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{row.device}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{row.location}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{row.date}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  </Grid>
  )
}

export default TabConnections
