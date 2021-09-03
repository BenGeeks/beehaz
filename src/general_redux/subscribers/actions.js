import { BACKEND_API } from '../../config/middleware';
import API from '../../config/api-url';
import { GET_SUBSCRIBER_LIST, ADD_SUBSCRIBER } from './types';

export const getSubscriberList = () => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: GET_SUBSCRIBER_LIST,
    method: 'get',
    url: `${API.SUBSCRIBERS}list`,
  }),
});

export const addSubscriber = (data) => ({
  type: BACKEND_API,
  payload: Object.assign({
    type: ADD_SUBSCRIBER,
    method: 'post',
    url: API.SUBSCRIBERS,
    data: data,
  }),
});
