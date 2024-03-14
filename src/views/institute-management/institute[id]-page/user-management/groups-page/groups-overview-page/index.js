import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Button, Card, CardContent, Grid, Typography, TextField, MenuItem, Tooltip } from '@mui/material';
import Header from 'components/Header';
import GroupSkeleton from 'components/cards/Skeleton/GroupSkeleton';
import OptionsMenu from 'components/option-menu';
import StatusChangeDialog from 'components/modal/DeleteModel';
import GroupDeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';
import { selectLoading as selectGroupLoading, selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import { deleteGroup, updateStatus } from 'features/user-management/groups-page/services/groupService';
import toast from 'react-hot-toast';

const GroupManagement = () => {
  // State variables
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeleteGroupId, setSelectedDeleteGroupId] = useState('');
  const [statusValue, setStatusValue] = useState('');

  // Redux
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const AddRoleAvatar = require('assets/images/avatar/add-role.png');

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    dispatch(getAllGroups({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId]);

  // Memoized callback for deleting a group
  const handleDeleteGroup = useCallback(async () => {
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
  }, [dispatch, selectedDeleteGroupId]);

  // Callback for handling status value change
  const handleStatusValue = useCallback((event, item) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(item);
  }, []);

  // Callback for handling status change via API
  const handleStatusChangeApi = useCallback(async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateStatus(data);
    if (response.success) {
      toast.success(response.message);
      dispatch(getAllGroups({ branch_id: selectedBranchId }));
    } else {
      toast.error(response.message);
    }
  }, [dispatch, selectedBranchId, statusValue]);

  // Callback for handling search
  const handleSearch = useCallback(
    async (value) => {
      try {
        setSearchQuery(value);
        const data = { search: value };
        dispatch(getAllGroups(data));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  // Memoized render function for group cards
  const renderCards = useMemo(() => {
    return groups?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        {/* Card content here */}
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
                  <Tooltip key={index} title={user?.name}>
                    <Avatar alt={item?.name} src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${user?.institution_users?.image}`} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {item?.role?.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <TextField
                size="small"
                select
                width={100}
                label="Status"
                SelectProps={{ value: item?.role?.is_active, onChange: (e) => handleStatusValue(e, item.role) }}
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
                      to: `edit/${item.role.id}`,
                      state: { id: item.role.id, name: item.role.name }
                    }
                  }
                ]}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  }, [groups]);

  return (
    <Grid>
      {/* Header */}
      <Header title="Groups" handleSearch={handleSearch} searchQuery={searchQuery} />

      {/* Render loading skeleton or group cards */}
      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
          {/* Add New Group card */}

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
          {renderCards}
        </Grid>
      )}

      {/* Group delete dialog */}
      <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />

      {/* Status change dialog */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Change Status"
        successDescription="Group status changed successfully"
        failureDescription="Failed to change group status"
        handleSubmit={handleStatusChangeApi}
      />
    </Grid>
  );
};

export default GroupManagement;
