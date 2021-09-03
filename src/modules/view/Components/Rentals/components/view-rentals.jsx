import React, { useEffect, useState } from 'react';
import Table from '../../../../../components/Table';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import ConfirmMessage from '../../../../../components/Confirmation';
import { deleteRental, loadRental } from '../../../../../general_redux/rentals/actions';
import Loading from "../../../../../components/loading";

function ViewRentals(props) {
    const rentals = useSelector(({rentals}) => rentals && rentals.rentals);
    const [confirmDel,setConfirmDel] = useState(false)
    const loading=useSelector(({rentals})=>rentals && rentals.actionForRental);
    const [deleteData, setDeleteData] = useState(null) 
    const dispatch = useDispatch();
    const cols = [
        {lable: 'Name', key: 'name'},
        {lable: 'Group', key: 'groupName'},
        {lable: 'Country', key: 'country'},
        {lable: 'Max no. of Guests', key: 'maxGuests'},
        {lable: 'Actions', key: ''},
    ];

    const deleteRentalData = () => {
        dispatch(deleteRental(deleteData));
        setConfirmDel(false);
        setDeleteData(null);
    }

    return (
        <div>
            <Loading loadingStatus={loading.loading}/>
            <Container fluid>
                <Row>
                    <Col xs={12} md={"auto"} className={`pt-3`}>
                         {/*<AppTable cols={cols}  tableName="Rentals"*/}
                         {/*rows={rentals}*/}
                         {/*isEdit="true"*/}
                         {/*isDelete="true"*/}
                         {/*onDelete={(data)=> {*/}
                         {/*    setDeleteData(data.id);*/}
                         {/*    setConfirmDel(true);*/}
                         {/*}}*/}
                         {/*onEdit={props.editRental}/>*/}
                        <Table
                            rows={rentals}
                            cols={cols}
                            onEdit={props.editRental}
                            onDelete={(data)=> {
                                setDeleteData(data.id);
                                setConfirmDel(true);
                            }}
                            startKey={cols[0].key}
                        />
                     </Col>
                </Row>
            </Container>
            <ConfirmMessage
                show={confirmDel}
                onHide={() => {
                    setConfirmDel(false);
                    setDeleteData(null);
                }}
                confirmHeader={`Delete Rental`}
                confirmBody={`Deleting this rental will delete all bookings and information linked to it. This action cannot be undone. Are you sure you wish to proceed?`}
                onConfirmAct={deleteRentalData}
            />
        </div>
    )
}
export default ViewRentals;