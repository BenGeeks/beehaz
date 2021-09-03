import React, { useState, useEffect } from 'react';
import Loading from '../../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { onLoad } from '../../general_redux/actions';
import styles from './homeDesign.module.css';
import comma from '../../icons/comma.svg';
import calendar from '../../icons/calendar.png';
import dollar from '../../icons/Dollor1.png';
import address from '../../icons/address.png';
import round from '../../icons/Round1.png';
import boxes from '../../icons/verticalBox.png';
import { Link } from 'react-router-dom';
import {changeCurrentPage} from '../../general_redux/actions';
import deck from '../../icons/deck.jpg';
import tablet from '../../icons/tablet.jpg';
import chain from '../../icons/chain.png';
import mobile from '../../icons/mobile.jpg';
import desk from '../../icons/desk.jpg';
import vector from '../../icons/VectorCheck.png';

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onLoad());
        window.scrollTo(0, 0);
    }, []);

    const actionForAddSubscriber = useSelector(({ subscribers }) => subscribers && subscribers.actionForAddSubscriber);

    return (
        <>
            <Loading  loadingStatus={actionForAddSubscriber.loading}/>
            <div className={styles.mainLayout}>
                <Header/>
                <div className={`${styles.container}`}>
                    <div className={styles.section1}>
                        <div className={styles.section1Left}>
                            <h1>The Rental Management Software</h1>
                            <label className={styles.cusontsize}>that fits in the pocket of your small hotel or rental business to help you grow.</label>
                            <button className={`${styles.mainBut} mt-4`}>Watch Video</button>
                        </div>
                        <div className={styles.section1Right}>
                            <div className={styles.section1Img}>
                                <img
                                    src={deck}
                                    alt={"Beehaz Rental Management Software"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.section2}>
                        <label className={styles.section2Text}>
                            <img src={comma} className={styles.leftSvgComma}/>
                            The must-have software if you manage vacation homes, business apartments, boutique hotels or
                            B&Bs.
                            <img src={comma} className={styles.rightSvgComma}/>
                        </label>
                    </div>
                    <div className={styles.section3}>
                        <div className={styles.section3Left}>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>Front desk: take/edit bookings and block dates</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`${styles.textListcolor} m-0`}>Infinite scroll calendar all booking at a glace</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>Guest Management: because customers return</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>Custom Invoicing: flexibility and overview</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>Channel Manager: link to Airbnb, VRBO and more</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>Easy set up: start using for free in under 5 minutes</label>
                            </div>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>The best deal: either free or just a dollar per rental</label>
                            </div>
                        </div>
                        <div className={styles.section3Right}>
                            <div className={styles.section3Img}>
                                <img
                                    src={tablet}
                                    alt={"Beehaz Cloud Software"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.section1} ${styles.section4}`}>
                        <div className={styles.section1Right}>
                            <div className={styles.section1Img}>
                                <img
                                    src={chain}
                                    alt={"Beehaz Channel Manager"}
                                />
                            </div>
                        </div>
                        <div className={styles.section1Left}>
                            <h2>More for less</h2>
                            <br/>
                            <p>The cloud software you can take anywhere. Beehaz was built for desktop and mobile use alike.
                                Take and manage your bookings from every and anywhere!</p>
                            <p>Sync the Beehaz calendar to your Google Calendar or favorite online travel agencies (OTA's)
                                including Airbnb and Booking.com</p>
                        </div>
                    </div>
                    <div className={styles.section5}>
                        <h1 className={styles.textCenter}>Beehaz is a Rental</h1>
                        <h1 className={styles.textCenter}>Management Software</h1>
                        <h2 className={styles.textCenter}>that you can setup for free and under 5 minutes</h2>

                        <div className={styles.section5Box}>
                            <div className={styles.box1}>
                                <img className={styles.boxIcon} src={calendar}/>
                                <label className={styles.box1Text}>Infinite scroll calendar</label>
                                <p className={styles.box1p}>See all your bookings, guest details and payment status at a glance.</p>
                            </div>
                            <div className={styles.box2}>
                                <img className={styles.boxIcon} src={address}/>
                                <label className={styles.box2Text}>CRM System</label>
                                <p className={styles.box2p}>Save your guest's data and re-use the information whenever you have a returning customer.</p>
                            </div>
                            <div className={styles.box1}>
                                <img className={styles.boxIcon} src={dollar}/>
                                <label className={styles.box1Text}>Invoicing</label>
                                <p className={styles.box1p}>Create invoices with flexibility and download them in PDF.</p>
                            </div>
                        </div>
                        <div className={styles.leftClass}>
                            <h2>Manage your bookings, your guests, and your invoices from one place: and for the lowest fee in
                                the market!</h2>
                            <p>Our rental management software is ideal for small entrepreneurs running a guest house, renting
                                pads in Airbnb, letting vacation homes or even office rooms! We understand many hotel and
                                channel management software out there take a big bite out of the small guy with high prices and
                                set up fees.</p>
                            <p>With Beehaz you can manage your rentals hassle-free, using one central calendar and CRM system to
                                view booking from the most beloved channels in the market, such as Airbnb, VRBO and Booking.com.
                                The best part is that you can start using our rental management system completely for free and
                                choose to add features for the lowest price in the market! </p>
                            <p>Sign up for our free plan or try out the paid version for 60 days (no credit card required)!</p>
                        </div>

                        <Link
                            className={`${styles.mainBut} mt-4`}
                            to={'/pricing'}
                            onClick={()=>dispatch(changeCurrentPage('Pricing'))}
                        >Check out our plans</Link>
                    </div>
                    <div className={styles.section1}>
                        <div className={styles.section1Left}>
                            <h2>Only the features you need</h2><br/>
                            <p>Beehaz's vacation rental and property management software is simple and intuitive to use and contains only the <Link
                                style={{textDecoration:'none',color:'#343436'}} to={'/features'}
                                onClick={()=>dispatch(changeCurrentPage('Features'))}>functionality</Link> you really need. We don't over complicate: no long tutorials, time-restrained demo versions, nor long in-person video calls. Beehaz takes only 5 minutes to set up and take bookings.</p>
                            <p>We are also not fan of setup fees, neither do we take commissions. You can sign up without ever entering credit card details. The best part? Our free version is free forever! Reservation system, invoice generator and CRM are all available in our Basic Plan. </p>
                            <p>Need a solution that links your calendar to online travel agencies (like Airbnb and Booking.com)? Our Plus Plan has you covered, and you can start trying it out right now for 60 days free of charge. Avoid double bookings and headaches - sign up today!</p>
                        </div>
                        <div className={styles.section1Right}>
                            <div className={`${styles.section1Img}`} style={{maxHeight: 'unset'}}>
                                <img
                                    src={desk}
                                    style={{borderRadius:'21px'}}
                                    alt={"desk.jpg"}
                                />
                           <div className={styles.imgLayout}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hubClass}>
                        <img src={round} className={styles.webView}/>
                        <img src={boxes} className={styles.mobileView}/>
                    </div>
                    <div className={styles.section3}>
                        <div className={`${styles.section3Left} ${styles.section3Info2}`}>
                            <h2 style={{marginTop:'15px'}}>Beehaz is your best fit when...</h2><br/>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}
                                    alt={"Beehaz Mobile friendly Property Management System”"}
                                />
                                <label className={`m-0 ${styles.textListcolor}`}>You are new to hospitality or rental management: "Just getting started"</label>
                            </div><br/>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>You want to grow your business: "existing solution is too expensive"</label>
                            </div><br/>
                            <div className={styles.section3Info}>
                                <img
                                    src={vector}/>
                                <label className={`m-0 ${styles.textListcolor}`}>You want an easy-to-use interface: "I want to view my bookings and upcomming guests with ease"</label>
                            </div><br/>
                        </div>
                        <div className={styles.section3Right}>
                            <div className={styles.section3ImgMobile}>
                                <img
                                    src={mobile}
                                    alt={"Beehaz Mobile friendly Property Management System"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.section5}>
                        <h1 className={styles.textCenter}>Don't just take our word for it: try it!</h1>
                        <h2 className={styles.textCenter}>Try for free. Cancel any time. No credit card required.</h2>

                        <div className={styles.videoDiv}>
                            <video
                                width="100%"
                                controls
                                loop
                                muted
                                preload={"auto"}
                                alt={"Easy to use rental management software"}
                            >
                                <source
                                    src="https://video.wixstatic.com/video/e30525_66592b5af6384254af3f3be3696cdc41/1080p/mp4/file.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                        <Link className={`${styles.mainBut} mt-4`} to={'/register'}>Try it for free now</Link>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
export default Home;
