import React from 'react';
import styles from './offline.module.css';
import { Link } from 'react-router-dom';
import BeehazLogo from '../../icons/BeehazLogo144.png';
import BeehazName from '../../icons/Logo_Beehaz.png';

function Offline() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={BeehazLogo} />
      <img src={BeehazName} className={styles.beehaz} />
      <div className={styles.bottom_container}>
        <h3 className={styles.warning}>You are currently offline!</h3>
        <p className={styles.text}>Please connect to the internet to continue</p>
        <Link to={`/`} className="mt-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Offline;
