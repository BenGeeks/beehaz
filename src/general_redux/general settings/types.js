const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});

export const LOAD_SETTINGS = asyncActionType('LOAD_SETTINGS');
export const SET_SETTINGS= asyncActionType('SET_SETTINGS');