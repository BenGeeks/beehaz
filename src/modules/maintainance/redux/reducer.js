import { 
  FETCH_DATA_API,
  POST_DATA_API
} from './types';

const INITIAL_STATE = {
  data: null,
  newPost:null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DATA_API:
      return {
        ...state,
        data: action.payload
      };
    case POST_DATA_API:
      return{
        ...state,
        newPost:action.payload
      }
    default:
      return state;
  }
}
