// ** Next Imports
import { Link } from 'react-router-dom';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
// ** Utils Import
import { getInitials } from 'utils/get-initials';

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const userRoleObj = {
  Administrator: 'success',
  Manager: 'secondary'
};

// ** renders client column
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
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
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
    field: 'fullName',
    headerName: 'User Admin',
    renderCell: ({ row }) => {
      const { fullName, email } = row;

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
              {fullName}
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
    field: 'contact',
    headerName: 'Contact',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.contact}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'role',
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <CustomChip rounded skin="light" size="small" label={row.role} color={userRoleObj[row.role]} sx={{ textTransform: 'capitalize' }} />
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

const UserList = () => {
  const store = [
    {
      id: 1,
      billing: 'Auto Debit',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'Administrator',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      billing: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      role: 'Manager',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 3,
      billing: 'Manual - Cash',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      role: 'Administrator',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 4,
      billing: 'Auto Debit',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      role: 'Administrator',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 5,
      billing: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      role: 'Manager',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 6,
      billing: 'Manual - Cash',
      fullName: 'Silvain Halstead',
      company: 'Jaxbean PVT LTD',
      role: 'Manager',
      username: 'shalstead5',
      country: 'China',
      contact: '(958) 973-3093',
      email: 'shalstead5@shinystat.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '',
      avatarColor: 'error'
    }
  ];

  return (
    <Card>
      <DataGrid autoHeight rowHeight={80} rows={store} columns={columns} disableRowSelectionOnClick />
    </Card>
  );
};

export default UserList;
