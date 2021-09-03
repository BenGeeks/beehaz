import {
    LOAD_GUEST_LIST,
    ADD_GUEST_IN_LIST,
    DELETE_GUEST,
    EDIT_GUEST,
    RESET_GUEST_FLAG,
    ADD_GUEST_BY_BOOKING,
    GET_GUEST_BY_BOOKING,
    EDIT_GUEST_BY_BOOKING,
    CLEAR_GUEST,
} from './types';
import API from '../../config/api-url';
import { BACKEND_API } from '../../config/middleware';

export const addGuests = (data) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: ADD_GUEST_IN_LIST,
    method: 'post',
    url: API.GUEST,
    data,
  }),
});

export const loadGuests = () => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: LOAD_GUEST_LIST,
    method: 'get',
    url: API.GUEST,
  }),
});

export const addGuestByBooking = (data,id) => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_GUEST_BY_BOOKING,
            method: 'post',
            url: `${API.ADD_GUEST_BY_BOOKING}/${id}`,
            data
        },
    )
});

export const getGuestByBooking = (id)=>({
  type:BACKEND_API,
  payload: Object.assign(
      {
        type:GET_GUEST_BY_BOOKING,
        method:'get',
        url:`${API.GET_GUEST_BY_BOOKING}/${id}`,
      },
  )
})

export const editGuestByBooking = (data,id)=>({
    type:BACKEND_API,
    payload: Object.assign(
        {
            type:EDIT_GUEST_BY_BOOKING,
            method:'put',
            url: `${API.ADD_GUEST_BY_BOOKING}/${id}`,
            data
        }
    )
})

export const deleteGuest = (id) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: DELETE_GUEST,
    method: 'delete',
    url: `${API.GUEST}${id}`,
  }),
});

export const editGuest = (data) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: EDIT_GUEST,
    method: 'put',
    url: API.GUEST,
    data,
  }),
});

export const resetGuestFlag = () => ({
  type: RESET_GUEST_FLAG,
});

export const clearGuest=()=>({
    type: CLEAR_GUEST,
})
