// ** React Imports
import { Fragment, forwardRef, useState ,useEffect} from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Gallery from '../../../features/institute-management/institute-add-page/components/gallery';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

// ** Icon Imports

import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';



import { TextField as CustomTextField, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'react-datepicker/dist/react-datepicker.css';

import StepperWrapper from 'styles/mui/stepper';
import { addInstitute} from 'features/institute-management/services/instituteService';
import { useSelector,useDispatch } from 'react-redux';
import { getSubscriptionList } from 'features/subscription-management/plans/redux/subscriptionPlansThunks';
import {  selectPlans } from 'features/subscription-management/plans/redux/subscriptionPlansSelectors';
import { handleFileUpload } from 'features/fileUpload';

import FormStep1PersonalInfo from 'features/institute-management/institute-add-page/steps/step1';
import FormStep2GalleryInfo from 'features/institute-management/institute-add-page/steps/step2';
import FormStep3SocialLinks from 'features/institute-management/institute-add-page/steps/step3';
import FormStep4DocumentsInfo from 'features/institute-management/institute-add-page/steps/step4';
import FormStep5AccountInfo from 'features/institute-management/institute-add-page/steps/step5';

const steps = [
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Gallery Info',
    subtitle: 'Add Logo, Image, Gallery Information'
  },
  {
    title: 'Social Links',
    subtitle: 'Add Social Links'
  },
  {
    title: 'Documents',
    subtitle: 'Add Institute Docs'
  },
  {
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  }
];

const defaultAccountValues = {
  email: '',
  username: '',
  first_name: '',
  last_name : "",
  contact: Number(),
  branch_name: '',
  phone: "",
  alternate_phone : "",
  address1: "",
  address2: "",
  state : "",
  city : "",
  pincode : "",
  phone_number : "",
  image : ""
};

const defaultPersonalValues = {
  state: '',
  city: '',
  pin_code: '',
  address_line_one: '',
  address_line_two: '',
  registered_date: '',
  institute_name: '',
  official_email: '',
  official_website: '',
  phone: '',
  alt_phone: '',
  description: '',
  subscription:''
};

const defaultDocValues = {
  gst_number:'',
  gst_doc:'',
  pan_number : '',
  pan_doc: '',
  licence_number:'',
  licence_doc:''
}

const defaultSocialValues = {
  instagram: '',
  twitter: '',
  facebook: '',
  linkedIn: '',
  pinterest: ''
};
const defaultGalleryValues = {
  logo: '',
  image: '',
  gallery: ''
};

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField fullWidth inputRef={ref} {...props} 
          InputProps={{ 
            startAdornment:(
              <InputAdornment position="start" >
                 <EventAvailableOutlinedIcon />
              </InputAdornment>
            )
          }} 
         />;
});

