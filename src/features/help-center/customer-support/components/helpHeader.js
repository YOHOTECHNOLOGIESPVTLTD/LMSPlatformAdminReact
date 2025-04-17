import { TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import IconifyIcon from 'components/icon';
import CustomAutocomplete from 'components/mui/autocomplete';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Autocomplete = styled(CustomAutocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    paddingLeft: theme.spacing(3.5),
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('md')]: {
    width: '55%'
  },
  [theme.breakpoints.up('xl')]: {
    width: '45%'
  },
  [theme.breakpoints.down('md')]: {
    width: '75%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const HelpHeader = ({ allArticles }) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRedirection = (option) => {
     if (option && option.slug) {
       navigate(`/articles/${option.slug}`); // Navigate to article page
     }
   };  

  return (
    <CardContent
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundSize: 'cover',
        py: (theme) => `${theme.spacing(6)} !important`,
        backgroundImage: 'url(http://localhost:3000/images/pages/header-bg.png)',
       // borderBottom: '2px solid #ccc',
       // backgroundColor:'purple',
      }}
    >
        <img 
    src="https://i.pinimg.com/736x/f0/b1/0a/f0b10a44e13870831839fe2f7d4d4631.jpg" 
    alt="logo" 
    style={{ width: '120px', marginBottom: '16px' ,transform: 'rotate(90deg)'}} 
  />

      <Typography sx={{ mb: 4, fontWeight: 'bold', fontSize: '1.625rem', lineHeight: 1.385, color: 'white' }}>Hello, how can we help?</Typography>

      <Autocomplete
        open={open}
        disablePortal
        inputValue={value}
        options={allArticles || [] }
        onClose={() => setOpen(false)}
        // sx={{
        //   mb: 4,
        //   '& + .MuiAutocomplete-popper .MuiAutocomplete-listbox': { maxHeight: 250 },
        //   '& .MuiInputBase-root.MuiFilledInput-root': {
        //     backgroundColor: (theme) => `${theme.palette.background.paper} !important`
        //   }
        // }}
        getOptionLabel={(option) => option.title || ''}
        isOptionEqualToValue={(option, value) => value === option}
        onChange={(event, option) => handleRedirection(option)}
        onInputChange={(event, value) => {
          setValue(value);
          setOpen(!!event.target.value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="medium"
            value={value}
            placeholder="Search a question..."
            onChange={(event) => setValue(event.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                  <IconifyIcon fontSize="1.25rem" icon="tabler:search" />
                </InputAdornment>
              )
            }}
          />
        )}
        renderOption={(props, option) => {
          return value.length ? (
           // <ListItem {...props} sx={{ p: '0 !important' }} key={option.slug} onClick={() => handleRedirection(option)}>
           <ListItem {...props} key={option.slug}
            onClick={() => handleRedirection(option) }
           >  
           <ListItemButton sx={{ py: 1.5 }}>{option.title}</ListItemButton>
            </ListItem>
          ) : null;
        }}
      />
      <Typography sx={{ color: 'white' }}>Common troubleshooting topics: eCommerce, Blogging to payment</Typography>
    </CardContent>
  );
};

export default HelpHeader;
