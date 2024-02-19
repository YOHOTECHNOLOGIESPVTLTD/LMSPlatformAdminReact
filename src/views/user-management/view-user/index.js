import Grid from '@mui/material/Grid';
import ViewUserSkeleton from 'components/cards/Skeleton/ViewUserSkeleton';
import UserViewLeft from 'features/user-management/user-view/components/UserViewLeft';
import UserViewRight from 'features/user-management/user-view/components/UserViewRight';
import { getUserById } from 'features/user-management/user-view/services/viewUserServices';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserView = () => {
  const location = useLocation();

  useEffect(() => {
    setUserId(location.state.id);
  }, [location]);

  const [userId, setUserId] = useState(location?.state?.id);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, [userId]);

  const getUserData = async () => {
    try {
      setLoading(true);
      const result = await getUserById(userId);
      if (result.success) {
        console.log('User Data:', result.data);
        console.log(result.data);
        setUserData(result.data);
        setLoading(false);
      } else {
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {loading ? (
            <ViewUserSkeleton />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={5} lg={4}>
                <UserViewLeft id={userId} userData={userData} />
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <UserViewRight id={userId} userData={userData} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserView;
