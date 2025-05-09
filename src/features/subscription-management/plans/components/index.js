import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Box, Pagination, CircularProgress, Typography } from '@mui/material';
import PlanDetails from './plan-details';

const PricingPlans = ({ page, setPage, plans }) => {
  const [loading, setLoading] = useState(false);
  const [plansData, setPlansData] = useState(plans || { data: [], last_page: 1 });

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/subscription/plans?page=${page}&perPage=3`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });

        if (response.data && response.data.data) {
          setPlansData({
            data: response.data.data.data,
            last_page: response.data.data.last_page || 1
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [page]);

  return (
    <Grid container spacing={6}>
      {loading && (
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
          }}
        >
          <CircularProgress />
        </Grid>
      )}

      {!loading && Array.isArray(plansData.data) && plansData.data.length > 0
        ? plansData.data.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <PlanDetails plans={item} />
            </Grid>
          ))
        : !loading && (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No plans available. Try adding a new plan.
              </Typography>
            </Grid>
          )}

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: '20px' }}>
        {plansData?.last_page && plansData?.last_page > 1 && (
          <Pagination
            page={page}
            count={plansData?.last_page}
            onChange={(e, value) => {
              console.log('🔹 Page changed to:', value);
              if (typeof setPage === 'function') {
                setPage(value);
              }
            }}
            color="primary"
          />
        )}
      </Box>
    </Grid>
  );
};

export default PricingPlans;
