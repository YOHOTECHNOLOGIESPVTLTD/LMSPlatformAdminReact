// ** MUI Imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
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
  paddingTop: theme.spacing(6),
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
  // ** Props
  const { plans } = props;
  const theme = useTheme();
  console.log( 'Plansxxx',plans);
  const renderFeatures = () => {
      return (
        <Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
            Admins <span style={{marginLeft:'15px'}}>{plans?.features?.no_of_admins}</span> 
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px',mb:1 }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Batches <span style={{marginLeft:'9px'}}>{plans?.features?.no_of_batches}</span> 
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Classes <span style={{marginLeft:'12px'}}>{plans?.features?.no_of_batches}</span>
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Courses <span style={{marginLeft:'10px'}}>{plans?.features?.no_of_batches}</span>
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Staffs <span style={{marginLeft:'28px'}}>{plans?.features?.no_of_batches}</span>
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
            <span style={{ display: 'inline-flex', color: 'text.secondary', marginRight: '8px' }}>
              <Icon icon="tabler:circle" fontSize="0.875rem" />
            </span>
            <Typography style={{ color: 'text.secondary' }}>
             Students <span style={{marginLeft:'5px'}}>{plans?.features?.no_of_batches}</span> 
            </Typography>
          </Grid>
        </Grid>
      );
    }

    const imgUrl = plans?.image ? plans?.image : "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg";

  return (
    <BoxWrapper

      sx={{
        border: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        {/* <img width={50} src={`${plans?.imgSrc}`} height={plans?.imgHeight} alt={`${plans?.title}-plan-img`} /> */}
        <img src={imgUrl} alt='sub-img' height={100} style={{borderRadius:'0.5rem'}}/>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>{plans?.plan_name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{plans?.description}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>$</Typography>
            <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight:0.5 }}>
              {plans?.plan_price}
            </Typography>
            <Typography sx={{  alignSelf: 'flex-end', color: 'text.disabled' }}>/month</Typography>
          </Box>
          
        </Box>
      </Box>
      {renderFeatures()}
      <Button fullWidth color='primary' variant={plans?.popularPlan ? 'contained' : 'tonal'}>
        Edit Subscription
      </Button>
    </BoxWrapper>
  );
};

export default PlanDetails;
