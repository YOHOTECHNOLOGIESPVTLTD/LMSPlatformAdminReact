// subscriptionPlansReducer.js
const initialState = {
  subscriptionPlans: [],
  loading: false
};

const subscriptionPlansReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SUBSCRIPTION_PLANS':
      return {
        ...state,
        subscriptionPlans: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateSubscriptionPlans = (subscriptionPlans) => ({
  type: 'UPDATE_SUBSCRIPTION_PLANS',
  payload: subscriptionPlans
});

export default subscriptionPlansReducer;
