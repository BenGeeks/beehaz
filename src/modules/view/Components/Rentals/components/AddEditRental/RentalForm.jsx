import React, { useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import { toast } from 'react-toastify';

import {useSelector} from 'react-redux';
import MySelect from "./MySelect";
import {currencies} from "../../../../../../config/data/currencies";
import countryList from "react-select-country-list";
import ModalButton from "../../../../../../components/ModalButton";

function RentalForm(props){
    const options_groups = useSelector(({rentals}) => rentals && rentals.groups);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        setFieldTouched
    } = props;

    const [count, setCount] = useState(0);
    const guestWarning = document.getElementById("guestWarning");
    function maxGuestsWarning() { if (guestWarning) {(guestWarning.value >= 10) && setCount(count + 1)}};
    useEffect( () => {
        count === 1 && toast.warn(`Maximum number of guests ${guestWarning.value}. Are you sure ${guestWarning.value} persons can stay in this single rental unit?`
        ,{
            style:{
                color:'#484848'
            }
        });
    }, [count]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row className="py-1 ">
                <Form.Label className="col-sm-4 col-form-label">Rental name*: </Form.Label>
                <div className="col-md-8 col-lg-6">
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
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">Street and no: </Form.Label>
                <div className="col-md-8 col-lg-6">
                    <Form.Control
                        type="text"
                        name="addressLine1"
                        onChange={handleChange}
                        isInvalid={!!errors.addressLine1 }
                        value={values.addressLine1}
                        style={{fontSize:'inherit'}}
                        //defaultValue={(initValue)?initValue.addressLine1:""}
                    />
                    <Form.Control.Feedback type="invalid">{errors.addressLine1}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">City: </Form.Label>
                <div className="col-md-8 col-lg-6">
                    <Form.Control
                        type="text"
                        name="addressLine2"
                        onChange={handleChange}
                        isInvalid={!!errors.addressLine2 }
                        value={values.addressLine2}
                        style={{fontSize:'inherit'}}
                        //defaultValue={(initValue)?initValue.addressLine2:""}
                    />
                    <Form.Control.Feedback type="invalid">{errors.addressLine2}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">Postal code: </Form.Label>
                <div className="col-md-8 col-lg-6">
                    <Form.Control
                        type="text"
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
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">Currency: </Form.Label>
                <div className="col-md-8 col-lg-6">
                    <MySelect
                        value={values.currency}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.currency}
                        touched={touched.currency}
                        optionArray={currencies}
                        optFor={"currency"}
                    />
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">Select group:</Form.Label>
                <div className="col-md-8 col-lg-6">
                    <Form.Control
                        as="select"
                        name="groupId"
                        onChange={handleChange}
                        isInvalid={!!errors.groupId}
                        value={values.groupId}
                        style={{fontSize:'inherit'}}
                    >
                        <option value={""} key="groupS" disabled={true} selected={true}>---Select group---</option>
                        {options_groups.map((opt)=>(<option key={opt.id} value={opt.id} selected={values.groupId===opt.id}>{opt.groupName}</option>))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.groupId}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-md-4 col-sm-12 col-form-label">Check-in time: </Form.Label>
                <div className="col-md-3 col-lg-3 col-sm-4 mb-2">
                    <Form.Control
                        as="select"
                        name="checkInTimeAt"
                        onChange={handleChange}
                        isInvalid={!!errors.checkInTimeAt}
                        value={values.checkInTimeAt}
                        style={{fontSize:'inherit'}}
                    >
                        <option value="at" key="at" >at &gt;&gt;</option>
                        <option value="from" key="from" >from &gt;&gt;</option>
                    </Form.Control>
                </div>
                <div className="col-md-5 col-lg-3 col-sm-8 mb-2">
                    <Form.Control
                        type="time"
                        name="checkInTime"
                        onChange={handleChange}
                        isInvalid={!!errors.checkInTime }
                        value={values.checkInTime}
                        style={{fontSize:'inherit'}}
                        //defaultValue={(initValue)?initValue.checkInTime:""}
                    />
                    <Form.Control.Feedback type="invalid">{errors.checkInTime}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-md-4 col-sm-12 col-form-label">Check-out time: </Form.Label>
                
                <div className="col-md-3 col-lg-3 col-sm-4 mb-2">
                    <Form.Control
                        as="select"
                        name="checkOutTimeAt"
                        onChange={handleChange}
                        isInvalid={!!errors.checkOutTimeAt}
                        value={values.checkOutTimeAt}
                        style={{fontSize:'inherit'}}
                    >
                        <option value="at" key="at" >at &gt;&gt;</option>
                        <option value="until" key="from" >until &gt;&gt;</option>
                    </Form.Control>
                </div>

                <div className="col-md-5 col-lg-3 col-sm-8 mb-2">
                    <Form.Control
                        type="time"
                        name="checkOutTime"
                        onChange={handleChange}
                        isInvalid={!!errors.checkOutTime }
                        value={values.checkOutTime}
                        style={{fontSize:'inherit'}}
                        //defaultValue={(initValue)?initValue.checkOutTime:""}
                    />
                    <Form.Control.Feedback type="invalid">{errors.checkOutTime}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <Form.Row className="py-1">
                <Form.Label className="col-sm-4 col-form-label">Select country: </Form.Label>
                <div className={"col-md-8 col-lg-6"}>
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
            <Form.Row className="py-1">
                <Form.Label className="col-sm-12  col-md-4 col-form-label">Maximum number of guests*: </Form.Label>
                <div className="col-md-8 col-lg-6" >
                    <Form.Control
                        id="guestWarning"
                        type="number"
                        name="maxGuests"
                        onBlur={maxGuestsWarning}
                        onChange={handleChange}
                        isInvalid={!!errors.maxGuests }
                        value={values.maxGuests}
                        //defaultValue={(initValue)?initValue.maxGuests:""}
                        min={0}
                        style={{fontSize:'inherit'}}
                    />
                    <Form.Control.Feedback type="invalid">{errors.maxGuests}</Form.Control.Feedback>
                </div>
            </Form.Row>
            <br/>
            <ModalButton btnText={"Save changes"}/>
            {/* <input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.addressLine1}
            name="addressLine1"
          />
          {errors.addressLine1 && touched.addressLine1 && <div id="feedback">{errors.addressLine1}</div>}
          <button type="submit">Submit</button> */}
        </Form>
    );

}

export default RentalForm;
