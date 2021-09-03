import React, { useState } from 'react';
import styles from "./pageStyle.module.css";

function index() {
    return (
        <div>
            <div className={`container`}>
                <div className={`copy-container ${styles.center}`}>
                    <p>
                        404, page not found.
                    </p>
                    <span className={`handle`}></span>
                </div>
            </div>
        </div>
    )
}
export default index;