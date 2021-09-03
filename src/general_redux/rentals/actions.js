import API from '../../config/api-url';
import { BACKEND_API } from '../../config/middleware';
import {
    CLEAR_RENTAL_ADD,
    LOAD_GROUP,
    ADD_GROUP,
    DELETE_GROUP,
    LOAD_RENTAL,
    ADD_RENTAL,
    DELETE_RENTAL,
    EDIT_RENTAL,
    UPDATE_GROUP
} from './types';

export const loadGroup =() => ({
  type: BACKEND_API,
  payload: Object.assign(
      {
        type:LOAD_GROUP,
        method: 'get',
        url: API.GROUPLIST,
      },
  )
});

export const addGroup = data => ({
  type: BACKEND_API,
  payload: Object.assign(
      {
        type:ADD_GROUP,
        method: 'post',
        url: API.GROUPADD,
        data
      },
  )
});

export const deleteGroup = id => ({
  type: BACKEND_API,
    payload: Object.assign(
        {
            type:DELETE_GROUP,
            method: 'delete',
            url: `${API.GROUPDELETE}${id}`,
        },
    )
});

export const loadRental = () => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:LOAD_RENTAL,
            method: 'get',
            url: API.RENTAL_LIST,
        },
    )
});
export const addRental = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_RENTAL,
            method: 'post',
            url: API.RENTAL_ADD,
            data
        },
    )
});

export const updateGroup = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type: UPDATE_GROUP,
            method: 'put',
            url: API.EDIT_GROUP,
            data
        },
    )
});

export const deleteRental = id => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:DELETE_RENTAL,
            method: 'delete',
            url: `${API.RENTALDELETE}${id}`,
        },
    )
});

export const updateRental = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:EDIT_RENTAL,
            method: 'put',
            url: API.EDIT_RENTAL,
            data
        },
    )
});

export const clearRental=()=>({
    type:CLEAR_RENTAL_ADD
})