// ** MUI Imports
import { Grid, TextField, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
// ** Icon Imports
import Icon from 'components/icon';

// import { useState} from 'react';
// import { getAllFaqCategories } from '../redux/faqCategoryThunks';
import { SearchOutlined } from '@mui/icons-material';

const FaqCategoriesTableHeader = (props) => {
  // ** Props
  const { toggle,faqCategories,searchQuery,handleFilter} = props;

  // State for search value
  // const [searchValue, setSearchValue] = useState('');
  console.log('faqcate', faqCategories);
  
  

  // Dispatch function
  // const dispatch = useDispatch();

  // Callback function to handle search
  // const handleSearch = useCallback(
  //   (e) => {
  //     const searchInput = e.target.value;
  //     dispatch(getAllFaqCategories({ search: searchInput, branch_id: selectedBranchId }));
  //     setSearchValue(searchInput);
  //     // Dispatch action to fetch branches with search input
  //   },
  //   [dispatch, selectedBranchId]
  // );

  // const filteredCategories = faqCategories.data.filter((category) => category.identity.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        p: 2,
        mb: 3
      }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          value={searchQuery}
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              '& input': {
                padding: '10px 12px'
              }
            },
            '& .MuiInputAdornment-root': {
              pr: 1
            }
          }}
          placeholder="Search Category"
          onChange={(e) => handleFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          onClick={toggle}
          variant="contained"
          sx={{
            borderRadius: '8px',
            padding: '10px 20px',
            textTransform: 'none',
            fontWeight: 'bold',
            // backgroundColor: '#0CCE7F',
            '&:hover': {
              backgroundColor: '#0A9B77'
            },
            '& svg': {
              mr: 1
            }
          }}
        >
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add Faq Categories
        </Button>
      </Grid>
    </Grid>
  );
};

export default FaqCategoriesTableHeader;
