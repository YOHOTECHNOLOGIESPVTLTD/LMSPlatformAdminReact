// courseCategoryReducer.js
const initialState = {
  courseCategories: [],
  loading: false
};

const courseCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE_CATEGORIES':
      return {
        ...state,
        courseCategories: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCourseCategories = (courseCategories) => ({
  type: 'UPDATE_COURSE_CATEGORIES',
  payload: courseCategories
});

export default courseCategoriesReducer;
