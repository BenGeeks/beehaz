import { toast } from 'react-toastify';
import {
  CLEAR_RENTAL_ADD,
  LOAD_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  LOAD_RENTAL,
  ADD_RENTAL,
  DELETE_RENTAL,
  EDIT_RENTAL,
  UPDATE_GROUP,
} from './types';
import { actionForState } from '../../common/functions/utils';
toast.configure();

const INITIAL_STATE = {
  groups: [],
  rentals: [],
  lastAddedRentalID: null,
  action: {
    loading: false,
    success: undefined,
  },
  actionForGroup: {
    loading: false,
    success: false,
    error: false,
  },
  actionForRental: {
    loading: false,
    success: false,
    error: false,
  },
  actionAddGroup: {
    loading: false,
    success: false,
    error: false,
  },
  actionDeleteGroup: {
    loading: false,
    success: false,
    error: false,
  },
  actionAddRental: {
    loading: false,
    success: false,
    error: false,
  },
  actionDeleteRental: {
    loading: false,
    success: false,
    error: false,
  },
  actionEditRental: {
    loading: false,
    success: false,
    error: false,
  },
  actionEditGroup: {
    loading: false,
    success: false,
    error: false,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_GROUP.pending:
      return {
        ...state,
        actionAddGroup: actionForState(state.action, 'pending'),
      };
    case ADD_GROUP.success:
      return {
        ...state,
        groups: state.groups.concat(action.payload.group),
        actionAddGroup: actionForState(state.action, 'success'),
      };
    case ADD_GROUP.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionAddGroup: actionForState(state.action, 'error', action.payload.message),
      };
    case LOAD_GROUP.pending:
      return {
        ...state,
        actionForGroup: actionForState(state.action, 'pending'),
      };
    case LOAD_GROUP.success:
      return {
        ...state,
        actionForGroup: actionForState(state.action, 'success'),
        groups: action.payload.groups,
      };
    case LOAD_GROUP.error:
      return {
        ...state,
        actionForGroup: actionForState(state.action, 'error', action.payload.message),
      };
    case DELETE_GROUP.pending:
      return {
        ...state,
        actionDeleteGroup: actionForState(state.action, 'pending'),
      };
    case DELETE_GROUP.success:
      toast.success('Group successfully deleted.');
      return {
        ...state,
        groups: state.groups.filter((row) => row.id !== Number(action.payload.id)),
        actionDeleteGroup: actionForState(state.action, 'success'),
      };
    case DELETE_GROUP.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionDeleteGroup: actionForState(state.action, 'error', action.payload.message),
      };
    case UPDATE_GROUP.pending:
      return {
        ...state,
        actionEditGroup: actionForState(state.action, 'pending'),
      };
    case UPDATE_GROUP.success:
      const indx = state.groups.findIndex((row) => row.id === action.payload.data.id);
      let newGrp = [...state.groups];
      newGrp[indx] = action.payload.data;
      return {
        ...state,
        groups: newGrp,
        actionEditGroup: actionForState(state.action, 'success'),
      };
    case UPDATE_GROUP.error:
      return {
        ...state,
        actionEditGroup: actionForState(state.action, 'error', action.payload.message),
      };
    case LOAD_RENTAL.pending:
      return {
        ...state,
        actionForRental: actionForState(state.action, 'pending'),
      };
    case LOAD_RENTAL.success:
      return {
        ...state,
        actionForRental: actionForState(state.action, 'success'),
        rentals: action.payload.rentals,
      };
    case LOAD_RENTAL.error:
      return {
        ...state,
        actionForRental: actionForState(state.action, 'error', action.payload.message),
      };
    case ADD_RENTAL.pending:
      return {
        ...state,
        actionAddRental: actionForState(state.action, 'pending'),
      };
    case ADD_RENTAL.success:
      toast.success('Rental was added successfully!');
      return {
        ...state,
        rentals: state.rentals.concat(action.payload.data),
        actionAddRental: actionForState(state.action, 'success'),
        lastAddedRentalID: action.payload.data.id,
      };
    case ADD_RENTAL.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionAddRental: actionForState(state.action, 'error', action.payload.message),
      };
    case DELETE_RENTAL.pending:
      return {
        ...state,
        actionDeleteRental: actionForState(state.action, 'pending'),
      };
    case DELETE_RENTAL.success:
      toast.success('Rental deleted successfully!');
      return {
        ...state,
        rentals: state.rentals.filter((row) => {
          if (row.id !== Number(action.payload.id)) {
            return row;
          }
        }),
        actionDeleteRental: actionForState(state.action, 'success'),
      };
    case DELETE_RENTAL.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionDeleteRental: actionForState(state.action, 'error', action.payload.message),
      };
    case EDIT_RENTAL.pending:
      return {
        ...state,
        actionEditRental: actionForState(state.action, 'pending'),
      };
    case EDIT_RENTAL.success:
      toast.success('Rental edited successfully!');
      const index = state.rentals.findIndex((row) => row.id === action.payload.data.id);
      let rentalsArrayData = [...state.rentals];
      rentalsArrayData[index] = action.payload.data;
      return {
        ...state,
        rentals: rentalsArrayData,
        actionEditRental: actionForState(state.action, 'success'),
      };
    case EDIT_RENTAL.error:
      toast.error(action.payload.message);
      return {
        ...state,
        actionEditRental: actionForState(state.action, 'error', action.payload.message),
      };
    case CLEAR_RENTAL_ADD:
      return {
        ...state,
        lastAddedRentalID: null,
      };
    default:
      return state;
  }
}
