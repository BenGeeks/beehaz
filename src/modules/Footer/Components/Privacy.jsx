import React,{useEffect} from 'react';
import styles from'./general.module.css';
import Header from '../../Header/Header';
import Footer from '../Footer';

function Privacy(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Header/>
            <div className={`justify-content-center ${styles.container}`}>
                <div>
                    <div className={`${styles.headerTitle}`}>
                        Privacy Policy
                    </div>
                    <br/>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>1. General information</h4>
                        <p className={styles.para}>Yaz Häuser AG, which owns and operates <a
                            href={"/"}>www.beehaz.com </a> (“Beehaz”)
                            hereby provide an explanation about how we use your personal data when you visit our
                            website.</p>
                        <p className={styles.para}>
                            <strong>1.2</strong>
                            &nbsp;&nbsp;Beehaz will only store information that is entered by users themselves.
                            This may be personally identifiable information that Beehaz does not disclose or makes
                            available to third parties.
                            This is information is kept for the period the user maintains a subscription with us.
                        </p>
                        <p className={styles.para}>
                            <strong>1.3</strong>
                            &nbsp;&nbsp;Beehaz does not store credit card information or passwords.
                            These services are handled by secure third-party providers.
                        </p>
                        <p className={styles.para}>
                            <strong>1.4</strong>
                            &nbsp;&nbsp;The software is intended for persons who are 18 years of age or older (see Terms
                            of Services),
                            marketed to entrepreneurs, businesses and managers of hotel facilities or property
                            management firms.
                            We do not allow (knowingly) minors to use the software and for this reason do not collect
                            their data.
                        </p>
                        <p className={styles.para}>
                            <strong>1.5</strong>
                            &nbsp;&nbsp;Non-identifiable information is also gathered for analytical purposes through
                            cookies.
                            Please see the anonymized information section for more information.
                        </p>
                        <p className={styles.para}>
                            <strong>1.6</strong>
                            &nbsp;&nbsp;Beehaz is based in Switzerland and, as such, complies with the EU’s General Data
                            Protection Regulation (GDPR). We treat all user data,
                            independently of their location, with the same privacy compliance policy.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>2. Personally identifiable information</h4>
                        <p className={styles.para}>
                            <strong>2.1</strong>
                            &nbsp;&nbsp; Your data is collected when you provide us the information.
                            This can happen in various forms, including when you use a contact form to
                            communicate with us, create an account, send us an email, or write us in the chat.
                        </p>
                        <p className={styles.para}>
                            <strong>2.2</strong>
                            &nbsp;&nbsp;This data includes name of the account owner, email, name of the company, and
                            other
                            company-related information needed to provide the software services. Selected Beehaz
                            personnel and customer
                            service uses this data to be able to provide support to the user and the provision of
                            subscription.
                        </p>
                        <p className={styles.para}>
                            <strong>2.3</strong>
                            &nbsp;&nbsp;The data of the user’s company and personally identifiable information may be
                            deleted by
                            Beehaz with the deletion of the user’s account or upon request (with termination of
                            services).
                        </p>
                        <p className={styles.para}>
                            <strong>2.4</strong>
                            &nbsp;&nbsp;You have the right to receive information about the origin and nature of your
                            stored
                            personal data free of charge at any time. You also have the right to demand correction of
                            any error
                            in personal data, as well as blocking or deletion of personally identifiable data.
                            You can contact us at <a href="mailto:admin@beehaz.com" target="_blank">admin@beehaz.com</a> to address this Privacy Policy.
                        </p>
                        <p className={styles.para}>
                            <strong>2.5</strong>
                            &nbsp;&nbsp;Beehaz does not sell, distribute, or otherwise share your personally
                            identifiable
                            information to/with third parties. We do not pass on data without the user’s consent.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>3. Anonymized information</h4>
                        <p className={styles.para}>
                            <strong>3.1</strong>
                            &nbsp;&nbsp;Some information is collected automatically when you visit our website.
                            Such information is not personally identifiable and may be collected by us or third-party
                            providers
                            such as analytic tool providers or website hosting services. This information includes
                            mainly
                            technical dada (such as internet browser, operating system,
                            type of device, time a page was viewed, user’s geographical region and referrer URL).
                        </p>
                        <p className={styles.para}>
                            <strong>3.2</strong>
                            &nbsp;&nbsp;We collect such data to understand how users use our website, so we can analyse
                            and improve our services, to make Beehaz more intuitive and better adapted to the devices
                            and browsers the users use to access it.
                            Analysis of surfing behaviour is anonymised and cannot be traced back to you.
                        </p>
                        <p className={styles.para}>
                            <strong>3.3</strong>
                            &nbsp;&nbsp;To improve the loading time of our website and to collect such anonymous data
                            for analysis we may use cookies. These cookies are stored in your
                            browser and respect your privacy. Cookies do not harm your computer nor do they contain
                            viruses.
                        </p>
                        <p className={styles.para}>
                            <strong>3.4</strong>
                            &nbsp;&nbsp;Most cookies used are section cookies, which are automatically deleted
                            after your visit. Other cookies may be stored in your device until you manually delete
                            them from your browser.
                        </p>
                        <p className={styles.para}>
                            <strong>3.5</strong>
                            &nbsp;&nbsp;Banning cookies may make the website harder to navigate.
                            Cookies enable the successful delivery of information and optimize the services Beehaz
                            provides.
                        </p>
                        <p className={styles.para}>
                            <strong>3.6</strong>
                            &nbsp;&nbsp;More information about cookies can be found in our Cookie Policy: <a
                            href={"https://www.beehaz.com/cookie-policy"}
                            target={"_blank"}>https://www.beehaz.com/cookie-policy</a>.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>4. Security and updates to this policy</h4>
                        <p className={styles.para}>
                            <strong>4.1</strong>
                            &nbsp;&nbsp;We take care to make our website and software secure. In the event of a breach
                            of
                            the cloud storage we will inform all users and assist you in the process. In this event, you
                            will not have
                            your credit card or password information stolen, since we do not keep such information in
                            our database.
                        </p>
                        <p className={styles.para}>
                            <strong>4.2</strong>
                            &nbsp;&nbsp;Beehaz reserves the right to change the privacy policy at any time. We will make
                            our best
                            efforts to inform users about this change (via email or notice on our website).We recommend
                            users to check this policy regularly to understand how your privacy and data is being
                            handled.
                        </p>
                    </div>
                    <div className={`pt-2`}>
                        <h4 className={styles.headings}>5. Third parties</h4>
                        <p className={styles.para}>
                            <strong>5.1</strong>
                            &nbsp;&nbsp;Stripe handles Beehaz’s customer payments.
                            The payment details you entered are transmitted to and may be stored by Stripe. More
                            information
                            about Stripe’s privacy policy can be found here: <a
                            href={"https://stripe.com/en-ch/privacy"} target={"_blank"}>https://stripe.com/en-ch/privacy</a>
                        </p>
                        <p className={styles.para}>
                            <strong>5.2</strong>
                            &nbsp;&nbsp; Google analytics is used to track anonymized data from users browsing our
                            website.
                            They use cookies to provide us the analytical information about user surfing when on our
                            website.
                            Please note Google’s policy may be different for users based in Europe than those in other
                            regions.
                            More information about Google’s privacy policy can be found here:
                            <a href={"https://support.google.com/analytics/topic/2919631?hl=en&ref_topic=1008008"}
                               target={"_blank"}>https://support.google.com/analytics/topic/2919631?hl=en&ref_topic=1008008</a>
                        </p>
                        <p className={styles.para}>
                            <strong>5.3</strong>
                            &nbsp;&nbsp;We use AWS to host our cloud services securely. For more information about
                            AWS’s privacy policy, please check:
                            <a href={"https://aws.amazon.com/compliance/data-privacy-faq/"}
                               target={"_blank"}>https://aws.amazon.com/compliance/data-privacy-faq/</a>
                        </p>
                    </div>
                </div>
            </div>
            <br/>
            <Footer/>
        </>
    )
}


export default Privacy;