const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});
export const LOAD_GROUP = asyncActionType('LOAD_GROUP');
export const ADD_GROUP = asyncActionType('ADD_GROUP');
export const DELETE_GROUP=asyncActionType('DELETE_GROUP');
export const UPDATE_GROUP = asyncActionType('UPDATE_GROUP');

export const LOAD_RENTAL = asyncActionType('LOAD_RENTAL');
export const ADD_RENTAL=asyncActionType('ADD_RENTAL');
export const DELETE_RENTAL=asyncActionType('DELETE_RENTAL');
export const EDIT_RENTAL = asyncActionType('EDIT_RENTAL');

export const CLEAR_RENTAL_ADD='CLEAR_RENTAL_ADD';