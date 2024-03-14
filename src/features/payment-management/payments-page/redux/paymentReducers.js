// paymentsReducer.js
const initialState = {
  payments: [],
  loading: false
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updatePayments = (payments) => ({
  type: 'UPDATE_PAYMENT',
  payload: payments
});

export default paymentsReducer;
