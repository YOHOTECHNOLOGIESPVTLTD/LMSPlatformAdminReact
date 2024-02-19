// studentAttendancesReducer.js
const initialState = {
  studentAttendances: [],
  loading: false
};

const studentAttendancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_ATTENDANCES':
      return {
        ...state,
        studentAttendances: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentAttendances = (studentAttendances) => ({
  type: 'UPDATE_STUDENT_ATTENDANCES',
  payload: studentAttendances
});

export default studentAttendancesReducer;
