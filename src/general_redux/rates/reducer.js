import {toast} from "react-toastify";

import {
    ADD_NEW_RATE,
    GET_RATE_LIST,
    ADD_FEE,
    DELETE_FEE,
    EDIT_FEE,
    GET_FEE_LIST,
    EDIT_RATES,
    ADD_NEW_TAX,
    DELETE_TAX,
    EDIT_TAX_LIST,
    EDIT_BULK_DEFAULT,
    CLEAR_ACTIONS,
    FETCH_RATE_CALENDAR,
    SET_SPECIAL_RATE,
    CHANGERATE_TIMELINE,
  } from './types';
import {actionForState} from "../../common/functions/utils";
toast.configure();

  const INITIAL_STATE = {
    feesList: [],
    rateCalendar:[],
    changedRatesTimeline:[],
    rateSettings: [
      {
        id:2,
        GuestNum: "2",
        dailyRate: "55",
        //dateRange: "Feb 2, 2021- Feb 13, 2021",
        discount: true,
        fixRate: false,
        guestLimit: "7",
        minstay: "1",
        monthDiscount: "4",
        monthPrice: "40",
        rentalId: 10,
        weekDiscount: "3.5",
        weekPrice: "10",
      },
    ],
    taxList:[{
      id:1,
      amount: 786,
      rentalSelection: "Rental 1",
      tax_name: "TAX 2Tbt",
      tax_type: "percentage",
    }],
      action:{
          loading:false,
          success:undefined
      },
      actionForRate:{
          loading: false,
          success: false,
          error:false
      },
      actionForRateList:{
          loading: false,
          success: false,
          error:false
      },
      actionForEditRate:{
          loading: false,
          success: false,
          error:false
      },
      actionForGetFeeList:{
        loading: false,
        success: false,
        error:false
      },
      actionForAddFee:{
        loading: false,
        success: false,
        error:false
      },
      actionForEditFee:{
        loading: false,
        success: false,
        error:false
      },
      actionForDeleteFee:{
        loading: false,
        success: false,
        error:false
      },
      actionForBulkDefault:{
        loading: false,
        success: false,
        error:false
      },
      actionForRateCal:{
        loading:false,
        success: false,
        error: false
      },
      actionForSpecialRate:{
        loading:false,
        success:false,
        error:false,
      },
      actionForRatesTimeline:{
        loading:false,
        success:false,
        error:false,
      }
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

      case GET_FEE_LIST.pending:
        return {
          ...state,
          actionForGetFeeList: actionForState(state.action, 'pending'), 
        };
      case GET_FEE_LIST.success:
        return {
          ...state,
          feesList: action.payload.fee,
          actionForGetFeeList: actionForState(state.action, 'success'), 
        };
      case GET_FEE_LIST.error:
        return {
          ...state,
          actionForGetFeeList: actionForState(state.action, 'error',action.payload.message),
        };

      case ADD_FEE.pending:
        return {
          ...state,
          actionForAddFee: actionForState(state.action, 'pending'), 
        };
      case ADD_FEE.success:
        toast.success("Fee has been added successfully.")
        return {
          ...state,
          feesList: state.feesList.concat(action.payload.data),
          actionForAddFee: actionForState(state.action, 'success'), 
        };
      case ADD_FEE.error:
        toast.error(action.payload.message)
        return {
          ...state,
          actionForAddFee: actionForState(state.action, 'error',action.payload.message),
        };
        
      case EDIT_FEE.pending:    
        return {    
            ...state,    
            actionForEditFee: actionForState(state.action, 'pending'),    
        };
      case EDIT_FEE.success:
        toast.success("Fee has been successfully edited.")
        const FeeArrayData = state.feesList;
        const updateIndex = FeeArrayData.findIndex(({id}) => id === action.payload.data.id);
        if (updateIndex >= 0) {
          FeeArrayData[updateIndex] = action.payload.data
        } 
        return {    
            ...state,    
            feesList: FeeArrayData,
            actionForEditFee: actionForState(state.action, 'success'),
        };
      case EDIT_FEE.error:
        toast.error(action.payload.message) 
        return {    
            ...state,    
            actionForEditFee: actionForState(state.action, 'error',action.payload.message),    
        };
      case DELETE_FEE.pending:
        return {    
            ...state,    
            actionForDeleteFee: actionForState(state.action, 'pending'),    
        };
      case DELETE_FEE.success:
        toast.success("Fee deleted successfully.")
        return {    
            ...state,    
            feesList: state.feesList.filter(item => item.id !== parseInt(action.payload.id)),
            actionForDeleteFee: actionForState(state.action, 'success'),  
        };
      case DELETE_FEE.error:
        toast.error(action.payload.message) 
        return {    
            ...state,
            actionForDeleteFee: actionForState(state.action, 'error',action.payload.message),   
        };

      case ADD_NEW_RATE.pending:
        return {
            ...state,
            actionForRate: actionForState(state.action, 'pending'),
        }
      case ADD_NEW_RATE.success:
        toast.success("Rate has been Added!")
         return {
            ...state,
            actionForRate: actionForState(state.action, 'success'),
            rateSettings:state.rateSettings.concat(action.payload)
         }
      case ADD_NEW_RATE.error:
        toast.error(action.payload.message)
        return{
            ...state,
            actionForRate: actionForState(state.action, 'error',action.payload.message),
        }
      case GET_RATE_LIST.pending:
        return{
            ...state,
            actionForRateList: actionForState(state.action,'pending')
        }
      case GET_RATE_LIST.success:
        return{
            ...state,
            rateSettings: action.payload.data,
            actionForRateList: actionForState(state.action,'success')
        }
      case GET_RATE_LIST.error:
        toast.error(action.payload.message)
        return{
            ...state,
            actionForRateList: actionForState(state.action,'error',action.payload.message)
        }
      case EDIT_RATES.pending:
        return{
            ...state,
            actionForEditRate:actionForState(state.action,'pending')
        }
      case EDIT_RATES.success:
        toast.success("Rate has been updated successfully!")
        const updateIndexRate = state.rateSettings.findIndex((row) => row.id === action.payload.data.id);
        let RateArrayData=[...state.rateSettings];
        RateArrayData[updateIndexRate]=action.payload.data;
        return {
            ...state,    
            rateSettings: RateArrayData   
        };
      case EDIT_RATES.error:
        toast.error(action.payload.message)
        return{
            ...state,
            actionForEditRate:actionForState(state.action,'error',action.payload.message)
        }
      case EDIT_BULK_DEFAULT.pending:
        return{
            ...state,
            actionForBulkDefault:actionForState(state.action,'pending')
        }
      case EDIT_BULK_DEFAULT.success:
        toast.success("Rate has been updated successfully!")
        let RateArrayData2=[...state.rateSettings];
        action.payload.data.forEach((rate)=>{
            const indx=state.rateSettings.findIndex((row) => row.id === rate.id);
            if(indx!==-1){
                RateArrayData2[indx]=rate;
            }
        })
        return{
            ...state,
            rateSettings: RateArrayData2,
            actionForBulkDefault: actionForState(state.action,'success')
        }
      case EDIT_BULK_DEFAULT.error:
        toast.error(action.payload.message)
        return{
            ...state,
            actionForBulkDefault: actionForState(state.action,'error',action.payload.message)
        }
      case ADD_NEW_TAX:
        return {
          ...state,
          taxList: state.taxList.concat(action.payload) 
        };
      case DELETE_TAX:    
        return {    
            ...state,    
            taxList: state.taxList.filter(item => item.id !== action.payload)    
        };
      case EDIT_TAX_LIST:   
        const TaxArrayData = state.taxList;
        const updateIndexTax = TaxArrayData.findIndex(({id}) => id === action.payload.id);
        if (updateIndexTax >= 0) {
            TaxArrayData[updateIndexTax] = action.payload
        } 
        return {    
            ...state,    
            taxList: TaxArrayData   
        };
      case CLEAR_ACTIONS:
        return{
            ...state,
            actionForGetFeeList:INITIAL_STATE.actionForGetFeeList,
            actionForAddFee:INITIAL_STATE.actionForAddFee,
            actionForEditFee:INITIAL_STATE.actionForEditFee,
            actionForDeleteFee:INITIAL_STATE.actionForDeleteFee,
        }
      case FETCH_RATE_CALENDAR.pending:
        return{
            ...state,
            actionForRateCal: actionForState(state.action,'pending')
        }
      case FETCH_RATE_CALENDAR.success:
        return{
            ...state,
            rateCalendar: action.payload.calender,
            actionForRateCal: actionForState(state.action,'success')
        }
      case FETCH_RATE_CALENDAR.error:
        return{
            ...state,
            actionForRateCal: actionForState(state.action,'error',action.payload.message)
        }
      case SET_SPECIAL_RATE.pending:
        return{
            ...state,
            actionForSpecialRate: actionForState(state.action,'pending')
        }
      case SET_SPECIAL_RATE.success:
        toast.success("Rate modified successfully!")
        const tmp=state.rateCalendar;
        action.payload.data.forEach((row)=>{
            if(tmp[row.rentalId]){
                if(tmp[row.rentalId][row.changeDate]){
                    tmp[row.rentalId][row.changeDate]['rate']=row.dailyRate;
                    tmp[row.rentalId][row.changeDate]['minimumStayRequirement']=row.minimumStayRequirement;
                }else{
                    tmp[row.rentalId][`${row.changeDate}`]={
                        "rate":row.dailyRate,
                        "minimumStayRequirement":row.minimumStayRequirement,
                        "booking":false,
                    };
                }
            }
        })
        return{
            ...state,
            rateCalendar: tmp,
            actionForSpecialRate: actionForState(state.action,'success')
        }
      case SET_SPECIAL_RATE.error:
        toast.error(action.payload.message)
        return{
            ...state,
            actionForSpecialRate: actionForState(state.action,'error')
        }
      case CHANGERATE_TIMELINE.pending:
        return{
          ...state,
          actionForRatesTimeline:actionForState(state.action,'pending')
        }
      case CHANGERATE_TIMELINE.success:
        return{
          ...state,
          actionForRatesTimeline:actionForState(state.action,'success'),
          changedRatesTimeline:action.payload.data
        }
      case CHANGERATE_TIMELINE.error:
        toast.error(action.payload.message)
        return{
          ...state,
          actionForRatesTimeline:actionForState(state.action,'error')
        }
      default:
        return state;
    }
  }
  