import axiosInstance from './axios';
import {LOGOUT_USER} from "../general_redux/user/types";

export const BACKEND_API = 'BACKEND_API';

const apiMiddleware = ({ dispatch, getState }) => next => async (action) => {
  if (action.type !== BACKEND_API) {
    return next(action);
  }
  if (action.payload.type && action.payload.type.pending) {
    dispatch({
      type: action.payload.type.pending,
      payload: 'pending status',
    });
  }
  const {user} = getState();
  const { method, url, params, data, type } = action.payload;
  const token = user.authToken;
  let headers = token !== '' ? {
    'auth-token': `${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } : {};
  try {
    const response = await axiosInstance({ method, url, data, params, headers })

    if(response.data.status && response.data.status==="fail"){
      dispatch({
        type: type.error,
        payload: response.data
      })
    }
    else if (action.payload.type) {
      dispatch({
        type:  (response.data.status === "redirect" && type.redirect)?type.redirect:(type.success || type),
        payload: response.data
      });
    }
  } catch(error) {
    if(error.message==="Request failed with status code 401"){
      dispatch({
        type:LOGOUT_USER
      })
    }
    else if (action.payload.type ?? action.payload.type.error) {
      dispatch({
        type: type.error,
        payload: error
      })
    }
  }
};

export default {
  apiMiddleware,
  BACKEND_API,
};
