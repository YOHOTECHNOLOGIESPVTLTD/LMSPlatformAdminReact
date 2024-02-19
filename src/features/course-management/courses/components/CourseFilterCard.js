import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const CourseFilter = () => {
  const [statusValue, setStatusValue] = useState('');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = [
    { category_id: '1', category_name: 'Category 1' },
    { category_id: '2', category_name: 'Category 2' },
    { category_id: '3', category_name: 'Category 3' }
  ];

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Course" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="0">Active</MenuItem>
                    <MenuItem value="1">Deactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    id="select-multiple-chip"
                    options={[{ category_id: 'selectAll', category_name: 'Select All' }, ...categories]}
                    getOptionLabel={(option) => option.category_name}
                    value={selectedCategories}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.category_id === 'selectAll')) {
                        setSelectedCategories(categories.filter((option) => option.category_id !== 'selectAll'));
                      } else {
                        setSelectedCategories(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Categories"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.category_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.category_id}
                            label={option.category_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedCategories(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.category_id === value.category_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default CourseFilter;
