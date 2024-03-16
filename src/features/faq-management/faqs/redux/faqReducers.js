// faqCategoryReducer.js
const initialState = {
  faqs: [],
  loading: false
};

const faqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FAQS':
      return {
        ...state,
        faqs: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateFaqs = (faqs) => ({
  type: 'UPDATE_FAQS',
  payload: faqs
});

export default faqsReducer;
