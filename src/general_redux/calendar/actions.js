import {
    ADD_BOOKING,
    EDIT_BOOKING,
    LOAD_BOOKING,
    BOOKING_FLAG,
    CLEAR_BOOKING,
    DELETE_BOOKING,
    GET_BOOKING_BY_GUEST_ID,
    DELETE_BLOCK_DATE,
    ADD_CHANNEL,
    DELETE_CHANNEL,
    CHARGE_CALCULATION,
    RESET_CHARGES,
    ADD_DISCOUNT, FETCH_DISCOUNT, FETCH_DISCOUNT_BY_BOOKING,
} from './types';
import {BACKEND_API} from "../../config/middleware";
import API from "../../config/api-url";

export const addNewBooking = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_BOOKING,
            method: 'post',
            url: API.ADD_BOOKING,
            data
        },
    )
});

export const editBooking=data=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:EDIT_BOOKING,
            method: 'put',
            url: API.EDIT_BOOKING,
            data
        },
    )
})

export const loadBooking=()=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:LOAD_BOOKING,
            method: 'get',
            url: API.BOOKING,
        },
    )
})

export const resetBookingFlag=()=>({
    type:BOOKING_FLAG
})

export const clearBooking=()=>({
    type:CLEAR_BOOKING
})

export const deleteBooking=(id)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type: DELETE_BOOKING,
            method: 'delete',
            url:  `${API.BOOKING}${id}`,
            id,
        },
    )
})

export const getBookingByGuestId=(id)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type: GET_BOOKING_BY_GUEST_ID,
            method: 'get',
            url: `${API.BOOKING}getBookingByGuestId/${id}`,
        },
    )
})

export const deleteBlockDate=(id)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type: DELETE_BLOCK_DATE,
            method: 'delete',
            url:  `${API.BOOKING}${id}`,
            id,
        },
    )
})

export const addChannel=(data)=>({
    type:ADD_CHANNEL,
    payload:data
})

export const delChannel = (value)=>({
    type:DELETE_CHANNEL,
    payload:value
})

export const chargeCalculation=(data)=>({
    type:BACKEND_API,
    payload: Object.assign(
        {
            type:CHARGE_CALCULATION,
            method:'post',
            url:`${API.CHARGES_CALC}`,
            data
        }
    )
})

export const addDiscount=(data)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_DISCOUNT,
            method: 'post',
            url: API.DISCOUNT,
            data
        },
    )
});

export const fetchDiscount=()=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:FETCH_DISCOUNT,
            method:'get',
            url:API.DISCOUNT,
        }
    )
})

export const fetchDiscountByBooking=(id)=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:FETCH_DISCOUNT_BY_BOOKING,
            method:'get',
            url:`${API.DISCOUNT}/${id}`,
        }
    )
})

export const resetCharges=()=>({
    type:RESET_CHARGES
})