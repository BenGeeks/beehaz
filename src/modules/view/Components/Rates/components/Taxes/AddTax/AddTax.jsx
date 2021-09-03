import React from 'react';
import {Modal} from 'react-bootstrap';
import * as yup from 'yup';

import styles from '../../../../Rentals/rentals.module.css';
import TaxForm from './TaxForm';


function AddTax(props){
  
  const schemaTax = yup.object({
    rentalSelection: yup.string().required(),
    tax_name: yup.string().required(),
    tax_type: yup.string().required(),
    amount: yup.string().required(),
  });

  const optionsSelect=['---Select---','Rental 1','Rental 2','Rental 3'];

  const handleSubmit=(data)=>{
    if(props.viewforedit){
      props.onEdit({...data,id: props.viewforedit.id});
    }else{
      props.onEdit({...data,id: Date.now()});
    }
  }
    return(
        <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add New Tax
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <TaxForm
          schema={schemaTax}
          options={optionsSelect}
          handleSubmit={handleSubmit}
          initValue={(props.viewforedit) ? props.viewforedit: false}
        />
      </Modal.Body>
    </Modal>
    )
}
export default AddTax;