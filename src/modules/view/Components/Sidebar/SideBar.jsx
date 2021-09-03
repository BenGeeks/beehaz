import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import calendar from '../../../../icons/calendar-alt-regular.svg';
import address from '../../../../icons/address-book-regular.svg';
import hotel from '../../../../icons/inquiries-icon.svg';
import invoice from '../../../../icons/file-invoice-dollar-solid.svg';
import styles from './sidebar.module.css';

const Side = () => {
  const links = [
    { lable: 'Calendar', img: calendar, to: '/view/calendar', fa: 'fa fa-calendar' },
    { lable: 'Guests', img: address, to: '/view/guest', fa: 'fa fa-address-book' },
    { lable: 'Inquiries', img: hotel, to: '/view/inquiry', fa: 'fa fa-list-alt' },
    { lable: 'Invoices', img: invoice, to: '/view/invoice', fa: 'fa fa-file' },
  ];
  return (
    <>
      <Nav className="d-none d-md-none d-lg-block sidebar" activeKey="/view">
        <div className="sidebar-sticky"></div>
        {links &&
          links.map((item) => (
            <Nav.Item className={`d-flex justify-content-center ${styles.navItem}`}>
              <NavLink
                to={item.to}
                activeClassName={styles.isActive}
                className={`w-100 d-flex flex-column align-items-center ${styles.linkMenu}`}
              >
                {/* <img src={item.img} className={styles.sidebar_img} /> */}
                <i className={`${item.fa} ${styles.icons}`}></i>
                <div className={`${styles.sidebar_link} text-center`}>{item.lable}</div>
              </NavLink>
            </Nav.Item>
          ))}
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
