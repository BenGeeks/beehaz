import React from 'react';
import {Button,Form} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import styles from '../../guest.module.css';
import 'react-phone-input-2/lib/style.css'

import MySelect from "../../../Rentals/components/AddEditRental/MySelect";
import countryList from "react-select-country-list";

function AddGuestForm({
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
    }){
        return (
            <Form onSubmit={handleSubmit} className="p-3">
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Guest name: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={handleChange}
                            isInvalid={!!errors.name }
                            value={values.name}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Company: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="company"
                            onChange={handleChange}
                            isInvalid={!!errors.company }
                            value={values.company}
                            //defaultValue={(initValue)?initValue.company:""}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Primary email: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="emailId"
                            onChange={handleChange}
                            isInvalid={!!errors.emailId }
                            value={values.emailId}
                            style={{fontSize:'inherit'}}
                            //defaultValue={(initValue)?initValue.emailId:""}
                        />
                        <Form.Control.Feedback type="invalid">{errors.emailId}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Secondary email: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="secondaryEmailId"
                            onChange={handleChange}
                            isInvalid={!!errors.secondaryEmailId }
                            value={values.secondaryEmailId}
                            style={{fontSize:'inherit'}}
                            //defaultValue={(initValue)?initValue.secondaryEmailId:""}
                        />
                        <Form.Control.Feedback type="invalid">{errors.secondaryEmailId}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Phone number: </Form.Label>
                    <div className="col-md-3">
                        <PhoneInput
                            country={values.code}
                            name="phoneNo"
                            value={values.phoneNo}
                            onChange={(value, data, event, formattedValue) =>
                            {
                                const rawVal=value.slice(data.dialCode.length);
                                values.phoneNo= `+${data.dialCode} ${rawVal}`}}
                            inputStyle={{width: '100%'}}
                            countryCodeEditable={false}
                            enableSearch={true}
                            disableSearchIcon={true}
                         />
                        <Form.Control.Feedback type="invalid">{errors.phoneNo}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Select country: </Form.Label>
                    <div className={"col-md-3"}>
                        <MySelect
                            value={values.country}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            error={errors.country}
                            touched={touched.country}
                            optionArray={countryList().getData()}
                            optFor={"country"}
                        />
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">State: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="state"
                            onChange={handleChange}
                            isInvalid={!!errors.state }
                            value={values.state}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Postal code: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="number"
                            name="postalCode"
                            onChange={handleChange}
                            isInvalid={!!errors.postalCode }
                            value={values.postalCode}
                            style={{fontSize:'inherit'}}
                            //defaultValue={(initValue)?initValue.postalCode:""}
                        />
                        <Form.Control.Feedback type="invalid">{errors.postalCode}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Nationality: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="nationality"
                            onChange={handleChange}
                            isInvalid={!!errors.nationality }
                            value={values.nationality}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Language: </Form.Label>
                    <div className="col-md-3">
                        <Form.Control
                            type="text"
                            name="language"
                            onChange={handleChange}
                            isInvalid={!!errors.language }
                            value={values.language}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className="pb-2">
                    <Form.Label className="col-sm-2 col-md-3 col-xl-2 col-form-label">Notes:</Form.Label>
                    <div className="col-md-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            name="notes"
                            onChange={handleChange}
                            value={values.notes}
                            style={{fontSize:'inherit'}}
                        />
                        <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
                    </div>
                </Form.Row >
                <br />
                <div >
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className={styles.savBtn}
                    >Save changes</Button>
                </div>
            </Form>
        );

}

export default AddGuestForm;
