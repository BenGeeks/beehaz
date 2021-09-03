import { BACKEND_API } from '../../config/middleware';
import API from '../../config/api-url';
import {
  LOGIN_USER,
  LOGOUT_USER,
  OAUTH_LOGIN_USER,
  REGISTER_USER,
  RESET_WELCOME,
  USER_TOKEN_VERIFY_FAIL,
  USER_TOKEN_VERIFY_SUCCESS,
  USER_TOKEN_ADD,
  ADD_USER_SETTINGS,
  GET_USER_INFO,
  DELETE_USER,
  RELOGIN_REQ,
  CONFIRM_MAIL_UPDATE,
} from './types';

export const loginUser = (emailId) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: LOGIN_USER,
    method: 'post',
    url: API.LOGIN,
    data: { emailId },
  }),
});

export const oauthLoginUser = (oauthType) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: OAUTH_LOGIN_USER,
    method: 'get',
    url: (() => {
      let params = new URLSearchParams()
      params.append("type", oauthType);
      return `${API.OAUTH_LOGIN}` + "?" + params.toString();
    })()
  })
});

export const oauthLoginUserCallback = (code, state) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: OAUTH_LOGIN_USER,
    method: 'get',
    url: (() => {
      const params = new URLSearchParams()
      params.append("code", code);
      if(state) params.append("state", state)
      return `${API.OAUTH_LOGIN_CALLBACK}` + "?" + params.toString();
    })()
  })
});

export const userTokenVerify = (data) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: { success: USER_TOKEN_VERIFY_SUCCESS, error: USER_TOKEN_VERIFY_FAIL },
    method: 'get',
    url: `${API.LOGINBYAUTH}/${data}`,
  }),
});
export const addUserAuthToken = (data) => ({
  type: USER_TOKEN_ADD,
  payload: data,
});
export const registerUser = (data) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: REGISTER_USER,
    method: 'post',
    url: API.REGISTER,
    data,
  }),
});

export const logoutUser = (data) => (dispatch) => {
  sessionStorage.removeItem('state');
  dispatch(logOutMain());
};
export const logOutMain = () => {
  return {
    type: LOGOUT_USER,
  };
};
export const resetUser = (data) => ({
  type: RESET_WELCOME,
});

export const addUserSettings = (userSettingsData) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: ADD_USER_SETTINGS,
    method: 'put',
    url: API.ADD_USER_SETTINGS,
    data: userSettingsData,
  }),
});

export const getUserInfo = () => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: GET_USER_INFO,
    method: 'get',
    url: API.CUSTOMER_SETTINGS,
    data: null,
  }),
});

export const deleteUser=(id)=>({
  type:BACKEND_API,
  payload: Object.assign({
    type: DELETE_USER,
    method: 'delete',
    url:`${API.CUSTOMER}${id}`
  })
})

export const authRelogin=()=>{
  return {
    type:RELOGIN_REQ,
  }
}

export const confirmMail=(data)=>({
  type: BACKEND_API,
  payload: Object.assign({
    type: CONFIRM_MAIL_UPDATE ,
    method: 'get',
    url: `${API}confirm/${data}`,
  }),
})