const accountSchema = yup.object().shape({
  username: yup.string().optional(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  branch_name: yup.string().required(),
  // contact: yup.().optional(),
  phone: yup.number().required().min(10,'Please Enter Valid Phone Number'),
  alternate_phone : yup.number().required().min(10,'Please Enter Valid Phone Number'),
  address1: yup.string().required(),
  address2: yup.string().required(),
  state : yup.string().required(),
  city : yup.string().required(),
  pincode : yup.number().required(),
  phone_number : yup.number().required(),
  image : yup.string().required()
});

const documentSchema = yup.object().shape({
  gst_number : yup.string().required(),
  gst_doc : yup.string().required(),
  pan_number : yup.string().required(),
  pan_doc : yup.string().required(),
  licence_number : yup.string().required(),
  licence_doc : yup.string().required()
}) 

const personalSchema = yup.object().shape({
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pin_code: yup.number().required("Pin code is required").test("len", "Pin code must be exactly 6 digits", (value) => { return value.toString().length === 6}),
  address_line_one: yup.string().required("Address line one required"),
  address_line_two: yup.string().required(),
  registered_date: yup.string().required(),
  institute_name: yup.string()
  .required('The institute name is required.')
  .test('is-letters', 'The institute name must consist of letters.', (val) => {
    return /^[A-Za-z\s]+$/.test(val); 
  }),
  phone: yup.number().required().test('len', 'Phone number must be exactly 10 digits', (value) => { return value.toString().length === 10 }),
  alt_phone: yup.number().required().test("len","Phone number must be exactly 10 digits", (value) => { return value.toString().length === 10 }),
  description: yup.string().required().test('word-limit', 'Description must be between 50 and 100 words.', (value) => {
    if (!value) return false;
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= 50 && wordCount <= 100;
  }),
  official_email: yup.string().required(),
  official_website: yup.string().required(),
  subscription : yup.string().required()
  // subscription: yup.string().required()
});

const socialSchema = yup.object().shape({});
const gallerySchema = yup.object().shape({});

const AddInstitutePage = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const plans = useSelector(selectPlans)
  const dispatch = useDispatch()
  // const loading = useSelector(selectLoading)
  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    setValue,
    setError,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  });

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  const { 
    reset : docReset,
    control : docControl,
    handleSubmit : hanldeDocSubmit ,
    formState : { errors: docsErrors }
   } = useForm({
    defaultValues: defaultDocValues,
    resolver : yupResolver(documentSchema)
  })
  
  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  });
  const {
    reset: galleryReset,
    control: galleryControl,
    handleSubmit: handleGallerySubmit,
    formState: { errors: galleryErrors }
  } = useForm({
    defaultValues: defaultGalleryValues,
    resolver: yupResolver(gallerySchema)
  });
  
  
  useEffect(()=>{
   dispatch(getSubscriptionList())
  },[])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
    galleryReset({ logo: '', image: '', gallery: [] });
    accountReset({ email: '', first_name: '',last_name:"", name: '', contact: '' });
    docReset({ gst_number: '', gst_doc: '',pan_number:'',pan_doc:'',licence_number:'',licence_doc:""});
    personalReset({
      state: '',
      city: '',
      pin_code: Number(''),
      address_line_one: '',
      address_line_two: '',
      registered_date: '',
      institute_name: '',
      official_email: '',
      official_website: '',
      subscription: '',
      phone: Number(''),
      alt_phone: Number(''),
      description: ''
    });
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);

    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }
  console.log(plans,"plans")
  const onSubmit = async () => {
    const accountData = accountControl?._formValues;
    const personalData = personalControl?._formValues;
    console.log('personalData:',personalData)
    console.log('FormData:',FormData)
    const socialData = socialControl?._formValues;
    const docsData = docControl?._formValues
    const institute = {
      institute_name : personalData.institute_name,
      email : personalData?.official_email,
      description : personalData?.description,
      docs: {
        gst: {
          number : docsData.gst_number,
          file: docs.gst
        },
        pan : {
          number : docsData.pan_number,
          file : docs.pan
        },
        licence: {
          number : docsData.licence_number,
          file : docs.licence
        }
      },
      contact_info : {
        phone_no :personalData?.phone,
        alternate_no :personalData?.alt_phone,
        address : {
          address1 : personalData?.address_line_one,
          address2 : personalData?.address_line_two,
          state : personalData?.state,
          city : personalData?.city,
          pincode : personalData?.pin_code
        }
      },
      image : instituteImage ,
      subscription: personalData?.subscription,
      logo : logo,
      gallery_images : galleryImages.map((i)=>i.file),
      registered_date : convertDateFormat(personalData?.registered_date),
      social_media : {
        twitter_id : socialData.twitter,
        facebook_id : socialData.facebook,
        instagram_id : socialData.instagram,
        linkedin_id : socialData.linkedIn
      },
      website : personalData.official_website,
    }

    const branch = {
      is_primary : true,
      branch_identity : accountData.branch_name,
      contact_info: {
        phone_no : accountData.phone,
        alternate_no: accountData.alternate_phone ,
        address : accountData.address1,
        landmark : accountData.address2,
        state: accountData.state,
        city: accountData.city,
        pincode : accountData.pincode,
      }
    }
    const admin = {
       first_name : accountData.first_name,
       last_name : accountData.last_name,
       email : accountData.email,
       phone_number :"+91"+accountData.phone_number,
       image : accountData?.image
    }
    console.log(institute,"institute",branch,admin)
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
        const result = await addInstitute({institute,admin,branch});
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    // }
  };
  console.log(personalControl._formValues,"values")
  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));

  const [logo, setLogo] = useState('');
  const [instituteImage, setInstituteImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  // const [date] = useState(new Date());
  const [logoSrc, setLogoSrc] = useState('');
  const [instituteSrc, setInstituteSrc] = useState('');
  const [docs,setDocs] = useState({ gst: "", pan: "", licence: ""})

  const handleInputImageChange = async(file) => {
    const { files } = file.target;
    const data = new FormData()
    data.append("file",files[0])
    const response = await handleFileUpload(data)
    setLogo(response.data.data.file)
  };

  const hanldeDocsUpload =  async (name,event) => {
    try {
      console.log(name,event)
      const { files } = event.target
      const form_data = new FormData()
      form_data.append("file",files[0]) 
      const response = await handleFileUpload(form_data)
      console.log(response,"response")
      setDocs((prev)=>({...prev,[name]:response?.data?.data?.file}))
      console.log(docs)
    } catch (error) {
      console.log(error,"error")
    }
  }

  const hanldeProfileImageChange = async (e) => {
     try {
    const { files } = e.target
    const form_data = new FormData()
    form_data.append("file",files[0])
    const response = await handleFileUpload(form_data)
    setValue("image",response?.data?.data?.file)
     } catch (error) {
       toast.error(error?.message)
     }
  }

  const handleInstituteImageChange = async (file) => {
    const { files } = file.target;
    const data = new FormData()
    data.append("file",files[0])
    const response = await handleFileUpload(data)
    setInstituteImage(response?.data?.data?.file)
  };

  console.log('Gallery : ', galleryImages, 'Institute Image :', instituteImage, 'logo :', logo,logoSrc,instituteSrc,docs);

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc('/images/avatars/15.png');
  };
  const handleInstituteImageReset = () => {
    setInstituteImage('');
    setInstituteSrc('/images/avatars/15.png');
  };
  console.log(socialErrors,accountErrors,docsErrors,personalErrors,galleryControl)
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormStep1PersonalInfo 
           handleBack={handleBack}
           personalControl={personalControl}
           CustomTextField={CustomTextField}
           CustomInput={CustomInput}
           handlePersonalSubmit={handlePersonalSubmit}
           onSubmit={onSubmit}
           steps={steps}
           personalErrors={personalErrors}
           plans={plans}
          />
          // </DatePickerWrapper>
        );
      case 1:
        return (
              <FormStep2GalleryInfo
                steps={steps}
                handleGallerySubmit={handleGallerySubmit}
                onSubmit={onSubmit}
                ImgStyled={ImgStyled}
                ButtonStyled={ButtonStyled}
                ResetButtonStyled={ResetButtonStyled}
                handleBack={handleBack}
                logo={logo}
                handleInputImageChange={handleInputImageChange}
                handleInputImageReset={handleInputImageReset}
                instituteImage={instituteImage}
                handleInstituteImageChange={handleInstituteImageChange} 
                handleInstituteImageReset = { handleInstituteImageReset}
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                Gallery={Gallery}
              />
        );
      case 2:
        return (
                <FormStep3SocialLinks
                 handleSocialSubmit={handleSocialSubmit}
                 handleBack={handleBack}
                 onSubmit={onSubmit}
                 CustomTextField={CustomTextField}
                 socialControl={socialControl}
                 socialErrors={socialErrors}
                 steps={steps}
                />
        );
      case 3 :
        return(
               <FormStep4DocumentsInfo
               steps={steps}
               handleBack={handleBack}
               docControl={docControl}
               docsErrors={docsErrors}
               docReset={docReset}
               CustomTextField={CustomTextField}
               onSubmit={onSubmit}
               hanldeDocSubmit={hanldeDocSubmit}
               hanldeDocsUpload={hanldeDocsUpload}
               docs={docs}
               />
        )
      case 4:
        return (
                <FormStep5AccountInfo
                 steps ={steps}
                 handleBack={handleBack}
                 accountControl={accountControl}
                 accountErrors={accountErrors}
                 CustomTextField={CustomTextField}
                 onSubmit={onSubmit}
                 handleAccountSubmit={handleAccountSubmit}
                 setError={setError}
                 hanldeProfileImageChange={hanldeProfileImageChange}
                />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return getStepContent(activeStep);
    }
  };

  return (
    <Card sx={{ backgroundClip: "padding-box", boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} sx={{ "& .MuiStepIcon-root": {
            display : "none"
          }}} >
            {steps.map((step, index) => {
              const labelProps = {};
              if (index === activeStep) {
                labelProps.error = false;
                if (
                  (accountErrors.email || accountErrors.username || accountErrors.password || accountErrors['confirm_password']) &&
                  activeStep === 3
                ) {
                  labelProps.error = true;
                } else if ((personalErrors['registered_date'] || personalErrors['first-name']) && activeStep === 0) {
                  labelProps.error = true;
                } else if (galleryErrors.logo || (galleryErrors.gallery && activeStep === 1)) {
                  labelProps.error = true;
                } else if (
                  (socialErrors.instagram || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true;
                } else {
                  labelProps.error = false;
                }
              }
              
              return (
                <Step key={index}>
                  {/* <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}> */}
                  <StepLabel {...labelProps} >
                    <div className="step-label" style={{ flexDirection: "column",textAlign: "center", gap: "5px"}} >
                      <Typography sx={{ height: "48px", width: "48px", borderRadius: "24px", backgroundColor: activeStep === index || activeStep > index ? "#FF5500" : "white", color : activeStep === index || activeStep > index ? "white" : "bl", border: activeStep === index || activeStep > index ? "1px solid #FF5500" : "1px dotted black" }} className="step-number">{`${index + 1}`}</Typography>
                      <div>
                        <Typography className="step-title" style={{ fontWeight: "bold"}}>{step.title}</Typography>
                        {/* <Typography className="step-subtitle">{step.subtitle}</Typography> */}
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default AddInstitutePage;
