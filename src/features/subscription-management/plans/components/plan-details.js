import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, MenuItem, TextField } from '@mui/material';
import OptionsMenu from 'components/option-menu';
import { default as StatusChangeDialog } from 'components/modal/DeleteModel';
import { default as DeleteModal } from 'components/modal/DeleteModel';
import { deleteSubscriptionPlan, changeSubscriptionPlanStatus } from '../services/subscriptionPlansServices';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllSubscriptionPlans } from '../redux/subscriptionPlansThunks';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import CheckIcon from "../../../../assets/images/subscription/check.png"
import { getImageUrl } from 'themes/imageUtlis';

// Styled component for the plan card wrapper
const BoxWrapper = styled(motion(Box))(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
  backgroundColor: '#fff',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  transform: 'translateY(0)',
  '&:hover': {
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.02) translateY(-10px)', // slight scale and lift
    background: 'linear-gradient(135deg, #f0f4f8 30%, #d1e3ff 90%)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // background: 'linear-gradient(135deg, #0CCE7F 0%, #bdc8f0 100%)',
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 0.2, // subtle background fade
  }
}));

// Framer Motion animation variants for initial fade-in
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },  // start slightly below and faded
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
};

// Custom styles for the dropdown
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    backgroundColor: '#f0f4f8',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e7ff',
    },
    '&.Mui-focused': {
      backgroundColor: '#d0d8ff',
    },
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.main,
  }
}));

// Custom styles for the price section with animations
const PriceBox = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  marginTop: theme.spacing(2),
  '& .currency': {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginRight: '4px',
    fontSize: '1.5rem',
  },
  '& .price': {
    fontWeight: 700,
    fontSize: '3.5rem',
    lineHeight: 1,
    color: theme.palette.primary.main,
    textShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // subtle shadow
    transition: 'transform 0.3s ease', // smooth scaling animation
    '&:hover': {
      transform: 'scale(1.1)', // scale up slightly on hover
    }
  },
  '& .month': {
    fontWeight: 500,
    color: theme.palette.grey[600],
    marginLeft: '4px',
    fontSize: '1.125rem',
  }
}));

// Feature list container with fade-in animation
const FeatureGrid = styled(motion(Grid))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  gap: "10px",
  marginLeft: "20%",
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
}));

// Framer Motion animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// Styled component for feature icons
const FeatureIcon = styled("img")(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

// Updated PlanDetails component
const PlanDetails = (props) => {
  const dispatch = useDispatch();
  const { plans } = props;
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);

  // Handle delete plan
  const handleDeletePlan = async () => {
    try {
      const result = await deleteSubscriptionPlan(selectedPlanId);
      if (result.success) {
        toast.success(result.message);
        dispatch(getAllSubscriptionPlans());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle status change
  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await changeSubscriptionPlanStatus(data);
    if (response.success) {
      toast.success(response.message);
      dispatch(getAllSubscriptionPlans());
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, plans) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(plans);
  };

  // Render feature list with icons and animations
  const renderFeatures = () => {
    const featureList = [
      { label: 'Admins', count: plans?.features[1]?.count || (plans?.features?.admin_is_unlimited === '1' ? 'Unlimited' : '0') },
      { label: 'Batches', count: plans?.features[2]?.count || (plans?.features?.batches_is_unlimited === '1' ? 'Unlimited' : '0') },
      { label: 'Classes', count: plans?.features?.no_of_classes || (plans?.features?.class_is_unlimited === '1' ? 'Unlimited' : '0') },
      { label: 'Courses', count: plans?.features[7]?.count || (plans?.features?.course_is_unlimited === '1' ? 'Unlimited' : '0') },
      { label: 'Staffs', count: plans?.features[6]?.count || (plans?.features?.staff_is_unlimited === '1' ? 'Unlimited' : '0') },
      { label: 'Students', count: plans?.features[0]?.count || (plans?.features?.student_is_unlimited === '1' ? 'Unlimited' : '0') }
    ];

    return featureList.map((feature, index) => (
      <FeatureGrid key={index} variants={fadeIn}  initial="hidden" animate="visible">
        <FeatureIcon src={CheckIcon} />
        <Typography style={{ color: '#333', fontSize: '1rem' }}>
          {feature.label}: <strong>{feature.count}</strong>
        </Typography>
      </FeatureGrid>
    ));
  };

  const placeholderUrl = 'https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg';

  return (
    <BoxWrapper
    initial="hidden"
    animate="visible"
    variants={fadeInVariants}
    >
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          backgroundSize: 'cover',
          mx: '-24px',
          mt: '-24px',
          p: 2,
          borderRadius: '15px 15px 0 0' // Rounded top corners for the card
        }}
      >
        <img
          src={plans?.image ? getImageUrl(plans?.image) : placeholderUrl}
          alt="subscription-plan-img"
          height={100}
          style={{ borderRadius: '0.5rem' }}
        />
      </Box>
      
      
      <Box sx={{ textAlign: 'center', my: "5px" }}>
        <Typography sx={{ mb: 1.5, fontWeight: 600, lineHeight: 1.385, fontSize: '1.625rem' }}>
          {plans?.identity}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{plans?.description}</Typography>
        
        {/* Price Section */}
        <PriceBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Typography className="currency">$</Typography>
          <Typography className="price">{plans?.price}</Typography>
          <Typography className="month">month</Typography>
        </PriceBox>
      </Box>
      
      {/* Render Features */}
      {renderFeatures()}

      {/* Status and Options */}
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3}>
        <CustomTextField
          size="small"
          select
          label="Status"
          value={plans?.is_active}
          onChange={(e) => handleStatusValue(e, plans)}

        >
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </CustomTextField>

        <OptionsMenu
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
          options={[
            {
              text: 'Edit',
              menuItemProps: {
                component: Link,
                to: `edit/${plans?.uuid}`,
                state: { id: plans?.uuid, plans: plans }
              }
            },
            {
              text: 'Delete',
              menuItemProps: {
                onClick: () => {
                  setSelectedPlanId(plans?.uuid);
                  setDeleteDialogOpen(true);
                }
              }
            }, {
              text: 'View', 
              menuItemProps: {
                component: Link,
                to: `view/${plans?.uuid}`, 
                state: { id: plans?.uuid, plans: plans }
              }
            }
          ]}
        />

        <DeleteModal
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure want to delete this plan?"
          failureDescription="Alright, you want to keep this Plan?"
          handleSubmit={handleDeletePlan}
        />

        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to change the status?"
          failureDescription="Do you want to keep the current status?"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
    </BoxWrapper>
  );
};

export default PlanDetails;
