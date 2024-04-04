// ** MUI Imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Icon Imports
import Icon from 'components/icon';

// ** Util Import
import { hexToRGBA } from 'utils/hex-to-rgba';

// ** Custom Components Imports
// import CustomChip from 'components/mui/chip';
import { useTheme } from '@mui/material/styles';

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(16),
  borderRadius: theme.shape.borderRadius
}));

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(2.5)
  }
}));

const PlanDetails = (props) => {
  // ** Props
  const { plans } = props;
  const theme = useTheme();
  console.log( 'Plansxxx',plans);
  const renderFeatures = () => {
   
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
            Admins {plans?.features?.no_of_admins}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Batches {plans?.features?.no_of_batches}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Classes {plans?.features?.no_of_batches}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Courses {plans?.features?.no_of_batches}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Staffs {plans?.features?.no_of_batches}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Students {plans?.features?.no_of_batches}
            </Typography>
          </div>
        </div>
      );
    }


  return (
    <BoxWrapper

      sx={{
        border: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        {/* <img width={50} src={`${plans?.imgSrc}`} height={plans?.imgHeight} alt={`${plans?.title}-plan-img`} /> */}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>{plans?.plan_name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{plans?.description}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>$</Typography>
            <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
              {plans?.plan_price}
            </Typography>
            <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/month</Typography>
          </Box>
          
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <Button fullWidth color={plans?.currentPlan ? 'success' : 'primary'} variant={plans?.popularPlan ? 'contained' : 'tonal'}>
        {plans?.currentPlan ? 'Your Current Plan' : 'Upgrade'}
      </Button>
    </BoxWrapper>
  );
};

export default PlanDetails;
