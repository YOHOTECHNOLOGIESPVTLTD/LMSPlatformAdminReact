// cReducer.js
const initialState = {
  closedTickets: [],
  loading: false
};

const closedTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CLOSED_TICKETS':
      return {
        ...state,
        closedTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateClosedTickets = (closedTickets) => ({
  type: 'UPDATE_CLOSED_TICKETS',
  payload: closedTickets
});

export default closedTicketsReducer;
