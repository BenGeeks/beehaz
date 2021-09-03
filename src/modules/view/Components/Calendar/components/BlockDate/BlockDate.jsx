import React, { useState } from 'react';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import styles from './blockdate.module.css';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

function AddBlockDate({handleSave, initValues, handleEdit, isEdit}) {
  const rentals = useSelector(({ rentals }) => rentals && rentals.rentals);

  //=============================================
  // SCHEMA REQUIREMENT FOR FORM VALIDATION
  //=============================================
  const BlockDateSchema = yup.object().shape({
    eventName: yup.string().test('len', 'Must be less than 50 characters', val => (val===undefined || (val && (val.length===0 || val.length<=50)))),
    arrival: yup.date().required('Required'),
    departure: yup.date().required('Required'),
  });

  const initialValues = {
    rental:isEdit? initValues.rentalId : '',
    eventName: isEdit ? initValues.title : '',
    arrival: isEdit ? initValues.arrive : '',
    departure: isEdit ? initValues.depart : '',
  }

  //=============================================
  // Handle Save
  //=============================================

  function handleSubmit(data) {
    const payload = {
      id: (isEdit)? initValues.id: undefined,
      bookingType: 'blockdates',
      rentalId: Number(data.rental),
      title: (data.eventName!=="")?data.eventName:"Blocked",
      arrive: data.arrival,
      depart: data.departure,
      checkInTime:"10:00",
      checkOutTime:"20:00",
      noOfAdults:0,
      noOfGuests:0,
      noOfChildren:0,
      source:"Beehaz",
      tax:0,
      price:0,
      color: "grey",
      paymentStatus:"Paid",
      nights:moment(data.departure,"YYYY-MM-DD").diff(moment(data.arrival,"YYYY-MM-DD"),'day'),
      status:"Booked",
      notes:'',
    }
    isEdit ? handleEdit(payload) : handleSave(payload);
  }

  //=============================================

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add event/block dates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={BlockDateSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => {
            const today = moment().format('YYYY-MM-DD');
            return (
              <>
                <Form>
                  <div className={styles.form_wrapper}>
                    <div className={styles.form_title}>Select rental: </div>
                    <Field
                      as="select"
                      name="rental"
                      className={errors.rental && touched.rental ? styles.form_entry_err : styles.form_entry}
                    > <option key={""} value={""}>{""}</option>
                      {rentals && rentals.map((r) => <option key={r.id} value={r.id} >{r.name}</option>)}
                    </Field>
                    <div className={errors.rental && touched.rental ? styles.form_error : styles.form_error_hidden}>
                      {errors.rental}
                    </div>
                  </div>

                  <div className={styles.form_wrapper}>
                    <div className={styles.form_title}>Name of event: </div>
                    <Field
                      name="eventName"
                      className={styles.form_entry}
                    />
                    <div className={errors.eventName && touched.eventName ? styles.form_error : styles.form_error_hidden}>
                      {errors.eventName}
                    </div>
                  </div>
                  <div className={styles.form_wrapper}>
                    <div className={styles.form_title}>Arrival date: </div>
                    <Field
                      type="date"
                      name="arrival"
                      className={errors.arrival && touched.arrival ? styles.form_entry_err : styles.form_entry}
                      max={values.departure}
                    />
                    <div className={errors.arrival && touched.arrival ? styles.form_error : styles.form_error_hidden}>
                      {errors.arrival}
                    </div>
                  </div>

                  <div className={styles.form_wrapper}>
                    <div className={styles.form_title}>Departure date: </div>
                    <Field
                      type="date"
                      name="departure"
                      className={errors.departure && touched.departure ? styles.form_entry_err : styles.form_entry}
                      min={values.arrival}
                    />
                    <div
                      className={errors.departure && touched.departure ? styles.form_error : styles.form_error_hidden}
                    >
                      {errors.arrival}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className={styles.settings_save} type="submit">
                      Save changes
                    </button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal.Body>
    </>
  );
}

export default AddBlockDate;
