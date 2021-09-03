import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import styles from './confirmChange.module.css';

function ConfirmChange(props){
    return(
        <>
            <Modal
                show={props.show}
                size={"sm"}
                onHide={props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName={styles.customDialg}
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
                    <button className={styles.savBtn} onClick={props.onConfirm}>Sync</button>
                    <button className={styles.delBtn} onClick={props.onDiscard}>Discard</button>
                </div>
            </Modal>
        </>
    )
}

export default ConfirmChange;