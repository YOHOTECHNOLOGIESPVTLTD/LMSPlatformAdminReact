// offlineClassesReducer.js
const initialState = {
  offlineClasses: [],
  loading: false
};

const offlineClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OFFLINE_CLASSES':
      return {
        ...state,
        offlineClasses: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateOfflineClasses = (offlineClasses) => ({
  type: 'UPDATE_OFFLINE_CLASSES',
  payload: offlineClasses
});

export default offlineClassesReducer;
