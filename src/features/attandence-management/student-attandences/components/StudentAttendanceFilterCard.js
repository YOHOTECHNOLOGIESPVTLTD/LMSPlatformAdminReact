// ** React Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

/* eslint-enable */
const StudentAttendanceFilterCard = (props) => {
  // ** State
  const [statusValue, setStatusValue] = useState('');
  const [selectedstudent, setSelectedstudent] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];
  const students = [
    { student_id: '1', student_name: 'Student 1' },
    { student_id: '2', student_name: 'Student 2' },
    { student_id: '3', student_name: 'Student 3' }
  ];

  const handleFilterByBatch = (e) => {
    setStatusValue(e.target.value);
  };

  const { value, handleFilter } = props;

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Student Attendance" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField select fullWidth label="Batch" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByBatch(e) }}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={[{ student_id: 'selectAll', student_name: 'Select All' }, ...students]}
                    getOptionLabel={(option) => option.student_name}
                    value={selectedstudent}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.student_id === 'selectAll')) {
                        setSelectedstudent(students.filter((option) => option.student_id !== 'selectAll'));
                      } else {
                        setSelectedstudent(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Student"
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
                        {option.student_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.student_id}
                            label={option.student_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstudent(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.student_id === value.student_id}
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
                    placeholder="Search Student"
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

export default StudentAttendanceFilterCard;
