import {
    ADD_NEW_RATE,
    GET_RATE_LIST,
    GET_FEE_LIST,
    ADD_FEE,
    DELETE_FEE,
    EDIT_FEE,
    EDIT_RATES,
    ADD_NEW_TAX,
    DELETE_TAX,
    EDIT_TAX_LIST,
    EDIT_BULK_DEFAULT,
    CLEAR_ACTIONS,
    FETCH_RATE_CALENDAR,
    SET_SPECIAL_RATE,
    CHANGERATE_TIMELINE
  } from './types';
import {BACKEND_API} from "../../config/middleware";
import API from "../../config/api-url";

export const addRate = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_NEW_RATE,
            method: 'post',
            url: API.RATE,
            data
        },
    )
});

export const rateList=()=>({
    type: BACKEND_API,
        payload: Object.assign(
        {
            type:GET_RATE_LIST,
            method: 'get',
            url: API.RATE,
        },
    )
})

export const editRates=(data)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:EDIT_RATES,
            method: 'put',
            url: API.RATE,
            data
        },
    )
})

export const editBulkDefault=(data)=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:EDIT_BULK_DEFAULT,
            method:'put',
            url:API.DEFAULT_BULK,
            data
        }
    )
})

export const addFee = data => ({
    type: BACKEND_API,
        payload: Object.assign(
        {
            type:ADD_FEE,
            method: 'post',
            url: API.FEE,
            data: data
        },
    )
});

export const editFee = data => ({
    type: BACKEND_API,
        payload: Object.assign(
        {
            type: EDIT_FEE,
            method: 'put',
            url: API.FEE,
            data: data
        },
    )
});

export const getFeeList = () => ({
    type: BACKEND_API,
        payload: Object.assign(
        {
            type: GET_FEE_LIST,
            method: 'get',
            url: API.FEE
        },
    )
});

export const deleteFee = id => ({
    type: BACKEND_API,
        payload: Object.assign(
        {
            type: DELETE_FEE,
            method: 'delete',
            url: `${API.FEE}${id}`,
        },
    )
})

export const clearAction = ()=>({
    type:CLEAR_ACTIONS,
})

export const addTax = data => ({
    type: ADD_NEW_TAX,
    payload: data
});

export const deleteTax=id=>({
    type: DELETE_TAX,
    payload: id
})
export const editTax=data=>({
    type: EDIT_TAX_LIST,
    payload: data
})

export const setSpecialRate=data=>({
    type:BACKEND_API,
    payload: Object.assign({
        type:SET_SPECIAL_RATE,
        method:'post',
        url:`${API.SPECIAL_RATE}`,
        data
    })
})

export const changedRatesInTimeline=data=>({
    type:BACKEND_API,
    payload: Object.assign({
        type:CHANGERATE_TIMELINE,
        method:'post',
        url:`${API.CHANGEDRATE_TIMELINE}`,
        data
    })
})

export const fetchRatesCal=data=>({
    type:BACKEND_API,
    payload:Object.assign({
        type:FETCH_RATE_CALENDAR,
        method:'post',
        url:`${API.FETCH_CAL}`,
        data
    })
})