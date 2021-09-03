import { toast } from 'react-toastify';
import {
  LOGIN_USER,
  OAUTH_LOGIN_USER,
  USER_TOKEN_VERIFY_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  RESET_WELCOME,
  USER_TOKEN_ADD,
  USER_TOKEN_VERIFY_FAIL,
  ADD_USER_SETTINGS,
  GET_USER_INFO,
  DELETE_USER,
  RELOGIN_REQ, CONFIRM_MAIL_UPDATE
} from './types';
import { actionForState } from '../../common/functions/utils';
toast.configure();

const INITIAL_STATE = {
  user: null,
  isNewUser: false,
  authToken: '',
  authFail:false,
  action: {
    loading: false,
    success: undefined,
  },
  loginAction: {
    success: false,
    loading: false,
    error: false,
  },
  oauthLoginAction: {
    success: false,
    redirect: false,
    error: false
  },
  registerAction: {
    success: false,
    loading: false,
    error: false,
  },
  useSettingLoad:{
    success: false,
    loading: false,
    error: false,
  },
  useSettingUpdate:{
    success: false,
    loading: false,
    error: false, 
  },
  deleteUserAction:{
    success: false,
    loading: false,
    error: false,
  },
  confirmMailAction:{
    success:false,
    loading:false,
    error:false,
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OAUTH_LOGIN_USER.redirect:
      window.location.href = action.payload.data.uri;
      return state;
    case OAUTH_LOGIN_USER.success:
      // redirection is necessary here
      window.location.href = window.location.origin + "/verify/" + action.payload.token;
      return state;
    case LOGIN_USER.pending:
      return {
        ...state,
        loginAction: actionForState(state.action, 'pending'),
      };
    case LOGIN_USER.success:
      toast.success('Login Success please check your email!');
      return {
        ...state,
        loginAction: actionForState(state.action, 'success'),
      };
    case LOGIN_USER.error:
      toast.error(action.payload.message);
      return {
        ...state,
        loginAction: actionForState(state.action, 'error', action.payload.message),
      };
    case USER_TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case USER_TOKEN_VERIFY_FAIL:
      return {
        ...state,
        user: null,
        authToken: null,
        authFail:true,
      };
    case RELOGIN_REQ:
      return{
        ...state,
        authFail: false,
      }
    case USER_TOKEN_ADD:
      return {
        ...state,
        authToken: action.payload
      };
    case REGISTER_USER.pending:
      return {
        ...state,
        registerAction: actionForState(state.action, 'pending'),
      };
    case REGISTER_USER.success:
      toast.success('Account created successfully! Please check your email to log in.');
      return {
        ...state,
        isNewUser: action.payload.newUser,
        user: action.payload.email,
        registerAction: actionForState(state.action, 'success'),
      };
    case REGISTER_USER.error:
      toast.error(action.payload.message);
      return {
        ...state,
        registerAction: actionForState(state.action, 'error', action.payload.message),
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isNewUser: false,
      };
    case RESET_WELCOME:
      return {
        ...state,
        isNewUser: false,
      };

    case ADD_USER_SETTINGS.pending:
      return {
        ...state,
        useSettingUpdate: actionForState(state.action, 'pending'),
      };
    case ADD_USER_SETTINGS.success:
      toast.success('Successfully updated your settings!');
      return {
        ...state,
        useSettingUpdate: actionForState(state.action, 'success'),
        user: action.payload.data,
      };
    case ADD_USER_SETTINGS.error:
      toast.error(action.payload.message);
      return {
        ...state,
        useSettingUpdate: actionForState(state.action, 'error', action.payload.message),
      };

    case GET_USER_INFO.pending:
      return{
        ...state,
        useSettingLoad: actionForState(state.action,'pending'),
      } 
    case GET_USER_INFO.success:
      return {
        ...state,
        useSettingLoad: actionForState(state.action, 'success'),
        user: action.payload.customer,
      };
    case GET_USER_INFO.error:
      toast.error(action.payload.message)
      return{
        ...state,
        useSettingLoad: actionForState(state.action,'error',action.payload.message) 
      }
    case DELETE_USER.pending:
      return {
        ...state,
        deleteUserAction: actionForState(state.action,'pending')
      }
    case DELETE_USER.success:
      toast.success("Your account has been deleted successfully. We are sorry to see you go and wish you well!")
      return {
        ...state,
        user: null,
        isNewUser: false,
        deleteUserAction: actionForState(state.action,'success')
      }
    case DELETE_USER.error:
      toast.error('Could not delete the account please try again!')
      return{
        ...state,
        deleteUserAction: actionForState(state.action,'error')
      }
    case CONFIRM_MAIL_UPDATE.pending:
      return{
        ...state,
        confirmMailAction: actionForState(state.action,'pending')
      }
    case CONFIRM_MAIL_UPDATE.success:
      toast.success("Email has been updated successfully! please login again in your account.")
      return{
        ...state,
        confirmMailAction: actionForState(state.action,'success')
      }
    case CONFIRM_MAIL_UPDATE.error:
      toast.error("Some error occurred! please try again!")
      return{
        ...state,
        confirmMailAction: actionForState(state.action,'error')
      }
    default:
      return state;
  }
}
