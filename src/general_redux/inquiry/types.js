const asyncActionType = type => ({
    pending: `${type}_PENDING`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`
});

export const LOAD_INQUIRIES = asyncActionType('LOAD_INQUIRIES');


