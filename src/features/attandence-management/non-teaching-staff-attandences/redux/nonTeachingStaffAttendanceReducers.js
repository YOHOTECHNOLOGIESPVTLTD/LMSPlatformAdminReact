// nonTeachingStaffAttendancesReducer.js
const initialState = {
  nonTeachingStaffAttendances: [],
  loading: false
};

const nonTeachingStaffAttendancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NON_TEACHING_STAFF_ATTENDANCES':
      return {
        ...state,
        nonTeachingStaffAttendances: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updatenonTeachingStaffAttendances = (nonTeachingStaffAttendances) => ({
  type: 'UPDATE_NON_TEACHING_STAFF_ATTENDANCES',
  payload: nonTeachingStaffAttendances
});

export default nonTeachingStaffAttendancesReducer;
