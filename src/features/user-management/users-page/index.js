import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';
import { selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import UserBodySection from 'features/user-management/users-page/users-overview-page/components/UserBodySection';
import UserHeaderSection from 'features/user-management/users-page/users-overview-page/components/UserHeaderSection';
import { selectLoading as selectUserLoading, selectUsers } from 'features/user-management/users-page/redux/userSelectors';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const groups = useSelector(selectGroups);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllGroups(selectedBranchId));
  }, [selectedBranchId]);

  useEffect(() => {
    dispatch(getAllUsers(selectedBranchId));
  }, [dispatch, selectedBranchId, loading]);

  console.log(users);

  return (
    <>
      {userLoading ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserHeaderSection users={users} groups={groups} setLoading={setLoading} />
          </Grid>
          <Grid item xs={12}>
            <UserBodySection groups={groups} users={users} setLoading={setLoading} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserList;
