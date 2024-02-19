// ** React Imports
import { Fragment, forwardRef, useCallback, useEffect, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
// ** Custom Component Import
import { TextField } from '@mui/material';
// ** Third Party Imports
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
// ** Icon Imports
import Icon from 'components/icon';

// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

const capitalize = (string) => string && string[0].toUpperCase() + string.slice(1);

const defaultState = {
  staff_name: '',
  attendance: 'Present',
  attendance_date: new Date()
};

const TeachingStaffAddEventSidebar = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    attendanceApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props;

  // ** States
  const [values, setValues] = useState(defaultState);

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { staff_name: '' } });

  const handleSidebarClose = async () => {
    setValues(defaultState);
    clearErrors();
    dispatch(handleSelectEvent(null));
    handleAddEventSidebarToggle();
  };

  const onSubmit = (data) => {
    const modifiedEvent = {
      url: values?.url,
      display: 'block',
      staff_name: data?.staff_name,
      end: values.endDate,
      allDay: values.allDay,
      start: values.startDate,
      extendedProps: {
        attendance: capitalize(values.attendance),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
      }
    };
    if (store?.selectedEvent === null || (store?.selectedEvent !== null && !store?.selectedEvent?.staff_name?.length)) {
      dispatch(addEvent(modifiedEvent));
    } else {
      dispatch(updateEvent({ id: store?.selectedEvent?.id, ...modifiedEvent }));
    }
    attendanceApi.refetchEvents();
    handleSidebarClose();
  };

  const handleDeleteEvent = () => {
    if (store?.selectedEvent) {
      dispatch(deleteEvent(store?.selectedEvent?.id));
    }
    handleSidebarClose();
  };

  const handleStartDate = (date) => {
    if (date) {
      setValues({ ...values, attendance_date: new Date(date) });
    }
  };

  const resetToStoredValues = useCallback(() => {
    if (store?.selectedEvent !== null) {
      const event = store?.selectedEvent;
      setValue('staff_name', event?.staff_name || '');
      setValues({
        staff_name: event?.staff_name || '',
        attendance: event?.extendedProps.attendance || 'Present',
        attendance_date: event?.start !== null ? event?.start : new Date()
      });
    }
  }, [setValue, store?.selectedEvent]);

  const resetToEmptyValues = useCallback(() => {
    setValue('staff_name', '');
    setValues(defaultState);
  }, [setValue]);
  useEffect(() => {
    if (store?.selectedEvent !== null) {
      resetToStoredValues();
    } else {
      resetToEmptyValues();
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store?.selectedEvent]);

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} fullWidth {...props} label={props.label || ''} sx={{ width: '100%' }} error={props.error} />;
  });

  const RenderSidebarFooter = () => {
    if (store?.selectedEvent === null || (store?.selectedEvent !== null && !store?.selectedEvent?.staff_name?.length)) {
      return (
        <Fragment>
          <Button type="submit" variant="contained" sx={{ mr: 4 }}>
            Add
          </Button>
          <Button variant="tonal" color="secondary" onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button type="submit" variant="contained" sx={{ mr: 4 }}>
            Update
          </Button>
          <Button variant="tonal" color="secondary" onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      );
    }
  };

  return (
    <Drawer
      anchor="right"
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className="sidebar-header"
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">
          {store?.selectedEvent !== null && store?.selectedEvent?.staff_name?.length ? 'Update Attendance' : 'Add Attendance'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store?.selectedEvent !== null && store?.selectedEvent?.staff_name?.length ? (
            <IconButton size="small" onClick={handleDeleteEvent} sx={{ color: 'text.primary', mr: store?.selectedEvent !== null ? 1 : 0 }}>
              <Icon icon="tabler:trash" fontSize="1.25rem" />
            </IconButton>
          ) : null}
          <IconButton
            size="small"
            onClick={handleSidebarClose}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.25rem" />
          </IconButton>
        </Box>
      </Box>
      <Box className="sidebar-body" sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
              name="staff_name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  label="Staff Name"
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  placeholder="Mohammed Thasthakir"
                  error={Boolean(errors?.staff_name)}
                  {...(errors?.staff_name && { helperText: 'This field is required' })}
                />
              )}
            />
            <TextField
              select
              fullWidth
              sx={{ mb: 4 }}
              label="Attendance"
              SelectProps={{
                value: values.attendance,
                onChange: (e) => setValues({ ...values, attendance: e.target.value })
              }}
            >
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </TextField>
            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsStart
                id="event-start-date"
                selected={values.attendance_date}
                startDate={values.attendance_date}
                dateFormat={'yyyy-MM-dd'}
                customInput={<PickersComponent label="Attendance Date" registername="attendance_date" />}
                onChange={(date) => setValues({ ...values, attendance_date: new Date(date) })}
                onSelect={handleStartDate}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  );
};

export default TeachingStaffAddEventSidebar;
