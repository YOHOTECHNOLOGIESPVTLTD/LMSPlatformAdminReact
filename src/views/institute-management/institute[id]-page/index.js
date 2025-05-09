import Grid from '@mui/material/Grid';
import InstituteViewTop from 'features/institute-management/institute[id]-page/components/InstituteViewTop';

import { InstituteGetById } from 'features/institute-management/services/instituteService';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const InstituteViewPage = () => {
  const location = useLocation();
  const [institute, setInstitute] = useState(null);
  const instituteId = location.state?.id;
 console.log(location,location.state?.id,location.state)
  useEffect(() => {
    const data = { id: instituteId };
    getInstituteById(data);
  }, [instituteId]);

  const getInstituteById = async (data) => {
    const result = await InstituteGetById(data);
    if (result.success) {
      setInstitute(result.data);
    }
  };

  console.log(institute,"institute");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <InstituteViewTop institute={institute} set/>
      </Grid>
    </Grid>
  );
};

export default InstituteViewPage;
