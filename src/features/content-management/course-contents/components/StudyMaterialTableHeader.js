// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Icon Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';

const StudyMaterialHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  const [statusValue, setStatusValue] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Study materials" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12}>
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                    >
                      <MenuItem value="0">Active</MenuItem>
                      <MenuItem value="1">Deactive</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      id="select-multiple-chip"
                      options={[{ course_id: 'selectAll', course_name: 'Select All' }, ...courses]}
                      getOptionLabel={(option) => option.course_name}
                      value={selectedCourses}
                      onChange={(e, newValue) => {
                        if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
                          setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
                        } else {
                          setSelectedCourses(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Courses"
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
                          {option.course_name}
                        </li>
                      )}
                      renderTags={(value) => (
                        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                          {value.map((option, index) => (
                            <CustomChip
                              key={option.course_id}
                              label={option.course_name}
                              onDelete={() => {
                                const updatedValue = [...value];
                                updatedValue.splice(index, 1);
                                setSelectedCourses(updatedValue);
                              }}
                              color="primary"
                              sx={{ m: 0.75 }}
                            />
                          ))}
                        </div>
                      )}
                      isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                      selectAllText="Select All"
                      SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <TextField
                      fullWidth
                      value={value}
                      label="Search Study Materials"
                      sx={{}}
                      placeholder="Search Study Materials"
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </Grid>

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Study Material
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudyMaterialHeader;
