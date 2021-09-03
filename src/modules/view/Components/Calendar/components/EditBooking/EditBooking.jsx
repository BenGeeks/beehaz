import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import styles from './editBooking.module.css';
import BookingDetails from './components/BookingDetails';
import GuestDetails from './components/GuestDetails';
import Payment from './components/Payment';
import Invoice from './components/Invoice';
import { getGuestByBooking,clearGuest } from '../../../../../../general_redux/guest/actions';
import {resetCharges} from "../../../../../../general_redux/calendar/actions";
import {clearInvoice} from '../../../../../../general_redux/invoice/actions';

const EditBooking = ({ bookingId,handleEditBooking }) => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('Booking Details');
  const tabs = ['Booking Details', 'Guest Details', 'Payment', 'Invoice'];

  const rentals = useSelector(({ rentals }) => rentals && rentals.rentals);

  useEffect(() => {
    dispatch(getGuestByBooking(bookingId));
  }, []);

  useEffect(()=>{
      return()=>{
          dispatch(clearGuest());
          dispatch(resetCharges());
          dispatch(clearInvoice());
      }
  },[])

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`px-sm-2 px-0 ${styles.modal_body}`}>
        <div className={styles.upperRow}>
          {tabs.map((tab, index) => (
            <a
              className={currentTab === tab ? `${styles.tabBox} ${styles.active}` : `${styles.tabBox}`}
              key={index}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </a>
          ))}
        </div>
        <div>
          {currentTab === 'Booking Details' && (
            <BookingDetails
                rentals={rentals}
                bookingId={bookingId}
            />
          )}
          {currentTab === 'Guest Details' &&
            <GuestDetails
                bookingId={bookingId}
            />
          }
          {currentTab === 'Payment' && <Payment bookingId={bookingId} />}
          {currentTab === 'Invoice' && <Invoice bookingId={bookingId}/>}
        </div>
      </Modal.Body>
    </>
  );
};

export default EditBooking;
