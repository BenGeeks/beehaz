import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { Row, Col } from 'react-bootstrap';
import styles from './addnewbooking.module.css';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import Select from "react-select";
import PhoneInput from 'react-phone-input-2';
import countryList from "react-select-country-list";
import {chargeCalculation,resetCharges} from '../../../../../../general_redux/calendar/actions';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReactTooltip from "react-tooltip";

function BookingForm(props) {
  const {guestList,guestDetail,rentals,handleSave,userId } = props;
  const [guestLimit,setGuestLimit]=useState();

  const dispatch=useDispatch();
  //=============================================
  // SCHEMA REQUIREMENT FOR FORM VALIDATION
  //=============================================

  const SignupSchema = yup.object().shape({
    totalGuests: yup.number(),
    adult: yup.number().min(1, 'At least 1 adult is required').required('At least 1 adult is required'),
    children: yup.number().min(0, 'Cannot be a negative number'),
    arrival: yup.date().required('Arrival date is required'),
    departure: yup.date().required('Departure date is required'),
  });

  //=============================================
  // STATE FOR BOOKING DETAILS
  //=============================================

  const [values, setValues] = useState({});

  const [rental, setRental] = useState('');
  const [adult,setAdult] = useState(1);
  const [children,setChildren] = useState(0);
  const [totalGuest, setTotalGuest] = useState(adult+children);
  const [taxes, setTaxes] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [price,setPrice]=useState(0);
  const [checkIn,setCheckIn]=useState('');
  const [checkOut,setCheckOut]=useState('');

  const [guestName,setGuestName]=useState("");
  const [company,setCompany]=useState("");
  const [primaryEmail,setPrimaryEmail]=useState("");
  const [secondaryEmail,setSecondaryEmail]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [country,setCountry]=useState([]);
  const [streetAddress,setStreetAddress]=useState("");
  const [postalCode,setPostalCode]=useState("");
  const [stateProvince,setStateProvince]=useState("");
  const [addressDetails,setAddressDetail]=useState("")
  const [nationality,setNationality]=useState("");
  const [language,setLanguage]=useState("");
  const [notes,setNotes]=useState("");

  const [defVal,setDefVal]=useState("");
  const paymentOpt = ["Payment Pending","Partially Paid","Paid"];

  // ==================================================
  // ==========PRICE CALCULATION STARTS HERE===========
  // ==================================================
  const ratesList = useSelector(({rates})=>rates && rates.rateSettings);
  const propertyList = useSelector(({rentals})=>rentals && rentals.rentals);
  const currentCharges=useSelector(({calendar})=>calendar && calendar.currentCharges);

  const [selectedRate, setSelectedRate] = useState();
  const [selectedProperty, setSelectedProperty] = useState();
  const [totalNights, setTotalNights] = useState();

  useEffect(()=>{
    return()=>{
      dispatch(resetCharges());
    }
  },[])

  useEffect( () => {
    if (rental && ratesList) {
      // ratesList.map((r) => {
      //   if(r.rentalId === Number(rental)){
      //     setSelectedRate(r)
      //   }
      // });
      propertyList.map((p)=>{
        if(p.id===Number(rental)){
          setGuestLimit(p.maxGuests);
          setCheckIn(p.checkInTime);
          setCheckOut(p.checkOutTime);
        }
      });
    }
    // (p) => p.id === Number(rental)
  }, [rental])

  // useEffect(()=>{
  //   console.log(selectedProperty);
  //   if(selectedProperty){
  //         setGuestLimit(selectedProperty.maxGuests);
  //
  //       }
  // },[propertyList])

  useEffect( () => {
    if (values.departure && values.arrival) {
      setTotalNights(moment(values.departure,"YYYY-MM-DD").diff(moment(values.arrival,"YYYY-MM-DD"),'day'));
    }
    if(rental && values.arrival && values.departure && totalGuest){
      dispatch(chargeCalculation({
        arrive:values.arrival,
        depart:values.departure,
        noOfGuests:Number(totalGuest),
        rentalId:Number(rental)
      }))
    }
  },[values.departure, values.arrival,rental,totalGuest]);

  useEffect(()=>{
    if(currentCharges){
      setPrice(Number(currentCharges.daily_rate));
    }
  },[currentCharges])

  // function extraGuestsFee(){
  //   return (totalGuest-selectedRate.guestPerNight) > 0 ?
  //       ((totalGuest - selectedRate.guestPerNight) * selectedRate.usdPerGuest )
  //       : 0
  // }
  //
  // function defaultPrice(){
  //   return ((selectedRate.dailyRate + extraGuestsFee()) * totalNights)
  // }
  //
  // function calculateMonthlyFixedPrice() {
  //   const startMonth = moment(values.arrival).format('M');
  //   const startDay   = moment(values.arrival).format('D');
  //   const startYear  = moment(values.arrival).format('YYYY');
  //   const endMonth = moment(values.departure).format('M');
  //   const endDay   = moment(values.departure).format('D');
  //   const endYear  = moment(values.departure).format('YYYY');
  //   const yearToMonth = (endYear - startYear) * 12;
  //   const monthsPrice = (endMonth - startMonth + yearToMonth) * selectedRate.monthlyPrice;
  //   if ( startDay === endDay ) setPrice(monthsPrice + extraGuestsFee());
  //   if ( startDay < endDay ) {
  //     const weeksPrice = Math.floor((endDay - startDay) / 7) * selectedRate.weekPrice;
  //     const daysPrice = ((endDay - startDay) % 7) * selectedRate.dailyRate;
  //     setPrice(monthsPrice + weeksPrice + daysPrice + extraGuestsFee());
  //   }
  //   if ( startDay > endDay ) {
  //     const newMonthPrice = (endMonth - startMonth + yearToMonth - 1) * selectedRate.monthlyPrice;
  //     const prevMonth = moment(`${endYear}-${endMonth - 1}-${startDay}`,"YYYY-MM-DD")
  //     const newTotalNights = moment(values.departure,"YYYY-MM-DD").diff(moment(prevMonth,"YYYY-MM-DD")) / 86400000;
  //     const newWeeksPrice = Math.floor(newTotalNights / 7) * selectedRate.weekPrice;
  //     const newDaysPrice = (newTotalNights % 7) * selectedRate.dailyRate;
  //     setPrice(newMonthPrice + newWeeksPrice + newDaysPrice + extraGuestsFee());
  //   }
  // }
  //
  // function calculatePrice(){
  //   if (selectedRate.allowDiscount) {
  //     if (totalNights>=28 && (values.arrival.includes("-02-") || values.departure.includes("-02-"))){
  //       setPrice( defaultPrice() * ((100 - selectedRate.monthlyDiscount) / 100) );
  //     }
  //     else if(totalNights >= 30){
  //       setPrice( defaultPrice() * ((100 - selectedRate.monthlyDiscount) / 100) );
  //     }
  //     else if (totalNights >= 7) setPrice( defaultPrice() * ((100 - selectedRate.weeklyDiscount) / 100));
  //     else setPrice(defaultPrice());
  //   } else if (selectedRate.allowFixedRate) {
  //     if (totalNights >= 28) calculateMonthlyFixedPrice();
  //     else if (totalNights >= 7) {
  //       const weeksPrice = Math.floor(totalNights / 7) * selectedRate.weekPrice;
  //       const daysPrice = (totalNights % 7) * selectedRate.dailyRate;
  //       setPrice(weeksPrice + daysPrice + extraGuestsFee());
  //     } else {
  //       setPrice(defaultPrice());
  //     }
  //   } else {
  //     setPrice(defaultPrice());
  //   }
  // }

  // useEffect(() => {
  //   if(selectedProperty){
  //     setGuestLimit(selectedProperty.maxGuests);
  //     setCheckOut(selectedProperty.checkOutTime);
  //     setCheckIn(selectedProperty.checkInTime);
  //   }
  //   if (selectedRate && selectedProperty && totalGuest && totalNights) {
  //     calculatePrice();
  //   }
  // }, [selectedRate, selectedProperty, totalGuest, totalNights]);

  useEffect(()=>{
    setFinalPrice(Number(price)+taxes);
  },[price,taxes])

  useEffect(()=>{
    const tmp=Number(totalGuest)-Number(children);
    setAdult(tmp<0?0:tmp)
  },[totalGuest,children])
  // ==================================================
  // ==========PRICE CALCULATION ENDS HERE=============
  // ==================================================

  useEffect(()=>{
    if(guestDetail && guestDetail!==""){
      const guestData= guestList.filter((row)=>(row.name===guestDetail.label))
      setDefVal(guestData[0]);
      setGuestName(guestData[0].name);
      setPrimaryEmail(guestData[0].emailId);
    }else {
      setDefVal("");
      setGuestName("");
      setCompany("");
      setPrimaryEmail("");
      setSecondaryEmail("");
      setCountry([]);
      setPhoneNumber("+1 ");
      setStreetAddress("");
      setPostalCode("");
      setStateProvince("");
      setAddressDetail("");
      setNationality("");
      setLanguage("");
      setNotes("");
    }
  },[guestDetail])
  //=============================================
  // FORM INITIAL VALUE
  //=============================================

  const initVal = () => {
    return {
      rental:'',
      totalGuest:1,
      adult: 1,
      children: 0,
      arrival:'',
      departure:'',
      price: 0,
      taxes:0,
      finalPrice:0,
      phoneNo:"",
      paymentStatus: 'Payment Pending',
    };
  };

  const validate = (field,value) => {
    let errorMessage;
    if(field==="emailId"){
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errorMessage = 'Invalid email address';
      }
    }else if(field==="name"){
      if(!value || value===""){
        errorMessage = 'Guest name is required';
      }
    }else if(field==="rental"){
      if(value===""){
        errorMessage= 'Rental is required';
      }
    }else if(field==="totalGuests"){
      if(totalGuest >guestLimit){
        errorMessage=`Only ${guestLimit} guests are allowed!`;
      }
    }else if(field==="price"){
      if(Number(price)<0){
        errorMessage="Please enter valid price";
      }
    }
    return errorMessage;
  };

  //===================================
  // FORM LOOP
  //===================================

  const guestForm = [
    { title: 'Name: ', name: 'name' , value: guestName},
    { title: 'Company: ', name: 'company' ,value:company},
    { title: 'Email address: ', name: 'emailId',value:primaryEmail },
    { title: 'Secondary email: ', name: 'secondaryEmailId',value:secondaryEmail },
    { title: 'Phone: ', name: 'phoneNo' ,value:phoneNumber},
    { title: 'Country: ', name: 'country',value:country },
    { title: 'Street and nr. : ', name: 'address1',value:streetAddress},
    { title: 'Postal code: ', name: 'postalCode',value:postalCode },
    { title: 'State/Province: ', name: 'state',value:stateProvince },
    { title: 'Address details: ', name: 'address',value: addressDetails},
    { title: 'Nationality: ', name: 'nationality',value:nationality },
    { title: 'Language: ', name: 'language',value:language },
    { title: 'Notes: ', name: 'notes',value:notes },
  ];
  //===================================
  // HANDLE SUBMIT
  //===================================

  function handleSubmit() {
    let guestData={};
    const check=(defVal==="");
    const payload = {
      rentalId: Number(rental),
      price: finalPrice,
      tax: taxes,
      discount: {
        type:(taxes>0)?"fee":"discount",
        name:"",
        amount:taxes,
      },
      noOfAdults: adult,
      arrive: values.arrival,
      depart:values.departure,
      noOfChildren: children,
      source: "beehaz",
      checkInTime:checkIn,
      checkOutTime:checkOut,
      bookingType:"booking",
      noOfGuests: totalGuest,
      paymentStatus: values.paymentStatus,
      title : `${(defVal)?defVal.name:values.name} ¦ ${values.paymentStatus} ¦ Direct Booking`,
      nights: totalNights,
      color: "#d3d3d3",
    }
    if(!check){
      guestData={
        guestId:defVal.id
      }
    }else{
      guestData={
        name: values.name,
        emailId: values.emailId,
        phoneNo: phoneNumber,
        customerId: userId,
        secondaryEmailId: (values.secondaryEmailId)?values.secondaryEmailId:"",
        country: (country.length!==0)?country.label:"",
        address: (values.address)?values.address:"",
        postalCode:( values.postalCode)? values.postalCode:"",
        state: (values.stateProvince)?values.stateProvince:"",
        nationality: (values.nationality)?values.nationality:"",
        language: (values.language)?values.language:"",
        notes: (values.notes)?values.notes:"",
      }
    }
    //console.log(payload,guestData);
    handleSave(payload,guestData,check);
  }

  return (
      <>
        <Formik
            initialValues={initVal()}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
          {({ values, errors }) => (
              <div>
                <Form>
                  <Row>
                    <Col md={6} className={styles.wrapper}>
                      <h3 className={styles.header}>Booking Details</h3>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"selectRental"}>
                        <div className={styles.form_title}>{"Select rental: "}</div>
                        <div className={`w-100`}>
                          <Field
                              as={"select"}
                              name={"rental"}
                              className={(errors.rental)?styles.form_entry_err:styles.form_entry}
                              validate={(value)=>validate('rental',value)}
                          >
                            <option value={""} label={"---Select Rental---"}/>
                            {rentals.map((opt)=>(
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                          </Field>
                          <div className={errors.rental ? styles.form_error : styles.form_error_hidden}>
                            {errors.rental}
                          </div>
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"totalGuest"}>
                        <div className={styles.form_title}>{"Number of guests: "}</div>
                        <div className={`w-100`}>
                          <Field
                              type={"number"}
                              name={"totalGuests"}
                              className = {(errors.totalGuests)?styles.form_entry_err:styles.form_entry}
                              value={totalGuest}
                              onChange={(e)=>setTotalGuest(e.target.value)}
                              validate={(value)=>validate('totalGuests',value)}
                              min={1}
                          />
                          <div className={errors.totalGuests ? styles.form_error : styles.form_error_hidden}>
                            {errors.totalGuests}
                          </div>
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"adult"}>
                        <div className={styles.form_title}>{"Adults: "}</div>
                        <Field
                            type={"number"}
                            name={"adult"}
                            value={adult}
                            className={(errors.adult)?styles.form_entry_err:styles.form_entry}
                            min={1}
                        />
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"children"}>
                        <div className={styles.form_title}>{"Children: "}</div>
                        <Field
                            type={"number"}
                            name={"children"}
                            value={children}
                            onChange={(e)=>setChildren(e.target.value)}
                            className={(errors.children)?styles.form_entry_err:styles.form_entry}
                            min={0}
                        />
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"arrival"}>
                        <div className={styles.form_title}>{"Arrival date: "}</div>
                        <div className={`w-100`}>
                          <Field
                              type={"date"}
                              name={"arrival"}
                              className={(errors.arrival)?styles.form_entry_err: styles.form_entry}
                              max={values.departure}
                          />
                          <div className={errors.arrival ? styles.form_error : styles.form_error_hidden}>
                            {errors.arrival}
                          </div>
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"departure"}>
                        <div className={styles.form_title}>{"Departure date: "}</div>
                        <div className={`w-100`}>
                          <Field
                              type={"date"}
                              name={"departure"}
                              className={(errors.departure)?styles.form_entry_err: styles.form_entry}
                              min={values.arrival}
                          />
                          <div className={errors.departure ? styles.form_error : styles.form_error_hidden}>
                            {errors.departure}
                          </div>
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"price"}>
                        <div className={`d-flex ${styles.form_title}`}>
                          <div>{"Price: "}
                            <InfoOutlinedIcon
                              fontSize="small"
                              color="inherit"
                              data-tip
                              data-for="stripIcon"
                              className={styles.toolTipIcon}
                          /></div>

                          <ReactTooltip place="bottom" type="dark" id="stripIcon" effect="solid" className={styles.toolTip}>
                            <span>
                              The price takes into account the rates set, extra guest fees, taxes, and fees for the selected unit
                              and dates. These can be managed by clicking on the Rates icon. You can manually overwrite
                              the total for this booking here.
                            </span>
                          </ReactTooltip>
                        </div>
                        <Field
                            type={"number"}
                            name={"price"}
                            className={(errors.price)?styles.form_entry_err: styles.form_entry}
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            validate={(value)=>validate('price',value)}
                        />
                        <div className={errors.price ? styles.form_error : styles.form_error_hidden}>
                          {errors.price}
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"taxes"}>
                        <div className={`d-flex ${styles.form_title}`}>
                          <div>{"Discount or fee: "}
                            <InfoOutlinedIcon
                                fontSize="small"
                                color="inherit"
                                data-tip
                                data-for="taxIcon"
                                className={styles.toolTipIcon}
                            />
                          </div>
                          <ReactTooltip place="bottom" type="dark" id="taxIcon" effect="solid" className={styles.toolTip}>
                            <span>
                             To add a discount, you can use a negative number. To add a fee to the price, you can write a positive number.
                            </span>
                          </ReactTooltip>
                        </div>
                        <Field
                            type={"number"}
                            name={"taxes"}
                            className={(errors.taxes)?styles.form_entry_err: styles.form_entry}
                            value={taxes}
                            onChange={(e)=>setTaxes(Number(e.target.value))}
                        />
                        <div className={errors.taxes ? styles.form_error : styles.form_error_hidden}>
                          {errors.taxes}
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"finalPrice"}>
                        <div className={styles.form_title}>{"Final price: "}</div>
                        <Field
                            type={"number"}
                            name={"finalPrice"}
                            className={(errors.finalPrice)?styles.form_entry_err: styles.form_entry}
                            value={finalPrice.toFixed(2)}
                        />
                        <div className={errors.finalPrice ? styles.form_error : styles.form_error_hidden}>
                          {errors.finalPrice}
                        </div>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"paymentStatus"}>
                        <div className={styles.form_title}>{"Payment status: "}</div>
                        <Field
                            as={"select"}
                            name={"paymentStatus"}
                            className={(errors.paymentStatus)?styles.form_entry_err: styles.form_entry}
                        >
                          <option key={""} value={""} disabled={true} label={"--Select Status--"}/>
                          {paymentOpt.map((opt)=>(
                              <option value={opt} key={opt}>{opt}</option>
                          ))}
                        </Field>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"source"}>
                        <div className={styles.form_title}>{"Source: "}</div>
                        <Field
                            type={"text"}
                            name={"source"}
                            className={(errors.source)?styles.form_entry_err: styles.form_entry}
                            value={"Beehaz"}
                        >
                        </Field>
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"checkintime"}>
                        <div className={styles.form_title}>{"Check-in time: "}</div>
                        <Field
                            type={"time"}
                            name={"check-in"}
                            id={"checkInInp"}
                            className={styles.form_entry}
                            value={checkIn}
                            onChange={(e)=>(setCheckIn(e.target.value))}
                        />
                      </div>
                      <div className={`d-flex ${styles.form_wrapper}`} key={"checkouttime"}>
                        <div className={styles.form_title}>{"Check-out time: "}</div>
                        <Field
                            type={"time"}
                            name={"check-out"}
                            id={"checkOutInp"}
                            className={styles.form_entry}
                            value={checkOut}
                            onChange={(e)=>(setCheckOut(e.target.value))}
                        />
                      </div>
                    </Col>
                    <Col s={12} md={6} className={styles.wrapper}>
                      <h3 className={styles.header}>Guest Details</h3>
                      {guestForm.map((form) => {
                        const err = errors[form.name];
                        return (
                            <div className={`d-flex ${styles.form_wrapper}`} key={form.title}>
                              <div className={styles.form_title}>{form.title}</div>
                              {(guestDetail && guestDetail!=="" )? (
                                      <Field
                                          id={form.name}
                                          readOnly={true}
                                          value={defVal[form.name]}
                                          className={styles.form_entry}
                                      />
                                  ):
                                  (<>
                                        {(form.name==="country")?
                                            (<>
                                              <Select
                                                  id="contryselect"
                                                  options={countryList().getData()}
                                                  isClearable={true}
                                                  value={country}
                                                  className={styles.form_entry_select}
                                                  onChange={(val)=>setCountry(val)}
                                              />
                                            </>):(
                                                (form.name==="phoneNo")?(
                                                    <div className="p-0 m-0 w-100">
                                                      <PhoneInput
                                                          name="phoneNo"
                                                          country={'us'}
                                                          value={phoneNumber}
                                                          onChange={(value, data, event, formattedValue) =>
                                                          {
                                                            const rawVal=value.slice(data.dialCode.length);
                                                            setPhoneNumber(`+${data.dialCode} ${rawVal}`);
                                                          }}
                                                          inputStyle={{width: '100%'}}
                                                          countryCodeEditable={false}
                                                          enableSearch={true}
                                                          disableSearchIcon={true}
                                                      />
                                                    </div>
                                                ):(
                                                    <div className={`w-100`}>
                                                      <Field
                                                          id={form.name}
                                                          name={form.name}
                                                          className={err ? styles.form_entry_err : styles.form_entry}
                                                          value={form.value}
                                                          validate={(value)=>validate(form.name,value)}
                                                      />
                                                      <div className={err ? styles.form_error : styles.form_error_hidden}>{errors[form.name]}</div>
                                                    </div>
                                                )
                                            )}

                                      </>
                                  )}

                            </div>
                        );
                      })}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={`d-flex justify-content-center ${styles.button_group}`}>
                        <div>
                          <button type="submit" className={styles.settings_save}>
                            {'Save changes'}
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
                {/* {setTotalGuest(Number(values.adult) + Number(values.children))} }
            {populate ? setPrice((Number(values.adult)+Number(values.children))* Number(populate.dailyRate)) : setPrice(0)}
            {populate ? setTaxes([(Number(values.adult)+Number(values.children))* Number(populate.dailyRate)]* TAXRATE) : setPrice(0)}
            {populate ? setFinalPrice(
                ((Number(values.adult)+Number(values.children))* Number(populate.dailyRate))+
                ([(Number(values.adult)+Number(values.children))* Number(populate.dailyRate)]* TAXRATE)
                  )
                : setFinalPrice(0)} */}
                {setValues(values)}
                {setRental(values.rental)}
                {setGuestName(values.guestName)}
                {setCompany(values.company)}
                {setPrimaryEmail(values.primaryEmail)}
                {setSecondaryEmail(values.secondaryEmail)}
                {setStreetAddress(values.streetAddress)}
                {setPostalCode(values.postalCode)}
                {setStateProvince(values.stateProvince)}
                {setAddressDetail(values.addressDetails)}
                {setNationality(values.nationality)}
                {setLanguage(values.language)}
                {setNotes(values.notes)}
              </div>
          )}
        </Formik>
      </>
  );
}

export default BookingForm;
