// staffIdCardsReducer.js
const initialState = {
  staffIdCards: [],
  loading: false
};

const staffIdCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STAFF_ID_CARDS':
      return {
        ...state,
        staffIdCards: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStaffIdCards = (staffIdCards) => ({
  type: 'UPDATE_STAFF_ID_CARDS',
  payload: staffIdCards
});

export default staffIdCardsReducer;
