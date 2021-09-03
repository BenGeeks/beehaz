import React from 'react';
import styles from '../pricing.module.css';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <div className={styles.container_head}>
        <span className={styles.header}>Manage your rentals at affordable prices</span>
      </div>
      <div className={styles.container_content}>
        <span className={styles.content}>
          Pay only for the features you really need. A rental management software that is simple to use, has the basic
          functionality you need to run your business and it's affordable! Sign up and start testing in under 5 minutes,
          with no need to put in credit card details.
        </span>
        <br />
      </div>
      <div className={`d-flex justify-content-center ${styles.container_card}`}>
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
            <Link to="/register" className={styles.card_button}>
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
            <Link to="/register" className={styles.card_button}>
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
          automatically downgraded to the Basic Plan. To continue using the Plus Plan features, upgrade to Plus Plan in
          the user settings.
        </span>
        <br />
        <br />
        <span className={styles.content_high_light}>No hassle, try for free and cancel any time.</span>
        <br />
        <br />
        <span className={styles.content}>
          Our Plus Plan starts with a minimum package of 10 rental units (be that rooms, apartments, or parking spaces)
          for 10 USD per month, all charges included. You can add as many additional rental units as you like for only
        </span>
        <span className={styles.content_high_light}> 1 USD per unit per month!</span>
        <br />
        <br />
        <span className={styles.content}>
          If you don't need to sync your calendar to OTAs (such as Airbnb, Booking.com or VRBO), nor do you manage more
          than 10 units, you can use Beehaz Basic Features for free (forever)!
        </span>
        <br />
        <br />
        <span className={styles.content}>If you manage more than 100 units, please </span>{' '}
        <Link to="/contact_us" className={styles.content_link}>
          contact us
        </Link>
        <span className={styles.content}> for a quote!</span>
      </div>
    </>
  );
}

export default Main;
