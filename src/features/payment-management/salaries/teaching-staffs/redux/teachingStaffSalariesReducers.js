// teachingStaffSalariesReducer.js
const initialState = {
  teachingStaffSalaries: [],
  loading: false
};

const teachingStaffSalariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TEACHING_STAFF_SALARIES':
      return {
        ...state,
        teachingStaffSalaries: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateTeachingStaffSalaries = (teachingStaffSalaries) => ({
  type: 'UPDATE_TEACHING_STAFF_SALARIES',
  payload: teachingStaffSalaries
});

export default teachingStaffSalariesReducer;
