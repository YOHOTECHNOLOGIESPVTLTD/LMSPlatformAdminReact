// studentCertificatesReducer.js
const initialState = {
  studentCertificates: [],
  loading: false
};

const studentCertificatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_CERTIFICATES':
      return {
        ...state,
        studentCertificates: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentCertificates = (studentCertificates) => ({
  type: 'UPDATE_STUDENT_CERTIFICATES',
  payload: studentCertificates
});

export default studentCertificatesReducer;
