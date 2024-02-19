// studentsReducer.js
const initialState = {
  students: [],
  loading: false
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENTS':
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudents = (students) => ({
  type: 'UPDATE_STUDENTS',
  payload: students
});

export default studentsReducer;
