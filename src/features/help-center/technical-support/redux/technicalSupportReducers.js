// technicalSupportsReducer.js
const initialState = {
  technicalSupports: [],
  loading: false
};

const technicalSupportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TECHNICAL_SUPPORTS':
      return {
        ...state,
        technicalSupports: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateTechnicalSupports = (technicalSupports) => ({
  type: 'UPDATE_TECHNICAL_SUPPORTS',
  payload: technicalSupports
});

export default technicalSupportsReducer;
