// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { forwardRef, useState } from 'react';
// ** Third Party Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box } from '@mui/material';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
// ** Custom Components Imports
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CustomChip from 'components/mui/chip';
import { Link } from 'react-router-dom';
// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
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

const courses = [
  { course_id: '1', course_name: 'Course 1' },
  { course_id: '2', course_name: 'Course 2' },
  { course_id: '3', course_name: 'Course 3' }
];
/* eslint-enable */
const InvoiceList = (props) => {
  // ** State
  const [dates, setDates] = useState([]);
  const [statusValue, setStatusValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  const [startDateRange, setStartDateRange] = useState(null);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const [selectedCourses, setSelectedCourses] = useState([]);
  const { value, handleFilter } = props;

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Batches" />
            <CardContent>
              <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12} sm={3}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="0">Active</MenuItem>
                    <MenuItem value="1">Deactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput dates={dates} setDates={setDates} label="Batch Date" end={endDateRange} start={startDateRange} />
                    }
                  />
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={value}
                    sx={{
                      width: '100%'
                    }}
                    placeholder="Search Batch"
                    onChange={(e) => handleFilter(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                  <Box component={Link} to={'add'}>
                    <Button variant="contained" size="medium" fullWidth>
                      Add New Staff
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default InvoiceList;
