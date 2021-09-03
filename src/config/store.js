import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import general from '../general_redux';
import rentals from '../general_redux/rentals';
import guests from '../general_redux/guest';
import rates from '../general_redux/rates';
import inquiry from '../general_redux/inquiry';
import calendar from '../general_redux/calendar';
import invoice from '../general_redux/invoice';
import generalSetting from '../general_redux/general settings';
import user from '../general_redux/user';
import maintainance from '../modules/maintainance/redux';
import apiMiddleware from './middleware';
import { loadState, saveState } from './sessionStore';
import subscribers from '../general_redux/subscribers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
  combineReducers({
    general,
    maintainance,
    rentals,
    guests,
    rates,
    calendar,
    generalSetting,
    user,
    inquiry,
    subscribers,
    invoice
  }),
  persistedState,
  composeEnhancers(applyMiddleware(apiMiddleware.apiMiddleware), applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
