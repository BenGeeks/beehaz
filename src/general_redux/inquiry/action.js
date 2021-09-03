import {
  LOAD_INQUIRIES,
} from './types' ;
import {BACKEND_API} from "../../config/middleware";
import API from "../../config/api-url";

export const LoadInquiries = (data) => ({
  type: BACKEND_API,
  payload: Object.assign(
      {
          type:LOAD_INQUIRIES,
          method: 'post',
          url: API.INQUIRY,
          data
      },
  )
});
