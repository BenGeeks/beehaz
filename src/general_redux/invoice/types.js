const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});

export const GET_INVOICES=asyncActionType('GET_INVOICES');
export const ADD_INVOICE = asyncActionType('ADD_INVOICE');
export const DELETE_INVOICE=asyncActionType('DELETE_INVOICE');
export const EDIT_INVOICE= asyncActionType('EDIT_INVOICE');
export const INVOICE_BY_BOOKING = asyncActionType('INVOICE_BY_BOOKING');
export const CLEAR_INVOICE='CLEAR_INVOICE';