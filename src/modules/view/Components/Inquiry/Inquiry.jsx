import React, { useState, useEffect } from 'react';
import styles from './inquiry.module.css';
import { InputGroup, FormControl,Container,Row,Col } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import Table from '../../../../components/Table';
import { CSVLink } from 'react-csv';
import {LoadInquiries} from '../../../../general_redux/inquiry/action';
import Loading from '../../../../components/loading';

function Inquiry() {
  const rentals = useSelector(({ rentals }) => rentals && rentals.rentals);
  const user= useSelector(({user})=> user && user.user);
  //const inquiryList= useSelector(({inquiry})=>inquiry && inquiry.inquiryData);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [rental, setRental] = useState("");
  const dispatch = useDispatch();

  const inquiryStatus = useSelector(({inquiry})=>inquiry && inquiry.actionForInquiries);
  const queryResult = useSelector((state) => state.inquiry.inquiryData);
  const dateFormat = useSelector(({generalSetting})=>generalSetting && generalSetting.setting.dateDisplay);
  const TimeFormat =useSelector(({generalSettings})=>generalSettings && generalSettings.setting.timeDisplay);
  function clearFilter() {
    setDateFrom("");
    setDateTo("");
    setRental("");
  }

   useEffect(() => {
    const payload={
      customerId:user.id,
      dateFrom: (dateFrom==="")? null :dateFrom,
      dateTo: (dateTo==="")?null:dateTo,
      rentalId: (rental==="")?null:rental
    }
    dispatch(LoadInquiries(payload));
  }, [rental,dateFrom,dateTo]);

  const cols = [
    { lable: 'Booking Nr', key: 'id' },
    { lable: 'Channel', key: 'channel' },
    { lable: 'Rental', key: 'rentalName' },
    { lable: 'Guest Name', key: 'guestName' },
    { lable: 'Check-in', key: 'arrive', isDate:true },
    { lable: 'Check-out', key: 'depart',isDate:true },
    { lable: 'Nights', key: 'nights' },
    { lable: 'Net Amount', key: 'netAmount' },
    { lable: 'Created', key: 'createdAt',isDate:true},
    { lable: 'Payment Status', key: 'paymentStatus' },
    { lable: 'Status', key: 'status' },
  ];

  const headers = [
    { label: 'Booking Nr', key: 'id' },
    { label: 'Channel', key: 'channel' },
    { label: 'Rental', key: 'rentalId' },
    { label: 'Guest Name', key: 'guestName' },
    { label: 'Check-in', key: 'arrive' },
    { label: 'Check-out', key: 'depart' },
    { label: 'Nights', key: 'nights' },
    { label: 'Net Amount', key: 'netAmount' },
    { label: 'Created', key: 'created' },
    { label: 'Payment Status', key: 'payment_status' },
    { label: 'Status', key: 'status' },
  ];

  return (
    <>
    <Loading loadingStatus={inquiryStatus.loading}/>
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={`${styles.filter_filter_name} `}>
              <i className={`fa fa-filter ${styles.filter_icon}`}/>{' '}
              <span className={styles.filter_title_header}>Filter</span>
            </div>

            <div className={`${styles.filter_sub_container}`}>
              <div className={styles.firstBreak}>
                <InputGroup className={styles.input_group}>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.filter_title}>
                      Date from:
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={(e) => setDateFrom(e.target.value)}
                    className={styles.filter_entry}
                    id="from"
                    aria-describedby="Search from"
                    type="date"
                    value={dateFrom}
                  />
                </InputGroup>

                <InputGroup className={styles.input_group}>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.filter_title}>
                      Date to:
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={(e) => setDateTo(e.target.value)}
                    className={styles.filter_entry}
                    id="to"
                    aria-describedby="search to"
                    type="date"
                    value={dateTo}
                    disabled={!dateFrom}
                    min={dateFrom}
                  />
                </InputGroup>
              </div>
              <div className={styles.firstBreak}>
                <InputGroup className={styles.input_group}>
                  <InputGroup.Prepend>
                    <InputGroup.Text className={styles.filter_title}>
                      Select rental:
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <select
                    onChange={(e) => setRental(e.target.value)}
                    className={styles.filter_entry}
                    value={rental}
                  >
                    <option value="" selected disabled hidden>
                      Select Rental
                    </option>
                    {rentals &&
                      rentals.map((r) => <option value={r.id} className={styles.optionClass}>{r.name}</option>)}
                    <div>Test</div>
                  </select>
                </InputGroup>
              </div>
            </div>
            <div className={styles.btn_group}>
              <button className={`${styles.btn}`} onClick={clearFilter}>
                Clear Filter
              </button>
              <div className={`${styles.btn_download}`}>
                <CSVLink
                  className={`${styles.btn_csv} ${styles.btn}`}
                  data={queryResult}
                  headers={headers}
                  filename={'BeeHaz_inquiry.csv'}
                >
                  Download CSV
                </CSVLink>
              </div>
            </div>
       </div>
      {!inquiryStatus.loading && (
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs={12} md={12} className={`pt-3`}>
            {/*<AppTable*/}
            {/*    cols={cols}*/}
            {/*    tableName="Inquiry"*/}
            {/*    rows={queryResult}*/}
            {/*    dateFormat={dateFinal.val}*/}
            {/*/>*/}
               <Table
                   rows={queryResult}
                   cols={cols}
                   dateFormat={dateFormat}
                   startKey={cols[0].key}
               />
              </Col>
            </Row>
          </Container>
      )}
    </div>
    </>
  );
}

export default Inquiry;
