import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import styles from '../../../Rentals/rentals.module.css';
import {FormInput} from '../../../../../../common/components';
import {useSelector} from 'react-redux';
import {handleSubmit} from '../../../../../../common/functions/get-form-value';

function BulkRateChange(props){
    let rentals = useSelector(({rentals}) => rentals && rentals.rentals);
    const opt=rentals.map((rnt)=>(rnt.name));

    const fields = [
        {label: 'Select rental or group:', type: 'select', placeholder: '',options:opt,
            blankValue: '--Select--', value:"RentalorGroup",field: 'renatlOrGroup'},
        {label: 'Select date range:', type: 'datepicker',
            value:'dateRange',field: 'dateRange'},
        {label: 'Minimum stay requirement:', type: 'number', placeholder: '1',
            value:'minstay' ,field: 'minstay'},
        {label: 'Choose week days:', type: 'weekdaypick',
            value:'WeekDay'},
        {label: 'Default daily rate:', type: 'number', placeholder: '55',
            value:'dailyRate', field: 'dailyRate'},
        {label: 'Default guest per night:', type: 'number', placeholder: '',
            value:'GuestNum',field: 'GuestNum'},
        {label: 'USD per guest per night above guests:', type: 'number', placeholder: '',
            value:'guestLimit', field: 'guestLimit'},
        {label: 'Allow discount:', type: 'checkbox', placeholder: '',
            value:'discount',field: 'discount'},
        {label: 'Weekly discount:', type: 'number', placeholder: '',
            value:'weekDiscount', field: 'weekDiscount'},
        {label: 'Monthly discount:', type: 'number', placeholder: '',
            value:'monthDiscount' ,field: 'monthDiscount'},
        {label: 'Allow fixed rate:', type: 'checkbox', placeholder: '',
            value:'fixRate',field: 'fixRate'},
        {label: 'Weekly price', type: 'number', placeholder: '',
            value:'weekPrice',field: 'weekPrice'},
        {label: 'Monthly price:', type: 'number', placeholder: '',
            value:'monthPrice', field: 'monthPrice' },
    ]
    const addRateChanges=()=>[
        handleSubmit('add-rates',fields,(data)=>{
            props.onEdit(data);
        })
    ]

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add/Edit Rates
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.deleteModalBody}>
                <form id="add-rates">
                    {fields && fields.map((d) => <FormInput key={d.label} {...d}/>)}

                </form>
            </Modal.Body>
            <div className={`{styles.modalFooter} p-2 d-flex justify-content-center `}>
                <Button variant="primary" className={'col-lg-4 p-2 mr-4 col-sm-12'} onClick={addRateChanges}>Save changes</Button>
                <Button variant="danger" className={'col-lg-4 p-2 ml-4 col-sm-12'}  onClick={props.onHide}>Delete rental</Button>
            </div>
        </Modal>
    )
}


export default BulkRateChange;