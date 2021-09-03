import React, { useState } from 'react';
import styles from "./pageStyle.module.css";

function index(props) {
    return (
        <div>
            <div className={`container`}>
                <div className={`copy-container ${styles.center}`}>
                    <p>
                        {props.name} Page Under Progress.
    </p>
                    <span className={`handle`}></span>

                </div>
            </div>
        </div>
    )
}
export default index;