// coursesReducer.js
const initialState = {
  courses: [],
  loading: false
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE':
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCourses = (courses) => ({
  type: 'UPDATE_COURSE',
  payload: courses
});

export default coursesReducer;
