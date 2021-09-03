import { toast } from 'react-toastify';
import {
    GET_INVOICES,
    ADD_INVOICE,
    DELETE_INVOICE,
    EDIT_INVOICE,
    INVOICE_BY_BOOKING,
    CLEAR_INVOICE,
} from "./types";

import { actionForState } from '../../common/functions/utils';
import Invoice from "../../modules/view/Components/Calendar/components/EditBooking/components/Invoice";
toast.configure();

const INITIAL_STATE = {
   invoiceList:[],
   invoiceByBooking:[],
   action: {
        loading: false,
        success: undefined,
   },
   actionForGetInvoice:{
        loading: false,
        success: false,
        error: false,
   },
   actionForAddInvoice:{
       loading: false,
       success: false,
       error: false,
   },
   actionForDeleteInvoice:{
       loading: false,
       success: false,
       error: false,
   },
   actionForBookingInvoice:{
       loading:false,
       success:false,
       error:false
   },
   actionForEditInvoice:{
       loading:false,
       success:false,
       error:false
   },
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_INVOICES.pending:
            return{
                ...state,
                actionForGetInvoice: actionForState(state.action,'pending')
            };
        case GET_INVOICES.success:
            return{
                ...state,
                invoiceList: action.payload.invoices,
                actionForGetInvoice: actionForState(state.action,'success')
            }
        case GET_INVOICES.error:
            toast.error(action.payload.message)
            return{
                ...state,
                actionForGetInvoice: actionForState(state.action,'error')
            }
        case ADD_INVOICE.pending:
            return{
                ...state,
                actionForAddInvoice: actionForState(state.action,'pending')
            }
        case ADD_INVOICE.success:
            toast.success("Invoice added successfully!")
            return{
                ...state,
                invoiceList: state.invoiceList.concat({
                    ...action.payload.invoice
                }),
                actionForAddInvoice: actionForState(state.action,'success')
            }
        case ADD_INVOICE.error:
            toast.error(action.payload.message)
            return{
                ...state,
                actionForAddInvoice: actionForState(state.action,'error')
            }
        case INVOICE_BY_BOOKING.pending:
            return{
                ...state,
                actionForBookingInvoice:actionForState(state.action,'pending')
            }
        case INVOICE_BY_BOOKING.success:
            return{
                ...state,
                invoiceByBooking: action.payload.invoices,
                actionForBookingInvoice:actionForState(state.action,'success')
            }
        case INVOICE_BY_BOOKING.error:
            toast.error(action.payload.message)
            return{
                ...state,
                actionForBookingInvoice:actionForState(state.action,'error')
            }
        case DELETE_INVOICE.pending:
            return{
                ...state,
                actionForDeleteInvoice: actionForState(state.action,'pending')
            }
        case DELETE_INVOICE.success:
            toast.success("Invoice deleted successfully!")
            return{
                ...state,
                invoiceList: state.invoiceList.filter((row) => {
                    if (row.id !== Number(action.payload.id)) {
                        return row;
                    }
                }),
                actionForDeleteInvoice: actionForState(state.action,'success')
            }
        case DELETE_INVOICE.error:
            toast.error(action.payload.message)
            return{
                ...state,
                actionForDeleteInvoice: actionForState(state.action,'error')
            }
        case CLEAR_INVOICE:
            return{
                ...state,
                invoiceByBooking: INITIAL_STATE.invoiceByBooking,
                actionForGetInvoice: INITIAL_STATE.actionForGetInvoice,
                actionForBookingInvoice: INITIAL_STATE.actionForBookingInvoice,
                actionForAddInvoice: INITIAL_STATE.actionForAddInvoice,
                actionForDeleteInvoice: INITIAL_STATE.actionForDeleteInvoice
            }
        case EDIT_INVOICE.pending:
            return{
                ...state,
                actionForEditInvoice: actionForState(state.action,'pending')
            }
        case EDIT_INVOICE.success:
            toast.success("Invoice successfully updated!")
            const InvoiceList=state.invoiceByBooking
            const updateIndex=InvoiceList.findIndex(({id})=>id ===action.payload.invoice.id)
            if(updateIndex>=0){
                InvoiceList[updateIndex]=action.payload.invoice
            }
            return{
                ...state,
                invoiceByBooking: InvoiceList,
                actionForEditInvoice: actionForState(state.action,'success')
            }
        case EDIT_INVOICE.error:
            toast.error(action.payload.message)
            return{
                ...state,
                actionForEditInvoice: actionForState(state.action,'error')
            }
        default:
            return{
                ...state,
            }
    }
}