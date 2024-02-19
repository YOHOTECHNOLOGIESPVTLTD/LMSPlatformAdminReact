// batchesReducer.js
const initialState = {
  batches: [],
  loading: false
};

const batchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BATCHES':
      return {
        ...state,
        batches: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateBatches = (batches) => ({
  type: 'UPDATE_BATCHES',
  payload: batches
});

export default batchesReducer;
