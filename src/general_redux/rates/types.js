const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});

export const ADD_NEW_RATE = asyncActionType('ADD_NEW_RATE');
export const GET_RATE_LIST = asyncActionType('GET_RATE_LIST');
export const EDIT_RATES= asyncActionType('EDIT_RATES');
export const EDIT_BULK_DEFAULT= asyncActionType('EDIT_BULK_DEFAULT');

export const ADD_FEE = asyncActionType('ADD_FEE');
export const EDIT_FEE = asyncActionType('EDIT_FEE');
export const DELETE_FEE = asyncActionType('DELETE_FEE');
export const GET_FEE_LIST = asyncActionType('GET_FEE_LIST');
export const SET_SPECIAL_RATE = asyncActionType('SET_SPECIAL_RATE');

export const CHANGERATE_TIMELINE=asyncActionType('CHANGERATE_TIMELINE');
export const FETCH_RATE_CALENDAR=asyncActionType('FETCH_RATE_CALENDAR');

export const CLEAR_ACTIONS='CLEAR_ACTIONS';
export const ADD_NEW_TAX = 'ADD_NEW_TAX';
export const DELETE_TAX = 'DELETE_TAX';
export const EDIT_TAX_LIST = 'EDIT_TAX_LIST';
