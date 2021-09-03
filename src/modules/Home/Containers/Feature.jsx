import React from 'react';
import styles from '../home.module.css';

function Feature(props){
    return(
        <div className={styles.feature}>
            <img
                src={props.imgFile}
                className={styles.featureImage}
                alt={props.altImg}
            />
            <span>{props.title}</span>
            <p>
                {props.desc}
            </p>
        </div>
    )
}
export default Feature;