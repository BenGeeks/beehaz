import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './aboutUs.module.css';

function AboutUS(props) {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">About Us</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <p>BeeHaz was created by property managers for property managers.</p>
        <p>
          We at BeeHaz believe the rental management solutions in the market today are either lacking important features
          or are too expensive for small and medium companies. Our goal is to fix that: bring the features property
          managers need for a fair price.
        </p>
        <p>
          We started out development process in January 2021 and shall launch our Beta Version in March 2021. Make
          yourself heard and join our efforts to create the software that meets your needs and that will speed up your
          administrative processes so you can have time to focus on your rental and your customers!
        </p>
      </Modal.Body>
      <div className={styles.mainFooter}>
        <button onClick={props.onHide} className={styles.styleBtn} onClick={props.setMailModal}>
          Join Mailing List
        </button>
        <button onClick={props.onHide} className={styles.styleBtn} onClick={props.setViewContactUs}>
          Contact us
        </button>
      </div>
    </Modal>
  );
}

export default AboutUS;
