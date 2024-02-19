import { useState, forwardRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomChip from 'components/mui/chip';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';

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
    .required()
});

const defaultValues = {
  course: ''
};

const OnlineExamEditModal = ({ open, handleEditClose }) => {
  const [personName, setPersonName] = useState([]);
  const [dates, setDates] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, height: '70%', maxHeight: 700 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit Offline Exam
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit()}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="Exam"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Exam Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.course)}
                      {...(errors.course && { helperText: errors.course.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth select defaultValue="" label="Exam Paper" id="custom-select">
                  <MenuItem value="">
                    <em>Thasthahir</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Batch"
                  id="select-multiple-chip"
                  SelectProps={{
                    MenuProps,
                    multiple: true,
                    value: personName,
                    onChange: (e) => handleChange(e),
                    renderValue: (selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                          <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                        ))}
                      </Box>
                    )
                  }}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  isClearable
                  selectsRange
                  monthsShown={1}
                  selected={startDateRange}
                  startDate={startDateRange}
                  shouldCloseOnSelect={false}
                  id="date-range-picker-months"
                  onChange={handleOnChangeRange}
                  customInput={<DateCustomInput dates={dates} setDates={setDates} label="Class Date" start={startDateRange} />}
                />
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    selected={startTime}
                    dateFormat="h:mm aa"
                    id="start-time-picker"
                    onChange={handleStartTimeChange}
                    customInput={<CustomInput label="Start Time" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    selected={endTime}
                    dateFormat="h:mm aa"
                    id="end-time-picker"
                    onChange={handleEndTimeChange}
                    customInput={<CustomInput label="End Time" />}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <TextField fullWidth select defaultValue="" label="Instructor" id="custom-select">
                  <MenuItem value="">
                    <em>Thasthahir</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Teacher"
                  id="select-teacher-chip"
                  SelectProps={{
                    MenuProps,
                    multiple: true,
                    value: selectedTeachers,
                    onChange: handleTeacherChange,
                    renderValue: (selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                          <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                        ))}
                      </Box>
                    )
                  }}
                >
                  {teachersList.map((teacher) => (
                    <MenuItem key={teacher} value={teacher}>
                      {teacher}
                    </MenuItem>
                  ))}
                </TextField>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnlineExamEditModal;
