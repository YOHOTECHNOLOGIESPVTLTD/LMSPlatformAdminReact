// ** MUI Imports
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import OptionsMenu from 'components/option-menu';
// import deGroupDeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';
import { default as StatusChangeDialog } from 'components/modal/DeleteModel';
import { default as DeleteModal } from 'components/modal/DeleteModel';
import { deleteSubscriptionPlan } from '../services/subscriptionPlansServices';
import { changeSubscriptionPlanStatus } from '../services/subscriptionPlansServices';
import { useDispatch } from 'react-redux';
// ** Icon Imports
import Icon from 'components/icon';

// ** Util Import
import { hexToRGBA } from 'utils/hex-to-rgba';

// ** Custom Components Imports
// import CustomChip from 'components/mui/chip';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllSubscriptionPlans } from '../redux/subscriptionPlansThunks';
import toast from 'react-hot-toast';
// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius
}));

// ** Styled Component for the wrapper of all the features of a plan
// const BoxFeature = styled(Box)(({ theme }) => ({
//   // marginBottom: theme.spacing(2.5),
//   // '& > :not(:last-child)': {
//   //   marginBottom: theme.spacing(2.5)
//   // }
// }));

const PlanDetails = (props) => {
  const dispatch = useDispatch();
  // ** Props
  const { plans } = props;
  const theme = useTheme();
  console.log('Plansxxx', plans);
  console.log('planID:', plans?.id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);

  //handleDelete
  const handleDletePlan = async () => {
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

  //handleStatusChange
  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await changeSubscriptionPlanStatus(data);
    if (response.success) {
      toast.success(response.message);
      dispatch(getAllSubscriptionPlans(selectedPlanId));
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, plans) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(plans);
  };

  const renderFeatures = () => {
    return (
      <Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Admins{' '}
            <span style={{ marginLeft: '15px' }}>
              {plans?.features?.no_of_admins
                ? `${plans?.features?.no_of_admins}`
                : `${plans?.features?.admin_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px', mb: 1 }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Batches{' '}
            <span style={{ marginLeft: '9px' }}>
              {plans?.features?.no_of_batches
                ? `${plans?.features?.no_of_batches}`
                : `${plans?.features?.batches_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Classes{' '}
            <span style={{ marginLeft: '12px' }}>
              {plans?.features?.no_of_classes
                ? `${plans?.features?.no_of_classes}`
                : `${plans?.features?.class_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Courses{' '}
            <span style={{ marginLeft: '10px' }}>
              {plans?.features?.no_of_courses
                ? `${plans?.features?.no_of_courses}`
                : `${plans?.features?.course_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Staffs{' '}
            <span style={{ marginLeft: '22px' }}>
              {plans?.features?.no_of_staffs
                ? `${plans?.features?.no_of_staffs}`
                : `${plans?.features?.staff_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
            <Icon icon="tabler:circle" fontSize="0.875rem" />
          </span>
          <Typography style={{ color: 'text.secondary' }}>
            Students{' '}
            <span style={{ marginLeft: '5px' }}>
              {plans?.features?.no_of_students
                ? `${plans?.features?.no_of_students}`
                : `${plans?.features?.students_is_unlimited == '1' ? 'unlimited' : ''}`}
            </span>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const placeholderUrl = 'https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg';

  return (
    <BoxWrapper
      sx={{
        border: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        {/* <img width={50} src={`${plans?.imgSrc}`} height={plans?.imgHeight} alt={`${plans?.title}-plan-img`} /> */}
        <img
          src={plans?.image ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${plans?.image}` : placeholderUrl}
          alt="sub-img"
          height={100}
          style={{ borderRadius: '0.5rem' }}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>{plans?.plan_name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{plans?.description}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>$</Typography>
            <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 0.5 }}>
              {plans?.plan_price}
            </Typography>
            <Typography sx={{ alignSelf: 'flex-end', color: 'text.disabled' }}>/month</Typography>
          </Box>
        </Box>
      </Box>
      {renderFeatures()}
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3}>
        <TextField
          size="small"
          select
          width={100}
          label="Status"
          SelectProps={{ value: plans?.features?.is_active, onChange: (e) => handleStatusValue(e, plans?.features) }}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
        </TextField>

        <OptionsMenu
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
          options={[
            {
              text: 'Edit',
              menuItemProps: {
                component: Link,
                to: `edit/${plans?.id}`,
                state: { id: plans?.id, plans: plans }
              }
            },
            {
              text: 'Delete',

              menuItemProps: {
                onClick: () => {
                  setSelectedPlanId(plans?.id);
                  setDeleteDialogOpen(true);
                }
              }
            }
          ]}
        />

        {/* <Box component={Link} to={`edit/${plans?.id}`} state={{id:plans?.id,plans:plans}}>
          <Button fullWidth color="primary" variant="contained">
            Edit Plan
          </Button>
        </Box> */}
        <DeleteModal
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure want to delete this plan"
          failureDescription="Alright you want to keep this Plan?"
          handleSubmit={handleDletePlan}
        />

        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status ?"
          failureDescription="Do you want to keep the status ?"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
    </BoxWrapper>
  );
};

export default PlanDetails;
