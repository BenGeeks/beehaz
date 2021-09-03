import { toast } from 'react-toastify'

import {
  LOAD_GUEST_LIST,
  ADD_GUEST_IN_LIST,
  DELETE_GUEST,
  EDIT_GUEST,
  RESET_GUEST_FLAG,
  ADD_GUEST_BY_BOOKING,
  GET_GUEST_BY_BOOKING,
  CLEAR_GUEST,
} from './types';
import { actionForState } from '../../common/functions/utils';

toast.configure();

const INITIAL_STATE = {
  guestList: [
    {
      company: 'test',
      country: 'India',
      id: 0,
      address: 'address',
      emailId: 'mail2mail.com',
      name: 'adfds',
      notes: 'notes',
      phoneNo: 'dfsdf',
      postalCode: 'postal_code',
      secondaryEmailId: '',
    },
  ],
  guestByBooking:[],
  actionForLoad: {
    loading: false,
    success: false,
    error: false,
  },
  actionForEdit: {
    loading: false,
    success: false,
    error: false,
  },
  actionForAddGuest: {
    loading: false,
    success: false,
    error: false,
  },
  actionForUpdateGuest: {
    loading: false,
    success: false,
    error: false,
  },
  actionForDeleteGuest: {
    loading: false,
    success: false,
    error: false,
  },
  actionForGuestLoad: {
    loading: false,
    success: false,
    error: false,
  },
  guestFlag: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_GUEST_LIST.pending:
      return {
        ...state,
        actionForLoad: actionForState(state.action, 'pending'),
      };
    case LOAD_GUEST_LIST.success:
      return {
        ...state,
        actionForLoad: actionForState(state.action, 'success'),
        guestList: action.payload.guests,
      };
    case LOAD_GUEST_LIST.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForLoad: actionForState(state.action, action.payload.message),
      };
    case ADD_GUEST_IN_LIST.pending:
      return {
        ...state,
        actionForAddGuest: actionForState(state.action, 'pending'),
      };
    case ADD_GUEST_IN_LIST.success:
      toast.success('Successfully added guest!');
      return {
        ...state,
        guestList: state.guestList.concat(action.payload.guest),
        guestFlag: action.payload.guest.id,
        actionForAddGuest: actionForState(state.action, 'success'),
      };
    case ADD_GUEST_IN_LIST.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForAddGuest: actionForState(state.action, action.payload.message),
      };

    case DELETE_GUEST.pending:
      return {
        ...state,
        actionForDeleteGuest: actionForState(state.action, 'pending'),
      };

    case DELETE_GUEST.success:
      toast.success('Guest successfully deleted!');
      return {
        ...state,
        guestList: state.guestList.filter((item) => item.id !== parseInt(action.payload.id)),
        actionForDeleteGuest: actionForState(state.action, 'success'),
      };

    case DELETE_GUEST.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForDeleteGuest: actionForState(state.action, action.payload.message),
      };

    case EDIT_GUEST.pending:
      return {
        ...state,
        actionForUpdateGuest: actionForState(state.action, 'pending'),
      };

    case EDIT_GUEST.success:
      toast.success('Guest updated successfully!');
      const index=state.guestList.findIndex(row=>row.id===action.payload.guest.id);
      let guestArrayData=[...state.guestList];
      guestArrayData[index]=action.payload.guest;
      return {
        ...state,
        guestList: guestArrayData,
        actionForUpdateGuest: actionForState(state.action, 'success'),
      };

    case EDIT_GUEST.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForUpdateGuest: actionForState(state.action, action.payload.message),
      };

    case RESET_GUEST_FLAG:
      return {
        ...state,
        guestFlag: null,
      };
    case ADD_GUEST_BY_BOOKING.pending:
      return {
        ...state,
      };
    case ADD_GUEST_BY_BOOKING.success:
      return {
        ...state,
      };
    case GET_GUEST_BY_BOOKING.pending:
      return{
        ...state,
        actionForGuestLoad: actionForState(state.action,'pending')
      }
    case GET_GUEST_BY_BOOKING.success:
      return{
        ...state,
        guestByBooking:action.payload.guests,
        actionForGuestLoad: actionForState(state.action,'success')
      }
    case GET_GUEST_BY_BOOKING.error:
      toast.error("Failed to load guest data")
      return{
        ...state,
        actionForGuestLoad: actionForState(state.action,'error')
      }
    case ADD_GUEST_BY_BOOKING.error:
      toast.error(action.payload.message);
      return {
        ...state,
      };
    case CLEAR_GUEST:
      return {
        ...state,
        actionForUpdateGuest: INITIAL_STATE.actionForUpdateGuest,
        guestByBooking: INITIAL_STATE.guestByBooking
      }
    default:
      return state;
  }
}
