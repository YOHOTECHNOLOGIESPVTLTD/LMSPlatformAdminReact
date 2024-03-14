import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton/UserSkeleton';
import { selectGroups } from 'features/institute-management/institute[id]-page/user-management/groups-page/redux/groupSelectors';
import { getAllGroups } from 'features/institute-management/institute[id]-page/user-management/groups-page/redux/groupThunks';
import UserBodySection from 'features/institute-management/institute[id]-page/user-management/users-page/users-overview-page/components/UserBodySection';
import UserHeaderSection from 'features/institute-management/institute[id]-page/user-management/users-page/users-overview-page/components/UserHeaderSection';
import { selectLoading as selectUserLoading, selectUsers } from 'features/institute-management/institute[id]-page/user-management/users-page/redux/userSelectors';
import { getAllUsers } from 'features/institute-management/institute[id]-page/user-management/users-page/redux/userThunks';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAddDrawer from 'features/institute-management/institute[id]-page/user-management/users-page/users-overview-page/components/UserAddDrawer';
import UserFilterCard from 'features/institute-management/institute[id]-page/user-management/users-page/users-overview-page/components/UserFilterCard';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const groups = useSelector(selectGroups);

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    dispatch(getAllGroups({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId]);

  // State for controlling the visibility of the Add User Drawer
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = useCallback(() => {
    setAddUserOpen((prev) => !prev);
  }, []);

  // State for triggering user data refetch
  const [userRefetch, setUserRefetch] = useState(false);

  // Fetch users when selectedBranchId or userRefetch changes
  useEffect(() => {
    dispatch(getAllUsers({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, userRefetch]);

  return (
    <>
      <Grid container spacing={3}>
        {/* User Header Section */}
        <Grid item xs={12}>
          <UserHeaderSection users={users} groups={groups} />
        </Grid>

        {/* User Filter Card */}
        <Grid item xs={12}>
          <UserFilterCard
            users={users}
            groups={groups}
            setUserRefetch={setUserRefetch}
            selectedBranchId={selectedBranchId}
            toggle={toggleAddUserDrawer}
          />
        </Grid>

        {/* Display Skeleton or User Body Section based on loading state */}
        {userLoading ? (
          <UserSkeleton />
        ) : (
          <Grid item xs={12}>
            <UserBodySection
              groups={groups}
              users={users}
              setUserRefetch={setUserRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}

        {/* Add User Drawer */}
        <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} groups={groups}  />
      </Grid>
    </>
  );
};

export default UserList;
