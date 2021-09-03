import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as yup from 'yup';

import DefaultChangeForm from './DefaultChangeForm';
import { editBulkDefault } from '../../../../../../general_redux/rates/actions';
import styles from '../../../Rentals/rentals.module.css';

function BulkDefaultChange(props) {
  const dispatch = useDispatch();
  const rates = useSelector(({ rates }) => rates && rates.rateSettings);

  const schemaDefaultRate = yup.object({
    multiRentals: yup.array(),
    dailyRate: yup.number(),
    minStay: yup.number(),
  });

  const rentals = useSelector(({ rentals }) => rentals && rentals.rentals);

  const handleSubmit = (data,selectedData) => {
    const payload=[];
    selectedData.forEach((rental)=>{
      if(rental.value==="default"){
        payload.push({
          default:{
            minimumStayRequirement: (data.minStay===""?null:data.minStay),
            dailyRate: (data.dailyRate===""?null :data.dailyRate)
          }
        })
      }else{
        payload.push({
          rentalId: rental.value,
          minimumStayRequirement: (data.minStay===""?null:data.minStay),
          dailyRate: (data.dailyRate===""?null :data.dailyRate)
        })
      }
    })
    dispatch(editBulkDefault(payload));
    props.onHide();
  };

  const getOptions= ()=>{
    const tmp=[];
    tmp.push({
      value: "default",
      label:"New Rentals"
    });
    rentals.map((row) => (tmp.push({ value: row.id, label: row.name })));
    return tmp;
  }
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Set default rates</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <DefaultChangeForm
          schema={schemaDefaultRate}
          handleSubmit={handleSubmit}
          options={getOptions()}
          rateList={props.rateList}
        />
      </Modal.Body>
    </Modal>
  );
}
export default BulkDefaultChange;
