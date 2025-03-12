import { fetchCities, fetchCountries, fetchStates } from '../services/locationService';
import { setCitiesForFormA, setCitiesForFormB, setCountries, setStates } from './locationSlice';

export const loadCountries = () => async (dispatch) => {
  try {
    const countries = await fetchCountries();
    dispatch(setCountries(countries));
  } catch (error) {
    console.error('Failed to load countries:', error);
  }
};

export const loadStates = (countryCode) => async (dispatch) => {
  try {
    const states = await fetchStates(countryCode);
    dispatch(setStates(states));
  } catch (error) {
    console.error('Failed to load states:', error);
  }
};

export const loadCitiesForFormA = (countryCode, stateCode) => async (dispatch) => {
    try {
        const cities = await fetchCities(countryCode, stateCode);
        dispatch(setCitiesForFormA(cities));
    } catch (error) {
        console.error('Failed to load cities for Form A:', error);
    }
};
export const loadCitiesForFormB = (countryCode, stateCode) => async (dispatch) => {
    try {
        const cities = await fetchCities(countryCode, stateCode);
        dispatch(setCitiesForFormB(cities));
    } catch (error) {
        console.error('Failed to load cities for Form B:', error);
    }
};

