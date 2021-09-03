import { BACKEND_API } from '../config/middleware';
import API from '../config/api-url';
import { 
  CHANGE_CURRENT_PAGE,
  LOAD_WORLD,
  ONLOAD_DATA,
  CONTACT_US,
} from './types';
import APIURL from '../config/api-url';

export const changeCurrentPage = page => ({
  type: CHANGE_CURRENT_PAGE,
  payload: page
});
export const onLoad = () => ({
  type: BACKEND_API,
  payload: Object.assign(
      {
        type: ONLOAD_DATA,
        method: 'get',
        url: `static/world.json`,
      },
  )
});
export const loadWorld = data => ({
    type: BACKEND_API,
    payload: Object.assign(
        {
            type:LOAD_WORLD,
            method: 'get',
            url: API.WORLD_API
        },
    )
});

export const contactUs=data=>({
  type:BACKEND_API,
  payload: Object.assign(
    {
      type:CONTACT_US,
      method:'post',
      url:`${APIURL.CONTACT}`,
      data
    }
  )
})