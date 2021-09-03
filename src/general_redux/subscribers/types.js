const asyncActionType = (type) => ({
  pending: `${type}_PENDING`,
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
});

export const GET_SUBSCRIBER_LIST = asyncActionType('GET_SUBSCRIBER_LIST');
export const ADD_SUBSCRIBER = asyncActionType('ADD_SUBSCRIBER');
