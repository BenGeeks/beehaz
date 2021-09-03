import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { addSubscriber } from '../../../general_redux/subscribers/actions';
import MailingForm from './MailingForm';
import * as yup from 'yup';

function MailingList(props) {
  const schemaMail = yup.object({
    firstName: yup.string().required(),
    emailId: yup.string().email().required(),
  });

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(addSubscriber(data));
    props.onHide();
  };
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Join our Mailing List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MailingForm schema={schemaMail} handleSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
}
export default MailingList;
