import React,{useState,useEffect} from 'react';
import styles from '../Slide_select/slide_select.module.css';

function SelectButton(props){
    return(
        <div className={styles.borderBox}>
            <div className={styles.mainContainer}>
                <div className={styles.middleSelection} onClick={props.onSelection}>{props.text}</div>
            </div>
        </div>
    )
}

export default SelectButton;