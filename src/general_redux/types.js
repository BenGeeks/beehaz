const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});


export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';
export const ONLOAD_DATA=asyncActionType('ONLOAD_DATA');
export const CONTACT_US=asyncActionType('CONTACT_US');

// Add Groups
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const LOADED_GROUP = 'LOADED_GROUP';
export const LOAD_WORLD = asyncActionType('LOAD_WORLD');

// Add Rentals
export const LOADED_RENTAL = 'LOADED_RENTAL';
