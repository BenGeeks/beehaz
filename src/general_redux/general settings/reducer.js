import {toast} from "react-toastify";
import {
  LOAD_SETTINGS,
  SET_SETTINGS
  } from './types';
import {actionForState} from "../../common/functions/utils";

toast.configure();
  
  const INITIAL_STATE = {
    currencyArray: ['INR', 'EUR', 'GDP', 'USD', 'CAD'],
    dateFormatArray: [{
      id:'M1',
      val:'YYYY/MM/DD'},
      {
        id:'M2',
        val:'YY/MM/DD'},
      {
        id:'M3',
        val: 'YYYY-MM-DD'},
      {
        id:'M4',
        val: 'YY-MM-DD'},
      {
        id:'M5',
        val: 'MM/DD/YYYY'},
      {
        id:'M6',
        val: 'MM/DD/YY'},
      {
        id:'M7',
        val: 'MM-DD-YYYY'},
      {
        id:'M8',
        val: 'MM-DD-YY'},
      {
        id:'M9',
        val: 'MMM DD, YYYY'},
      {
        id:'M10',
        val: `MMM DD 'YY`},
      {
        id:'M11',
        val: `DD/MM/YYYY`},
  ],
    numberFormatArray: [
      {
        id:'M1',
        val:'1,000.00',
      },
      {
        id:'M2',
        val:'1\'000.00',
      },
      {
        id:'M3',
        val:'1.000,00'
      }
    ],
    setting: {
      currency : {value:"USD",label:"USD"},
      timeDisplay : 'H',
      dateDisplay: 'M11',
      numberDisplay: '1,000.00',
      isFutureBooking:true
    },
    action:{
      loading:false,
      success:undefined
    },
    actionForSettings:{
      loading: false,
      success: false,
      error:false
    },
    actionForSettingsEdit:{
      loading: false,
      success: false,
      error:false
    },
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case SET_SETTINGS.pending:
        return {
          ...state,
          actionForSettingsEdit: actionForState(state.action, 'pending'),
        }
      case SET_SETTINGS.success:
        toast.success("Settings have been updated successfuly!")
        if(state.setting.currency.label!==action.payload.data.currency){
          toast.warn("The default currency has been changed. Please note this will not impact currency in existing rentals and existing bookings. To change the currency of existing rentals, please go to Rentals and edit the rental whose currency you would like to change")
        }
        return {
          ...state,
          actionForSettingsEdit: actionForState(state.action, 'success'),
          setting: {...action.payload.data,
                    currency: {value:action.payload.data.currency,label:action.payload.data.currency}
                }
        }
      case SET_SETTINGS.error:
        toast.error(action.payload.message)
        return {
          ...state,
          actionForSettingsEdit: actionForState(state.action, 'error',action.payload.message),
        }
      case LOAD_SETTINGS.pending:
        return{
          ...state,
          actionForSettings: actionForState(state.action,'pending')
        }
      case LOAD_SETTINGS.success:
        return{
          ...state,
          setting: {...action.payload.customer,
                currency:{value:action.payload.customer.currency, label:action.payload.customer.currency}
              },
          actionForSettings: actionForState(state.action,'success')
        }
      case LOAD_SETTINGS.error:
        return{
          ...state,
          actionForSettings: actionForState(state.action,'error',action.payload.message)
        }
      default:
        return state;
    }
  }
  