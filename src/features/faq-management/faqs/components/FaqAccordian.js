// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Imports
// import CustomAvatar from 'components/mui/avatar';
// import { getAllFaqCategorywithFaq } from 'features/faq-management/faq-categories/services/faqCategoryServices';

// Styled TabList component
const MuiBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderRight: 0,
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 280,
    lineHeight: 1,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}));

const FaqAccordian = ({ faqCategories }) => {
  const [activeTab, setActiveTab] = useState(faqCategories[0]?.id);

  useEffect(() => {
    setActiveTab(faqCategories[0]?.id);
  }, [faqCategories]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    return faqCategories?.map((tab) => {
      return (
        <TabPanel key={tab?.id} value={tab?.id} sx={{ p: 6.5, pt: 0, width: '100%' }}>
          <Box key={tab?.id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <CustomAvatar skin="light" variant="rounded" sx={{ height: 48, width: 48 }}>
                <Icon icon={tab?.icon} fontSize="2.25rem" />
              </CustomAvatar> */}
              <Box sx={{ ml: 4 }}>
                <Typography variant="h4">{tab?.title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{tab?.description}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 6 }}>
              {tab?.platform_faqs?.map((item) => {
                return (
                  <Accordion key={item.id}>
                    <AccordionSummary expandIcon={<Icon fontSize="1.25rem" icon="tabler:chevron-down" />}>
                      <Typography sx={{ fontWeight: '500' }}>{item?.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary' }}>{item?.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>
        </TabPanel>
      );
    });
  };

  const renderTabs = () => {
    if (faqCategories !== null) {
      return faqCategories?.map((tab) => {
        if (tab) {
          return <Tab key={tab?.id} value={tab?.id} label={tab?.title} icon={<Icon icon={tab?.icon} />} />;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <MuiBox>
      <TabContext value={activeTab}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TabList orientation="vertical" onChange={handleChange}>
            {renderTabs()}
          </TabList>
        </Box>
        {renderTabContent()}
      </TabContext>
    </MuiBox>
  );
};

export default FaqAccordian;
