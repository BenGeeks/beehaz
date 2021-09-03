import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BookingForm from './BookingForm';
import styles from './addnewbooking.module.css';

function AddNewBooking(props) {
  const [selectedVal,setSelectedVal]=useState("");
  const gList= useSelector(({guests})=>guests && guests.guestList);
  const rentalList = useSelector(({rentals})=>rentals && rentals.rentals);
  const userId= useSelector(({user})=>user && user.user.id);

  const { viewForEdit, isEdit } = props;
  const getSelectedVal=(val)=>{
    if(val){
      const guestData=gList.filter((row)=>(row.name===val.label));
      setSelectedVal(guestData[0]);
    }else{
      setSelectedVal(val);
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between">
          <Modal.Title style={{ whiteSpace: 'nowrap' ,marginRight:'2em'}}>Add new booking</Modal.Title>

          <div >
            <Select
                options={gList.map((row)=>({label:row.name,value:row.id}))}
                onChange={setSelectedVal}
                value={selectedVal}
                className={styles.selector_container}
                isSearchable={true}
                isClearable={true}
            />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <BookingForm
            handleSave={(data,guestData,check) => props.handleSave(data,guestData,check)}
            guestDetail={selectedVal}
            rentals={rentalList}
            guestList={gList}
            userId={userId}
        />
      </Modal.Body>
    </>
  );
}

export default AddNewBooking;
