import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import styles from '../../../UserSetting/usersetting.module.css';

function WelcomeModal(props){
    return(
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to Bee Haz!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.deleteModalBody}>
                <p>
                    To help you get started, we created your first rental.
                    Click the rental menu to edit, add or remove rentals.
                </p>
                <p>
                    Set up your rentals, your rates and start adding bookings!
                </p>
                <p>
                    If you have any questions, or want a guide to get started, click the help icon on the top menu.
                </p>
                <p>
                    If you prefer exploring on your own, just close this box and happy hosting!
                </p>
            </Modal.Body>
            <div className={styles.modalFooter}>
                <button onClick={props.onHide} className={styles.savBtn}>Getting started</button>
            </div>
        </Modal>
    )
}
export default WelcomeModal;