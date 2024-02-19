// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Icon from 'components/icon';
import CustomAutocomplete from 'components/mui/autocomplete';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  branch: yup.array().required('Branch is required').min(1, 'Select at least one branch'),
  course: yup.array().required('Course is required').min(1, 'Select at least one course'),
  batch: yup.array().required('Batch is required').min(1, 'Select at least one batch'),
  students: yup.array().required('Students is required').min(1, 'Select at least one student'),
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required')
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 }
];

const batch = [
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 }
];

const students = [
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 }
];

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  designation: '',
  fullName: '',
  userName: '',
  role: '',
  contact: Number('')
};

const NotificationAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;

  // ** State
  const [selectedBranches, setSelectedBranches] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  const handleBranchChange = (event) => {
    setSelectedBranches(event.target.value);
  };

  useEffect(() => {}, []);

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

  const onSubmit = (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    console.log(bodyFormData);
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
    >
      <Header>
        <Typography variant="h5">Add Notification</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ImgStyled src={imgSrc} alt="Profile Pic" />
            <div>
              <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                Upload
                <input
                  hidden
                  type="file"
                  value={inputValue}
                  accept="image/png, image/jpeg"
                  onChange={handleInputImageChange}
                  id="account-settings-upload-image"
                />
              </ButtonStyled>
            </div>
          </Box>

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ mb: 2 }}
                  select
                  fullWidth
                  label="Branch"
                  id="select-multiple-checkbox"
                  error={Boolean(errors.branch)}
                  helperText={errors.branch?.message}
                  SelectProps={{
                    MenuProps,
                    multiple: true,
                    value: selectedBranches,
                    onChange: (e) => handleBranchChange(e),
                    renderValue: (selected) => selected.join(', ')
                  }}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedBranches.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <CustomAutocomplete
                  {...field}
                  sx={{ mb: 2 }}
                  multiple
                  limitTags={2}
                  options={top100Films}
                  id="autocomplete-limit-tags-course"
                  getOptionLabel={(option) => (option && option.title) || ''}
                  error={Boolean(errors.course)}
                  helperText={errors.course?.message}
                  defaultValue={top100Films.filter((film) => [13, 12, 11].includes(film.year))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Course"
                      placeholder="Favorites"
                      error={Boolean(errors.course)}
                      helperText={errors.course?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <CustomAutocomplete
              sx={{ mb: 2 }}
              multiple
              limitTags={2}
              options={batch}
              id="autocomplete-limit-tags-batch"
              getOptionLabel={(option) => (option && option.title) || ''}
              defaultValue={batch.slice(0, 3)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Batch"
                  placeholder="Favorites"
                  error={Boolean(errors.batch)}
                  helperText={errors.batch?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <CustomAutocomplete
              sx={{ mb: 2 }}
              multiple
              limitTags={2}
              options={students}
              id="autocomplete-limit-tags-students"
              getOptionLabel={(option) => (option && option.title) || ''}
              defaultValue={students.slice(0, 3)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Students"
                  placeholder="Favorites"
                  error={Boolean(errors.students)}
                  helperText={errors.students?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              select
              defaultValue=""
              label="Title"
              id="custom-select"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              select
              defaultValue=""
              label="Body"
              id="custom-select"
              error={Boolean(errors.body)}
              helperText={errors.body?.message}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default NotificationAddDrawer;
