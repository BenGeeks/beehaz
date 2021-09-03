import React from 'react';
import styles from '../home.module.css';
//
function ContainerMain(props){
    return(
        <div className={styles.containerBlack}>
        <div className={`${styles.mainContainer} ${styles.alLeft}`}>
          <div className={`${styles.mainOne}`}>
            <h1 className="text-white mt-4 font-weight-bold" style={{fontSize:"3.5rem",padding:"10px 0px",fontWeight:"normal"}}>
              {props.whiteText}
            </h1>
            <p className="text-white">
              {props.TextBeforeBreak}{' '}
              <br /> {props.textAfterBreak}
            </p>
            <button className={styles.join} onClick={props.onMessageClick}>{props.message}</button>
          </div>
          {props.imgFile && (
            <div className={props.imgStyle} >
                <img src={props.imgFile} className={styles.responsive} alt="main"/>
            </div>
          )}
          {props.featureList &&(
            <div className={`${styles.mainOne} order1 `}>
            <div className={styles.featureContainer3}>
              <div className={styles.feature3}>
                <div className={styles.fontawesomeContainer}>
                  <i className="fas fa-project-diagram"/>
                </div>
                <div>
                  <span>Channel Manager</span>
                  <p>
                    Syncing your calendar with Airbnb and other booking
                    platforms will be possible soon!
                  </p>
                </div>
              </div>
              <div className={styles.feature3}>
                <div  className={styles.fontawesomeContainer}>
                  <i className="fas fa-pencil-alt"/>
                </div>
                <div>
                  <span>Sending Invoices Directly to Customers</span>
                  <p>
                    Simple to generate and soon simple to send! One click is
                    what you'll need!
                  </p>
                </div>
              </div>
              <div className={styles.feature3}>
                <div className={styles.fontawesomeContainer}>
                  <i className="fa fa-chart-line"/>
                </div>
                <div>
                  <span>Cleaning Calendar and Expense Tracking</span>
                  <p>
                    Managing cleaning, maintenance, shopping lists, tracking
                    your expenses and so much more!
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
          
        </div>
      </div>
    )
}

export default ContainerMain;