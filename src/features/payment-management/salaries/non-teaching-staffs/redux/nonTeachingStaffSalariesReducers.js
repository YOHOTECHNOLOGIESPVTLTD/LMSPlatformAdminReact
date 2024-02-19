// nonTeachingStaffSalariesReducer.js
const initialState = {
  nonTeachingStaffSalaries: [],
  loading: false
};

const nonTeachingStaffSalariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NON_TEACHING_STAFF_SALARIES':
      return {
        ...state,
        nonTeachingStaffSalaries: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateNonTeachingStaffSalaries = (nonTeachingStaffSalaries) => ({
  type: 'UPDATE_NON_TEACHING_STAFF_SALARIES',
  payload: nonTeachingStaffSalaries
});

export default nonTeachingStaffSalariesReducer;
