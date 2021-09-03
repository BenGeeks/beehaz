import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import styles from "../../modules/view/Components/UserSetting/usersetting.module.css";

function ConfirmMessage(props){
    return(
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={styles.modalHeader}>
                   {props.confirmHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.deleteModalBody}>
                <p>
                    {props.confirmBody}
                </p>
            </Modal.Body>
            <div className={styles.modalFooter}>
                <button onClick={props.onHide} className={styles.savBtn}>Cancel</button>
                <button onClick={props.onConfirmAct} className={styles.delBtn}>Delete</button>
            </div>
        </Modal>
    )
}
export default ConfirmMessage;