// faqCategoryReducer.js
const initialState = {
  faqCategories: [],
  loading: false
};

const faqCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FAQ_CATEGORIES':
      return {
        ...state,
        faqCategories: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateFaqCategories = (faqCategories) => ({
  type: 'UPDATE_FAQ_CATEGORIES',
  payload: faqCategories
});

export default faqCategoriesReducer;
