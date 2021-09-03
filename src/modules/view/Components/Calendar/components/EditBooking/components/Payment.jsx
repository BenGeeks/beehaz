import React, { useState,useEffect } from 'react';
import styles from '../editBooking.module.css';
import {useSelector,useDispatch} from 'react-redux';
import { Row } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {addDiscount,fetchDiscountByBooking} from '../../../../../../../general_redux/calendar/actions';

const Payment = ({bookingId}) => {
  const dispatch =useDispatch();
  const [additionalCharges, setAdditionalCharges] = useState({});
  const [newTotal, setNewTotal] = useState(0);
  const currentCharges=useSelector(({calendar})=>calendar && calendar.currentCharges);
  const bookingDiscount=useSelector(({calendar})=>calendar && calendar.bookingDiscount);
  const [discount,setDiscount]=useState({
    name1:bookingDiscount.length!==0? bookingDiscount[0].type:"",
    amount1:bookingDiscount.length!==0?bookingDiscount[0].amount:0,
    name2:bookingDiscount.length>1?bookingDiscount[1].type:"",
    amount2:bookingDiscount.length>1?bookingDiscount[1].amount:0
  });
  const [feeOrDisc,setFreeOrDisc]=useState({
    fee:0,
    disc:0,
  })
  const bookingData= useSelector(({calendar}) => calendar &&
      calendar.allBooking.filter((row)=>row.id===bookingId)[0]);
  const rentalDetail = useSelector(({rentals})=>rentals
      && rentals.rentals.filter((row)=>row.id===bookingData.rentalId)[0]);

  useEffect(()=>{
    dispatch(fetchDiscountByBooking(bookingId));
  },[])

  useEffect(()=>{
    if(bookingDiscount && bookingDiscount.length!==0){
      setDiscount({
        name1: bookingDiscount.length>0?bookingDiscount[0].type:"",
        amount1:bookingDiscount.length>0?bookingDiscount[0].amount:0,
        name2:bookingDiscount.length>1?bookingDiscount[1].type:"",
        amount2:bookingDiscount.length>1?bookingDiscount[1].amount:0
      })
    }
  },[bookingDiscount])

  useEffect(()=>{
    const tmpDisc=(discount.amount1>=0 && discount.amount2>=0)?
        `${Number(discount.amount1)+Number(discount.amount2)}`:
        (discount.amount1>=0)?discount.amount1:((discount.amount2>=0)?discount.amount2:0);

    const tmpFee=(discount.amount1<0 && discount.amount2<0)?
        `${Number(discount.amount1)+Number(discount.amount2)}`:
        (discount.amount1<0)?discount.amount1:((discount.amount2<0)?discount.amount2:0);

    setFreeOrDisc({
      disc:tmpFee,
      fee:tmpDisc
    })
    console.log(feeOrDisc);
    const tmp=Number(currentCharges.daily_rate)+
        Number(currentCharges.discounts)+Number(currentCharges.extra_guest_fees)
        +Number(currentCharges.fees)+Number(discount.amount1)+Number(discount.amount2);
    setNewTotal(tmp);
  },[currentCharges,discount.amount1,discount.amount2])

  const handleSubmit = () => {
    const payload = {
      bookingId:bookingId,
      rentalId:bookingData.rentalId,
      items:[
        {
          id:1,
          type:"discount",
          name:discount.name1,
          amount:feeOrDisc.disc
        },
        {
          id:2,
          type:"fee",
          name:discount.name2,
          amount:feeOrDisc.fee
        }
      ],
      total:newTotal,
    };
    dispatch(addDiscount(payload));
  };

  const handleChange = (e) => {
    setAdditionalCharges({ ...additionalCharges, name1: e.target.value });
  };

  const handleUpdate=(e,field)=>{
    const tmp= {...discount}
    tmp[field]=e.target.value;
    setDiscount(tmp);
  }

  return (
    <div className="p-3">
      <div className="pb-4 d-flex flex-column align-items-center">
        <div className={styles.subHeader}> Total due: {`${newTotal} ${rentalDetail.currency}`} </div>
        <div className={styles.defaultFont}>Payment status: {`${bookingData.paymentStatus}`} </div>
      </div>
      <div className="pb-2 d-flex flex-lg-row flex-column">
        <div className={`${styles.divWrapper} col-12 col-lg-6`}>
          <div className="pb-2 d-flex flex-direction-column">
            <div className={styles.subHeader}>Payment calculation </div>
            <div className={styles.toolTipIconContainer}>
              <InfoOutlinedIcon
                fontSize="small"
                color="inherit"
                data-tip
                data-for="paymentCalculation"
                className={styles.toolTipIcon}
              />
              <ReactTooltip
                place="bottom"
                type="dark"
                id="paymentCalculation"
                effect="solid"
                className={styles.toolTip}
              >
                <span>
                  Calculation based on your rates settings for this rental. You can change rates, taxes, fees and
                  discount for This rental by clicking on 'Rates' in the top menu.
                </span>
              </ReactTooltip>
            </div>
          </div>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Base rate:</div>
            <div className={styles.payment_data}>{`${currentCharges.daily_rate} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Extra guest fee:</div>
            <div className={styles.payment_data}>{`${(currentCharges.extra_guest_fees!=="")?currentCharges.extra_guest_fees:0} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Total rent: </div>
            <div className={styles.payment_data}>{`${Number(currentCharges.daily_rate)+Number(currentCharges.extra_guest_fees)} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Discount applied:</div>
            <div className={styles.payment_data}>{`${feeOrDisc.disc} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Taxable fees applied:</div>
            <div className={styles.payment_data}>-</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Taxes applied:</div>
            <div className={styles.payment_data}>-</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>
              <i>Subtotal:</i>
            </div>
            <div className={styles.payment_data}>{`${Number(currentCharges.daily_rate)+
            Number(currentCharges.extra_guest_fees)+Number(feeOrDisc.disc)} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>Non-taxable fees applied:</div>
            <div className={styles.payment_data}>{`${feeOrDisc.fee} ${rentalDetail.currency}`}</div>
          </Row>
          <Row className={styles.form_wrapper}>
            <div className={styles.payment_title}>
              <b>Total due:</b>
            </div>
            <div className={styles.payment_data}>{`${newTotal} ${rentalDetail.currency}`}</div>
          </Row>
        </div>
        <div className={`col-12 col-lg-6 mt-5 mt-lg-0 ${styles.divWrapper}`}>
          <div className="pb-2 d-flex flex-direction-column">
            <div className={styles.subHeader}>Add charges or discount </div>
            <div className={styles.toolTipIconContainer}>
              <InfoOutlinedIcon
                fontSize="small"
                color="inherit"
                data-tip
                data-for="addCharges"
                className={styles.toolTipIcon}
              />
              <ReactTooltip place="bottom" type="dark" id="addCharges" effect="solid" className={styles.toolTip}>
                <span>
                  Add charger or discounts that are specific to this booking. Use positive number for charges and
                  negative numbers for discounts. This will affect the total due.
                </span>
              </ReactTooltip>
            </div>
          </div>
          <div className={`d-flex ${styles.form_wrapper}`}>
            <div className={styles.payment_title_sm}>Name:</div>
            <input
                type={'text'}
                className={styles.payment_entry_sm}
                value={discount.name1}
                onChange={(e) => handleUpdate(e,"name1")}
            />
          </div>
          <div className={`d-flex ${styles.form_wrapper}`}>
            <div className={styles.payment_title_sm}>Amount:</div>
            <input
                type={'number'}
                className={`${styles.payment_entry_amount}`}
                value={discount.amount1}
                onChange={(e) => handleUpdate(e,"amount1")}
            />
            <div className={`${styles.payment_title_sm} ml-2`}>{`${rentalDetail.currency}`}</div>
          </div>
          <br />
          <div className={`d-flex ${styles.form_wrapper}`}>
            <div className={styles.payment_title_sm}>Name:</div>
            <input
                type={'text'}
                className={styles.payment_entry_sm}
                value={discount.name2}
                onChange={(e) => handleUpdate(e,"name2")}
            />
          </div>
          <div className={`${styles.form_wrapper} d-flex`}>
            <div className={styles.payment_title_sm}>Amount:</div>
            <input
                type={'number'}
                className={styles.payment_entry_amount}
                value={discount.amount2}
                onChange={(e) => handleUpdate(e,"amount2")}
            />
            <div className={`${styles.payment_title_sm} ml-2`}>{`${rentalDetail.currency}`}</div>
          </div>
          <br />
          <br />
          <br />
          <div className="pb-2 d-flex flex-direction-column">
            <div className={styles.subHeader}>Overwrite total due </div>
            <div className={styles.toolTipIconContainer}>
              <InfoOutlinedIcon
                fontSize="small"
                color="inherit"
                data-tip
                data-for="overWrite"
                className={styles.toolTipIcon}
              />
              <ReactTooltip place="top" type="dark" id="overWrite" effect="solid" className={styles.toolTip}>
                <span>
                  Overwrite the total due for this reservation. Doing this will erase the system payment calculation and
                  any charges or discount you set for this booking. This will become the total amount due for this
                  booking. <b /> If you set this amount to 0, the system's payment calculation will be used again, along
                  with charges or discounts you set above.
                </span>
              </ReactTooltip>
            </div>
          </div>
          <div className={`d-flex ${styles.form_wrapper}`}>
            <div className={styles.payment_title_sm}>
              <b>New total: </b>
            </div>
            <input
              type={'number'}
              className={styles.payment_entry_amount}
              onChange={(e) => setNewTotal(e.target.value)}
              value={newTotal}
            />
            <div className={`${styles.payment_title_sm} ml-2`}>{`${rentalDetail.currency}`}</div>
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-center ${styles.button_group}`}>
        <div>
          <button className={styles.settings_save} onClick={handleSubmit}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
