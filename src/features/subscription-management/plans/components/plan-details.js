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
  const theme = useTheme()
  console.log(plans,'Plansxxx')
  const renderFeatures = () => {
    return plans?.features?.map((features,index) => (
      <Box  key={index}>
        <Box sx={{ display:'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <Icon icon="tabler:circle" fontSize="0.875rem"/>
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{features?.category}: {features?.limitations}</Typography>
      </Box>
      <Box sx={{ display:'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <Icon icon="tabler:circle" fontSize="0.875rem"/>
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{features?.category}: {features?.feature_name}</Typography>
      </Box>
      </Box>
      
    ));
  };

  return (
    <BoxWrapper
      // sx={{
      //   border: (theme) =>
      //     !data?.popularPlan ? `1px solid ${theme.palette.divider}` : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      // }}

      sx={{
        border: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}


    >
      {/* {plans?.premium ? (
        <CustomChip
          rounded
          size="small"
          skin="light"
          label="Popular"
          color="primary"
          sx={{
            top: 24,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 500,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null} */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <img
          width={50}
          src={`${plans?.imgSrc}`}
          height={plans?.imgHeight}
          alt={`${plans?.title}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>{plans?.plan_name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{plans?.description}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>$</Typography>
            <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
              {/* {plan === 'monthly' ? plans?.monthlyPrice : plans?.yearlyPlan.perMonth} */}
            </Typography>
            <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/month</Typography>
          </Box>
          {/* {plan !== 'monthly' && plans?.monthlyPrice !== 0 ? (
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                top: 52,
                left: '50%',
                position: 'absolute',
                color: 'text.disabled',
                transform: 'translateX(-50%)'
              }}
            >{`USD ${plans?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null} */}
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
