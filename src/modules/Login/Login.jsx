import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import styles from './login.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import logo from '../../icons/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { oauthLoginUser, loginUser } from '../../general_redux/user/actions';
import ContactUs from '../Home/Containers/ContactUs';
import GoogleIcon from '../../icons/google_icon.png';
import BeehazIcon from '../../icons/BeehazLogo144.png';
import { Modal } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [viewContactUs, setViewContactUs] = useState(false);
  const [viewTokenEntryPoint, setViewTokenEntryPoint] = useState(false);
  const [token, setToken] = useState('');
  const loginStatus = useSelector(({ user }) => user && user.loginAction);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(email));
  };

  const oauthLogin = (e, source) => {
    e.preventDefault();
    dispatch(oauthLoginUser(source));
  };

  const setCookie = (name, value, expiration) => {
    var expires = '';
    if (expiration) {
      var date = new Date();
      date.setTime(date.getTime() + expiration * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const getCookie = (name) => {
    const value = document.cookie;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const saveCookie = () => {
    if (!getCookie('BeehazToken')) setCookie('BeehazToken', token, 365);
  };

  const tokenLogin = () => {
    const cookieToken = getCookie('BeehazToken');

    if (cookieToken) {
      setViewTokenEntryPoint(true);
      setToken(cookieToken);
    } else {
      setViewTokenEntryPoint(true);
    }
  };

  return (
    <div>
      <Header redirect />
      <ContactUs
        show={viewContactUs}
        onHide={() => {
          setViewContactUs(false);
        }}
      />
      <Modal
        show={viewTokenEntryPoint}
        onHide={() => {
          setViewTokenEntryPoint(false);
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className={styles.modalHeader}>
            Enter your Beehaz token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.deleteModalBody}>
          <div className={`input-group mb-3 ${styles.input_group}`}>
            <div className="input-group-prepend">
              <span className={`input-group-text ${styles.input_group_text}`} id="BeehazToken">
                Beehaz token:
              </span>
            </div>
            <input
              onChange={(e) => setToken(e.target.value)}
              value={token}
              className={`form-control ${styles.form_control}`}
              aria-label="token"
              aria-describedby="token"
              autoComplete="on"
            />
          </div>
          <div className={styles.login_socialmedia}>
            <Link to={`/verify/${token}`} className={`${styles.mainBtn} mt-4`} onClick={saveCookie}>
              Login
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-center">
        <div className={`${styles.mainContainer} ${styles.login}`}>
          <div className={` ${styles.login_wrapper} shadow`}>
            <div className="d-flex justify-content-center">
              <Link to="/">
                <img src={logo} className={styles.login_image} />
              </Link>
            </div>
            <div className={`d-flex justify-content-center ${styles.login_header}`}>
              <h5>User Login</h5>
            </div>
            <div className="d-flex justify-content-center">
              <form onSubmit={login}>
                <div className={`input-group mb-3 ${styles.input_group}`}>
                  <div className="input-group-prepend">
                    <span className={`input-group-text ${styles.input_group_text}`} id="emailAddress">
                      Email address:
                    </span>
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    className={`form-control ${styles.form_control}`}
                    aria-label="emailAddress"
                    aria-describedby="emailAddress"
                    autoComplete="on"
                    required
                  />
                </div>
                <div className={styles.center}>
                  <button className={styles.login_submit} type="submit" disabled={loginStatus.loading}>
                    {loginStatus.loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                          style={{ marginRight: '1em', height: '1.3em', width: '1.3em' }}
                        />
                        <span>Login</span>
                      </>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className={styles.login_separator}>------------------------- OR -------------------------</div>
            <div className="justify-content-center">
              <div className={styles.login_socialmedia}>
                <form onSubmit={(e)=>oauthLogin(e,"google")} source="google">
                  <button className={` ${styles.login_submit} ${styles.login_new_button}`}>
                    <img src={GoogleIcon} className={styles.google_icon} alt="Google Icon" />
                    Sign in with Google
                  </button>
                </form>
              </div>
              <div className={styles.login_socialmedia}>
                <form onSubmit={(e)=>oauthLogin(e,"facebook")} source="facebook">
                  <button className={` ${styles.login_submit} ${styles.login_new_button}`}>
                    <i className={`fa fa-facebook-f ${styles.fa_facebook}`} />
                    Sign in with Facebook
                  </button>
                </form>
              </div>
              <div className={styles.login_socialmedia}>
                <div>
                  <button onClick={tokenLogin} className={` ${styles.login_submit} ${styles.login_new_button}`}>
                    <img src={BeehazIcon} className={styles.beehaz_icon} alt="Beehaz Icon" />
                    Sign in using token
                  </button>
                </div>
              </div>
              <div className={styles.login_socialmedia}></div>
              <div className={styles.login_socialmedia}>
                <Link to="/register" className={styles.login_create}>
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer setViewContactUs={() => setViewContactUs(true)} />
    </div>
  );
}

export default Login;
