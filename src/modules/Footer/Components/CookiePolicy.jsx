import React,{useEffect} from 'react';
import styles from'./general.module.css';
import Header from '../../Header/Header';
import Footer from '../Footer';

function CookiePolicy(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div style={{color:`rgb(52, 52, 54)`}}>
            <Header/>
            <div className={`justify-content-center ${styles.container}`}>
                <div>
                    <div className={`${styles.headerTitle}`}>
                        Cookie Policy
                    </div>
                    <br/>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>1. General information</h4>
                        <p className={styles.para}>Yaz Häuser AG, which owns and operates <a
                            href={"/"}>www.beehaz.com </a> (“Beehaz”)
                            hereby provide an explanation about how we use cookies when you visit our website.
                        </p>
                        <p className={styles.para}>
                            <strong>1.2</strong>
                            &nbsp;&nbsp;Cookies are text files which store pieces of information. They are stored
                            in your browser when a website is loaded. They help a website function properly and enable a better user experience.
                            They also help service providers like Beehaz to analyse how to improve our services.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>2. Types of cookies and how they are used</h4>
                        <p className={styles.para}>
                            <strong>2.1</strong>
                            &nbsp;&nbsp; Beehaz may use cookies of
                            our own that only collect anonymous data necessary for the proper functioning of our website.
                        </p>
                        <p className={styles.para}>
                            <strong>2.2</strong>
                            &nbsp;&nbsp;Third-party cookies can also be used to help us understand how the website performs
                            and your interaction with our system. This way, we may make the necessary improvements to our
                            interface to improve the user experience by making our website more intuitive.
                        </p>
                        <p className={styles.para}>
                            <strong>2.3</strong>
                            &nbsp;&nbsp;Cookies can be necessary or used for analytics. Necessary cookies are used to maintain
                            user sessions and maintain security. They do not collect personal information.
                            Analytical cookies help us know how many visitors our website receives daily,
                            which URL referred them to us, the browser the user is using, and the type of device.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>3. Cookie consent and deletion</h4>
                        <p className={styles.para}>
                            <strong>3.1</strong>
                            &nbsp;&nbsp;If you already have consented, you can withdraw your consent at any time for
                            the cookie installation. Please note this will not affect the necessary cookies the website
                            needs to maintain basic functionality.
                        </p>
                        <p className={styles.para}>
                            <strong>3.2</strong>
                            &nbsp;&nbsp;You can delete cookies from your browser any time.
                            You can do this usually in the browser settings.
                            Please check the instructions from your browser provider for more information.
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}


export default CookiePolicy;