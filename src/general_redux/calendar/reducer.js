import moment from 'moment';
import { toast } from 'react-toastify';

import {
  ADD_BOOKING,
  EDIT_BOOKING,
  LOAD_BOOKING,
  BOOKING_FLAG,
  CLEAR_BOOKING,
  DELETE_BOOKING,
  GET_BOOKING_BY_GUEST_ID,
  DELETE_BLOCK_DATE,
  ADD_CHANNEL, DELETE_CHANNEL,
  CHARGE_CALCULATION,
  RESET_CHARGES,
  ADD_DISCOUNT,
  FETCH_DISCOUNT,
  FETCH_DISCOUNT_BY_BOOKING
} from './types';
import {actionForState} from "../../common/functions/utils";
toast.configure();

const INITIAL_STATE = {
  allBooking: [],
  bookingListByGuest: [],
  channels:[],
  bookingFlag: null,
  bookingDiscount:[],
  currentCharges:{
    daily_rate:0,
    discounts:0,
    extra_guest_fees:0,
    fees:0
  },
  action: {
    loading: false,
    success: undefined,
  },
  actionForBooking: {
    loading: false,
    success: false,
    error: false,
  },
  actionForAddBooking: {
    loading: false,
    success: false,
    error: false,
  },
  actionEditBooking: {
    loading: false,
    success: false,
    error: false,
  },
  actionDeleteBooking: {
    loading: false,
    success: false,
    error: false,
  },
  actionForGetBookingListById: {
    loading: false,
    success: false,
    error: false,
  },
  actionDeleteBlockDate: {
    loading: false,
    success: false,
    error: false,
  },
  actionForCharges:{
    loading: false,
    success: false,
    error: false,
  }
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOKING.pending:
      return {
        ...state,
        actionForAddBooking: actionForState(state.action, 'pending'),
      };
    case ADD_BOOKING.success:
      if(action.payload.booking.bookingType==="booking"){
        toast.success('Booking has been added successfully!');
      }else{
        toast.success('Dates blocked successfully.');
      }
      return {
        ...state,
        allBooking: state.allBooking.concat({
          ...action.payload.booking,
          id: action.payload.booking.id,
          type: action.payload.booking.bookingType,
          group: action.payload.booking.rentalId,
          color: action.payload.booking.color,
          status: false,
          start_time:moment(`${action.payload.booking.arrive} ${action.payload.booking.checkInTime}`,"YYYY-MM-DD HH:mm"),
          end_time:moment(`${action.payload.booking.depart} ${action.payload.booking.checkOutTime}`,"YYYY-MM-DD HH:mm"),
        }),
        bookingFlag: action.payload.booking.bookingType === 'blockdates' ? null : action.payload.booking.id,
        actionForAddBooking: actionForState(state.action, 'success'),
      };
    case ADD_BOOKING.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForAddBooking: actionForState(state.action, 'error', action.payload.message),
      };
    case LOAD_BOOKING.pending:
      return {
        ...state,
        actionForBooking: actionForState(state.action, 'pending'),
      };
    case LOAD_BOOKING.success:
      let dataItem=[];
      action.payload.booking.forEach(element => {
        element.status !== "Cancelled" && dataItem.push({...element,
          start_time:moment(`${element.arrive} ${element.checkInTime}`,"YYYY-MM-DD HH:mm"),
          end_time:moment(`${element.depart} ${element.checkOutTime}`,"YYYY-MM-DD HH:mm"),
          group:element.rentalId,
          status:false,
          color:element.color,
          type:element.bookingType})
      });
      return {
        ...state,
        actionForBooking: actionForState(state.action, 'success'),
        allBooking: dataItem,
      };
    case LOAD_BOOKING.error:
      toast.error('Failed to load bookings!');
      return {
        ...state,
        actionForBooking: actionForState(state.action, 'error', action.payload.message),
      };
    case EDIT_BOOKING.pending:
      return {
        ...state,
        actionEditBooking: actionForState(state.action, 'pending'),
      };
    case EDIT_BOOKING.success:
      const BookingArrayData = state.allBooking;
      const updateIndex = state.allBooking.findIndex(({ id }) => Number(id) === action.payload.booking.id);
      if (updateIndex !== -1) {
        BookingArrayData[updateIndex] = {...action.payload.booking,
          start_time:moment(`${action.payload.booking.arrive} ${action.payload.booking.checkInTime}`),
          end_time:moment(`${action.payload.booking.depart} ${action.payload.booking.checkOutTime}`),
          group:action.payload.booking.rentalId,
          status:false,
          type:action.payload.booking.bookingType
        };
      }
      toast.success('Booking has been edited successfully!');
      return {
        ...state,
        allBooking: BookingArrayData,
        actionEditBooking: actionForState(state.action, 'success'),
      };
    case EDIT_BOOKING.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionEditBooking: actionForState(state.action, 'error', action.payload.message),
      };
    case BOOKING_FLAG:
      return {
        ...state,
        bookingFlag: null,
      };
    case CLEAR_BOOKING:
      return {
        ...state,
        actionForAddBooking: INITIAL_STATE.actionForAddBooking,
        actionEditBooking: INITIAL_STATE.actionEditBooking,
      };

    case DELETE_BOOKING.pending:
      return {
        ...state,
        actionDeleteBooking: actionForState(state.action, 'pending'),
      };
    case DELETE_BOOKING.success:
      toast.success('The booking was successfully deleted.');
      return {
        ...state,
        allBooking: state.allBooking.filter((item) => item.id !== parseInt(action.payload.id)),
        actionDeleteBooking: actionForState(state.action, 'success'),
      };
    case DELETE_BOOKING.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionDeleteBooking: actionForState(state.action, 'error', action.payload.message),
      };

      case DELETE_BLOCK_DATE.pending:
      return {
        ...state,
        actionDeleteBlockDate: actionForState(state.action, 'pending'),
      };
    case DELETE_BLOCK_DATE.success:
      toast.success('Dates have been unblocked successfully!');
      return {
        ...state,
        allBooking: state.allBooking.filter((item) => item.id !== parseInt(action.payload.id)),
        actionDeleteBlockDate: actionForState(state.action, 'success'),
      };
    case DELETE_BLOCK_DATE.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionDeleteBlockDate: actionForState(state.action, 'error', action.payload.message),
      };

    case GET_BOOKING_BY_GUEST_ID.pending:
        return {
          ...state,
          actionForGetBookingListById: actionForState(state.action, 'pending'),
        };
    case GET_BOOKING_BY_GUEST_ID.success:
        return {
          ...state,
          bookingListByGuest: action.payload.booking,
          actionForGetBookingListById: actionForState(state.action, 'success'),
        };
    case GET_BOOKING_BY_GUEST_ID.error:
        return {
          ...state,
          actionForGetBookingListById: actionForState(state.action, 'error', action.payload.message),
        };
    case ADD_CHANNEL:
        const payload=action.payload[0];
        const indx=state.channels.findIndex((row)=>row.value===payload.value);
        return {
          ...state,
          channels: indx===-1?state.channels.concat(action.payload):state.channels,
        }
    case DELETE_CHANNEL:
      return{
        ...state,
        channels: state.channels.filter((row)=>row.value!==action.payload)
      }
    case CHARGE_CALCULATION.pending:
      return{
        ...state,
        actionForCharges: actionForState(state.action,'pending')
      }
    case CHARGE_CALCULATION.success:
      return{
        ...state,
        currentCharges:action.payload.charges,
        actionForCharges: actionForState(state.action,'success')
      }
    case CHARGE_CALCULATION.error:
      return{
        ...state,
        actionForCharges: actionForState(state.action,'error',action.payload.message)
      }
    case ADD_DISCOUNT.pending:
      return{
        ...state,
      }
    case ADD_DISCOUNT.success:
      toast.success("Discount successfully added!")
      return{
        ...state,
        bookingDiscount:state.bookingDiscount.concat(action.payload.discounts) ,
      }
    case ADD_DISCOUNT.error:
      toast.error(action.payload.message)
      return{
        ...state,
      }
    case FETCH_DISCOUNT_BY_BOOKING.pending:
      return{
        ...state,
      }
    case FETCH_DISCOUNT_BY_BOOKING.success:
      return{
        ...state,
        bookingDiscount: action.payload.items,
      }
    case FETCH_DISCOUNT_BY_BOOKING.error:
      toast.error(action.payload.message)
      return{
        ...state,
      }
    case RESET_CHARGES:
      return{
        ...state,
        currentCharges: null,
        bookingDiscount: INITIAL_STATE.bookingDiscount
      }
    default:
      return state;
  }
}
