import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../../../Rentals/rentals.module.css';
import styles2 from './viewBlockDate.module.css';
import { useSelector } from 'react-redux';
import { tConvert } from '../../../../../../common/functions/utils';
import { useDispatch } from 'react-redux';
import { deleteBlockDate } from '../../../../../../general_redux/calendar/actions';

function ViewBlockDate(props) {
  const setting = useSelector(({ generalSetting }) => generalSetting && generalSetting.setting);

  const { data } = props;
  const dispatch = useDispatch();
  const [delBlockDate, setDelBlockDate] = useState(false);

  const handleDelete = () => {
    dispatch(deleteBlockDate(data.id));
    setDelBlockDate(false);
    props.onHide();
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setDelBlockDate(false);
          props.onHide();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className={styles.modalTitle}>
            {data.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.deleteModalBody}>
          {data && data.length !== 0 && (
            <div className={styles2.mainContainer}>
              <div className={styles2.mainText}>{`Arrive : ${data.start_time.format('Do MMMM, YYYY')}`}</div>
              <div className={styles2.mainText}>{`Depart : ${data.end_time.format('Do MMMM, YYYY')}`}</div>
              <div className={styles2.sideText}>{`${data.end_time.diff(data.start_time, 'days')} Nights `}</div>
              <div className={styles2.sideText}>{`CheckIn time: ${
                setting.timeDisplay === 'AM_PM' ? tConvert(data.checkInTime) : data.checkInTime
              }`}</div>
              <div className={styles2.sideText}>
                {`Checkout time:  ${setting.timeDisplay === 'AM_PM' ? tConvert(data.checkOutTime) : data.checkOutTime}`}{' '}
              </div>
            </div>
          )}
        </Modal.Body>
        {delBlockDate === true ? (
          <div className={`{styles.modalFooter} p-2 d-flex justify-content-center `}>
            <button
              type="submit"
              className={'col-lg-4 p-2 mr-4 col-sm-12'}
              style={{ backgroundColor: '#dc3545', width: '145px' }}
              className={styles.btnClass}
              onClick={handleDelete}
            >
              Confirm Delete
              <span>
                <i className={`fa fa-check-circle ${styles2.icons}`} />
              </span>
            </button>
            <button
              type="submit"
              className={'col-lg-4 p-2 mr-4 col-sm-12'}
              style={{ backgroundColor: '#439a86' }}
              className={styles.btnClass}
              onClick={() => setDelBlockDate(false)}
            >
              Cancel
              <span>
                <i className={`fa fa-undo ${styles2.icons}`} />
              </span>
            </button>
          </div>
        ) : (
          <div className={`{styles.modalFooter} p-2 d-flex justify-content-center `}>
            <button
              type="submit"
              className={'col-lg-4 p-2 mr-4 col-sm-12'}
              style={{ backgroundColor: '#dc3545' }}
              className={styles.btnClass}
              onClick={() => setDelBlockDate(true)}
            >
              Delete
            </button>
            <button
              type="submit"
              className={'col-lg-4 p-2 mr-4 col-sm-12'}
              style={{ backgroundColor: '#439a86' }}
              className={styles.btnClass}
              onClick={ () => {
                props.onEdit();
                props.onHide(data);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
export default ViewBlockDate;
