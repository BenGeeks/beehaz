import React, { useEffect, useState } from 'react';
import styles from '../editBooking.module.css';
import { Row, Col } from 'react-bootstrap';
import Loading from '../../../../../../../components/loading';
import { useDispatch,useSelector } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PhoneInput from 'react-phone-input-2';
import { editGuest } from '../../../../../../../general_redux/guest/actions';
import {isoCountries} from "../../../../../../../config/data/iso2Country";
import {getGuestByBooking} from "../../../../../../../general_redux/guest/actions";

const GuestDetails = (props) => {
  const phoneRegExp = /^[0-9-+\s()]*$/;
  const user= useSelector(({user})=>user && user.user);
  const actionForUpdateGuest = useSelector(({guests})=> guests && guests.actionForUpdateGuest);
  const guestDetails = useSelector(({guests})=>guests && guests.guestByBooking)[0];
  const dispatch = useDispatch();
  const countries = countryList().getData();

  const validationSchema=yup.object({
    name: yup.string().required(),
    company: yup.string(),
    emailId:yup.string().email('Invalid email').required(),
    secondaryEmailId :yup.string().email('Invalid email'),
    phoneNo:yup.string().matches(phoneRegExp, 'Only numbers, space, perenthesis, + and - are accepted.'),
    country:yup.array().nullable(),
    address: yup.string(),
    postalCode: yup.string(),
    state: yup.string(),
    nationality:yup.string(),
    language:yup.string(),
  });

  useEffect(()=>{
    if(actionForUpdateGuest.success){
      dispatch(getGuestByBooking(props.bookingId));
    }
  },[actionForUpdateGuest])

  const findArray = (val)=>{
    const ar=countryList().getData().filter((row)=>row.label===val);
    if(ar.length!==0){
      return ar[0];
    }
  }

  const findCountry=(val)=>{
    if(val){
      for (const key in isoCountries){
        if(isoCountries[key]===val){
          return key.toLocaleLowerCase();
        }
      }
    }else {
      return "us";
    }
  }
  const [country, setCountry] = useState((guestDetails.country)?
      findArray(guestDetails.country):findArray(user.country));

  const [code,setCode]=useState((guestDetails.country)?
      findCountry(guestDetails.country): findCountry(user.country));

  const guestForm = [
    { title: 'Name: ', name: 'name' },
    { title: 'Company: ', name: 'company' },
    { title: 'Email address: ', name: 'emailId' },
    { title: 'Secondary email: ', name: 'secondaryEmailId' },
    { title: 'Phone: ', name: 'phoneNo' },
    { title: 'Country: ', name: 'country' },
    { title: 'State: ', name: 'state' },
    { title: 'Address', name: 'address' },
    { title: 'Postal code: ', name: 'postalCode' },
    { title: 'Nationality: ', name: 'nationality' },
    { title: 'Language: ', name: 'language' },
  ];

  const handleSubmit = (data) => {
    const updatedData = { ...data,
      id:guestDetails.id,
      country: country? country.label:"",
      customerId:user.id,
      notes: guestDetails.notes,
    };
    dispatch(editGuest(updatedData));
  };

  const initialValues = {
    name: guestDetails.name,
    company: guestDetails.company? guestDetails.company:'',
    emailId: guestDetails.email_id,
    secondaryEmailId: guestDetails.secondary_email_id,
    phoneNo: guestDetails.phone_no,
    postalCode: guestDetails.postal_code,
    state: guestDetails.state,
    nationality: guestDetails.nationality,
    language: guestDetails.language,
    country: country,
    address: guestDetails.address,
  };

  return (
    <div>
      <Loading loadingStatus={actionForUpdateGuest.loading}/>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, errors, handleChange }) => (
            <Form className="p-3">
              <Row>
                <Col s={12} md={6} className={styles.wrapper}>
                  <div className="pb-2 d-flex flex-direction-column">
                    <div className={styles.subHeader}> Guest </div>
                    <div className={styles.toolTipIconContainer}>
                      <InfoOutlinedIcon
                        fontSize="small"
                        color="inherit"
                        data-tip
                        data-for="guest"
                        className={styles.toolTipIcon}
                      />
                      <ReactTooltip place="bottom" type="dark" id="guest" effect="solid" className={styles.toolTip}>
                        <span>
                          Changes to the guest here will affect the guest details saved to this guest. This is the
                          information you will find under the guest's name by clicking the 'Guests' in the left menu.
                        </span>
                      </ReactTooltip>
                    </div>
                  </div>
                  {guestForm.map((form) => {
                    const err = errors[form.name];
                    return (
                      <Row className={styles.form_wrapper} key={form.title}>
                        <div className={styles.form_title}>{form.title}</div>
                        <>
                          {form.name === 'country' ? (
                            <Select
                              id="countrySelect"
                              options={countries}
                              isClearable={true}
                              value={country}
                              name={"country"}
                              className={styles.form_entry_select}
                              onChange={(val) => setCountry(val)}
                            />
                          ) : form.name === 'phoneNo' ? (
                            <div className={styles.form_entry_phone}>
                              <PhoneInput
                                country={code}
                                name="phoneNo"
                                value={values.phoneNo}
                                onChange={(value, data) => {
                                  const rawVal = value.slice(data.dialCode.length);
                                  values.phoneNo = `+${data.dialCode} ${rawVal}`;
                                }}
                                inputStyle={{ width: '100%', borderRadius: '5',fontSize:'inherit'}}
                                countryCodeEditable={false}
                                enableSearch={true}
                                disableSearchIcon={true}
                              />
                            </div>
                          ) : (
                            <Field
                              id={form.name}
                              name={form.name}
                              type={"text"}
                              className={err ? styles.form_entry_err : styles.form_entry}
                              onChange={handleChange}
                            />
                          )}
                        </>
                        <div className={err ? styles.form_error : styles.form_error_hidden}>{errors[form.name]}</div>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
              <div className={`d-flex justify-content-center ${styles.button_group}`}>
                <div>
                  <button type="submit" className={styles.settings_save}>
                    Update changes
                  </button>
                </div>
              </div>
            </Form>
        )}
      </Formik>
    </div>
  );
};

export default GuestDetails;
