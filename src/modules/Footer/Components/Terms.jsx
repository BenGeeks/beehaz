import React,{useEffect} from 'react';
import styles from'./general.module.css';
import Header from '../../Header/Header';
import Footer from '../Footer';

function Terms(props){

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return(
        <>
            <Header/>
                <div className={`d-flex justify-content-center ${styles.container}`}>
                    <div>
                        <div className={`${styles.headerTitle}`}>
                            Terms of Service
                        </div>
                        <br/>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>1. Scope of application and acceptance of terms</h4>
                            <p className={styles.para}>Yaz Häuser AG, which owns and operates www.beehaz.com (“Beehaz”) and you, the user, enter this agreement subject to the following Terms of Service. The terms govern your contractual relationship with Beehaz, including but not limited to your use of Beehaz’s website (www.beehaz.com), as well as your use of the software of Beehaz as a software provider, including the free version, free trial access, and paid version. If you are accessing Beehaz on behalf of a company or other entity, you represent and warrant that you are authorized to bind such entity to the provisions hereof.
                                Beehaz provides services and solutions for the rental and hospitality industries over the internet, especially aimed at small and medium sized property management companies, boutique hotels or rental businesses and entrepreneurs in general.
                                By creating an account in the Beehaz website you are subscribing to our services and accepting the Terms of Services (also referred to as “the terms”). Please read them carefully as they intend to explain our obligations as a software services provider and your obligations as a user. When you accept these Terms of Service, you also agree to the provisions of our Privacy Policy <a href={"https://www.beehaz.com/privacy-policy"} target="_blank">https://www.beehaz.com/privacy-policy</a>.
                                Beehaz reserves the right to update and change the Terms of Service by posting updates and changes to the Beehaz website. Beehaz will make the best effort to communicate these changes via email or through the website in advance. You are, however, advised to check the Terms of Service regularly for any updates or changes that may impact you, and if you do not accept eventual amendments, you must cease using the services.</p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>2. Scope of services and delivery</h4>
                            <p className={styles.para}>
                                <strong>2.1</strong>
                                &nbsp;&nbsp;Beehaz will provide the software over the internet.
                                Beehaz will grant you access and use of the software according to your subscription or plan type.
                                This right is non-exclusive and non-transferable.
                            </p>
                            <p className={styles.para}>
                                <strong>2.2</strong>
                                &nbsp;&nbsp;While Beehaz intends that the Software should be available without interruptions,
                                it is possible that on occasion it might be unavailable due to maintenance or other development activity.
                                Beehaz will make the best efforts to notify the user of any expected or unexpected interruptions.
                            </p>
                            <p className={styles.para}>
                                <strong>2.3</strong>
                                &nbsp;&nbsp;Beehaz shall be entitled to modify and adapt the content of its services,
                                including the software provided, in the context of user-related,
                                technological or substantive further developments,
                                provided that the agreed functionalities of the software are not substantially restricted thereby.
                            </p>
                            <p className={styles.para}>
                                <strong>2.4</strong>
                                &nbsp;&nbsp;We notify users about updates in our plans, policies and features vie email.
                                The user consents to receiving communications from us electronically (via chat,
                                email or notices on Beehaz’s website and software) about these changes and also
                                in the case support is required by the user.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>3. Use of the software</h4>
                            <p className={styles.para}>
                                <strong>3.1</strong>
                                &nbsp;&nbsp;You will ensure that all usernames, passwords, and tokens required to access the software are kept secure and confidential.
                            </p>
                            <p className={styles.para}>
                                <strong>3.2</strong>
                                &nbsp;&nbsp;You will not attempt to undermine the security or integrity of Beehaz’s computing systems, networks or third party’s computer systems and networks where the software is hosted.
                                You will also not attempt misuse the Beehaz software or website or impair the ability of any other user.
                                This includes not transmit or input into the software any files that might damage any person’s computer or software, or any unlawful data (including copyright materials you do not have the right to use).
                                You further agree not to modify, copy, adapt, reproduce, or reverse engineer the software.
                                You will not attempt to access the software, related code, or any portion of the services.
                            </p>
                            <p className={styles.para}>
                                <strong>3.3</strong>
                                &nbsp;&nbsp;You may not use any data mining, robots, or similar data gathering tools or otherwise exploit your access to the Services for any commercial purpose.
                                You may not use any of the trademarks, logos, or other proprietary graphics without express written permission, which may be denied in our absolute discretion.
                                Beehaz’s logos and product and service names are trademarks.
                            </p>
                            <p className={styles.para}>
                                <strong>3.4</strong>
                                &nbsp;&nbsp;You agree to use the software in compliance with laws and regulations of Switzerland and your country or region.
                            </p>
                            <p className={styles.para}>
                                <strong>3.5</strong>
                                &nbsp;&nbsp;If you are based in the European Union or European Economic Area, or offer your products or services to EU/EEA residents,
                                you are responsible to comply with data privacy laws (including the General Data Protection Regulation).
                            </p>
                            <p className={styles.para}>
                                <strong>3.6</strong>
                                &nbsp;&nbsp;In the case of technical problems you can contact support through our chat or email us at <a href="mailto:admin@beehaz.com" target="_blank">admin@beehaz.com</a>.
                            </p>
                            <p className={styles.para}>
                                <strong>3.7</strong>
                                &nbsp;&nbsp;You are responsible for all information, data, text, messages or other materials that you post or otherwise transmit via Beehaz’s software.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>4. Terms of payment, account deletion, and refund</h4>
                            <p className={styles.para}>
                                <strong>4.1</strong>
                                &nbsp;&nbsp;Beehaz offers a free plan and a paid plan.
                                Upon creating an account, you shall be able to access all features of the paid plan for a
                                limited amount of time (“free trial”). To continue using the paid plan features,
                                you should add the payment information under the user’s settings in your account.
                                Failing to do so before the ending of the free trial will result in a downgrade of the account,
                                and you shall only be able to access the free plan features.
                                An account downgrade may result in the loss of connection to third party systems, and loss of information input by you.
                                Beehaz shall not be held liable by any losses your business may incur as a result.
                            </p>
                            <p className={styles.para}>
                                <strong>4.2</strong>
                                &nbsp;&nbsp;Your subscription and billing are handled by a secure third-party provider.
                                Beehaz does not store any credit card information from users.
                                All invoices are generated electronically,
                                and Beehaz shall continue invoicing you monthly or yearly until you terminate the Services Agreement.
                            </p>
                            <p className={styles.para}>
                                <strong>4.3</strong>
                                &nbsp;&nbsp;Your subscription will renew automatically for a subscription term equivalent to the
                                last subscription term (one month or one year).  You acknowledge and agree that unless you
                                terminate the Services Agreement or downgrade your plan to the free plan,
                                you shall be charged automatically in the next billing period.
                            </p>
                            <p className={styles.para}>
                                <strong>4.4</strong>
                                &nbsp;&nbsp;No refunds shall be issued for partial use or non-use of the services.
                            </p>
                            <p className={styles.para}>
                                <strong>4.5</strong>
                                &nbsp;&nbsp;We will notify you if we do not receive the payment in due time.
                                If we do not receive the payment by due date, we may terminate your account or block the services.
                                Beehaz shall not be liable for any business losses you may incur due to a blocked account.
                            </p>
                            <p className={styles.para}>
                                <strong>4.6</strong>
                                &nbsp;&nbsp;You are responsible for paying the taxes to your government authorities,
                                Beehaz does not collect taxes on your or your government’s behalf.
                            </p>
                            <p className={styles.para}>
                                <strong>4.7</strong>
                                &nbsp;&nbsp;If you wish to terminate your services immediately,
                                you can do so by deleting your account under the user settings.
                                Please note that we do not issue refunds shall you decide to delete your account.
                                Once the user deletes the account,
                                your data cannot be restored as it will be deleted from the Beehaz’s system immediately.
                            </p>
                            <p className={styles.para}>
                                <strong>4.8</strong>
                                &nbsp;&nbsp;The user understands Beehaz may cancel a subscription and terminate the service
                                provision if you breach the Terms of Service effected immediately.
                                Beehaz reserves the right to refuse service, terminate accounts, remove, or edit content,
                                or cancel orders in its sole discretion.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>5. Change of subscription plan and end of trial period</h4>
                            <p className={styles.para}>
                                <strong>5.1</strong>
                                &nbsp;&nbsp;You may upgrade or downgrade your plan(s) at any time in the user settings.
                                In the case of an upgrade, you shall be billed according to your chosen period (monthly or yearly)
                                and shall be granted access to the paid plan features, as described on the website at the time of commencement.
                                In the case of a downgrade, the changes will take effect at the expiration date of the period you have already paid for.
                            </p>
                            <p className={styles.para}>
                                <strong>5.2</strong>
                                &nbsp;&nbsp; You understand that downgrading may cause loss of content,
                                features or capacity of the services as available to you.
                                We shall not be liable for any loss resulting from downgrading the account plan.
                            </p>
                            <p className={styles.para}>
                                <strong>5.3</strong>
                                &nbsp;&nbsp;You understand that when you create an account at Beehaz,
                                you automatically enter the trial version of the paid plan. During the trial version you will
                                be able to access all features of the paid plan free of charge.
                                If you wish to continue using all software features,
                                you should upgrade your account in the user settings and place your payment information accordingly.
                            </p>
                            <p className={styles.para}>
                                <strong>5.4</strong>
                                &nbsp;&nbsp;Beehaz makes all best efforts to ensure you are notified of the approaching
                                end of the trial period, but you understand it is your responsibility to upgrade the account
                                before the trial period expires.
                            </p>
                            <p className={styles.para}>
                                <strong>5.5</strong>
                                &nbsp;&nbsp;Upon the end of trial periods, you understand that unless you opt for the paid plan,
                                you will be automatically downgraded. You understand that the downgrading of the account may result
                                in loss of data and connection to third-party calendars.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>6. Confidentiality and data collection</h4>
                            <p className={styles.para}>
                                <strong>6.1</strong>
                                &nbsp;&nbsp;The security of your personal information is important to us.
                                Beehaz uses information that you provide us to administer our business activities,
                                monitor the use of the services provided to you, and improvement of our content and service offerings.
                                Personally identifiable information will not be shared with third parties except as
                                required by law or to provide services with your consent.
                            </p>
                            <p className={styles.para}>
                                <strong>6.2</strong>
                                &nbsp;&nbsp;We collect information by using cookies to speed the loading time of our services.
                                Cookies do not enable Beehaz to access personal information about you. We store only the personal
                                information provided by you and use it to offer our services through the duration of the subscription.
                            </p>
                            <p className={styles.para}>
                                <strong>6.3</strong>
                                &nbsp;&nbsp;If you desire to have your personally identifiable information deleted when you
                                terminate our services, you may request it by emailing us at <a href="mailto:admin@beehaz.com" target="_blank">admin@beehaz.com</a>.
                            </p>
                            <p className={styles.para}>
                                <strong>6.4</strong>
                                &nbsp;&nbsp;Beehaz is not responsible for practices employed by third-party websites, including those linked to our website,
                                nor is Beehaz liable for third-party content and data collection policies. We suggest our users check the privacy policies of those third-party
                                websites for more information on how they handle user data.
                            </p>
                            <p className={styles.para}>
                                <strong>6.5</strong>
                                &nbsp;&nbsp; By using Beehaz you consent to our collection and use of your data as described in our Privacy Policy.
                                We reserve the right to amend the Privacy Policy at any time and without prior notice.
                            </p>
                            <p className={styles.para}>
                                <strong>6.6</strong>
                                &nbsp;&nbsp; You agree that Beehaz is entitled to access the user accounts and to make changes within the scope of support.
                            </p>
                            <p className={styles.para}>
                                <strong>6.7</strong>
                                &nbsp;&nbsp;Beehaz does not store passwords. Loging into your account is only possible via email token or third-party providers (such as Google and Facebook).
                                Beehaz also does not store payment or credit card information.
                            </p>
                            <p className={styles.para}>
                                <strong>6.8</strong>
                                &nbsp;&nbsp;Your data will be stored and processed in Europe.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>7. Intellectual property and loss of data</h4>
                            <p className={styles.para}>
                                <strong>7.1</strong>
                                &nbsp;&nbsp;Your input and data are your property,
                                but access to the data is contingent on subscription payments in case of a paid subscription plan.
                                Beehaz reserves the right to withhold your data without notice if termination of subscription is due to your non-payment.
                            </p>
                            <p className={styles.para}>
                                <strong>7.2</strong>
                                &nbsp;&nbsp; Upon termination of services, your right to access your data immediately ceases.
                                Beehaz shall not maintain or forward any data after a termination of services.
                            </p>
                            <p className={styles.para}>
                                <strong>7.3</strong>
                                &nbsp;&nbsp;You understand that by deleting your account your data and input shall be deleted immediately.
                                Beehaz will not be able to restore data lost due to deletion.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>8. Warranties and liability</h4>
                            <p className={styles.para}>
                                <strong>8.1</strong>
                                &nbsp;&nbsp;Beehaz gives no warranty about the software.
                                We do not warrant that the software will meet your requirements or business purposes.
                                We make all best efforts to provide our services 24/7,
                                but Beehaz cannot warrant the service will be uninterrupted, timely, and error-free.
                            </p>
                            <p className={styles.para}>
                                <strong>8.2</strong>
                                &nbsp;&nbsp;You understand Beehaz connects to third-party calendars via iCal.
                                Beehaz has no control over the synchronization speed of third-party calendars.
                                Random delays can occur which may result in double bookings. Beehaz makes the best
                                effort to ensure synchronization but cannot warrant double bookings do not occur and
                                shall not be liable for losses that may result from such events
                            </p>
                            <p className={styles.para}>
                                <strong>8.3</strong>
                                &nbsp;&nbsp;You are also solely responsible for the accuracy and currency of the data entered
                                into the software under your user account. You agree to indemnify and hold Beehaz harmless
                                from and against any claim related to content, accuracy, or currency of the information you provide through the software.
                            </p>
                            <p className={styles.para}>
                                <strong>8.4</strong>
                                &nbsp;&nbsp;Beehaz is not liable for any disruption to the availability caused by the customer,
                                the access provider, the telecommunication service provider, or the mobile telephone provider of the
                                customer or other third parties attributable to the sphere of the customer.
                                Beehaz is also not liable for interruption of services due to force majeure.
                            </p>
                            <p className={styles.para}>
                                <strong>8.5</strong>
                                &nbsp;&nbsp;Beehaz is not liable for any disturbances in the connections to booking channels caused by
                                changes in the booking channels or inadequate response times of the internet pages.
                            </p>
                            <p className={styles.para}>
                                <strong>8.6</strong>
                                &nbsp;&nbsp;Beehaz shall be liable, in accordance with Swiss Law, for damage to the customer caused by wilful
                                or grossly negligent behaviour of B
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>9. Changes to the software and prices</h4>
                            <p className={styles.para}>
                                <strong>9.1</strong>
                                &nbsp;&nbsp;Beehaz is entitled to make changes to the website, software,
                                features and plans. Beehaz shall issue notices for substantial changes to it’s policies and offers,
                                as well as to any changes in offered features and prices.
                            </p>
                            <p className={styles.para}>
                                <strong>9.2</strong>
                                &nbsp;&nbsp;Any price changes shall be communicated in good time prior to the change.
                                If you do not agree to the changes, you shall have time to cancel the subscription.
                                If you do not cancel your subscription or contact us in writing, the changes shall be deemed accepted.
                            </p>
                        </div>
                        <div className={`pt-2`}>
                            <h4 className={styles.headings}>10. Governing law jurisdiction and copyright infringement</h4>
                            <p className={styles.para}>
                                <strong>10.1</strong>
                                &nbsp;&nbsp;This Agreement shall be governed by the laws of Switzerland and it’s Canton
                                of Lucerne. This jurisdiction is the registered office of Beehaz.
                            </p>
                            <p className={styles.para}>
                                <strong>10.2</strong>
                                &nbsp;&nbsp;Beehaz does not tolerate content that appears to infringe any copyright or other
                                intellectual property rights or otherwise violates these Terms of Service and will respond to notices
                                of alleged copyright infringement that comply with the law and are properly provided to us.
                                Such notices can be reported by contacting us at <a href="mailto:admin@beehaz.com" target="_blank">admin@beehaz.com</a>.
                            </p>
                        </div>
                    </div>
            </div>
            <br/>
            <Footer/>
        </>
    )
}

export default Terms;