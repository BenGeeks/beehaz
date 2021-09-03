import React,{useState,useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../../../Rentals/rentals.module.css';
import styles2 from './viewBooking.module.css';
import {useSelector} from "react-redux";
import {tConvert} from '../../../../../../common/functions/utils';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../../../../../general_redux/calendar/actions';

function ViewBooking(props) {
  const guestDetail = useSelector(({guests})=>guests && guests.guestByBooking
      && guests.guestByBooking.length!==0 && guests.guestByBooking[0] );
  const setting=useSelector(({generalSetting})=>(generalSetting && generalSetting.setting));
  const isDisabled=useSelector(({calendar})=>calendar && calendar.bookingListByGuest)

  const { data } = props;
    const rentalDetail = useSelector(({rentals})=>rentals
        && rentals.rentals.filter((row)=>row.id===data.rentalId)[0]);
  const dispatch = useDispatch();
  const [delBooking,setDelBooking]=useState(false);

  const handleDelete=()=>{
    dispatch(deleteBooking(data.id))
    setDelBooking(false);
    props.onHide();
  }

  return (
      <>
          <Modal
              show={props.show}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={()=>{
                  setDelBooking(false);
                  props.onHide();
              }
          }>
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter" className={styles.modalTitle}>{guestDetail.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.deleteModalBody}>
                  {data && data.length !== 0 && (
                      <div className={styles2.mainContainer}>
                          <div className={styles2.sideText}>{(guestDetail.phone_no!=="")?guestDetail.phone_no:"Phone number unavailable."}</div>
                          <div className={styles2.sideText}>{guestDetail.email_id}</div>
                          <br />
                          <div className={styles2.mainText}>{`Arrive : ${data.start_time.format('Do MMMM, YYYY')}`}</div>
                          <div className={styles2.mainText}>{`Depart : ${data.end_time.format('Do MMMM, YYYY')}`}</div>
                          <div className={styles2.sideText}>{`${data.nights} Nights `}</div>
                          <div className={styles2.sideText}>{`CheckIn time: ${(setting.timeDisplay==="AM_PM")?
                              tConvert(data.checkInTime):data.checkInTime}`}</div>
                          <div className={styles2.sideText}>{`Checkout time:  ${(setting.timeDisplay === "AM_PM") ?
                              tConvert(data.checkOutTime) : data.checkOutTime}`} </div>
                          <div className={styles2.mainText}>{`Total guests : ${Number(data.noOfChildren)+Number(data.noOfAdults)}`}</div>
                          <div className={styles2.sideText}>{`Adult ${data.noOfAdults} children ${data.noOfChildren}`}</div>
                          <div className={styles2.mainText}>{`Price : ${data.price} ${rentalDetail.currency}`}</div>
                          <div className={styles2.sideText}>{`Status : ${data.paymentStatus}`}</div>
                          <div className={styles2.mainText}>
                              <div>{`Color :`}</div>
                              <div
                                  className={styles2.containerBox}
                                  style={{background:`${data.color}`}}
                                  key={data.color}
                              />
                          </div>
                      </div>
                  )}
              </Modal.Body>
              {(delBooking ===true) ?(
                  <div className={`{styles.modalFooter} p-2 d-flex justify-content-center `}>
                      <button type="submit" className={'col-lg-4 p-2 mr-4 col-sm-12'} style={{backgroundColor:"#dc3545",width:'145px'}}
                              className={styles.btnClass} onClick={handleDelete}>
                          Confirm Delete
                          <span>
                    <i className={`fa fa-check-circle ${styles2.icons}`}/>
                  </span>
                      </button>
                      <button  type="submit" className={'col-lg-4 p-2 mr-4 col-sm-12'} style={{backgroundColor:"#439a86"}}
                               className={styles.btnClass} onClick={()=>setDelBooking(false)}>
                          Cancel
                          <span>
                    <i className={`fa fa-undo ${styles2.icons}`}/>
                  </span>
                      </button>
                  </div>
              ):(
                  <div className={`{styles.modalFooter} p-2 d-flex justify-content-center `}>
                      <button type="submit" className={'col-lg-4 p-2 mr-4 col-sm-12'} style={{backgroundColor:"#dc3545"}}
                              className={styles.btnClass} onClick={()=>setDelBooking(true)}>
                          Delete
                      </button>
                      <button  type="submit" className={'col-lg-4 p-2 mr-4 col-sm-12'} style={{backgroundColor:"#439a86"}}
                               className={styles.btnClass} onClick={props.onEdit} disabled={isDisabled===[]}>
                          Edit
                      </button>
                  </div>
              )}
          </Modal>
      </>

  );
}
export default ViewBooking;
