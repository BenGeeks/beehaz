import React, {useState} from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import styles from './topbar.module.css';
import logo from '../../../../icons/Logo_B_200a.png';
import address from '../../../../icons/address-book-regular.svg';
import help from '../../../../icons/question-circle.svg';
import person from '../../../../icons/person-lines.svg';
import calendar from '../../../../icons/calendar-alt-regular.svg';
import settingIcon from '../../../../icons/cog-solid.svg';
import rentalB from '../../../../icons/building-solid.svg';
import rates from '../../../../icons/comment-dollar-solid.svg';
import hotel from '../../../../icons/inquiries-icon.svg';
import invoice from '../../../../icons/file-invoice-dollar-solid.svg';
import channel from '../../../../icons/channel management.svg';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../../general_redux/user/actions';

function TopBar() {
  const links = [
    { lable: 'Rentals', img: rentalB, to: '/view/rentals', icon: 'fas fa-home' },
    { lable: 'Rates', img: rates, to: '/view/rates', icon: 'fas fa-tags' }, // fa-money
    { lable: 'Settings', img: settingIcon, to: '/view/settings', icon: 'fa fa-cog' },
    { lable: 'Inquiries', img: hotel, to: '/view/inquiry', fa: 'fa fa-list-alt',display:true },
    { lable: 'Invoices', img: invoice, to: '/view/invoice', fa: 'fa fa-file',display:true },
    { lable: 'Channel', img: channel, to:'/view/channel', icon:'fas fa-project-diagram'},
  ];
  const sideLinks = [
    { lable: 'Calendar', img: calendar, to: '/view/calendar', fa: 'fa fa-calendar' },
    { lable: 'Guests', img: address, to: '/view/guest', fa: 'fa fa-address-book' },
    { lable: 'Inquiries', img: hotel, to: '/view/inquiry', fa: 'fa fa-list-alt',display:true },
    { lable: 'Invoices', img: invoice, to: '/view/invoice', fa: 'fa fa-file',display:true },
  ];

  const user = useSelector(({ user }) => user && user.user);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutUser());
  };

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" className={styles.topBarPanel}>
        <Navbar.Brand className="mr-0" href="/view">
          <div className="d-none d-xl-block  d-lg-block">
            <img src={logo} className={styles.logoHeader} />
          </div>
          <div className={`d-flex d-xl-none d-xs-none  d-lg-none justify-content-between ${styles.header_sm_menu}`}>
            <img src={logo} className={styles.logoHeader} />
            <div className="d-flex">
              {sideLinks &&
                sideLinks.map((item) => (
                  <Nav.Item className={`${(item.display)?styles.hideLinks:styles.side_links}`}>
                    <NavLink
                      to={item.to}
                      activeClassName={styles.side_links__isActive}
                      className={`w-100 d-flex flex-column align-items-center text-decoration-none`}
                    >
                      {/* <img src={item.img} className={styles.sidebar_img} width="34px" height="24px" /> */}
                      <i className={`${item.fa} ${styles.sidebar_icons}`}/>
                    </NavLink>
                  </Nav.Item>
                ))}
            </div>
          </div>
        </Navbar.Brand>
        <div onClick={() => setToggle(!toggle)}>
          <Navbar.Toggle className={`${styles.toggle} ${toggle ? styles.rotate : null}`} aria-controls="responsive-navbar-nav " />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`mr-auto ${styles.topLinkContainer}`}>
            {links &&
              links.map((item, i) => (
                <NavLink
                  to={item.to}
                  className={`${(item.display)?styles.topLinkHide:styles.topLink}`}
                  key={`topMenu_${i}`}
                  activeClassName={styles.isActive}
                >
                  <div className={styles.linkcontainer}>
                    {(
                        <div className={styles.iconStyle}>
                          <i className={`${item.icon} ${styles.icon}`}/>
                        </div>
                    )}
                    <span className={styles.topLinkText} style={{fontWeight:'bold'}}>{item.lable}</span>
                  </div>
                </NavLink>
              ))}
          </Nav>
          <Nav className={styles.navbar2}>
            <img src={help} className={styles.imgStyle} />
            <img src={person} className={styles.imgStyle} />
            <div className={styles.dropdownBox}>
              <NavDropdown title={user.name} id="collapsible-nav-dropdown" className={styles.dropdownStyle}>
                <NavDropdown.Item id="settings" className={styles.dropDownBox2}>
                  <div className={styles.dropdownItemStyle}>
                    <Link to="/view/userSetting" className={styles.dropdownItemStyle}>
                      User Settings
                    </Link>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item id="logout" onClick={logOut} className={styles.dropDownBox2}>
                  <div className={styles.dropdownItemStyle}>Logout</div>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className={styles.hiddenLink}>
              <NavLink to="/view/userSetting" activeClassName={styles.isActive} className={styles.hiddenNavLink}>
                <div className={styles.hiddenLinkItem}>User Settings</div>
              </NavLink>
              <div className={styles.hiddenLinkItem}>
                <div onClick={logOut}>Logout</div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default TopBar;
