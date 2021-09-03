import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MailingList from '../Home/Containers/MailingList';
import styles from '../Home/homeDesign.module.css';
import AboutUS from '../AboutUs/aboutUs';
import ContactUs from '../Home/Containers/ContactUs';

function Footer(props) {
  const [viewMailing, setViewMailing] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [viewContactUs, setViewContactUs] = useState(false);
  return (
    <>
      <MailingList
        show={viewMailing}
        onHide={() => {
          setViewMailing(false);
        }}
      />
      <AboutUS
        show={viewAbout}
        onHide={() => {
          setViewAbout(false);
        }}
        setMailModal={() => {
          setViewAbout(false);
          setViewMailing(true);
        }}
        setViewContactUs={() => {
          setViewAbout(false);
          setViewContactUs(true);
        }}
      />
      <ContactUs
        show={viewContactUs}
        onHide={() => {
          setViewContactUs(false);
        }}
      />
      <div className={styles.footerDiv}>
        <div className={styles.footerSection1}>
          <div className={styles.footerSection1inner}>
            <Link to={'/contact_us'} className={styles.footer_links}>
              Contact
            </Link>
            <a onClick={() => setViewAbout(true)} className={styles.footer_links}>
              About us
            </a>
          </div>
          <div className={styles.footerSection1inner}>
            <a className={styles.footer_links}>Resources</a>
            <a className={styles.footer_links}>Sitemap</a>
          </div>
          <div className={styles.footerSection1inner3}>
            <img src="https://static.wixstatic.com/media/e30525_f12b8c35f7b34fcfafdde1cfe42a5ac0~mv2.png/v1/crop/x_118,y_82,w_780,h_218/fill/w_118,h_32,al_c,q_85,usm_0.66_1.00_0.01/logo-nobackground-1000.webp" />
            <span className={styles.footerIcontext}>Operated by Yaz Häuser AG </span>
          </div>
        </div>
        <div className={styles.footerSection2}>
          <div className={styles.footerSection1inner}>
            <Link className="mx-1" to={'/terms'}>
              Terms of Service
            </Link>
          </div>
          |
          <div className={styles.footerSection1inner}>
            <Link className={'mx-1'} to={'/privacy-policy'}>
              Privacy Policy
            </Link>
          </div>
          |
          <div className={styles.footerSection1inner}>
            <Link className={'mx-1'} to={'/cookie-policy'}>
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className={styles.copyRightsdiv}>
          <span className={styles.copyRightsdivinner}>
            Copyright © 2021{` `}
            <a
              href="https://beehaz.com/"
              target="_blank"
              data-content="https://beehaz.com/"
              data-type="external"
              rel="nofollow noopener"
              style={{color:'#989696'}}
            >
              BeeHaz
            </a>
            . All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
