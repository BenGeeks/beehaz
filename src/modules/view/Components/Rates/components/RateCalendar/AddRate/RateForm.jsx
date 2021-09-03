import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import WeekDayPick from '../../../../../../../common/components/weekDayPick';
import MultiSelect from '../../BulkDefaultChanges/MultiSelect';
import styles from '../ratesCalendar.module.css';

function RateForm({schema, updatedSubmit}) {
    const rentals = useSelector(({ rentals }) => rentals && rentals.rentals);
    const [selectedRentals, setSelectedRentals] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isRest,setIsReset]=useState(false);

    const initialValues = {
        multiRentals: [],
        dateRange: {},
        rate: '',
        minStay: '',
        multiDays: [],
    }
    const resetForm =(handleReset)=>{
        handleReset();
        setIsReset(true);
        setSelectedRentals([]);
    }
    const getOptions = () => {
        const tmp=[];
        rentals.map((row) => (tmp.push({ value: row.id, label: row.name })));
        return tmp;
    }

    const handleSubmit = data => {
        const updatedData = {
            rate: data.rate,
            minStay: data.minStay,
            multiRentals: selectedRentals,
            multiDays: selectedDays,
            dateRange: {dateFrom: data.dateFrom, dateTo: data.dateTo}
        }
        updatedSubmit( updatedData );
    }

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
        {({ errors,
              handleChange,
              handleSubmit,
              values,
              handleReset}) => (
            <Form onSubmit={handleSubmit}>
                <Form.Row className='py-1'>
                    <Form.Label className={`col-md-4 ${styles.rateForm__label}`}>Select rental:*</Form.Label>
                    <div className="col-md-8 col-lg-7">
                        <MultiSelect
                          options={getOptions()}
                          value={selectedRentals}
                          name="multiRentals"
                          onChange={setSelectedRentals}
                        />
                        <Form.Control.Feedback type="invalid">{errors.multiRentals}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className='py-1'>
                    <div className={`col-md-4  ${styles.rateForm__label}`}>Select date range:*</div>
                    <div className="col-md-8 col-lg-7 ">
    
                            <Form.Control
                                className={`w-100 ${styles.dateRange}`}
                                type="date"
                                name="dateFrom"
                                onChange={handleChange}
                                max={values.dateTo}
                                isInvalid={!!errors.dateFrom }
                            />
                            <Form.Control
                                className={`w-100 mt-1 ${styles.dateRange}`}
                                type="date"
                                name="dateTo"
                                onChange={handleChange}
                                min={values.dateFrom}
                                disabled={!values.dateFrom}
                                isInvalid={!!errors.dateTo }
                            />
                    </div>
                </Form.Row>
                <Form.Row className='py-1'>
                  <Form.Label className={`col-md-4 ${styles.rateForm__label}`}>Set rate:</Form.Label>
                    <div className="col-md-8 col-lg-7">
                        <Form.Control
                            className={styles.rateForm__input}
                            type="number"
                            name="rate"
                            onChange={handleChange}
                            isInvalid={!!errors.rate }
                        />
                        <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className='py-1'>
                  <Form.Label className={`col-md-4 ${styles.rateForm__label}`}>Set min. stay requirement: </Form.Label>
                    <div className="col-md-8 col-lg-7">
                        <Form.Control
                            className={styles.rateForm__input}
                            type="number"
                            name="minStay"
                            onChange={handleChange}
                            isInvalid={!!errors.minStay }
                        />
                        <Form.Control.Feedback type="invalid">{errors.minStay}</Form.Control.Feedback>
                    </div>
                </Form.Row>
                <Form.Row className='py-1'>
                  <Form.Label className={`col-md-4 ${styles.rateForm__label}`}>Apply only to following week days: </Form.Label>
                  <div className="col-md-8 col-lg-8 overflow-auto">
                    <WeekDayPick name='multiDays' selectedDays={ (days) => {
                        setSelectedDays(days);
                        setIsReset(false);
                    }} isReset={isRest}/>
                  </div>
                </Form.Row>
                <div className='p-2 d-flex justify-content-center'>
                    <div className='col-md-8 d-flex justify-content-around'>
                        <button  type="submit" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} disabled={ selectedRentals.length === 0 && true}>Save</button>
                        <button type="reset" className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`} style={{backgroundColor:"#6c757d"}} onClick={()=>resetForm(handleReset)} >Discard</button>
                    </div>
              </div>
          </Form>
        )}
        </Formik>
    )
}

export default RateForm;