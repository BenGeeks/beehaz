import React from 'react';
import {Form} from 'react-bootstrap';
import { Formik } from 'formik';
import styles from './container.module.css';

function MailingForm(props){
    const {schema,handleSubmit} = props;
    return(
        <>
            <Formik
                validationSchema={schema}
                initialValues={(props.initValue)? props.initValue : {
                    firstName: '',
                    emailId: '',
                }}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      errors, handleChange, handleSubmit, initialValues
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Label className="col-sm-4 col-form-label">Full name:</Form.Label>
                            <div className="col-md-8">
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    isInvalid={!!errors.firstName }
                                    defaultValue={initialValues.firstName}
                                    style={{fontSize:'inherit'}}
                                />
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </div>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="col-sm-4 col-form-label">Email address:</Form.Label>
                            <div className="col-md-8">
                                <Form.Control
                                    type="email"
                                    name="emailId"
                                    onChange={handleChange}
                                    isInvalid={!!errors.emailId }
                                    defaultValue={initialValues.emailId}
                                    style={{fontSize:'inherit'}}
                                />
                                <Form.Control.Feedback type="invalid">{errors.emailId}</Form.Control.Feedback>
                            </div>
                        </Form.Row>
                        <br/>
                        <div className={`p-2 d-flex justify-content-center`}>
                            <button type="submit" className={styles.joinBtn}>Join!</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default MailingForm;