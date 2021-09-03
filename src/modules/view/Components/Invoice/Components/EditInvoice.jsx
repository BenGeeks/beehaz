import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CreateMode from '../../Calendar/components/EditBooking/components/CreateMode/CreateMode';
import styles from '../../Calendar/components/EditBooking/editBooking.module.css';
import moment from "moment";

function EditInvoice(props){
    const {selectedData,handleSubmit,bookingId}=props;
    const settings= useSelector(({generalSetting})=>generalSetting && generalSetting.setting);
    const invoiceSchema =  yup.object().shape({
        invoiceNr:yup.number(),
        issueDate:yup.date().required('Issue Date is required!'),
        dueDate:yup.date().required('Due date is required!'),
        status: yup.string().required('Please add a status of payment!'),
        r_name:yup.string().required("Please enter recipient's name!"),
        r_comp:yup.string(),
        r_address1:yup.string(),
        r_address2:yup.string(),
        s_name:yup.string().required("Sender name is required!"),
        s_address1:yup.string(),
        s_address2:yup.string(),
        s_country:yup.string(),
        invoiceText:yup.string(),
        footerText:yup.string(),
        total:yup.number(),
    })
    const initialValues={
        invoiceNr:selectedData?selectedData.id:'',
        issueDate:selectedData?selectedData.invoiceDate:`${moment(new Date()).format("YYYY-MM-DD")}`,
        dueDate:selectedData?selectedData.dueDate:"",
        status:selectedData?selectedData.paymentStatus:"Partially paid",
        r_name:selectedData?selectedData.recipientDetail.name:"",
        r_comp:selectedData?selectedData.recipientDetail.company:"",
        r_address1:selectedData?selectedData.recipientDetail.address1:"",
        r_address2:selectedData?selectedData.recipientDetail.address2:"",
        s_name:selectedData?selectedData.senderDetail.name:"",
        s_address1:selectedData?selectedData.senderDetail.address1:`${settings.address1}`,
        s_address2:selectedData?selectedData.senderDetail.address2:`${settings.address2}`,
        s_country:`${settings.country}`,
        invoiceText:selectedData?selectedData.invoiceText:`${settings.invoiceText}`,
        footerText:selectedData?selectedData.invoiceFooter:`${settings.invoiceFooter}`,
        total:selectedData?selectedData.total:0,
        tableData:selectedData?selectedData.invoiceItem:[],
    }

    return(
        <>
        <Modal
          onHide={props.onHide}
          show={props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`px-sm-2 px-0 ${styles.modal_body}`}>
                <CreateMode
                    validationSchema={invoiceSchema}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    bookingId={bookingId}
                />
            </Modal.Body>    
        </Modal>
        </>
    )
}

export default EditInvoice;