import React from 'react';
import styles from '../pricing.module.css';
import { Link } from 'react-router-dom';

function FAQ() {
  return (
    <>
      <div className={styles.container_head}>
        <span className={styles.header}>Frequently asked questions</span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Can I connect Beehaz to Airbnb, Booking.com and VRBO?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          Yes, you can synchronize your Beehaz calendar with channels such as Airbnb, Booking.com, VRBO, and many others
          via iCal links. This way, whenever you get a booking in one channel, this information will be transmitted to
          Beehaz, who will block those dates on your Beehaz calendar, as well as on the other channels you are connected
          to.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Do I have to download the Beehaz software?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          No, Beehaz works over the cloud. This means you can access your Beehaz account from any computer, tablet or
          phone. All you need is an internet connection and you can log in!
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Do I have to sign a contract? What is your cancellation policy?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          No, you do not have to sign a contract. Yo can sign up and start using Beehaz right away, with no need to put
          in credit card details or billing information. Shall you decide to switch to the paid version, you can cancel
          yourself any time. For more information about our policies, please check our
        </span>{' '}
        <Link to="/terms" className={styles.content_link}>
          terms of service
        </Link>
        <span className={styles.answer}>.</span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>How safe is Beehaz? </span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          Beehaz does not store passwords nor billing or credit card information. This makes Beehaz a safe software to
          use. You can sign in using either your email address (via tolken) or through Google or Facebook verification.
          Your invoices are paid via Stripe. Our cloud software is hosted in Amazon Web Services (AWS), which is rather
          secure. No software or device connected to the internet is unhackable, but we make sure to take the necessary
          steps to make our services as secure as possible.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Can I assess Beehaz through my phone?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          Yes, you can log in from whichever device you prefer. Assessing your Beehaz account with your mobile gives you
          the same functionality as you have in a desktop.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Is Beehaz for me?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          Our software was build by and for the small entrepreneur. Beehaz is perfect is you manage furnished
          apartments, vacation rentals, boutique hotels, guest houses, bed and breakfast, inn, aparthotel and even if
          you are renting out rooms or parking spaces.
        </span>
        <br />
        <br />
        <span className={styles.answer}>
          Price is an important factor to business owners, and we get that. This is the reason we built an intuitive
          interface with only the essential functionality you would expect to run your business.
        </span>
        <br />
        <br />
        <span className={styles.answer}>
          Our prices are very straight forward, easy to understand and hide no fees in small print. You pay as you grow.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>What does 'iCal connection' mean?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          iCal is the industrial standard of how one calendar is linked to another. It communicates availability. If you
          link your Beehaz calendar to other online travel agencies (OTAs), whenever you receive a booking through one
          of the channels, those days will be blocked in the Beehaz calendar. Beehaz will then 'inform' the other OTAs
          that those dates for that particular unit are blocked. This is true for any two-way iCal connection (meaning
          links to channels that accept both sending and receiving information, such as Airbnb and VRBO). This way, you
          can avoid double bookings.
        </span>
        <br />
        <br />
        <span className={styles.answer}>
          All major OTAs accept iCal connections: VRBO, Rentals.com, Wimdu, Airbnb, Booking.com, Agoda, among others).
          Major calendar providers can also accept iCal links, such as Google Calendar, Yahoo, and Outlook.
        </span>
        <br />
        <br />
        <span className={styles.answer}>
          The amount of information Beehaz receives, depends on the OTA who is sending the information. Please note you
          still have to manage your prices in the OTAs themselves, as rates are not shared through iCal links.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>Can Beehaz help me avoid double bookings?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          Yes, Beehaz can help you manage your rental units and help avoid double bookings. As soon as Beehaz receives a
          message from a linked chanel that you have received a reservation, you will receive a notification. This makes
          managing multiple calendars much easier.
        </span>
        <br />
        <br />
        <span className={styles.answer}>
          You should keep in mind, however, that iCal imports can take several minutes to take place automatically, and
          the sync time depends on how fast other calendar provide information to us. We thus recommend turning off
          instant bookings (in Airbnb, for instance). Manual sync is also possible if you want to make sure the
          information is sent right away to channels.
        </span>
      </div>
      <div className={styles.container_question}>
        <span className={styles.question}>I still have questions. What is the best way to contact Beehaz?</span>
      </div>
      <div className={styles.container_answer}>
        <span className={styles.answer}>
          We are looking forward to answer any questions you may have! You can send your questions through our
        </span>{' '}
        <Link to="/contact_us" className={styles.content_link}>
          contact form
        </Link>
        <span className={styles.answer}>
          {' '}
          contact form or by writing us through the live chat! Please note we are live in Central European Time (CET).
          If you don't find an agent online, leave us a message and we will reply as soon as possible!
        </span>
      </div>
    </>
  );
}

export default FAQ;
