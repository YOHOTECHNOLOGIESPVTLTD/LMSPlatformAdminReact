import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
import { getInitials } from 'utils/get-initials';

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const userModeObj = {
  Online: 'success',
  Offline: 'secondary'
};

const renderClient = (row) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row.courseName ? row.courseName : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const columns = [
  {
    flex: 0.15,
    field: 'id',
    minWidth: 170,
    headerName: 'ID',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.username.toUpperCase()}
          </Typography>
        </Box>
      );
    }
  },
  {
    flex: 0.25,
    minWidth: 280,
    field: 'courseName',
    headerName: 'Course',
    renderCell: ({ row }) => {
      const { courseName, email } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              to="/apps/user/view/account"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {courseName}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'price',
    headerName: 'price',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.price}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'mode',
    headerName: 'Mode',
    renderCell: ({ row }) => {
      return (
        <CustomChip rounded skin="light" size="small" label={row.mode} color={userModeObj[row.mode]} sx={{ textTransform: 'capitalize' }} />
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    }
  }
];
const BranchTableList = () => {
  const store = [
    {
      id: 1,
      billing: 'Auto Debit',
      courseName: 'React Native',
      company: 'Yotz PVT LTD',
      role: 'editor',
      username: 'gslixby0',
      country: 'El Salvador',
      price: '(479)',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary',
      mode: 'Online'
    },
    {
      id: 2,
      billing: 'Manual - Paypal',
      courseName: 'React Js',
      company: 'Skinder PVT LTD',
      role: 'author',
      username: 'hredmore1',
      country: 'Albania',
      price: '(472)',
      email: 'hredmore1@imgur.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png',
      mode: 'Offline'
    },
    {
      id: 3,
      billing: 'Manual - Cash',
      courseName: 'React Native',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'msicely2',
      country: 'Russia',
      price: '(321)',
      email: 'msicely2@who.int',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/1.png',
      mode: 'Online'
    },
    {
      id: 4,
      billing: 'Auto Debit',
      courseName: 'React js',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'crisby3',
      country: 'China',
      price: '(923)',
      email: 'crisby3@wordpress.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '/images/avatars/3.png',
      mode: 'Online'
    },
    {
      id: 5,
      billing: 'Auto Debit',
      courseName: 'React Native',
      company: 'Aimbo PVT LTD',
      role: 'subscriber',
      username: 'mhurran4',
      country: 'Pakistan',
      price: '(669)',
      email: 'mhurran4@yahoo.co.jp',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/1.png',
      mode: 'Offline'
    },
    {
      id: 6,
      billing: 'Manual - Cash',
      courseName: 'React Js',
      company: 'Jaxbean PVT LTD',
      role: 'author',
      username: 'shalstead5',
      country: 'China',
      price: '(958)',
      email: 'shalstead5@shinystat.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '',
      avatarColor: 'error',
      mode: 'Offline'
    }
  ];

  return (
    <Card>
      <DataGrid autoHeight rowHeight={80} rows={store} columns={columns} disableRowSelectionOnClick />
    </Card>
  );
};

export default BranchTableList;
