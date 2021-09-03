import React, {useState} from 'react';
import main from '../../../icons/main.png';
import calendar from '../../../icons/calendar-alt-regular.svg';
import addressBook from '../../../icons/address-book-regular.svg';
import fileInvoice from '../../../icons/file-invoice-dollar-solid.svg';
import hotel from '../../../icons/hotel-solid.svg';
import ContainerMain from '../Containers/ContainerMain';
import styles from '../home.module.css';
import Feature from '../Containers/Feature';
import MailingList from '../Containers/MailingList';

function Main1(props) {
  return (
    <>
      <ContainerMain
        whiteText={"The count down has begun."}
        TextBeforeBreak={`Beehaz's property management system is coming soon to the market!`}
        textAfterBreak={`Find out more and stay tuned!`}
        message={`Join our mailing list!`}
        onMessageClick={props.setMailModal}
        imgFile={main}
        styleProp={`mainOne`}
      />
      <div className={`${styles.containerWhite}  flex-column`}>
        <div className={styles.mainContainer}>
          <div className={styles.textArea}>
            <h1 className={`font-weight-bold ${styles.textHeader}`}>The features you need</h1>
            <p>
              Calendar management, guest manager (CRM system), invoice generator
              and all features you need to manage your rental through one
              system. The best part? It's free to use! Perfect for apartment
              rentals, room rentals, office spaces, equipment rentals and more!
              Keep track of your guests and bookings through an interface that
              is easy to use and accessible from all devices and everywhere: all
              you need is an internet connection and voila!
            </p>
          </div>
          <div className={styles.featureContainer}>
            <Feature
              imgFile={calendar}
              altImg={"calendar"}
              title={"Infinite Scrolling Calendar"}
              desc={`Change the colours of your bookings and see open payments at a
              glance!`}
            />
            <Feature
              imgFile={addressBook}
              altImg={"addressbook"}
              title={"CRM System"}
              desc={`Save your customer's or guest's data and re-use the information
              every time you have a returning customer!`}
            />
            <Feature
              imgFile={fileInvoice}
              altImg={"fileInvoice"}
              title={"Invoice Generator"}
              desc={`Create invoices, download in PDF and keep track of your revenue!`}
            />
            <Feature
              imgFile={hotel}
              altImg={"featureImg"}
              title={"Manage Your Rentals"}
              desc={`Set up check-in and check-out times, set up and manage prices,
              set taxes and more!`}
            />
          </div>
        </div>
        
        <span className={'d-none ml-5 mr-5 pl-5 pr-5 font-weight-light font-italic pt-5'}>The information contained in these documents is confidential, privileged and only for the information of the intended recipient and may not be used, published or redistributed without the
          prior written consent of Yaz Hauser AG, Switzerland.</span>
      </div>
    </>
  );
}

export default Main1;
