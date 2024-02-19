// studentFeeRefundsReducer.js
const initialState = {
  studentFeeRefunds: [],
  loading: false
};

const studentFeeRefundsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_FEE_REFUNDS':
      return {
        ...state,
        studentFeeRefunds: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentFeeRefunds = (studentFeeRefunds) => ({
  type: 'UPDATE_STUDENT_FEE_REFUNDS',
  payload: studentFeeRefunds
});

export default studentFeeRefundsReducer;
