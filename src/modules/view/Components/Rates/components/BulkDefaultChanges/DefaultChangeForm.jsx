import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import styles from '../../rates.module.css';
import MultiSelect from './MultiSelect';

function DefaultChangeForm({ schema, options, rateList, handleSubmit }) {
  const [selectedRates, setSelectedRates] = useState([]);

  const initValue = {
    multiRentals:[],
    dailyRate: '',
    minStay: '',
  };

  const updatedSubmit=(data)=>{
    handleSubmit(data,selectedRates);
  }

  const resetForm=(handleReset)=>{
    handleReset();
    setSelectedRates([]);
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={initValue}
        onSubmit={updatedSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {({ errors, handleReset,handleChange, handleSubmit, initialValues }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Label className={`col-md-7 col-lg-4 col-form-label ${styles.form_label}`}>Select rental*: </Form.Label>
                    <div className={"col-md-5 col-lg-6"}>
                        <MultiSelect
                          options={options}
                          value={selectedRates}
                          name="multiRentals"
                          onChange={setSelectedRates}
                        />
                    </div>
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Label className={`col-md-7 col-lg-4 col-form-label ${styles.form_label}`}>
                Set default rate*:
              </Form.Label>
              <div className="col-md-5 col-lg-6">
                <Form.Control
                  type="number"
                  name="dailyRate"
                  min={0}
                  onChange={handleChange}
                  isInvalid={!!errors.dailyRate}
                  defaultValue={initialValues.dailyRate}
                  className={styles.form_entry}
                />
                <Form.Control.Feedback type="invalid">{errors.dailyRate}</Form.Control.Feedback>
              </div>
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Label className={`col-md-7 col-lg-4 col-form-label ${styles.form_label}`}>
                Set default min. stay requirement*:
              </Form.Label>
              <div className="col-md-5 col-lg-6">
                <Form.Control
                  type="number"
                  name="minStay"
                  min={0}
                  onChange={handleChange}
                  isInvalid={!!errors.minStay}
                  defaultValue={initialValues.minStay}
                  className={styles.form_entry}
                />
                <Form.Control.Feedback type="invalid">{errors.minStay}</Form.Control.Feedback>
              </div>
            </Form.Row>
            <br />
              <div className='p-2 d-flex justify-content-center'>
                  <div className='col-md-8 d-flex justify-content-around'>
                      <button  type="submit" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} >Save</button>
                      <button type="reset" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} style={{backgroundColor:"#6c757d"}} onClick={()=>resetForm(handleReset)} >Discard</button>
                  </div>
              </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default DefaultChangeForm;
