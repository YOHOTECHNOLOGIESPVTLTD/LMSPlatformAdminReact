// courseCategoryReducer.js
const initialState = {
  courseNotes: [],
  loading: false
};

const courseNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE_NOTES':
      return {
        ...state,
        courseNotes: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCourseNotes = (courseNotes) => ({
  type: 'UPDATE_COURSE_NOTES',
  payload: courseNotes
});

export default courseNotesReducer;
