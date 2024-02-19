// liveClassesReducer.js
const initialState = {
  liveClasses: [],
  loading: false
};

const liveClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIVE_CLASSES':
      return {
        ...state,
        liveClasses: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateLiveClasses = (liveClasses) => ({
  type: 'UPDATE_LIVE_CLASSES',
  payload: liveClasses
});

export default liveClassesReducer;
