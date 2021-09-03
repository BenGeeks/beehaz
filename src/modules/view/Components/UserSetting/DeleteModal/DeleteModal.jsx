import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import styles from '../usersetting.module.css';

function DeleteModal(props){
    return(
        <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete your account?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <p>
            Deleting your account is permanent and will remove all content including bookings 
            and profile settings. This action cannot be undone. 
            Are you sure you want to delete your account?
        </p>
      </Modal.Body>
      <div className={styles.modalFooter}>
        <Button variant="danger" onClick={props.onHide}>Delete Account</Button>
      </div>
    </Modal>
    )
}
export default DeleteModal;