const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});

export const ADD_BOOKING = asyncActionType('ADD_BOOKING');
export const EDIT_BOOKING = asyncActionType('EDIT_BOOKING');
export const LOAD_BOOKING = asyncActionType('LOAD_BOOKING');
export const BOOKING_FLAG= 'BOOKING_FLAG';
export const CLEAR_BOOKING = 'CLEAR_BOOKING';
export const DELETE_BOOKING = asyncActionType('DELETE_BOOKING');
export const GET_BOOKING_BY_GUEST_ID = asyncActionType('GET_BOOKING_BY_GUEST_ID');
export const DELETE_BLOCK_DATE = asyncActionType('DELETE_BLOCK_DATE');
export const CHARGE_CALCULATION=asyncActionType('CHARGE_CALCULATION');
export const ADD_DISCOUNT=asyncActionType('ADD_DISCOUNT');
export const FETCH_DISCOUNT=asyncActionType('FETCH_DISCOUNT');
export const FETCH_DISCOUNT_BY_BOOKING = asyncActionType('FETCH_DISCOUNT_BY_BOOKING');
//export const ADD_CHANNEL = asyncActionType('ADD_CHANNEL');
//export const DELETE_CHANNEL = asyncActionType('DELETE_CHANNEL');
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const RESET_CHARGES='RESET_CHARGES';