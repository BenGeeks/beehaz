import React from 'react';
import {Modal} from 'react-bootstrap';
import * as yup from 'yup';

import styles from '../../../../Rentals/rentals.module.css';
import FeeForm from './FeeForm';

function AddFee(props){
  const schemaFee = yup.object({
    rentalId: yup.number().required(),
    name: yup.string().required(),
    feeType: yup.string().required(),
    amount: yup.string().required(),
    modality: yup.string().required()
  });

  const handleSubmit=(data)=>{
    if(props.viewForEdit){
      props.onEdit({...data,id: props.viewForEdit.id});
    }else{
      props.onEdit({...data, rentalId: parseInt(data.rentalId)});
    }
  }
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
            Add/Edit Fee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <FeeForm
         schema={schemaFee}
         handleSubmit={handleSubmit}
         initValue={(props.viewForEdit) ? props.viewForEdit: false}
         properties={props.properties}
        />
      </Modal.Body>
    </Modal>
    )
}
export default AddFee;