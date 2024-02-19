import { useEffect, useState } from 'react';
import MuiAvatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from 'components/icon';
import { hexToRGBA } from 'utils/hex-to-rgba';
import CustomAvatar from 'components/mui/avatar';
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
    selectChat,
    getInitials,
    sidebarWidth,
    setUserStatus,
    leftSidebarOpen,
    removeSelectedChat,
    userProfileLeftOpen,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle
  } = props;

  const [query, setQuery] = useState('');
  const [filteredChat, setFilteredChat] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [active, setActive] = useState(null);
  console.log(store);
  console.log(filteredChat);

  const handleChatClick = (type, id) => {
    dispatch(selectChat(id));
    setActive({ type, id });
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };
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
    return () => {
      setActive(null);
      dispatch(removeSelectedChat());
    };
  }, []);

  const hasActiveId = (id) => {
    if (store.chats !== null) {
      const arr = store.chats.filter((i) => i.id === id);

      return !!arr.length;
    }
  };

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
              const activeCondition = active !== null && active.id === contact.id && active.type === 'contact' && !hasActiveId(contact.id);

              return (
                <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1 } }}>
                  <ListItemButton
                    disableRipple
                    onClick={() => handleChatClick(hasActiveId(contact.id) ? 'chat' : 'contact', contact.id)}
                    sx={{
                      py: 2,
                      px: 3,
                      width: '100%',
                      borderRadius: 1,
                      '&.MuiListItemButton-root:hover': { backgroundColor: 'action.hover' },
                      ...(activeCondition && {
                        background: (theme) =>
                          `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                            theme.palette.primary.main,
                            0.7
                          )} 76.47%) !important`
                      })
                    }}
                  >
                    <ListItemAvatar sx={{ m: 0 }}>
                      {contact.avatar ? (
                        <MuiAvatar
                          alt={contact.fullName}
                          src={contact.avatar}
                          sx={{
                            width: 38,
                            height: 38,
                            outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                          }}
                        />
                      ) : (
                        <CustomAvatar
                          color={contact.avatarColor}
                          skin={activeCondition ? 'light-static' : 'light'}
                          sx={{
                            width: 38,
                            height: 38,
                            fontSize: (theme) => theme.typography.body1.fontSize,
                            outline: (theme) => `2px solid ${activeCondition ? theme.palette.common.white : 'transparent'}`
                          }}
                        >
                          {getInitials(contact.fullName)}
                        </CustomAvatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        my: 0,
                        ml: 3,
                        ...(activeCondition && { '& .MuiTypography-root': { color: 'common.white' } })
                      }}
                      primary={<Typography variant="h6">{contact.fullName}</Typography>}
                      secondary={
                        <Typography noWrap sx={{ ...(!activeCondition && { color: 'text.secondary' }) }}>
                          {contact.about}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
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
            py: 2.5,
            px: 3,
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
              <Typography variant="h5" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                Batches
              </Typography>
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
