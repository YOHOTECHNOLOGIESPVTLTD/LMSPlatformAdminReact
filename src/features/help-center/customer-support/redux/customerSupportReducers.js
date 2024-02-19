// customerSupportsReducer.js
const initialState = {
  customerSupports: [],
  loading: false
};

const customerSupportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CUSTOMER_SUPPORTS':
      return {
        ...state,
        customerSupports: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCustomerSupports = (customerSupports) => ({
  type: 'UPDATE_CUSTOMER_SUPPORTS',
  payload: customerSupports
});

export default customerSupportsReducer;
