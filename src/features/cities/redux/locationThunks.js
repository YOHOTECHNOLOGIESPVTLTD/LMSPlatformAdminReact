import { fetchCities, fetchCountries, fetchStates } from "../services/locationService"
import { setCitiesForFormA, setCitiesForFormB, setCountries, setStates } from "./locationSlice"

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

export const loadCitiesForFromA = (countryCode, stateCode) => async (dispatch) => {
    try {
        const cities = await fetchCities(countryCode, stateCode);
        dispatch(setCitiesForFormA(cities));
    } catch (error) {
        console.error('Failed to load cities:', error);
    }
};
export const loadCitiesForFromB = (countryCode, stateCode) => async (dispatch) => {
    try {
        const cities = await fetchCities(countryCode, stateCode);
        dispatch(setCitiesForFormB(cities));
    } catch (error) {
        console.error('Failed to load cities:', error);
    }
};
