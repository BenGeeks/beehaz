import React from 'react';
import { Form,InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import styles from '../../../rates.module.css';

function FeeForm({schema, handleSubmit, properties, initValue}){
    return(
        <>
        <Formik
            validationSchema={schema}
            initialValues={initValue ? initValue : {
              name: '',
              amount: '',
              feeType: '',
              modality: '',
              rentalId: ''
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
                  <Form.Label className="col-sm-4 col-form-label">Select rental or group:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                    <Form.Control
                      as="select"
                      name="rentalId"
                      onChange={handleChange}
                      isInvalid={!!errors.rentalId}
                      disabled={initValue}
                      className={styles.form_entry}
                      defaultValue={initialValues.rentalId}
                    >
                    {!initValue && <option> -- Select -- </option>}
                    {properties.map((property) => <option key={property.id} value={property.id}>{property.name}</option>)}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.rentalId}</Form.Control.Feedback>
                  </div>
              </Form.Row>
              <br/>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Name of fee:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleChange}
                      isInvalid={!!errors.Name }
                      defaultValue={initialValues.name}
                      className={styles.form_entry}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </div>
              </Form.Row>
              <br/>
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Type of fee:</Form.Label>
                  <div className="col-md-5 col-lg-6">
                    <Form.Check
                      inline
                      name="feeType"
                      label="percentage"
                      id={"percentage"}
                      onChange={handleChange}
                      value="percentage"
                      type="radio"
                      defaultChecked={initialValues.feeType==="percentage"}
                    />
                    <Form.Check
                      inline
                      name="feeType"
                      label="flat USD"
                      id={"flat USD"}
                      onChange={handleChange}
                      value="flatUSD"
                      type="radio"
                      defaultChecked={initialValues.feeType==="flatUSD"}
                    />
                  <div style={{fontSize:'0.8em',color:'#dc3545',padding:'0em'}}>{errors.feeType}</div>
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
              <Form.Row>
                  <Form.Label className="col-sm-4 col-form-label">Modality:</Form.Label>
                  <div className="col-md-8">
                 
                  <Form.Check
                    inline
                    name="modality"
                    label="per stay"
                    id={"perStay"}
                    onChange={handleChange}
                    value="perstay"
                    type="radio"
                    defaultChecked={initialValues.modality==="perstay"}
                  />
                  <Form.Check
                    inline
                    name="modality"
                    label="per night"
                    id={"perNight"}
                    onChange={handleChange}
                    value="pernight"
                    type="radio"
                    defaultChecked={initialValues.modality==="pernight"}
                  />
                   <Form.Check
                    inline
                    name="modality"
                    label="per person"
                    id={"perPerson"}
                    onChange={handleChange}
                    value="perperson"
                    type="radio"
                    defaultChecked={initialValues.modality==="perperson"}
                  />
                  <Form.Check
                    inline
                    name="modality"
                    label="per person per night"
                    id={"pppn"}
                    onChange={handleChange}
                    value="pppn"
                    type="radio"
                    defaultChecked={initialValues.modality==="pppn"}
                  />
                  <div style={{fontSize:'0.8em',color:'#dc3545',padding:'0em'}}>{errors.modality}</div>
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

export default FeeForm;