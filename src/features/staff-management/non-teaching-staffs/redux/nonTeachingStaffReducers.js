// nonTeachingStaffsReducer.js
const initialState = {
  nonTeachingStaffs: [],
  loading: false
};

const nonTeachingStaffsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NON_TEACHING_STAFFS':
      return {
        ...state,
        nonTeachingStaffs: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateNonTeachingStaffs = (nonTeachingStaffs) => ({
  type: 'UPDATE_NON_TEACHING_STAFFS',
  payload: nonTeachingStaffs
});

export default nonTeachingStaffsReducer;
