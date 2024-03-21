// subscriptionFeaturesReducer.js
const initialState = {
  subscriptionFeatures: [],
  loading: false
};

const subscriptionFeaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SUBSCRIPTION_FEATURES':
      return {
        ...state,
        subscriptionFeatures: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateSubscriptionFeatures = (subscriptionFeatures) => ({
  type: 'UPDATE_SUBSCRIPTION_FEATURES',
  payload: subscriptionFeatures
});

export default subscriptionFeaturesReducer;
