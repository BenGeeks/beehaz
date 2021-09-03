import React from 'react';
import styles from '../header.module.css';

function NavLink(props){
    return(
        <div className={styles.navButton}>{props.navItemName}</div>
    )
}

export default NavLink;