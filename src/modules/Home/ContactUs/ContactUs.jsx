import React from 'react';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import Header from '../../Header/Header';
import styles from './../../Home/homeDesign.module.css';
import {Field, Form} from "formik";
import * as yup from "yup";
import {contactUs} from '../../../general_redux/actions';

function ContactUs(props){
    const dispatch = useDispatch();
    const contactUsSchema = yup.object().shape({
        firstName: yup.string().required('Your name is equired'),
        secondName: yup.string().required('Your name is equired'),
        emailAddress: yup.string().email('Please enter a valid email address').required('Email address is required'),
        message: yup.string().required('Your message is equired'),
    });

    const handleSubmit=(data)=> {
        const payload={
            firstName:data.firstName,
            lastName:data.secondName,
            email:data.emailAddress,
            message:data.message,
        }
        dispatch(contactUs(payload));
    }

    return(
        <div className={styles.mainLayout}>
            <Header/>
            <div className={`${styles.container} mt-4 w-100`}>
                <div className={styles.contactHeader}>
                    <h1>Contact Us</h1>
                    <div className={`${styles.alterContainer}`}>
                        <div className={styles.addressBox}>
                            <div className={styles.iconHead}>
                                  <span>Luzernstrasse 31 <br/> 6208 Oberkirch <br/> Switzerland</span>
                              <i className="fas fa-map-marker-alt"/>
                            </div>
                            <div className={styles.iconHead}>
                                <i className="fa fa-phone "/>
                                <span>Switzerland 123-456-7890 <br/> US:123-456-7890</span>
                            </div>
                            <div className={styles.iconHead}>
                                <i className="fa fa-envelope"/>
                                <span>admin@beehaz.com</span>
                            </div>
                        </div>
                        <div className={styles.inputArea}>
                            <div>
                                <Formik
                                    initialValues={{
                                        firstName:'',
                                        secondName: '',
                                        emailAddress: '',
                                        message: '',
                                    }}
                                    validationSchema={contactUsSchema}
                                    onSubmit={handleSubmit}
                                    validateOnBlur={false}
                                    validateOnChange={false}
                                >
                                    {({ errors, touched,values,handleSubmit,handleChange }) => (
                                        <Form className={styles.form_body}>
                                            <div className={`d-md-flex `  } >
                                                <div className={`${styles.form_wrapper} mr-md-2`}>
                                                    <div className={styles.form_title}>{"First name"}</div>
                                                    <Field
                                                        type={"text"}
                                                        name={"firstName"}
                                                        onChange={handleChange}
                                                        className={errors.firstName ? styles.form_entry_err : styles.form_entry}
                                                    />
                                                    <div className={errors.firstName ? styles.form_error : styles.form_error_hidden}>{errors.firstName}</div>
                                                </div>
                                                <div className={styles.form_wrapper}>
                                                    <div className={styles.form_title}>{"Second name"}</div>
                                                    <Field
                                                        type={"text"}
                                                        name={"secondName"}
                                                        onChange={handleChange}
                                                        className={errors.secondName ? styles.form_entry_err : styles.form_entry}
                                                    />
                                                    <div className={errors.secondName ? styles.form_error : styles.form_error_hidden}>{errors.secondName}</div>
                                                </div>
                                            </div>

                                            <div className={styles.form_wrapper}>
                                                <div className={styles.form_title}>{"Email"}</div>
                                                <Field
                                                    type={"email"}
                                                    name={"emailAddress"}
                                                    onChange={handleChange}
                                                    className={errors.emailAddress ? styles.form_entry_err : `w-100 ${styles.form_entry}`}
                                                />
                                                <div className={errors.emailAddress ? styles.form_error : styles.form_error_hidden}>{errors.emailAddress}</div>
                                            </div>
                                            <div className={styles.form_wrapper}>
                                                <div className={styles.form_title}>{"Message"}</div>
                                                <Field
                                                    type={"textarea"}
                                                    name={"message"}
                                                    as={"textarea"}
                                                    rows={3}
                                                    onChange={handleChange}
                                                    className={errors.message ? styles.form_entry_err : `w-100 ${styles.form_entry}`}
                                                />
                                                <div className={errors.message ? styles.form_error : styles.form_error_hidden}>{errors.message}</div>
                                            </div>
                                            <div >
                                                <button
                                                    className={`${styles.mainBut} mt-2 ml-auto`} type="submit">Send</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default ContactUs;