import React, { useState } from 'react';
import styles from '../pricing.module.css';
import { Link } from 'react-router-dom';

function GreyArea() {
  const [numberOfUnits, setNumberOfUnits] = useState(10);
  const [annual, setAnnual] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const monthlyPrice = (numberOfUnits<=10)?12.50:(numberOfUnits*1.25).toFixed(2);
  const yearlyPrice=(numberOfUnits<=10)?120:(numberOfUnits*12).toFixed(2);

  const handleMinus = () => {
    if(numberOfUnits-1>0){
      setNumberOfUnits(numberOfUnits - 1);
    }
  };

  const handlePlus = () => {
    if(numberOfUnits+1<=100){
      setNumberOfUnits(numberOfUnits + 1);
    }
  };
  return (
    <div className={styles.grey_box}>
      <div className={styles.grey_box_header}>
        <span>No credit card required to signup, no commission, no setup fees!</span>
      </div>
      <div className={styles.box_area}>
        <div className={styles.box_area_left}>
          <div className={styles.box_area_header}>Select Units:</div>
          <div className={styles.box_area_number_area}>
            <div className={styles.box_area_btn_minus} onClick={handleMinus}>
              {' '}
              -{' '}
            </div>
            <div className={styles.box_area_number}> {numberOfUnits} </div>
            <div className={styles.box_area_btn_plus} onClick={handlePlus}>
              {' '}
              +{' '}
            </div>
          </div>

          <div className={styles.box_area_header}>Select Payment Plan:</div>
          <div
            className={styles.box_area_radio_btn_area}
            onClick={() => {
              setAnnual(true);
              setMonthly(false);
            }}
          >
            <div className={annual ? styles.box_area_radio_btn : styles.box_area_radio_btn_inactive}> • </div>
            <div className={styles.box_area_radio_txt}>Annual billing (20% off)</div>
          </div>
          <div
            className={styles.box_area_radio_btn_area}
            onClick={() => {
              setAnnual(false);
              setMonthly(true);
            }}
          >
            <div className={monthly ? styles.box_area_radio_btn : styles.box_area_radio_btn_inactive}> • </div>
            <div className={styles.box_area_radio_txt}>Monthly billing</div>
          </div>
          <div className={styles.box_area_container_button}>
            <button className={styles.box_area_button}>Calculate Plus Plan</button>
          </div>
        </div>
        <div className={styles.box_area_right}>
          <div className={styles.box_area_header_big}>Beehaz Plus Plan Total</div>
          <div className={styles.box_area_sub_header}>Fixed price: no commission, no hidden fees.</div>
          <div className={styles.box_area_price_area}>
            <div className={styles.box_area_price}>$ {annual?`${yearlyPrice/12}`:monthlyPrice}</div>
            <div className={styles.box_area_price}>{' per month'}</div>
          </div>
          <div className={styles.box_area_sub_header}>
            ({`$${annual?yearlyPrice:(monthlyPrice*12)} per year`})
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreyArea;
