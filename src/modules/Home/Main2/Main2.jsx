import React from 'react';
import tablet from '../../../icons/tablet.png';
import deviceFlex from '../../../icons/device_flexibility.png';
import passwordSafe from '../../../icons/password_safety.png';
import ContainerMain from '../Containers/ContainerMain';
import styles from '../home.module.css';

function Main2(props) {
  return (
    <>
    <ContainerMain
      whiteText={"Did we mention it's free?"}
      TextBeforeBreak={`Our beta version is launching soon!`}
      textAfterBreak={`Grow with us, take the chance to try it out, give your
      feedback and help us shape the software of your dreams to your
      needs!`}
      message={`Join our mailing list!`}
      onMessageClick={props.setMailModal}
      imgFile={tablet}
      styleProp={`mainTwo custom`}
      imgStyle={styles.custom}
    />
    <div className="main">
      <div className={`${styles.containerWhite}  flex-column`}>
        <div className={styles.mainContainer}>
          <div className={styles.textArea}>
            <h1 className={styles.textHeader}>Work from anywhere</h1>
            <p>
              Our cloud-based property management system can be accessed from
              any device, from anywhere. Create bookings, block dates, and view
              all your data from an intuitive interface so you can manage your
              business with ease, avoiding double bookings and keeping notes of
              your guests!
            </p>
          </div>
          <div className={styles.featureContainer}>
            <div className={styles.feature2Container}>
              <div className="feature2-imageholder">
                <img
                   src={deviceFlex}
                  className="featureImage2"
                />
              </div>
              <div className={styles.feature2}>
                <span>Infinite Scrolling Calendar</span>
                <p>
                  Change the colours of your bookings and see open payments at a
                  glance!
                </p>
              </div>
            </div>
            <div  className={styles.feature2Container}>
              <img
                src={passwordSafe}
                className="featureImage2"
              />
              <div  className={styles.feature2}>
                <span>CRM System</span>
                <p>
                  Save your customer's or guest's data and re-use the
                  information every time you have a returning customer!
                </p>
              </div>
            </div>
          </div>
        </div><span className={'d-none ml-5 mr-5 pl-5 pr-5 font-weight-light font-italic pt-5'}>The information contained in these documents is confidential, privileged and only for the information of the intended recipient and may not be used, published or redistributed without the
          prior written consent of Yaz Hauser AG, Switzerland.</span>
      </div>
    </div>
    </>
  );
}

export default Main2;
