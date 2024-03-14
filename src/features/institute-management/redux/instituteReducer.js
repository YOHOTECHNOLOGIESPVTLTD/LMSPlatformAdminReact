// institutesReducer.js
const initialState = {
  institutes: [],
  loading: false
};

const institutesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INSTITUTES':
      return {
        ...state,
        institutes: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateInstitutes = (institutes) => ({
  type: 'UPDATE_INSTITUTES',
  payload: institutes
});

export default institutesReducer;
