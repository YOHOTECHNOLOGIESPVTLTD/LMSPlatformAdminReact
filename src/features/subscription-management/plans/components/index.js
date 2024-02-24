// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useState } from 'react';

// ** Custom Components Imports
import PlanDetails from './plan-details';
import { Button } from '@mui/material';
import CreatePlan from './createPlan';

const PricingPlans = () => {
  // ** Props
  // const { plan, data } = props

  // create-modal
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const handleClickOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const data = [
    {
      imgWidth: 180,
      imgHeight: 180,
      title: 'Free',
      monthlyPrice: 0,
      currentPlan: true,
      popularPlan: false,
      subtitle: 'A simple start for everyone',
      imgSrc:
        'https://static.vecteezy.com/system/resources/previews/017/177/863/original/1-stars-rating-sign-and-symbol-on-transparent-background-free-png.png',
      yearlyPlan: {
        perMonth: 0,
        totalAnnual: 0
      },
      planBenefits: [
        'Users - 50',
        'Admin - 1 ',
        'Teacher - 1',
        'Course- Unlimited',
        'Batches - Unlimited',
        'Classes - Unlimited',
        'Basic Support - Yes'
      ]
    },
    {
      imgWidth: 180,
      imgHeight: 180,
      monthlyPrice: 49,
      title: 'Advanced',
      popularPlan: true,
      currentPlan: false,
      subtitle: 'For small to medium businesses',
      imgSrc:
        'https://static.vecteezy.com/system/resources/previews/017/178/607/non_2x/3-stars-rating-sign-and-symbol-on-transparent-background-free-png.png',
      yearlyPlan: {
        perMonth: 40,
        totalAnnual: 480
      },
      planBenefits: [
        'Users - 500',
        'Admin - 2 ',
        'Teacher - Unlimited',
        'Course- Unlimited',
        'Batches - Unlimited',
        'Classes - Unlimited',
        'Community Support - Yes'
      ]
    },
    {
      imgWidth: 180,
      imgHeight: 180,
      monthlyPrice: 99,
      popularPlan: false,
      currentPlan: false,
      title: 'Premium',
      subtitle: 'Solution for big organizations',
      imgSrc:
        'https://static.vecteezy.com/system/resources/previews/017/178/284/non_2x/5-stars-rating-sign-and-symbol-on-transparent-background-free-png.png',
      yearlyPlan: {
        perMonth: 80,
        totalAnnual: 960
      },
      planBenefits: [
        'Users - Unlimited',
        'Admin - Unlimited ',
        'Teachers - Unlimited',
        'Course- Unlimited',
        'Batches - Unlimited',
        'Classes - Unlimited',
        'Community Support - Yes'
      ]
    }
  ];
  console.log(data, 'pricing');
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} display="flex" justifyContent="end">
        <Button variant="contained" onClick={handleClickOpen}>
          Create New Plan +
        </Button>
      </Grid>
      {data?.map((item) => (
        <Grid item xs={12} md={4} key={item.title.toLowerCase()}>
          <PlanDetails data={item} />
        </Grid>
      ))}
      <CreatePlan handleClose={handleClose} handleDialogClose={handleDialogClose} open={open} selectedValue={selectedValue} />
    </Grid>
  );
};

export default PricingPlans;
