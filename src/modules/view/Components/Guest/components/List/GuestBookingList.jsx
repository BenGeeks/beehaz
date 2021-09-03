import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import { getBookingByGuestId } from '../../../../../../general_redux/calendar/actions';
import Loading from '../../../../../../components/loading';
import EditBooking from '../../../Calendar/components/EditBooking/EditBooking';
import Table from '../../../../../../components/Table';
import { getGuestByBooking } from '../../../../../../general_redux/guest/actions';

function GuestBookingList({ id }) {
  const bookingList = useSelector(({ calendar }) => calendar && calendar.bookingListByGuest);
  const actionForGetBookingListById = useSelector(({ calendar }) => calendar && calendar.actionForGetBookingListById);
  const dateFormat = useSelector(({ generalSetting }) => generalSetting && generalSetting.setting.dateDisplay);
  const guestDetails = useSelector(({ guests }) => guests && guests.guestByBooking)[0];

  const [displayList, setDisplayList] = useState([]);
  const [editFetchDataLoading, setEditFetchDataLoading] = useState(false);
  const [editBooking, setEditBooking] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const dispatch = useDispatch();

  const cols = [
    { lable: 'check In', key: 'arrive', isDate: true },
    { lable: 'check Out', key: 'depart', isDate: true },
    { lable: 'Nights', key: 'nights' },
    { lable: 'Rental', key: 'rentalName' },
    { lable: 'Channel', key: 'source' },
    { lable: 'Total', key: 'price' },
    { lable: 'Status', key: 'status' },
    { lable: 'Actions', key: '' },
  ];

  useEffect(() => {
    dispatch(getBookingByGuestId(id));
  }, []);

  useEffect(() => {
    setDisplayList([]);
    bookingList.map((booking) => {
      booking.status !== 'Cancelled' && setDisplayList((displayList) => [...displayList, booking]);
    });
  }, [bookingList]);

  function handleEdit({ id }) {
    dispatch(getGuestByBooking(id));
    setEditFetchDataLoading(true);
    setBookingId(id);
  }

  useEffect(() => {
    if (guestDetails && setEditFetchDataLoading) {
      setEditBooking(true);
      setEditFetchDataLoading(false);
    }
  }, [guestDetails]);

  return (
    <div>
      <Modal
        show={editBooking}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setEditBooking(false);
        }}
      >
        <EditBooking bookingId={bookingId} />
      </Modal>
      <Loading loadingStatus={actionForGetBookingListById.loading} />
      <Loading loadingStatus={editFetchDataLoading} />
      <Container fluid>
        <Row>
          <Col xs={12} md={10} className={`pt-3`}>
            <Table rows={displayList} cols={cols} dateFormat={dateFormat} startKey={cols[0].key} onEdit={handleEdit} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default GuestBookingList;
