import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Checkbox, Grid, IconButton, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import format from 'date-fns/format';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';

/* eslint-disable */
const DateCustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const value = `${startDate}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return <TextField {...props} inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const schema = yup.object().shape({
  course: yup
    .string()
    .min(3, (obj) => showErrors('Course', obj.value.length, obj.min))
    .required('Course field is required'),
  batch: yup.array().of(yup.string()).min(1, 'Batch field is required').required('Batch field is required'),
  classDate: yup.date().nullable().required('Class Date field is required'),
  startTime: yup.date().nullable().required('Start Time field is required'),
  endTime: yup.date().nullable().required('End Time field is required'),
  instructor: yup.string().required('Instructor field is required'),
  teacher: yup.array().of(yup.string()).min(1, 'Teacher field is required').required('Teacher field is required')
});

const defaultValues = {
  course: '',
  batch: [],
  classDate: null,
  startTime: null,
  endTime: null,
  instructor: '',
  teacher: []
};

const handleCopyLink = () => {
  const link = 'Your generated link';
  navigator.clipboard.writeText(link).then(() => {
    console.log('Link copied to clipboard');
  });
};

const LiveClassEditModal = ({ open, handleEditClose }) => {
  const [personName, setPersonName] = useState([]);
  const [dates, setDates] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const instructors = [
    { instructor_id: '1', instructor_name: 'Instructor 1' },
    { instructor_id: '2', instructor_name: 'Instructor 2' },
    { instructor_id: '3', instructor_name: 'Instructor 3' }
  ];
  const coordinates = [
    { coordinate_id: '1', coordinate_name: 'Coordinate 1' },
    { coordinate_id: '2', coordinate_name: 'Coordinate 2' },
    { coordinate_id: '3', coordinate_name: 'Coordinate 3' }
  ];
  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleOnChangeRange = (dates) => {
    const [start] = dates;
    if (start !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleTeacherChange = (event) => {
    setSelectedTeachers(event.target.value);
  };

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setValue('course', '');
    setValue('batch', []);
    setValue('classDate', null);
    setValue('startTime', null);
    setValue('endTime', null);
    setValue('instructor', '');
    setValue('teacher', []);
    handleEditClose();
    reset();
  };

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

  const teachersList = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
          pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
        }}
      >
        Edit Live Class
      </DialogTitle>

      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(2)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <DatePickerWrapper>
          <form onSubmit={handleSubmit()}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="course"
                  control={control}
                  rules={{ required: 'Course field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.course)}
                      {...(errors.course && { helperText: errors.course.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="batch"
                  control={control}
                  rules={{ required: 'Batch field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      select
                      label="Batch"
                      id="select-multiple-chip"
                      value={value}
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      SelectProps={{
                        MenuProps,
                        multiple: true,
                        renderValue: (selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                              <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                            ))}
                          </Box>
                        )
                      }}
                      error={Boolean(errors.batch)}
                      helperText={errors.batch?.message}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="classDate"
                  control={control}
                  rules={{ required: 'Class date is required' }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      isClearable
                      selectsRange
                      monthsShown={1}
                      selected={value}
                      startDate={value}
                      shouldCloseOnSelect={false}
                      onChange={(dates) => {
                        handleOnChangeRange(dates);
                        onChange(dates);
                      }}
                      customInput={
                        <DateCustomInput
                          dates={dates}
                          setDates={setDates}
                          label="Class Date"
                          start={value}
                          sx={{ border: errors.classDate ? '1px solid red' : 'none', borderRadius: '7px' }}
                        />
                      }
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select Class Date"
                      className={`form-control ${errors.classDate ? 'is-invalid' : ''}`}
                    />
                  )}
                />
                {errors.classDate && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.classDate.message}</p>}
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="startTime"
                    control={control}
                    rules={{ required: 'Start time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={value}
                        onChange={(time) => {
                          handleStartTimeChange(time);
                          onChange(time);
                        }}
                        customInput={
                          <CustomInput
                            label="Start Time"
                            sx={{ border: errors.startTime ? '1px solid red' : 'none', borderRadius: '7px' }}
                          />
                        }
                        dateFormat="h:mm aa"
                        placeholderText="Select Start Time"
                        className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.startTime && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.startTime.message}</p>}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="endTime"
                    control={control}
                    rules={{ required: 'End time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={value}
                        onChange={(time) => {
                          handleEndTimeChange(time);
                          onChange(time);
                        }}
                        customInput={
                          <CustomInput label="End Time" sx={{ border: errors.endTime ? '1px solid red' : 'none', borderRadius: '7px' }} />
                        }
                        dateFormat="h:mm aa"
                        placeholderText="Select End Time"
                        className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.endTime && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.endTime.message}</p>}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 0.5 }}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ instructor_id: 'selectAll', instructor_name: 'Select All' }, ...instructors]}
                  getOptionLabel={(option) => option.instructor_name}
                  value={selectedInstructors}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.instructor_id === 'selectAll')) {
                      setSelectedInstructors(instructors.filter((option) => option.instructor_id !== 'selectAll'));
                    } else {
                      setSelectedInstructors(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Instructors"
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
                      {option.instructor_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.instructor_id}
                          label={option.instructor_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedInstructors(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option.instructor_id === value.instructor_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disableCloseOnSelect
                  multiple
                  id="select-multiple-coordinates"
                  options={[{ coordinate_id: 'selectAll', coordinate_name: 'Select All' }, ...coordinates]}
                  getOptionLabel={(option) => option.coordinate_name}
                  value={selectedCoordinates}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.coordinate_id === 'selectAll')) {
                      setSelectedCoordinates(coordinates.filter((option) => option.coordinate_id !== 'selectAll'));
                    } else {
                      setSelectedCoordinates(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Coordinates"
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
                      {option.coordinate_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.coordinate_id}
                          label={option.coordinate_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCoordinates(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option.coordinate_id === value.coordinate_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value="Your generated link"
                  readOnly
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="copy-link" onClick={handleCopyLink} edge="start" sx={{ color: 'primary.main' }}>
                          <FileCopyIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ border: '1px ', borderRadius: '7px' }}
                />
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Submit
                  </Button>
                  <Button variant="tonal" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DatePickerWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default LiveClassEditModal;
