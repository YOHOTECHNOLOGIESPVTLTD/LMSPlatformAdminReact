import { Avatar, AvatarGroup, Box, Button, Card, CardContent, Grid, Typography, TextField, MenuItem } from '@mui/material';
import Header from 'components/Header';
import GroupSkeleton from 'components/cards/Skeleton/GroupSkeleton';
import OptionsMenu from 'components/option-menu';
import StatusChangeDialog from 'components/modal/DeleteModel';
import GroupDeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';
import { selectLoading as selectGroupLoading, selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { setGroups } from 'features/user-management/groups-page/redux/groupSlice';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import { deleteGroup, searchGroups, updateStatus } from 'features/user-management/groups-page/services/groupService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GroupManagement = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeleteGroupId, setSelectedDeleteGroupId] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

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

  const handleStatusValue = (event, item) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(item);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateStatus(data);
    if (response.success) {
      toast.success(response.message);
      dispatch(getAllGroups(selectedBranchId));
    } else {
      toast.error(response.message);
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
        <Card sx={{ minHeight: 175 }}>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {item?.identity}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <TextField
                size="small"
                select
                width={100}
                label="Status"
                SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item.identity) }}
              >
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </TextField>

              <OptionsMenu
                menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                options={[
                  {
                    text: 'View',
                    menuItemProps: {
                      component: Link,
                      to: 'view',
                      state: { group: item.role }
                    }
                  },
                  {
                    text: 'Delete',

                    menuItemProps: {
                      onClick: () => {
                        setSelectedDeleteGroupId(item?.role?.id);
                        setDeleteDialogOpen(true);
                      }
                    }
                  },
                  {
                    text: 'Edit',
                    menuItemProps: {
                      component: Link,
                      to: `edit/${item.id}`,
                      state: { id: item.id, name: item.identity }
                    }
                  }
                ]}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Grid>
      <Header title="Groups" handleSearch={handleSearch} searchQuery={searchQuery} />
      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ cursor: 'pointer' }}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={5}>
                  <Box
                    sx={{
                      height: '100%',
                      minHeight: 175,
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
                      <Button variant="contained" component={Link} to={'add'} sx={{ mb: 3, whiteSpace: 'nowrap' }}>
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
      )}
      <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />
    </Grid>
  );
};
export default GroupManagement;
