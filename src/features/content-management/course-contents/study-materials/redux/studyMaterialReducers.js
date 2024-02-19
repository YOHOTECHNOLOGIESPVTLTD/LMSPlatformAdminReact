// courseStudyMaterialsReducer.js
const initialState = {
  courseStudyMaterials: [],
  loading: false
};

const courseStudyMaterialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COURSE_STUDY_MATERIALS':
      return {
        ...state,
        courseStudyMaterials: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCourseStudyMaterials = (courseStudyMaterials) => ({
  type: 'UPDATE_COURSE_STUDY_MATERIALS',
  payload: courseStudyMaterials
});

export default courseStudyMaterialsReducer;
