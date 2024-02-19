// studentCertificateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentCertificateSlice = createSlice({
  name: 'studentCertificates',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentCertificates: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentCertificates, setLoading } = studentCertificateSlice.actions;
export default studentCertificateSlice.reducer;
