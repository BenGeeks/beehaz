import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './contactus.module.css';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

function ContactUs(props) {
  const contactUsSchema = yup.object().shape({
    name: yup.string().required('Your name is equired'),
    emailAddress: yup.string().email('Please enter a valid email address').required('Email address is required'),
    message: yup.string().required('Your message is equired').max(150, 'Your message is too Long!'),
  });

  const contactUsForm = [
    { title: 'Name: ', name: 'name', typ: 'text' },
    { title: 'Email address: ', name: 'emailAddress', type: 'email' },
    { title: 'Message: ', name: 'message', type: 'textarea', as: 'textarea', rows: '4' },
  ];

  function handleSubmit(data) {
    console.log(data);
    props.onHide();
  }

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.deleteModalBody}>
        <Formik
          initialValues={{
            name: '',
            emailAddress: '',
            message: '',
          }}
          validationSchema={contactUsSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form_body}>
              {contactUsForm.map((form) => {
                const err = errors[form.name] && touched[form.name];
                return (
                  <div className={styles.form_wrapper}>
                    <div className={styles.form_title}>{form.title}</div>
                    <Field
                      type={form.type}
                      name={form.name}
                      as={form.as}
                      rows={form.rows}
                      className={err ? styles.form_entry_err : styles.form_entry}
                    />
                    <div className={err ? styles.form_error : styles.form_error_hidden}>{errors[form.name]}</div>
                  </div>
                );
              })}
              <div className={`d-flex justify-content-center `}>
                <button className={styles.form_submit} type="submit">
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ContactUs;
