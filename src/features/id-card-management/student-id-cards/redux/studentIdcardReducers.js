// studentIdCardsReducer.js
const initialState = {
  studentIdCards: [],
  loading: false
};

const studentIdCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_ID_CARDS':
      return {
        ...state,
        studentIdCards: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentIdCards = (studentIdCards) => ({
  type: 'UPDATE_STUDENT_ID_CARDS',
  payload: studentIdCards
});

export default studentIdCardsReducer;
