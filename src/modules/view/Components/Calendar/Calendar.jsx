import React, { useState, useEffect,useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';
import SlideSelect from '../../../../components/Slide_select/Slide_select';
import CustomTimeLine from '../../../../components/CustomTimeLine';
import NewBooking from './components/NewBooking/AddNewBooking';
import BlockDate from './components/BlockDate/BlockDate';
import {
  addNewBooking,
  editBooking,
  loadBooking,
  resetBookingFlag,
  clearBooking,
} from '../../../../general_redux/calendar/actions';
import { addGuestByBooking } from '../../../../general_redux/guest/actions';
import { addGuests, loadGuests, resetGuestFlag, getGuestByBooking,clearGuest } from '../../../../general_redux/guest/actions';
import { loadRental } from '../../../../general_redux/rentals/actions';
import { resetUser } from '../../../../general_redux/user/actions';
import { rateList } from '../../../../general_redux/rates/actions';
import { LoadSettings } from '../../../../general_redux/general settings/actions';
import ViewBooking from './components/ViewBooking/ViewBooking';
import WelcomeModal from './components/WelcomeScreen/Welcome';
import Loading from '../../../../components/loading';
import SelectButton from '../../../../components/Selectbutton/SelectButton';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendar.module.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ViewBlockDate from './components/ViewBlockDate/ViewBlockDate';
import EditBooking from './components/EditBooking/EditBooking'; 

const Calendar = (props) => {
  const rentals = useSelector(({ rentals }) => rentals && rentals.rentals).map((row) => ({
    id: row.id,
    title: row.name,
  }));
  const { width, height, ref } = useResizeDetector();
  const items = useSelector(({ calendar }) => calendar && calendar.allBooking);
  const userStatus = useSelector(({ user }) => user && user.isNewUser);
  const itemStatus = useSelector(({ calendar }) => calendar && calendar.actionForBooking);
  const actionForRental = useSelector(({ rentals }) => rentals && rentals.actionForRental);
  const actionForGuest = useSelector(({ guests }) => guests && guests.actionForLoad);
  const actionForRate = useSelector(({ rates }) => rates && rates.actionForRateList);
  const bookingFlag = useSelector(({ calendar }) => calendar && calendar.bookingFlag);
  const guestFlag = useSelector(({ guests }) => guests && guests.guestFlag);
  const addBookingStatus = useSelector(({ calendar }) => calendar && calendar.actionForAddBooking);
  const guestPopUpStatus = useSelector(({ guests }) => guests && guests.actionForGuestLoad);
  const delStatus = useSelector(({ calendar }) => calendar && calendar.actionDeleteBooking);
  const actionDeleteBlockDate = useSelector(({ calendar }) => calendar && calendar.actionDeleteBlockDate);
  const actionForAddBooking = useSelector(({ calendar }) => calendar && calendar.actionForAddBooking);
  const actionForEditBooking = useSelector(({calendar})=> calendar && calendar.actionEditBooking);
  const dispatch = useDispatch();

  //calendar props
  const now = new Date().getUTCFullYear();
  const myLast = now + 2;
  const years = Array(myLast - (myLast - 20))
    .fill('')
    .map((v, idx) => myLast - idx)
    .reverse();
  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const childRef = useRef();

  const d = new Date();
  const [currentSelectMonth, setCurrentSelectMonth] = useState(d.getMonth());
  const [currentSelectYear, setCurrentSelectYear] = useState(years.length - 3);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewBlockDate, setViewBlockDate] = useState(false);
  const [addBooking, setAddBooking] = useState(false);
  const [blockDate, setBlockDate] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [viewEditBooking, setViewEditBooking] = useState(false);

  const handleSaveBooking = (data, guestData, isNewGuest) => {
    dispatch(addNewBooking(data));
    if (isNewGuest) {
      setIsNewGuest(true);
    } else {
      setIsNewGuest(false);
    }
    setGuestData(guestData);
    setAddBooking(false);
    setBlockDate(false);
    setIsEdit(false);
  };
  const selectBooking = (id) => {
    const viewItem = items.filter((item) => item.id === id)[0];
    if (viewItem.type === 'booking') {
      if (viewItem && viewItem.length !== 0) {
        dispatch(getGuestByBooking(viewItem.id));
        setViewData(viewItem);
        setViewBooking(true);
      }
    }
    if (viewItem.type === 'blockdates') {
      setViewData(viewItem);
      setViewBlockDate(true);
    }
  };

  const onCloseWelcome = () => {
    dispatch(resetUser());
    setWelcomeModal(false);
  };

  useEffect(() => {
    dispatch(loadGuests());
    dispatch(loadRental());
    dispatch(loadBooking());
    dispatch(rateList());
    dispatch(LoadSettings());
    if (userStatus) {
      setTimeout(() => {
        setWelcomeModal(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (addBookingStatus.success) {
      if (bookingFlag) {
        if (isNewGuest) {
          dispatch(addGuests(guestData));
          setIsNewGuest(false);
        } else {
          dispatch(addGuestByBooking(guestData, bookingFlag));
          dispatch(clearBooking());
          dispatch(resetBookingFlag());
        }
      }
    }
  }, [dispatch, bookingFlag]);

  useEffect(() => {
    if (guestFlag) {
      if (addBookingStatus.success) {
        const guestData1 = {
          guestId: guestFlag,
        };
        dispatch(addGuestByBooking(guestData1, bookingFlag));
        dispatch(clearBooking());
        dispatch(resetBookingFlag());
      }
      dispatch(resetGuestFlag());
    }
  }, [dispatch, guestFlag]);

  const handleEditBlockDate = (data) =>{
    dispatch(editBooking(data));
    setBlockDate(false);
    setAddBooking(false);
    setIsEdit(false);
    dispatch(clearBooking());
  }

  const handleEditBooking = (data)=>{
    console.log('HANDLE EDIT BOOKING WAS TRIGGERED W DATA: ', data);
  }

  return (
    <div ref={ref}>
      <Loading
        loadingStatus={
          actionForRental.loading ||
          actionForGuest.loading ||
          itemStatus.loading ||
          actionForRate.loading ||
          guestPopUpStatus.loading ||
          delStatus.loading ||
          actionDeleteBlockDate.loading ||
          actionForAddBooking.loading ||
          actionForEditBooking.loading
        }
      />
      <div className={styles.calendarHeader}>
        <div className={styles.calendarSetup}>
          <SlideSelect
              list={years}
              currentSelect={currentSelectYear}
              onSelectData={(index) => childRef.current.onYearUpdate(index)} />
          <SlideSelect
            list={Months}
            currentSelect={currentSelectMonth}
            onSelectData={(index) => childRef.current.onMonthUpdate(index)}
          />
          {/*<SlideSelect list={days} currentSelect={1} onSelectData={(index) => selectDate(index, 0)} />*/}
          <SelectButton text="Today" onSelection={()=>childRef.current.renderToday()}/>
        </div>
        <WelcomeModal show={welcomeModal} onHide={onCloseWelcome} />
        <Modal
          show={addBooking}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {
            setAddBooking(false);
            setIsEdit(false);
          }}
        >
          <NewBooking
            handleSave={(data, guestData, check) => handleSaveBooking(data, guestData, check)}
          />
        </Modal>

        <Modal
          onHide={() => {
            setBlockDate(false);
          }}
          show={blockDate}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <BlockDate 
            handleSave={(data) => handleSaveBooking(data)}
            handleEdit={(data) => handleEditBlockDate(data)}
            initValues={viewData}
            isEdit={isEdit}
          />
        </Modal>

        <Modal
          onHide={() => setViewEditBooking(false)}
          show={viewEditBooking}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <EditBooking
            //handleEditBooking={(data) => handleEditBooking(data)}
            bookingData={viewData}
            bookingId={viewData?viewData.id:null}
          />
        </Modal>

        <div className={styles.flexEnd}>
          <button
            className={`${styles.allBtn} w-25`}
            onClick={() => setAddBooking(true)}
            disabled={rentals.length === 0}
          >
            Add Booking
          </button>
          <button
            className={`${styles.allBtn} w-25`}
            onClick={() => {setBlockDate(true); setIsEdit(false)}}
            disabled={rentals.length === 0}
          >
            Block Dates
          </button>
        </div>
        {!actionForRental.loading && !itemStatus.loading && (
          <div className={styles.upperArrow}>
            <div className="d-flex justify-content-between w-100">
              <div className={styles.arrowIcons}>
                <ArrowBackIosIcon className={styles.svgIcon} onClick={() => childRef.current.onPrevClick()} />
              </div>
              <div className={styles.arrowIcons}>
                <ArrowForwardIosIcon className={styles.svgIcon} onClick={() => childRef.current.onNextClick()} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/*<MyCalendar*/}
      {/*  groups={rentals}*/}
      {/*  items={items}*/}
      {/*  clickItem={(itemId) => selectBooking(itemId)}*/}
      {/*  selectedDate={selectedDate}*/}
      {/*  visibleTimeStart={visibleTimeStart}*/}
      {/*  visibleTimeEnd={visibleTimeEnd}*/}
      {/*  onTimeChange={onTimeChange}*/}
      {/*  totalDays={totalDays}*/}
      {/*  itemStatus={itemStatus}*/}
      {/*  actionForRental={actionForRental}*/}
      {/*  currentWidth={width}*/}
      {/*/>*/}
      <CustomTimeLine
          items={items}
          groups={rentals}
          width={width}
          itemStatus={itemStatus}
          actionForRental={actionForRental}
          ref={childRef}
          currentMonth={currentSelectMonth}
          setCurrentSelectMonth={setCurrentSelectMonth}
          setCurrentSelectYear={setCurrentSelectYear}
          clickItem={(itemId) => selectBooking(itemId)}
      />
      <ViewBooking
          show={viewBooking}
          onHide={() => {
            setViewBooking(false);
            dispatch(clearGuest())
          }}
          data={viewData ? viewData : []}
          onEdit={() => {
            setViewBooking(false);
            setViewEditBooking(true);
        }}
      />

      <ViewBlockDate
        show={viewBlockDate}
        onHide={() => {
          setViewBlockDate(false);
        }}
        data={viewData ? viewData : []}
        onEdit={ () => { setIsEdit(true); setBlockDate(true);}}
      />

    </div>
  );
};

export default Calendar;
