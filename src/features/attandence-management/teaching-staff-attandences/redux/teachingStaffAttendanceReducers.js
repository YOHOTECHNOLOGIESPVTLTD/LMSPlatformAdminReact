// teachingStaffAttendancesReducer.js
const initialState = {
  teachingStaffAttendances: [],
  loading: false
};

const teachingStaffAttendancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TEACHING_STAFF_ATTENDANCES':
      return {
        ...state,
        teachingStaffAttendances: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateTeachingStaffAttendances = (teachingStaffAttendances) => ({
  type: 'UPDATE_TEACHING_STAFF_ATTENDANCES',
  payload: teachingStaffAttendances
});

export default teachingStaffAttendancesReducer;
