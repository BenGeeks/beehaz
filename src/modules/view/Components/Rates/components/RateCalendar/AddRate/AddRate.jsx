import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { Modal } from 'react-bootstrap';
import RateForm from './RateForm'
import * as yup from 'yup';
import {setSpecialRate} from '../../../../../../../general_redux/rates/actions';

function AddRate({show, onHide}) {
  const dispatch=useDispatch();
  const schemaRate = yup.object({
    multiRentals:yup.array().required("Please select a rental!"),
    dateFrom: yup.date().required("Date from is required field!"),
    dateTo: yup.date().required("Date to is a required field!"),
    rate: yup.number(),
    minStay: yup.number(),
  });

  const testDate=(day,list)=>{
    return list.some(d=>d.day===day);
  }

  const updatedSubmit = ( data )=>{
    let appDate=[];
    let payload=[];
    let diff=moment(data.dateRange.dateTo).diff(moment(data.dateRange.dateFrom),'days');
    for (let i = 0; i <=diff ; i++) {
      const tmpDate=moment(data.dateRange.dateFrom).add(i,'days');
      const days=data.multiDays.filter((val)=>val.status===true);
      if(testDate(tmpDate.format('ddd'),days)){
        appDate.push(tmpDate.format('YYYY-MM-DD'));
      }
    }
    data.multiRentals.forEach((row)=>{
      appDate.forEach((dayEntry)=>{
        payload.push({
          rentalId:row.value,
          changeDate:dayEntry,
          dailyRate:(data.rate!=="")?data.rate:0,
          minimumStayRequirement:(data.minStay!=="")?data.minStay:1,
        })
      })
    })
    // console.log(payload);
    dispatch(setSpecialRate(payload));
  }

  return (
    <Modal 
      show = {show}
      onHide = {onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Set rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RateForm
          schema = {schemaRate}
          updatedSubmit = {updatedSubmit}
        />
      </Modal.Body>
    </Modal>
  );
}

export default AddRate;
