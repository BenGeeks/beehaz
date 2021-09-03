import React,{useState,useEffect} from 'react';
import { AppTable } from '../../../../../../common/components';
import {useSelector, useDispatch } from 'react-redux';
import {Col, Container, Row} from 'react-bootstrap';
import Table from '../../../../../../components/Table';
import ConfirmMessage from '../../../../../../components/Confirmation';

function ListGuests(props) {
  const guestList = useSelector(({ guests }) => guests && guests.guestList).filter(
    (guest) =>
      guest.name.toLocaleLowerCase().includes(props.search.toLocaleLowerCase()) ||
      guest.emailId.toLocaleLowerCase().includes(props.search.toLocaleLowerCase())
  );

  const [confirmDel,setConfirmDel]=useState(false);
  const [delData,setDelData]=useState(null);
  const cols = [
    { lable: 'Name', key: 'name' },
    { lable: 'Company', key: 'company' },
    { lable: 'Email', key: 'emailId' },
    { lable: 'Phone', key: 'phoneNo' },
    { lable: 'Actions', key: '' },
  ];
 
  return (
    <div>
      <Container fluid>
        <Row >
          <Col md={"auto"} className={`pt-3`}>
              <Table
                  rows={guestList}
                  cols={cols}
                  startKey={cols[0].key}
                  onEdit={props.onEdit}
                  onDelete={(row)=>{
                      setConfirmDel(true);
                      setDelData(row);
                  }}
              />
          </Col>
        </Row>
      </Container>
      <ConfirmMessage
          show={confirmDel}
          onHide={() => {
            setConfirmDel(false);
            setDelData(null);
          }}
          confirmHeader={`Delete Rental`}
          confirmBody={`Deleting this guest will delete all bookings and information linked to it. This action cannot be undone. Are you sure you wish to proceed?`}
          onConfirmAct={()=> {
              props.onDelete(delData);
              setConfirmDel(false);
          }}
      />
    </div>
  );
}
export default ListGuests;
