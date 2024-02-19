import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import BranchesCardHeader from './BrachesCardHeader';
import BranchEditModal from './edit-Branch/BranchEditModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectBranches } from '../redux/branchSelectors';
import { getAllBranches } from '../redux/branchThunks';
import { useEffect } from 'react';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';

const BranchCard = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch, isEditModalOpen]);

  console.log(branches);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BranchesCardHeader />
      </Grid>
      {branches?.map((branch, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ position: 'relative' }}>
            <Grid
              sx={{
                position: 'absolute',
                top: 5,
                right: 3
              }}
            >
              <IconButton
                aria-label="capture screenshot"
                color="primary"
                onClick={() => {
                  setSelectedBranch(branch);
                  setEditModalOpen(true);
                }}
              >
                <Icon icon="tabler:edit" />
              </IconButton>
              <Box component={Link} to={`${branch.branch_id}`}>
                <IconButton aria-label="capture screenshot" color="primary">
                  <Icon icon="tabler:eye" />
                </IconButton>
              </Box>
            </Grid>

            <CardMedia
              sx={{
                height: 100,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
                mx: 'auto'
              }}
              image={require('assets/images/avatar/map-pin.png')}
            />
            <CardContent>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {branch?.branch_name}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                {branch?.address}, {branch?.city}, {branch?.state}, {branch?.pin_code}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <BranchEditModal
        open={isEditModalOpen}
        handleEditClose={handleEditClose}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
    </Grid>
  );
};

export default BranchCard;
