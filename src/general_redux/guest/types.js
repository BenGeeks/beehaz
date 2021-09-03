const asyncActionType = (type) => ({
  pending: `${type}_PENDING`,
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
})

export const LOAD_GUEST_LIST = asyncActionType('LOAD_GUEST_LIST')
export const ADD_GUEST_IN_LIST = asyncActionType('ADD_GUEST_IN_LIST')
export const ADD_GUEST_BY_BOOKING = asyncActionType('ADD_GUEST_BY_BOOKING')
export const DELETE_GUEST = asyncActionType('DELETE_GUEST')
export const EDIT_GUEST = asyncActionType('EDIT_GUEST')
export const GET_GUEST_BY_BOOKING = asyncActionType('GET_GUEST_BY_BOOKING')
export const EDIT_GUEST_BY_BOOKING = asyncActionType('EDIT_GUEST_BY_BOOKING')
export const RESET_GUEST_FLAG = 'RESET_GUEST_FLAG'
export const CLEAR_GUEST='CLEAR_GUEST'
