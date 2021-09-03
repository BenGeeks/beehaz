import React from 'react';
import { Form,InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import styles from '../../../rates.module.css';

function TaxForm(props){
    const {schema,handleSubmit,options} = props;
    return(
        <>
            <Formik
            validationSchema={schema}
            initialValues={(props.initValue) ? props.initValue:{
              rentalSelection: '',
              tax_name: '',
              tax_type: '',
              amount: '',
            }}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
        {({ 
         errors,handleChange,handleSubmit,touched,initialValues
        }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Select rental or group:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                    <Form.Control
                      as="select"
                      name="rentalSelection"
                      onChange={handleChange}
                      isInvalid={!!errors.rentalSelection}
                      className={styles.form_entry}
                    >
                    {options.map((opt)=>(<option key={opt} selected={initialValues.rentalSelection===opt}>{opt}</option>))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.rentalSelection}</Form.Control.Feedback>
                  </div>
              </Form.Row>
              <br/>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Name of tax:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                  <Form.Control
                    type="text"
                    name="tax_name"
                    onChange={handleChange}
                    isInvalid={!!errors.tax_name }
                    defaultValue={initialValues.tax_name}
                    className={styles.form_entry}
                  />
                  <Form.Control.Feedback type="invalid">{errors.tax_name}</Form.Control.Feedback>
                  </div>
              </Form.Row>
              <br/>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Type of tax:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                  <Form.Check
                    inline
                    name="tax_type"
                    label="percentage"
                    id={"percentage"}
                    onChange={handleChange}
                    value="percentage"
                    type="radio"
                    defaultChecked={initialValues.tax_type==="percentage"}
                  />
                  <Form.Check
                    inline
                    name="tax_type"
                    label="flat USD"
                    id={"flat USD"}
                    onChange={handleChange}
                    value="flatUSD"
                    type="radio"
                    defaultChecked={initialValues.tax_type==="flatUSD"}
                  />
                  <div style={{fontSize:'0.8em',color:'#dc3545',padding:'0em'}}>{errors.tax_type}</div>
                  </div>
              </Form.Row>
              <br/>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Amount:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="number"
                      name="amount"
                      onChange={handleChange}
                      isInvalid={!!errors.amount}
                      defaultValue={initialValues.amount}
                      className={styles.form_entry}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2" className={styles.form_entry}>$</InputGroup.Text>
                    </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                  </InputGroup>
                  </div>
              </Form.Row>
              <br/>
              <div className='p-2 d-flex justify-content-center'>
                  <div className='col-md-8 d-flex justify-content-around'>
                      <button  type="submit" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} >Save</button>
                      <button type="reset" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} style={{backgroundColor:"#6c757d"}} >Discard</button>
                  </div>
              </div>
          </Form>
        )}
        </Formik>
        </>
    )
}

export default TaxForm;