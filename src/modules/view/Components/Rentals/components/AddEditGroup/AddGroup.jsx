import React from 'react';
import { Modal } from 'react-bootstrap';
import GroupForm from './GroupForm';
import * as yup from 'yup';

import styles from '../../rentals.module.css';

function AddGroup(props) {
  const schemaGroup = yup.object({
    color: yup.string().required(),
    groupName: yup.string().required(),
  });
  const handleSubmit = (data) => {
    if (!props.value) {
      props.onHide(data);
    } else {
      props.onEdit(data);
    }
  };
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add/edit group</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <GroupForm schema={schemaGroup} handleSubmit={handleSubmit} initValue={props.value ? props.value : false} />
      </Modal.Body>
    </Modal>
  );
}
export default AddGroup;
