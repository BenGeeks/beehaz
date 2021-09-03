import React,{useState,useEffect} from 'react';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import styles from '../editBooking.module.css';
import moment from 'moment';
import {useSelector,useDispatch} from "react-redux";
import {editBooking,chargeCalculation} from "../../../../../../../general_redux/calendar/actions";
import { Row } from 'react-bootstrap';

const BookingDetails = ({ bookingId,rentals,handleEditBooking }) => {
  const bookingData= useSelector(({calendar}) => calendar &&
      calendar.allBooking.filter((row)=>row.id===bookingId)[0]);
  const guestDetails = useSelector(({guests})=>guests && guests.guestByBooking)[0];
  const rentalList= useSelector(({rentals})=>rentals && rentals.rentals);
  const currentCharges=useSelector(({calendar})=>calendar && calendar.currentCharges);
  const [rental,setRental]=useState(bookingData.rentalId);
  const [color,setColor]=useState(bookingData.color);
  const [paymentStatus,setPaymentStatus]=useState(bookingData.paymentStatus);
  const [children,setChildren]=useState(bookingData.noOfChildren);
  const [adult,setAdult]=useState(bookingData.noOfAdults);
  const [totalGuest,setTotalGuest]=useState(bookingData.noOfAdults + bookingData.noOfChildren)
  const [arrival,setArrival]=useState(bookingData && bookingData.arrive);
  const [departure,setDeparture]=useState(bookingData && bookingData.depart);
  const [finalPrice,setFinalPrice]=useState(bookingData.price);
  const [totalNights,setTotalNights]=useState(bookingData?moment(bookingData.depart).diff(moment(bookingData.arrive),'days'):"")

  const findRentalDetail=(rentalId)=>{
    const ar=rentalList.filter((rt)=>Number(rt.id)===Number(rentalId));
    if(ar.length!==0){
      return ar[0].maxGuests;
    }else{
      return 1;
    }
  }
  const setData=(guest)=>{
    setTotalGuest(guest);
    setChildren(guest-adult);
  }

  const validate=(val)=>{
    if(totalGuest>rentalDetail){
      return `Only ${rentalDetail} guests are allowed!`
    }else{
      return "";
    }
  }
  const [rentalDetail,setRentalDetail]=useState(findRentalDetail(bookingData.rentalId));

  const paymentOpt = ['Payment Pending', 'Partially Paid', 'Paid'];
  const dispatch=useDispatch();

  useEffect(()=>{
      if(arrival && departure && rental && totalGuest){
        dispatch(chargeCalculation({
          arrive:arrival,
          depart:departure,
          noOfGuests:Number(totalGuest),
          rentalId:Number(rental)
        }))
        setTotalNights(moment(departure).diff(moment(arrival),'days'));
      }
  },[arrival,departure,rental,totalGuest])

  useEffect(()=>{
    if(currentCharges){
      const tmp=Number(currentCharges.daily_rate)+
          Number(currentCharges.discounts)+Number(currentCharges.extra_guest_fees)
          +Number(currentCharges.fees)
      setFinalPrice(tmp);
    }
  },[currentCharges])

  const updateSchema = yup.object().shape({
    adult: yup.number().min(1, 'At least 1 adult is required').required('At least 1 adult is required'),
    children: yup.number().min(0, 'Cannot be a negative number'),
    arrival: yup.date().required('Arrival date is required'),
    departure: yup.date().required('Departure date is required'),
  });

  const rentalSelector = rentals.map((row) => ({ id: row.id, name: row.name }));

  const colorDrop = ['#dcdcdc','#a4bdfc','#4287f5','#7ae7bf','#46d6db','#53bf4b','#ffc107','#C8A2C8','#dbadff','#dc3545'];

  const handleSubmit = (data) => {
    const payload = {
      id:bookingData.id,
      rentalId: Number(rental),
      price: finalPrice,
      tax: 0,
      noOfAdults: adult,
      arrive: arrival,
      depart:departure,
      noOfChildren: children,
      source: data.source,
      checkInTime:data.checkIn,
      checkOutTime:data.checkOut,
      bookingType:"booking",
      noOfGuests: totalGuest,
      paymentStatus: paymentStatus,
      title : `${guestDetails.name}¦ ${paymentStatus}¦ Direct Booking`,
      nights: totalNights,
      color: color,
      status:"Booked",
      notes:(data.notes)?data.notes:"",
    }
    //console.log(payload);
    dispatch(editBooking(payload));
  };

  const initialValues = {
    rental:bookingData.rentalId,
    totalGuests: bookingData.noOfAdults + bookingData.noOfChildren,
    adult: bookingData.noOfAdults,
    children: bookingData.noOfChildren,
    finalPrice: bookingData.price,
    arrival: bookingData.arrive,
    checkIn: bookingData.checkInTime,
    departure: bookingData.depart,
    nights:bookingData.nights,
    checkOut: bookingData.checkOutTime,
    source: bookingData.source,
    color: bookingData.color,
    paymentStatus:bookingData.paymentStatus,
    title:`${guestDetails.name} ¦ ${paymentStatus} ¦ Direct Booking`,
    notes: `${bookingData.notes? bookingData.notes:""}`
  };

  return (
    <div className="mt-3">
      <Formik
        initialValues={initialValues}
        validationSchema={updateSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ values, errors, handleChange }) => (
          <>
            <Form>
              <div className={styles.mainContainer}>
                <div className={`col-lg-6 col-md-12 px-xs-1`}>
                  <div className="pb-2">
                    <div className={styles.subHeader}>{guestDetails.name}</div>
                    <div className={styles.defaultFont}>{guestDetails.email_id}</div>
                    <div className={styles.defaultFont}>{guestDetails.phone_no}</div>
                  </div>
                  <hr className="my-1" />
                  <div className="pb-2">
                    <div className={styles.subHeader}> Booking </div>
                    <div className={styles.defaultFont}>{`Booking number ${bookingData.id}`}</div>
                  </div>
                  <Row className={styles.form_wrapper} key={'selectRental'}>
                    <div className={styles.form_title}>{'Select rental: '}</div>
                    <Field
                      as={'select'}
                      name={'rental'}
                      value={rental}
                      onChange={(e)=> {
                        setRental(e.target.value);
                        setRentalDetail(findRentalDetail(e.target.value));
                      }}
                      className={errors.rental ? styles.form_entry_err : styles.form_entry}
                    >
                      {rentalSelector.map((opt) => (
                        <option key={opt.id} value={opt.id} >
                          {opt.name}
                        </option>
                      ))}
                    </Field>
                    <div className={errors.rental ? styles.form_error : styles.form_error_hidden}>{errors.rental}</div>
                  </Row>
                  <Row className={styles.form_wrapper} key={'totalGuest'}>
                    <div className={styles.form_title}>{'Number of guests: '}</div>
                    <Field
                      type={'number'}
                      name={'totalGuests'}
                      className={errors.totalGuests ? styles.form_entry_err : styles.form_entry}
                      value={totalGuest}
                      onChange={(e)=>setData(e.target.value)}
                      validate={(val)=>validate(val)}
                      min={1}
                    />
                    <div className={errors.totalGuests ? styles.form_error : styles.form_error_hidden}>
                      {errors.totalGuests}
                    </div>
                  </Row>
                  <Row className={styles.form_wrapper} key={'adult'}>
                    <div className={`${styles.form_title_half} ${styles.guestTitleWidth}`}>{'Adults: '}</div>
                    <Field
                      type={'number'}
                      name={'adult'}
                      className={
                        errors.adult ? styles.form_entry_err : `${styles.form_entry_half} ${styles.guestEntryWidth}`
                      }
                      value={adult}
                      min={1}
                    />
                    <div className={`${styles.form_title_half} ${styles.guestTitleWidth}`}>{'Children: '}</div>
                    <Field
                      type={'number'}
                      name={'children'}
                      value={children}
                      onChange={(e)=> {
                        setChildren(e.target.value)
                        setAdult(totalGuest-e.target.value)
                      }}
                      className={
                        errors.children ? styles.form_entry_err : `${styles.form_entry_half} ${styles.guestEntryWidth}`
                      }
                      min={0}
                    />
                  </Row>

                  <Row className={styles.form_wrapper} key={'arrival'}>
                    <div className={`${styles.form_title_half} ${styles.checkTitleWidth}`}>Check-in: </div>
                    <Field
                      type={'date'}
                      name={'arrival'}
                      value={arrival}
                      className={
                        errors.arrival ? styles.form_entry_err : `${styles.form_entry_half} ${styles.calendarWidth}`
                      }
                      onChange={(e)=>setArrival(e.target.value)}
                      max={departure}
                    />
                    <div className={errors.arrival ? styles.form_error : styles.form_error_hidden}>
                      {errors.arrival}
                    </div>
                    <div className={`${styles.form_title_half} ${styles.atWidth}`}>from: </div>
                    <Field
                      type={'time'}
                      name={'checkIn'}
                      id={'checkInInp'}
                      className={`${styles.form_entry_half} ${styles.atEntryWidth}`}
                      onChange={handleChange}
                    />
                  </Row>
                  <Row className={styles.form_wrapper} key={'departure'}>
                    <div className={`${styles.form_title_half} ${styles.checkTitleWidth}`}>Check-out: </div>
                    <Field
                      type={'date'}
                      name={'departure'}
                      value={departure}
                      className={
                        errors.departure ? styles.form_entry_err : `${styles.form_entry_half} ${styles.calendarWidth}`
                      }
                      min={arrival}
                      onChange={(e)=>setDeparture(e.target.value)}
                    />
                    <div className={errors.departure ? styles.form_error : styles.form_error_hidden}>
                      {errors.departure}
                    </div>
                    <div className={`${styles.form_title_half} ${styles.atWidth}`}>until: </div>
                    <Field
                      type={'time'}
                      name={'checkOut'}
                      id={'checkOutInp'}
                      className={`${styles.form_entry_half} ${styles.atEntryWidth}`}
                      onChange={handleChange}
                    />
                  </Row>

                  <Row className={styles.form_wrapper} key={'nights'}>
                    <div className={styles.form_title}>Total nights: </div>
                    <Field
                      type={'text'}
                      name={'nights'}
                      value={totalNights}
                      readOnly={true}
                      className={errors.source ? styles.form_entry_err : styles.form_entry}
                    />
                  </Row>

                  <Row className={styles.form_wrapper} key={'source'}>
                    <div className={styles.form_title}>{'Source: '}</div>
                    <Field
                      type={'text'}
                      name={'source'}
                      className={errors.source ? styles.form_entry_err : styles.form_entry}
                    />
                  </Row>
                  <hr className="my-1" />
                  <div className="mb-2">
                    <div className={styles.subHeader}>Payment </div>
                  </div>
                  <Row className={styles.form_wrapper} key={'finalPrice'}>
                    <div className={`${styles.form_title_half} ${styles.paymentTitleWidth}`}>Total: </div>
                    <Field
                      type={'number'}
                      name={'finalPrice'}
                      className={
                        errors.finalPrice
                          ? styles.form_entry_err
                          : `${styles.form_entry_half} ${styles.totalEntryWidth}`
                      }
                      value={finalPrice}
                      readOnly={true}
                    />
                    <div className={errors.finalPrice ? styles.form_error : styles.form_error_hidden}>
                      {errors.finalPrice}
                    </div>
                    <div className={`${styles.form_title_half} ${styles.paymentTitleWidth}`}>Status: </div>
                    <Field
                      as={'select'}
                      name={'paymentStatus'}
                      value={paymentStatus}
                      onChange={(e)=> {
                        setPaymentStatus(e.target.value);
                      }}
                      className={
                        errors.paymentStatus
                          ? styles.form_entry_err
                          : `${styles.form_entry_half} ${styles.statusEntryWidth}`
                      }
                    >
                      {paymentOpt.map((opt) => (
                        <option value={opt} key={opt}>
                          {opt}
                        </option>
                      ))}
                    </Field>
                  </Row>
                  <hr className="my-1" />
                  <div className="mb-2">
                    <div className={styles.subHeader}>Colour</div>
                  </div>
                  <Row className={styles.form_wrapper} key={'colour'}>
                    <div className={styles.form_title}>Choose colour: </div>
                    {/*<Field*/}
                    {/*  type={'color'}*/}
                    {/*  name={'color'}*/}
                    {/*  value={color}*/}
                    {/*  onChange={(e)=>setColor(e.target.value)}*/}
                    {/*  className={errors.color ? styles.form_entry_err : `${styles.form_entry} ${styles.form_entry_color}`}*/}
                    {/*/>*/}
                    <div className={styles.containerColor}>
                      {colorDrop.map((item)=>(
                          <div
                              className={`${styles.containerBox} ${(color===item)?` active1`:``}`}
                              style={{background:`${item}`}}
                              onClick={()=>setColor(item)}
                              key={item}
                          />
                      ))}
                      <Field
                          type={'color'}
                          name={'color'}
                          value={color}
                          onChange={(e)=>setColor(e.target.value)}
                          className={styles.form_entry_color}
                      />
                    </div>
                  </Row>
                </div>
                <div className={`col-lg-6 col-md-12`}>
                  <hr className="my-1 d-lg-none" />
                  <div className="mb-3 mt-sm-3 mt-md-0">
                    <div className={styles.subHeader}>Notes </div>
                  </div>
                  <textarea
                    className={`form-control ${styles.text_area} `}
                    rows="15"
                    name="notes"
                    onChange={handleChange}
                    value={values.notes}
                  />
                </div>
              </div>
              <div className={`d-flex justify-content-center ${styles.button_group}`}>
                <div>
                  <button type="submit" className={styles.settings_save}>
                    Update changes
                  </button>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default BookingDetails;
