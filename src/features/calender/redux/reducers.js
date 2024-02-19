// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async () => {
  return [
    {
      id: 1,
      url: '',
      title: 'Design Review',
      start: '2024-01-24T07:28:04.206Z',
      end: '2024-01-25T07:28:04.206Z',
      allDay: false,
      extendedProps: {
        calendar: 'Absent'
      }
    },
    {
      id: 2,
      url: '',
      title: 'Meeting With Client',
      start: '2024-01-20T00:00:00.000Z',
      end: '2024-01-21T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Absent'
      }
    },
    {
      id: 3,
      url: '',
      title: 'Family Trip',
      allDay: true,
      start: '2024-01-22T00:00:00.000Z',
      end: '2024-01-24T00:00:00.000Z',
      extendedProps: {
        calendar: 'Holiday'
      }
    },
    {
      id: 4,
      url: '',
      title: "Doctor's Appointment",
      start: '2024-01-20T00:00:00.000Z',
      end: '2024-01-21T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Present'
      }
    },
    {
      id: 6,
      url: '',
      title: 'Meditation',
      start: '2024-01-18T00:00:00.000Z',
      end: '2024-01-19T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Present'
      }
    },
    {
      id: 8,
      url: '',
      title: 'Product Review',
      start: '2024-01-18T00:00:00.000Z',
      end: '2024-01-19T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Absent'
      }
    },
    {
      id: 9,
      url: '',
      title: 'Monthly Meeting',
      start: '2024-02-01T00:00:00.000Z',
      end: '2024-02-01T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Absent'
      }
    },
    {
      id: 10,
      url: '',
      title: 'Monthly Checkup',
      start: '2023-12-01T00:00:00.000Z',
      end: '2023-12-01T00:00:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Present'
      }
    }
  ];
});

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  });
  await dispatch(fetchEvents(['Present', 'Absent', 'Family', 'Holiday', 'ETC']));

  return response.data.event;
});

// ** Update Event
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  });
  await dispatch(fetchEvents(['Present', 'Absent', 'Family', 'Holiday', 'ETC']));

  return response.data.event;
});

// ** Delete Event
export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  });
  await dispatch(fetchEvents(['Present', 'Absent', 'Family', 'Holiday', 'ETC']));

  return response.data;
});

export const appCalendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Present', 'Absent']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex((i) => i === action.payload);
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1);
      } else {
        state.selectedCalendars.push(action.payload);
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0;
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload;
      if (value === true) {
        state.selectedCalendars = ['Present', 'Absent'];
      } else {
        state.selectedCalendars = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  }
});

export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
