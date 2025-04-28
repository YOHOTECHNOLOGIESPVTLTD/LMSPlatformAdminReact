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
import { getImageUrl } from 'themes/imageUtlis';
import { imagePlaceholder } from 'lib/placeholders';
import { FormateDateToPastAsTextValue } from 'utils/formatDate';
// import { priorityColors } from 'utils';

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
    handleUserProfileLeftSidebarToggle,handleSelectTickets
  } = props;

  // ** States
  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [active, setActive] = useState(null);
  console.log(store);

  const statusColor = {
    opened: "#7367F0",
    closed: "#EBA13A",
    resolved : "#280587"
  };

  const priorityColors = {
    High: '#FF6B6B',
    Medium: '#FFD93D',
    Low: '#B2DFDB',
    Urgent: '#D32F2F',
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
    // })

    return () => {
      setActive(null);
      dispatch(removeSelectedChat());
    };
  }, []);

  const renderContacts = () => {
    if (store && store.data && store.data.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <ListItem sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', 
          }}> 
            <Typography sx={{ 
              color: 'text.secondary' ,
             fontWeight: 'bold',
             textAlign: 'center',
             fontSize: '1.2rem',}}>
               No Contacts Found 
            </Typography>
          </ListItem>
        );
      } else {
        const arrToMap = query.length && filteredContacts.length ? filteredContacts : store.data;

        return arrToMap !== null
          ? arrToMap.map((contact, index) => {
              return (
                <Card key={index} onClick={()=>handleSelectTickets(contact)} sx={{ mb: 2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)", backgroundColor: "#ffffff",
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: "pointer",
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 .5rem 1.5rem 0 rgba(38,43,67,.25)',
                  },
                  animation: 'fadeIn 0.5s forwards',
                 }}>
                  <CardContent sx={{}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        alt={contact?.user?.first_name}
                        src={ contact?.user?.image ? getImageUrl(contact?.user?.image) : imagePlaceholder}
                        sx={{ width: 40, height: 40, bgcolor: contact.avatarColor }}
                      >
                        {!contact.user && getInitials(contact.user.first_name + contact?.user?.last_name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="h5">{contact.user.first_name}</Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box>
                        <Typography variant="body3" color="text.secondary">
                          {FormateDateToPastAsTextValue(contact?.date)}
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
                        {contact.query}
                      </Typography>

                      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
                        <CustomChip rounded size="small" skin="light" sx={{ backgroundColor: statusColor[contact?.status], color: "white"}} color={'info'} label={contact?.status} />
                        <CustomChip rounded size="small" skin="light" sx={{ backgroundColor: priorityColors[contact?.priority],color: "white"}}   label={contact?.priority} />
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

  // const handleFilter = (e) => {
  //   setQuery(e.target.value);
  //   if (store.chats !== null && store.contacts !== null) {
  //     const searchFilterFunction = (contact) => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase());
  //     const filteredChatsArr = store.chats.filter(searchFilterFunction);
  //     const filteredContactsArr = store.contacts.filter(searchFilterFunction);
  //     setFilteredChat(filteredChatsArr);
  //     setFilteredContacts(filteredContactsArr);
  //   }
  // };
  const handleFilter = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
  
    if (store && store.data) {
      const filtered = store.data.filter((contact) => {
        const fullName = `${contact?.user?.first_name || ''} ${contact?.user?.last_name || ''}`.toLowerCase();
        const queryText = contact?.query?.toLowerCase() || '';
        return fullName.includes(searchQuery) || queryText.includes(searchQuery);
      });
  
      setFilteredContacts(filtered);
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
            pt:"20px",
            pb: "19px",
            px: 5,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#111B21",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
            sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important'},
            "& .MuiFormControl-root-MuiTextField-root .MuiInputBase-root" : { backgroundColor: "white",color: "wheat"} }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: "wheat" }}>
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

        <Box sx={{ height: `calc(100% - 4.0625rem)`, overflow: ' hidden', backgroundColor: "#f7f8fc",boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)", }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: (theme) => theme.spacing(5, 3, 3) }}>
              {/* <Typography variant="h5" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                Chats
              </Typography> */}
              {/* <List sx={{ mb: 5, p: 0 }}>{renderChats()}</List> */}
              {/* <Box sx={{display:"flex",justifyContent:"space-between"}}>
              <Typography variant="h5" sx={{ ml: 1, mb: 3.5, color: 'primary.main' }}>
                My Open tickets (6)
              </Typography>
              <Box>
              <Icon icon="mingcute:down-fill" color="primary.main" />
              </Box>
              </Box> */}
        
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