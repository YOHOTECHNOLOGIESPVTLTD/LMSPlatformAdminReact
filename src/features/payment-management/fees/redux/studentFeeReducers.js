// studentFeesReducer.js
const initialState = {
  studentFees: [],
  loading: false
};

const studentFeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_FEES':
      return {
        ...state,
        studentFees: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentFees = (studentFees) => ({
  type: 'UPDATE_STUDENT_FEES',
  payload: studentFees
});

export default studentFeesReducer;
