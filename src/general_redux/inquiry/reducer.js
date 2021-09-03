import {toast} from "react-toastify";

import {
  LOAD_INQUIRIES,
} from './types' ;

import {actionForState} from "../../common/functions/utils";
toast.configure();

const INITIAL_STATE = {
  inquiryData: [],
  action:{
    loading:false,
    success:undefined
  },
  actionForInquiries:{
    loading:false,
    success:false,
    error:false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_INQUIRIES.pending:
      return{
        ...state,
        actionForInquiries: actionForState(state.action, 'pending'),
      }
    case LOAD_INQUIRIES.success:
      return{
        ...state,
        inquiryData:action.payload.data,
        actionForInquiries: actionForState(state.action,'success')
      }
    case LOAD_INQUIRIES.error:
      toast.error(action.payload.message)
      return{
        ...state,
        actionForInquiries: actionForState(state.action,'error',action.payload.message),
        inquiryData: INITIAL_STATE.inquiryData,
      }
    default:
      return state;
  }
}
