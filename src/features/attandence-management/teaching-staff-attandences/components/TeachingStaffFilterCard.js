// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Third Party Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import DatePickerWrapper from 'styles/libs/react-datepicker';

/* eslint-enable */
const TeachingStaffFilterCard = (props) => {
  const { value, handleFilter } = props;
  // ** State
  const [statusValue, setStatusValue] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedstaff, setSelectedstaff] = useState([]);

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  const staff = [
    { staff_id: '1', staff_name: 'Staff 1' },
    { staff_id: '2', staff_name: 'Staff 2' },
    { staff_id: '3', staff_name: 'Staff 3' }
  ];

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Teaching Staff Attendance" />
            <CardContent>
              <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12} sm={3}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="0">Active</MenuItem>
                    <MenuItem value="1">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
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
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...staff]}
                    getOptionLabel={(option) => option.staff_name}
                    value={selectedstaff}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                        setSelectedstaff(staff.filter((option) => option.staff_id !== 'selectAll'));
                      } else {
                        setSelectedstaff(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Staffs"
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
                        {option.staff_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.staff_id}
                            label={option.staff_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstaff(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={value}
                    sx={{
                      width: '100%'
                    }}
                    placeholder="Search Class"
                    onChange={(e) => handleFilter(e.target.value)}
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

export default TeachingStaffFilterCard;
