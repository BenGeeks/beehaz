import {toast} from "react-toastify";
import { 
  CHANGE_CURRENT_PAGE,
  ONLOAD_DATA,
  LOAD_WORLD,
  CONTACT_US, 
} from './types';

const INITIAL_STATE = {
  currentRoute: "Home",
  data:null,
  countries: ['India','France','China','Canada'],
  currency: ['USD', 'CAD','GDP','INR','EUR']
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentRoute: action.payload
      };
    case ONLOAD_DATA.success:
      return{
        ...state,
        data:action.payload
      }
    case LOAD_WORLD.success:
      // const countries = action.payload.map(({name}) => name);
      return{
        ...state
      }
    case CONTACT_US.pending:
      return{
        ...state,
      }
    case CONTACT_US.success:
      toast.success('Contact information sent successfully!')
      return{
       ...state, 
      }
    case CONTACT_US.error:
      toast.error(action.payload.message)
      return{
        ...state,
      }
    default:
      return state;
  }
}
