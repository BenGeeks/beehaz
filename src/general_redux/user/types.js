const asyncActionType = (type) => ({
  pending: `${type}_PENDING`,
  success: `${type}_SUCCESS`,
  error: `${type}_ERROR`,
});

const oauthAsync = (type) => ({
  redirect: `${type}_REDIRECT`,
  success: `${type}_SUCCESS`
});

export const LOGIN_USER = asyncActionType('LOGIN_USER');
export const OAUTH_LOGIN_USER = oauthAsync('OAUTH_LOGIN_USER');
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = asyncActionType('REGISTER_USER');
export const RESET_WELCOME = 'RESET_WELCOME';
export const USER_TOKEN_VERIFY = 'USER_TOKEN_VERIFY';
export const USER_TOKEN_VERIFY_SUCCESS = 'USER_TOKEN_VERIFY_SUCCESS';
export const USER_TOKEN_VERIFY_FAIL = 'USER_TOKEN_VERIFY_FAIL';
export const USER_TOKEN_ADD = 'USER_TOKEN_ADD';
export const ADD_USER_SETTINGS = asyncActionType('ADD_USER_SETTINGS');
export const GET_USER_INFO = asyncActionType('GET_USER_INFO');
export const DELETE_USER = asyncActionType('DELETE_USER');
export const RELOGIN_REQ='RELOGIN_REQ';
export const CONFIRM_MAIL_UPDATE=asyncActionType('CONFIRM_MAIL_UPDATE');
