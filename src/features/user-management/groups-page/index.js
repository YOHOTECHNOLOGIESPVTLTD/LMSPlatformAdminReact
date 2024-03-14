import { Avatar, AvatarGroup, Box, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import Header from 'components/Header';
import GroupSkeleton from 'components/cards/Skeleton/GroupSkeleton';
import Icon from 'components/icon';
import GroupDeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';
import { selectLoading as selectGroupLoading, selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { setGroups } from 'features/user-management/groups-page/redux/groupSlice';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import { deleteGroup, searchGroups } from 'features/user-management/groups-page/services/groupService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const GroupManagement = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeleteGroupId, setSelectedDeleteGroupId] = useState('');

  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const navigate = useNavigate();

  console.log(groups);
  useEffect(() => {
    dispatch(getAllGroups(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const AddRoleAvatar = require('assets/images/avatar/add-role.png');

  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroup(selectedDeleteGroupId);

      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    try {
      setSearchQuery(value);
      const result = await searchGroups(value);

      if (result.success) {
        console.log('Search results:', result.data);
        dispatch(setGroups(result.data));
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderCards = () => {
    return groups?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card sx={{ minHeight: 140 }}>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.users?.length} users`}</Typography>
              <AvatarGroup
                max={4}
                className="pull-up"
                sx={{
                  '& .MuiAvatar-root': { width: 32, height: 32, fontSize: (theme) => theme.typography.body2.fontSize }
                }}
              >
                {item?.users?.map((user, index) => (
                  <Avatar key={index} alt={item?.name} src={`${process.env.REACT_APP_PUBLIC_API_URL}/public/${user?.name}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {item?.role?.name}
                </Typography>

                <Typography
                  component={Link}
                  to={`edit/${item.role.id}`}
                  state={{ id: item.role.id, name: item.role.name }}
                  sx={{ color: 'primary.main', textDecoration: 'none', boxShadow: 'none' }}
                >
                  Edit Role
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box component={Link} to={'view'} state={{ group: item }}>
                  <IconButton size="small" sx={{ color: 'dark.dark' }}>
                    <Icon icon="tabler:eye-filled" />
                  </IconButton>
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    setSelectedDeleteGroupId(item.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Icon icon="tabler:archive" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid>
          <Header title="Groups" handleSearch={handleSearch} searchQuery={searchQuery} />

          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('add')}>
                <Grid container sx={{ height: '100%' }}>
                  <Grid item xs={5}>
                    <Box
                      sx={{
                        height: '100%',
                        minHeight: 140,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                      }}
                    >
                      <img height={122} alt="add-role" src={AddRoleAvatar} />
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent sx={{ pl: 0, height: '100%' }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Button variant="contained" sx={{ mb: 3, whiteSpace: 'nowrap' }} onClick={() => navigate('add')}>
                          Add New Group
                        </Button>
                        <Typography sx={{ color: 'text.secondary' }}>Add group, if it doesnt exist.</Typography>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {renderCards()}
          </Grid>
          <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />
        </Grid>
      )}
    </>
  );
};
export default GroupManagement;
