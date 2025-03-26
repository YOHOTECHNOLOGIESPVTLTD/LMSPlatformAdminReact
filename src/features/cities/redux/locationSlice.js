import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  states: [],
  cities: { formA: [], formB: [] },
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
    },
    setStates(state, action) {
      state.states = action.payload;
    },
    setCitiesForFormA: (state, action) => {
      state.cities.formA = action.payload;
    },
    setCitiesForFormB: (state, action) => {
      state.cities.formB = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setCountries, setStates, setCitiesForFormA, setCitiesForFormB } = locationSlice.actions;
export default locationSlice.reducer;
