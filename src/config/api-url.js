const GROUP = 'group/';
const RENTAL = 'rental/';
const BOOKING = 'booking/';
const INQUIRY = 'inquiry/';
const GUEST = 'guest/';
const CUSTOMER = 'customer/';
const RATE = 'rate/';
const FEE = 'fee/';
const SUBSCRIBERS = 'subscribers/';
const INVOICE='invoice/';
const LOGIN = `${CUSTOMER}login`;
const OAUTH_LOGIN = `${CUSTOMER}oauth/login`;
const OAUTH_LOGIN_CALLBACK = `${CUSTOMER}login_callback`;
const REGISTER = `${CUSTOMER}register`;
const ADD_USER_SETTINGS = `${CUSTOMER}customerSettings`;
const LOGINBYAUTH = `${CUSTOMER}login`;
const GROUPADD = `${GROUP}`;
const GROUPLIST = `${GROUP}`;
const GROUPDELETE = `${GROUP}`;
const RENTALDELETE = `${RENTAL}`;
const GUEST_ADD = `${GUEST}`;
const EDIT_GROUP = `${GROUP}`;
const RENTAL_LIST = `${RENTAL}`;
const RENTAL_ADD = `${RENTAL}`;
const EDIT_RENTAL = `${RENTAL}`;
const ADD_BOOKING = `${BOOKING}`;
const EDIT_BOOKING = `${BOOKING}`;
const CHARGES_CALC=`${BOOKING}charges`;
const GNRL_SETTINGS = `${CUSTOMER}generalSettings`;
const CUSTOMER_SETTINGS = `${CUSTOMER}customerInfo`;
const ADD_GUEST_BY_BOOKING = `${GUEST}addGuestByBookingId`;
const GET_GUEST_BY_BOOKING = `${GUEST}getGuestByBookingId`;
const INVOICE_PATH=`${INVOICE}`;
const DEFAULT_BULK = `${RATE}multiple`;
const SPECIAL_RATE=`${RATE}changeRate`;
const DISCOUNT = `${BOOKING}discount`;
const CONTACT = `contact/`;
const CHANGEDRATE_TIMELINE=`${RATE}changeRateGetDate`;
const FETCH_CAL=`calander/cal`;
const WORLD_API = `world`;
const METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

const APIURL = {
  LOGIN,
  REGISTER,
  CUSTOMER,
  OAUTH_LOGIN,
  OAUTH_LOGIN_CALLBACK,
  LOGINBYAUTH,
  GROUP,
  RENTAL,
  BOOKING,
  GUEST,
  INQUIRY,
  GROUPADD,
  GROUPLIST,
  GROUPDELETE,
  METHOD,
  GUEST_ADD,
  RENTAL_LIST,
  RENTAL_ADD,
  RENTALDELETE,
  EDIT_RENTAL,
  ADD_BOOKING,
  EDIT_GROUP,
  EDIT_BOOKING,
  WORLD_API,
  RATE,
  GNRL_SETTINGS,
  CUSTOMER_SETTINGS,
  ADD_GUEST_BY_BOOKING,
  ADD_USER_SETTINGS,
  GET_GUEST_BY_BOOKING,
  FEE,
  SUBSCRIBERS,
  DEFAULT_BULK,
  CHARGES_CALC,
  INVOICE_PATH,
  SPECIAL_RATE,
  DISCOUNT,
  CONTACT,
  FETCH_CAL,
  CHANGEDRATE_TIMELINE,
};

export default APIURL;
