// material-ui
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import CustomChip from 'components/mui/chip';
import DatePicker from 'react-datepicker';

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
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

const validationSchema = yup.object().shape({
  batchName: yup.string().required('Batch Name is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup.date().required('End Date is required'),
  branches: yup
    .array()
    .min(1, 'Please select at least one Branch')
    .test({
      name: 'atLeastOneBranch',
      message: 'Please select at least one Branch',
      test: (value) => value && value.length > 0
    }),
  course: yup.string().required('Course is required'),
  students: yup
    .array()
    .min(1, 'Please select at least one Student')
    .test({
      name: 'atLeastOneStudent',
      message: 'Please select at least one Student',
      test: (value) => value && value.length > 0
    })
    .nullable()
});

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

const BatchEditModal = ({ open, handleEditClose }) => {
  // ** States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleClose = () => {
    handleEditClose();
    reset();
  };

  const handleBranchChange = (event) => {
    setSelectedBranches(event.target.value);
  };

  const handleStudentsChange = (event) => {
    setSelectedStudents(event.target.value);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log(errors);
    console.log(data);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
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
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`]
          }}
        >
          Edit Batch
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
          }}
        >
          <Grid item xs={12} sm={9}>
            <DatePickerWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="batchName"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            fullWidth
                            label="Batch Name"
                            placeholder="carterLeonard"
                            error={Boolean(errors.batchName)}
                            helperText={errors.batchName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        selected={startDate}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText="MM-DD-YYYY"
                        customInput={
                          <CustomInput label="Start Date" error={Boolean(errors.startDate)} helperText={errors.startDate?.message} />
                        }
                        id="form-layouts-separator-date"
                        onChange={handleStartDateChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        selected={endDate}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText="MM-DD-YYYY"
                        customInput={<CustomInput label="End Date" error={Boolean(errors.endDate)} helperText={errors.endDate?.message} />}
                        id="form-layouts-separator-date"
                        onChange={handleEndDateChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="branches"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Branch"
                            id="select-multiple-checkbox"
                            SelectProps={{
                              MenuProps,
                              multiple: true,
                              value: selectedBranches,
                              onChange: (e) => handleBranchChange(e),
                              renderValue: (selected) => selected.join(', ')
                            }}
                            error={Boolean(errors.branches)}
                            helperText={errors.branches?.message}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox checked={selectedBranches.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="course"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Course"
                            id="form-layouts-separator-select"
                            defaultValue=""
                            error={Boolean(errors.course)}
                            helperText={errors.course?.message}
                          >
                            <MenuItem value="UK">UK</MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Australia">Australia</MenuItem>
                            <MenuItem value="Germany">Germany</MenuItem>
                          </CustomTextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="students"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label="Students"
                            id="select-multiple-chip"
                            SelectProps={{
                              MenuProps,
                              multiple: true,
                              value: selectedStudents,
                              onChange: (e) => handleStudentsChange(e),
                              renderValue: (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                  {selected.map((value) => (
                                    <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                                  ))}
                                </Box>
                              )
                            }}
                            error={Boolean(errors.students)}
                            helperText={errors.students?.message}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                  <Box>
                    <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                      Update
                    </Button>
                    <Button variant="tonal" color="error" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </form>
            </DatePickerWrapper>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchEditModal;
