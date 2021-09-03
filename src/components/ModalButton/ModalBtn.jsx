import React from 'react';
import styles from './buttonstyles.module.css';

function ModalBtn(props){
    return(
        <>
            <div className={`p-2 d-flex justify-content-center`}>
                <button type="submit" className={`${styles.modalButton}`}>
                    {props.btnText}
                </button>
            </div>
        </>
    )
}

export default ModalBtn;