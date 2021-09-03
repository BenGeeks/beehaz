import React,{useState} from 'react';
import {Modal} from 'react-bootstrap';
import * as yup from 'yup';
import { withFormik } from 'formik';
import RentalForm from "./RentalForm";
import countryList from "react-select-country-list";
import {currencies} from "../../../../../../config/data/currencies";

import styles from '../../rentals.module.css';
import {useSelector} from "react-redux";

function AddRental(props){
    const initValue=props.value;
    const groups = useSelector(({rentals}) => rentals && rentals.groups);
    const user = useSelector(({user})=> user && user.user);

    const findArray = (field,val)=>{
        if(field==="country"){
            const ar=countryList().getData().filter((row)=>row.label===val);
            return ar[0];
        }
        if(field==="currency"){
            const ar=currencies.filter((row)=>row.label===val);
            return ar[0];
        }
    }
    const findGroupID=()=>{
        if(groups){
            const grp= groups.filter((row)=>row.groupName==="Default");
            if(grp && grp.length!==0){
                return grp[0].id;
            }else{
                return "";
            }
        }
    }
    const handleSubmit=(data)=>{
        const payload={
            id:(props.value)?props.value.id :undefined,
            name: data.name,
            postalCode: data.postalCode,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            country: (data.country)?data.country.label:"",
            groupId: data.groupId,
            maxGuests: data.maxGuests,
            currency: (data.currency)?data.currency.label:"",
            checkInTime:data.checkInTime,
            checkOutTime:data.checkOutTime,
        }
        if(props.value){
            props.onEdit(payload);
        }else{
            props.onHide(payload);
        }
    }

    const defaultCountry =  { label: user.country, value: user.country};
    const defaultCurrency = { label:user.currency,value:user.currency};
    const FormikEnhancer = withFormik({
        validationSchema:yup.object({
            name: yup.string().required().test('len', 'Must be less than 50 characters', val => (val && val.length <= 50)),
            addressLine1: yup.string(),
            addressLine2: yup.string().nullable(),
            postalCode: yup.string(),
            currency:yup.array().nullable(),
            country:yup.array().nullable(),
            groupId:yup.number(),
            maxGuests:yup.number().required(),
            checkInTime:yup.string(),
            checkOutTime:yup.string(),
        }),
        validateOnBlur:false,
        validateOnChange:false,
        mapPropsToValues: (props)=>({
            name: (initValue)?initValue.name:"",
            addressLine1: (initValue)?initValue.addressLine1:"",
            addressLine2: (initValue)? initValue.addressLine2:"",
            postalCode: (initValue)?initValue.postalCode:"",
            currency:(initValue)?{value:initValue.currency,
                label:initValue.currency}: defaultCurrency,
            country:(initValue)? {value:initValue.country,
            label:initValue.country}: defaultCountry,
            groupId:(initValue)?initValue.groupId:findGroupID(),
            maxGuests:(initValue)?initValue.maxGuests:"",
            checkInTime:(initValue)?initValue.checkInTime:user.checkInTime,
            checkOutTime:(initValue)?initValue.checkOutTime:user.checkOutTime,
        }) ,
        handleSubmit :  (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          } ,
        displayName: 'RentalForm',
      })(RentalForm);

    return(
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add/edit rental
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.deleteModalBody}>
                <FormikEnhancer/>
            </Modal.Body>
        </Modal>
    )
}
export default AddRental;