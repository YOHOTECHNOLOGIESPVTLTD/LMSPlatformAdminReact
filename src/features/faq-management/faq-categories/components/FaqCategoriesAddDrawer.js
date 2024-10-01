// ** MUI Imports
import { Button, Grid, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import { addFaqCategory } from '../services/faqCategoryServices';
import toast from 'react-hot-toast';



const schema = yup.object().shape({
  name: yup.string().required('Category Name is required'),
  description: yup.string().required('Description is required')
});

const defaultValues = {
  name: '',
  description: ''
};

const FaqCategoriesAddDrawer = (props) => {
  // ** Props
  const { open = false, toggle, setRefetch } = props; // Ensure 'open' has a default value
  // ** State

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const InputData = {
      identity: data.name,
      description: data.description
    };
    const result = await addFaqCategory(InputData);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      toggle();
    } else {
      toast.error(result.message);
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-faq-category-modal"
      aria-describedby="modal-to-add-faq-category"
     
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 8,
          mx: 'auto',
          mt: { xs: '20vh', sm: '15vh' } 
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
        <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              position: "absolute",
              top: "125px",
              marginLeft: "-40px",
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              transition: 'rotate .2s ease-in-out', 
              rotate: '0deg', 
              '&:hover': {
                // backgroundColor: (theme) => theme.palette.secondary.main,
                rotate: '-90deg', 
              },
            }}
          >


            <Icon icon="tabler:x" fontSize="1.125rem"  />
          </IconButton>
        </Box>
        <Box sx={{ pb: "16px", textAlign: "center"}}>
        <Typography variant="h3">Add Faq Categories</Typography>
        </Box>
        <Box sx={{ p: (theme) => theme.spacing(0, 0, 0) }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Title"
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Description"
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, justifyContent: "center" }}>
              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant="outlined" size="medium" sx={{ color: "#6d788d", border: "1px solid #6d788d", backgroundColor: "transparent"}} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default FaqCategoriesAddDrawer;
