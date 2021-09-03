import React,{useState} from 'react';
import * as yup from 'yup';
import { withFormik } from 'formik';
import countryList from "react-select-country-list";
import AddGuestForm from './AddGuestForm';
import GuestBookingList from '../List/GuestBookingList';
import GuestInvoiceList from '../List/GuestInvoiceList';
import styles2 from '../../guest.module.css';
import {useSelector} from "react-redux";
import {isoCountries} from "../../../../../../config/data/iso2Country";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function AddGuests(props){
    const initValue=props.value;
    const [currentTab,setCurrentTab]=useState("Guest Details");
    const tabs=["Guest Details","Bookings","Invoices"];
    const user= useSelector(({user})=>user && user.user);

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
        }else{
            return "us";
        }
    }
    const handleSubmit=(data)=>{
        const payload={
            id:(props.value)?props.value.id :undefined,
            name: data.name,
            emailId:data.emailId,
            phoneNo:data.phoneNo,
            customerId:(!props.value)?user.id:undefined,
            postalCode: data.postalCode,
            secondaryEmailId: data.secondaryEmailId,
            country: (data.country)?data.country.label:"",
            address: data.address,
            maxGuests: data.maxGuests,
            state:data.state,
            nationality:data.nationality,
            language:data.language,
            company:data.company,
            notes:data.notes
        }
        props.onSubmit(payload);
    }

    const phoneRegExp = /^[0-9-+\s()]*$/;

    const FormikEnhancer = withFormik({
        validationSchema:yup.object({
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
            notes:yup.string(),
            code:yup.string(),
        }),
        mapPropsToValues: (props)=>({
            name: (initValue)?initValue.name:"",
            company: (initValue)?initValue.company:"",
            emailId: (initValue)?initValue.emailId:"",
            secondaryEmailId: (initValue)? initValue.secondaryEmailId:"",
            phoneNo: (initValue)?initValue.phoneNo:"",
            postalCode: (initValue)?initValue.postalCode:"",
            country:(initValue)? findArray(initValue.country):findArray(user.country),
            address:(initValue)?initValue.address:"",
            nationality: (initValue)?initValue.nationality:"",
            state:(initValue)?initValue.state:"",
            language:(initValue)?initValue.language:"",
            notes:(initValue)?initValue.notes:"",
            code:(initValue)?findCountry(initValue.country):findCountry(user.country),
        }) ,
        validateOnBlur:false,
        validateOnChange:false,
        handleSubmit :  (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          } ,
        displayName: 'AddGuestForm',
      })(AddGuestForm);

    return(
      <>
          <div className={styles2.upperRow}>
              <a className={`${styles2.tabBox} ${styles2.tabButton}`} onClick={props.onHide}>
                  <span >
                      <ArrowBackIosIcon className={styles2.arrowIcon} />{"Back"}
                  </span>
              </a>
              {tabs.length!==0 && tabs.map((tab,index)=>(
                  <a className={(currentTab===tab)?`${styles2.tabBox} ${styles2.active}`:`${styles2.tabBox}`} key={index} onClick={()=>setCurrentTab(tab)}>
                      {tab}
                  </a>
              ))}

          </div>
          <div style={{margin:'0em 1em'}}>
              {currentTab==="Guest Details" && (
                  <FormikEnhancer/>
              )}
              {currentTab==="Bookings" && (
                  <GuestBookingList id={initValue? initValue.id:"1"}/>
              )}
              {currentTab==="Invoices" && (
                  <GuestInvoiceList/>
              )}
          </div>

      </>
    )
}
export default AddGuests;