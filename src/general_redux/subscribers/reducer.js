import { toast } from 'react-toastify';
import { GET_SUBSCRIBER_LIST, ADD_SUBSCRIBER } from './types';
import { actionForState } from '../../common/functions/utils';
toast.configure();

const INITIAL_STATE = {
  subscribers: [],
  actionForGetList: {
    loading: false,
    success: false,
    error: false,
  },
  actionForAddSubscriber: {
    loading: false,
    success: false,
    error: false,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SUBSCRIBER_LIST.pending:
      return {
        ...state,
        actionForGetList: actionForState(state.action, 'pending'),
      };
    case GET_SUBSCRIBER_LIST.success:
      toast.success('Successfully added to mailing list.');
      return {
        ...state,
        subscribers: action.payload,
        actionForGetList: actionForState(state.action, 'success'),
      };
    case GET_SUBSCRIBER_LIST.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForGetList: actionForState(state.action, 'error', action.payload.message),
      };
    case ADD_SUBSCRIBER.pending:
      return {
        ...state,
        actionForAddSubscriber: actionForState(state.action, 'pending'),
      };
    case ADD_SUBSCRIBER.success:
      return {
        ...state,
        subscribers: state.subscribers.concat(action.payload),
        actionForAddSubscriber: actionForState(state.action, 'success'),
      };
    case ADD_SUBSCRIBER.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionForAddSubscriber: actionForState(state.action, 'error', action.payload.message),
      };
    default:
      return state;
  }
}
