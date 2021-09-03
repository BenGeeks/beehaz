import {
    GET_INVOICES,
    ADD_INVOICE,
    DELETE_INVOICE,
    EDIT_INVOICE,
    INVOICE_BY_BOOKING,
    CLEAR_INVOICE
} from "./types";

import {BACKEND_API} from "../../config/middleware";
import API from "../../config/api-url";

export const addInvoice = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:ADD_INVOICE,
            method: 'post',
            url: API.INVOICE_PATH,
            data
        },
    )
});

export const getInvoiceByBooking=id=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:INVOICE_BY_BOOKING,
            method:'get',
            url:`${API.INVOICE_PATH}getInvoiceByBookingId/${id}`
        }
    )
})

export const getInvoices=()=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:GET_INVOICES,
            method:'get',
            url:API.INVOICE_PATH
        }
    )
})

export const editInvoice=(data)=>({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:EDIT_INVOICE,
            method: 'put',
            url: API.INVOICE_PATH,
            data
        },
    )
})

export const clearInvoice=()=>({
    type:CLEAR_INVOICE
})

export const deleteInvoice=(id)=>({
    type:BACKEND_API,
    payload:Object.assign(
        {
            type:DELETE_INVOICE,
            method:'delete',
            url:`${API.INVOICE_PATH}${id}`
        }
    )
})