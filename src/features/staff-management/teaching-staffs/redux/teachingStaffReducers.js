// teachingStaffsReducer.js
const initialState = {
  teachingStaffs: [],
  loading: false
};

const teachingStaffsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TEACHING_STAFFS':
      return {
        ...state,
        teachingStaffs: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateTeachingStaffs = (teachingStaffs) => ({
  type: 'UPDATE_TEACHING_STAFFS',
  payload: teachingStaffs
});

export default teachingStaffsReducer;
