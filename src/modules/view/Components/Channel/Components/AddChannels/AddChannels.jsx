import React, {useEffect, useState} from 'react';
import {Modal,Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import styles from "../../../Rates/rates.module.css";
import Select from 'react-select';

function AddChannels(props){
    const options = [
        {value:'' , label:'Select Channel'},
        { value: 'agoda', label: 'Agoda' },
        { value: 'airbnb', label: 'Airbnb' },
        { value: 'bookingdotcom', label: 'Booking.com' },
        { value: 'vrbo', label: 'VRBO (HomeAway)'},
        { value: 'other', label: 'Other'}
    ];

    const [selected,setSelected]=useState({value:'' , label:'Select Channel'});
    const channels=useSelector(({calendar})=>calendar && calendar.channels);


    useEffect(()=>{
        if(!props.show){
            setSelected({value:'' , label:'Select Channel'});
        }
    },[props.show])

    const isDisabled=(value)=>{
        const tmp= channels.findIndex((row)=>row.value===value);
        return tmp === -1;
    }

    return(
        <>
            <Modal
                show={props.show}
                size="md"
                onHide={props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Connect Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <p>
                            Please select a channel from the list. You must have an account with the
                            channel before you can link it to BeeHaz. We synchronize availability via iCal
                            URLs.<br/><br/>
                            If you do not find the desired channel in the list, select ‘other’.
                        </p>
                        <Form>
                            <Form.Row>
                                <Form.Label className={`col-md-7 col-lg-4 col-form-label ${styles.form_label}`}>Select Channel*: </Form.Label>
                                <div className={"col-md-5 col-lg-6"}>
                                    <Select
                                        options={options}
                                        value={selected}
                                        onChange={(val)=>setSelected(val)}
                                        className={styles.form_label}
                                    />
                                </div>
                            </Form.Row>
                            <div className='p-2 mt-4 d-flex justify-content-center'>
                                <button
                                    type="submit"
                                    className={`col-lg-5 p-1 mx-2 col-sm-5 ${styles.allBtn}`}
                                    onClick={()=>props.onSelection(selected)}
                                    disabled={(selected && selected.value==="")}
                                >Continue</button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddChannels;