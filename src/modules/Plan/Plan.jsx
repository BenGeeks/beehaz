import React from 'react';
import styles from './plan.module.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Plan() {
  return (
    <>
      <Header />
      <div className={styles.container_head}>
        <div className={styles.header}>Choose your plan</div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.container_card}>
          <div className={styles.card}>
            <div className={styles.card_header}>Basic Plan</div>
            <div className={styles.card_price}>Free</div>
            <div className={styles.card_sub_header}>free forever</div>
            <div className={styles.card_content}>
              <ul>
                <li>Reservation system (PMS)</li>
                <li>Infinite scroll calendar</li>
                <li>Guest management (CRM)</li>
                <li>Custom invoicing</li>
                <li>Chat and email support</li>
                <li>Maximum of 10 rentals</li>
              </ul>
            </div>
            <div className={styles.card_container_button}>
              <Link to="/register?package=free" className={styles.card_button}>
                Sign up!
              </Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_header}>Plus Plan</div>
            <div className={styles.card_price}>$ 1.00</div>
            <div className={styles.card_sub_header}>per rental per month*</div>
            <div className={styles.card_content}>
              <ul>
                <li>Reservation system (PMS)</li>
                <li>Infinite scroll calendar</li>
                <li>Guest management (CRM)</li>
                <li>Custom invoicing</li>
                <li>Chat and email support</li>
                <li>Unlimited rentals</li>
                <li>Channel Manager (iCal Sync)</li>
              </ul>
            </div>
            <div className={styles.card_container_button}>
              <Link to="/register?package=trial" className={styles.card_button}>
                60-days free trial!
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.note}>
          <span>*paid yearly, includes all fees and charges.</span>
        </div>
        <div className={styles.container_content}>
          <span className={styles.content}>
            When you sign up you will automatically enter the Plus Plan 60-days free trial. After 60 days, you will be
            automatically downgraded to the Basic Plan. To continue using the Plus Plan features, upgrade to Plus Plan
            in the user settings.
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Plan;
