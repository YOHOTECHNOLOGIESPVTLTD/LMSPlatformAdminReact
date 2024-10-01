import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { login_step } from 'lib/constants';


const initialStep = Cookies.get('step') || login_step;
export const stepsAtom = atom(initialStep);


export const stepsAtomWithPersistence = atom(
  (get) => get(stepsAtom), 
  (get, set, newStep) => {
    
    set(stepsAtom, newStep);
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000)
    Cookies.set('step', newStep, { expires: expires }); 
  }
);
