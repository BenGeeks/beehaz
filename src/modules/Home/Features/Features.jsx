import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './features.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import vector from '../../../icons/VectorCheck.png';
import {onLoad} from "../../../general_redux/actions";

function Features(props){
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(onLoad());
        window.scrollTo(0, 0);
    }, []);

    return(
        <>
            <Header/>
            <div className={styles.featuresMain}>
                <h1 className={`mb-5`}>The features you need in a rental management software</h1>
                <div className={styles.featuresMainlists}>
                    <div className={styles.featuresMainlistsheader}>
                        <div className={styles.col1}>
                            <span>Front desk system</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Basic Plan</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Plus Plan</span>
                        </div>
                    </div>
                    <div className={styles.featuresMainlistsbody}>
                    <div className={styles.featuresMainlistsbodyinner}>
                        <div className={styles.col1}>
                            <span>Add and change bookings</span>
                        </div>
                        <div className={styles.col2}>
                            <img src= {vector}/>
                        </div>
                        <div className={styles.col2}>
                            <img src= {vector}/>
                        </div>
                    </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Block rooms</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Set check-in/out times</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Make notes of special requests</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Change colour of bookings</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Infinite scroll for ease of viewing</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Guest information at a glance</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Channel manager (iCal)</span>
                            </div>
                            <div className={styles.col2}>

                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.featuresMainlists}>
                    <div className={styles.featuresMainlistsheader}>
                        <div className={styles.col1}>
                            <span>Guest management (CRM)</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Basic Plan</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Plus Plan</span>
                        </div>
                    </div>
                    <div className={styles.featuresMainlistsbody}>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Save guest details</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Check past bookings</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.featuresMainlists}>
                    <div className={styles.featuresMainlistsheader}>
                        <div className={styles.col1}>
                            <span>Rate and rental management</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Basic Plan</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Plus Plan</span>
                        </div>
                    </div>
                    <div className={styles.featuresMainlistsbody}>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Set currency and availability</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Rates calendar</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Tax and fee setting</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.featuresMainlists}>
                    <div className={styles.featuresMainlistsheader}>
                        <div className={styles.col1}>
                            <span>Invoicing and direct payments</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Basic Plan</span>
                        </div>
                        <div className={styles.col2}>
                            <span>Plus Plan</span>
                        </div>
                    </div>
                    <div className={styles.featuresMainlistsbody}>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Flexible invoicing</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Invoice history</span>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Emailing invoices</span>
                            </div>
                            <div className={styles.col2}>

                            </div>
                            <div className={styles.col2}>
                                <img src= {vector}/>
                            </div>
                        </div>
                        <div className={styles.featuresMainlistsbodyinner}>
                            <div className={styles.col1}>
                                <span>Receiving direct payments (Stripe)</span>
                            </div>
                            <div className={styles.col2}>

                            </div>
                            <div className={styles.col2}>
                                <img
                                    src= {vector}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <Link className={`${styles.mainBut} mt-4`} to={'/register'}>Get started!</Link>
                <br/>
                <Footer/>
            </div>

        </>
    )
}

export default Features;