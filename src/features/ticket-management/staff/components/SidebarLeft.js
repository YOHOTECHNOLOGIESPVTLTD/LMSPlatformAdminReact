// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CustomChip from 'components/mui/chip';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Import
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CustomTextField from 'components/mui/text-field';
import UserProfileLeft from './UserProfileLeft';

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>;
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>;
  }
};

const SidebarLeft = (props) => {
  const {
    store,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    userStatus,
    getInitials,
    sidebarWidth,
    setUserStatus,
    leftSidebarOpen,
    removeSelectedChat,
    userProfileLeftOpen,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle
  } = props;

  // ** States
  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [active, setActive] = useState(null);
  console.log('store',store);

  useEffect(() => {
    if (store && store.chats) {
      if (active !== null) {
        if (active.type === 'contact' && active.id === store.chats[0].id) {
          setActive({ type: 'chat', id: active.id });
        }
      }
    }
  }, [store, active]);
  useEffect(() => {
    setActive(null);
    dispatch(removeSelectedChat());
    // })

    return () => {
      setActive(null);
      dispatch(removeSelectedChat());
    };
  }, []);

  const renderContacts = () => {
    if (store && store.contacts && store.contacts.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>No Contacts Found</Typography>
          </ListItem>
        );
      } else {
        const arrToMap = query.length && filteredContacts.length ? filteredContacts : store.contacts;

        return arrToMap !== null
          ? arrToMap.map((contact, index) => {
              return (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent sx={{}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        alt={contact.fullName}
                        src={contact.avatar ? contact.avatar : undefined}
                        sx={{ width: 40, height: 40, bgcolor: contact.avatarColor }}
                      >
                        {!contact.avatar && getInitials(contact.fullName)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="h5">{contact.fullName}</Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box>
                        <Typography variant="body3" color="text.secondary">
                          2 mins
                        </Typography>
                      </Box>
                    </Box>

                    <Box style={{ ml: 2, mt: 2 }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        noWrap
                        sx={{ mt: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {contact.about}
                      </Typography>

                      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
                        <CustomChip rounded size="small" skin="light" color={'info'} label={'Open'} />
                        <CustomChip rounded size="small" skin="light" color={'error'} label={'• High Priority'} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          : null;
      }
    }
  };

  const handleFilter = (e) => {
    setQuery(e.target.value);
    if (store.chats !== null && store.contacts !== null) {
      const searchFilterFunction = (contact) => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase());
      const filteredChatsArr = store.chats.filter(searchFilterFunction);
      const filteredContactsArr = store.contacts.filter(searchFilterFunction);
      setFilteredChat(filteredChatsArr);
      setFilteredContacts(filteredContactsArr);
    }
  };

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            width: sidebarWidth,
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.drawer - 1
          }
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 5,
            display: 'flex',
            alignItems: 'center',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`
          }}
        >
          {store && store.userProfile ? (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              sx={{ mr: 3 }}
              onClick={handleUserProfileLeftSidebarToggle}
              badgeContent={
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    color: `${statusObj[userStatus]}.main`,
                    backgroundColor: `${statusObj[userStatus]}.main`,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`
                  }}
                />
              }
            >
              <MuiAvatar
                src={store.userProfile.avatar}
                alt={store.userProfile.fullName}
                sx={{ width: '2.375rem', height: '2.375rem', cursor: 'pointer' }}
              />
            </Badge>
          ) : null}
          <CustomTextField
            fullWidth
            value={query}
            onChange={handleFilter}
            placeholder="Search for contact..."
            sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                  <Icon fontSize="1.25rem" icon="tabler:search" />
                </InputAdornment>
              )
            }}
          />
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Icon icon="tabler:x" />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 4.0625rem)`, overflow: ' hidden' }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: (theme) => theme.spacing(5, 3, 3) }}>
              {/* <Typography variant="h5" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                Chats
              </Typography> */}
              {/* <List sx={{ mb: 5, p: 0 }}>{renderChats()}</List> */}
              <Box sx={{display:"flex",justifyContent:"space-between"}}>
              <Typography variant="h5" sx={{ ml: 1, mb: 3.5, color: 'primary.main' }}>
                My Open tickets (6)
              </Typography>
              <Box>
              <Icon icon="mingcute:down-fill" color="primary.main" />
              </Box>
              </Box>
        
              <List sx={{ p: 0 }}>{renderContacts()}</List>
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>

      <UserProfileLeft
        store={store}
        hidden={hidden}
        statusObj={statusObj}
        userStatus={userStatus}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        userProfileLeftOpen={userProfileLeftOpen}
        handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
      />
    </div>
  );
};

export default SidebarLeft;