// courseModuleReducer.js
const initialState = {
  courseModules: [],
  loading: false
};

const courseModulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE_MODULES':
      return {
        ...state,
        courseModules: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCourseModules = (courseModules) => ({
  type: 'UPDATE_COURSE_MODULES',
  payload: courseModules
});

export default courseModulesReducer;
