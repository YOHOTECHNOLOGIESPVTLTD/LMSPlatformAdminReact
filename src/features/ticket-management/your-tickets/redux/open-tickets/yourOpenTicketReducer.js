// oReducer.js
const initialState = {
  openTickets: [],
  loading: false
};

const openTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OPEN_TICKETS':
      return {
        ...state,
        openTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateOpenTickets = (openTickets) => ({
  type: 'UPDATE_OPEN_TICKETS',
  payload: openTickets
});

export default openTicketsReducer;
