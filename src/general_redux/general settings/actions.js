import {
    LOAD_SETTINGS,
    SET_SETTINGS,
  } from './types';
import {BACKEND_API} from "../../config/middleware";
import API from "../../config/api-url";

export const setSettings = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:SET_SETTINGS,
            method: 'put',
            url: API.GNRL_SETTINGS,
            data
        },
    )
});

export const LoadSettings = () => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:LOAD_SETTINGS,
            method: 'get',
            url: API.CUSTOMER_SETTINGS,
        },
    )
});