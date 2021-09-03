import React, {useState,useRef,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import styles from '../Home/homeDesign.module.css';
import {changeCurrentPage} from '../../general_redux/actions';

function Header(props) {
  const dispatch=useDispatch();
  const refElem=useRef();
  const [mobileView,setMobileView]=useState(false);
  const [defferedPrompt, setDefferedPrompt] = useState(null);
  const myLink=useSelector(({general})=>general && general.currentRoute);
  const nav=[{
      val:'Home',
      to:'/'
  }, {
      val:'Pricing',
      to:'/pricing',
  }, {
      val:'Features',
      to:'/features'
  }];

  useEffect(() => {
      function handler(event) {
          if(!refElem.current?.contains(event.target)){
              setMobileView(false);
          }
      }
      window.addEventListener('click', handler)
      return () => window.removeEventListener('click', handler)
  }, [])

  // WPA Install Prompt - START//
  
  window.addEventListener('beforeinstallprompt', event => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    setDefferedPrompt(event);
    return false;
  })

  const pwaInstall = () => {
    if (defferedPrompt) {
      defferedPrompt.prompt().then( result => {
          if (result.outcome === 'dismissed') {
            console.log('The user has cancelled the installation');
          } else {
            console.log('The user installed the app');
          }
        })
    }
    setDefferedPrompt(null);
  }

  // WPA Install Prompt - END//

  return (
      <>
          <div className={`${styles.headerDiv}`} ref={refElem}>
              <div className={`${styles.headerDivInner} ${styles.container}`}>
                  <div className={`${styles.mainLogo}`}>
                      <img
                          src="https://static.wixstatic.com/media/e30525_75788534561c4d29b463770cec76ddb4~mv2.png/v1/fill/w_285,h_57,al_c,q_85,usm_0.66_1.00_0.01/Logo_Beehaz%20yellow%20ee.webp"/>
                  </div>
                  <div className={`${styles.mainMenu} ${styles.webView}`}>
                      {myLink && nav.map((link, index)=>(
                          <div key={index}>
                              <Link
                                onClick={()=>dispatch(changeCurrentPage(link.val))}
                                className={`${styles.menuList} ${(link.val===myLink)?styles.active:""}`}
                                to={link.to}
                              >
                                  {link.val}
                              </Link>
                          </div>
                      ))}
                  </div>

                  <Link className={`${styles.signInBtn} ${styles.webView}`} to={'/login'} onClick={pwaInstall}>Sign in</Link>
                  <div className={`${styles.mobileView}`}>
                  <div className={styles.mobileMenubtn} onClick={()=>setMobileView(!mobileView)}><i className="fas fa-bars"/></div>
                  <div className={`${styles.mobileViewmenu} ${mobileView?styles.show:""}`}>
                      <div className={`${styles.mainMenu} ${styles.mobileView}`}>
                          {myLink && nav.map((link, index)=>(
                              <div key={index}>
                                  <Link
                                      onClick={()=>dispatch(changeCurrentPage(link.val))}
                                      className={`${styles.menuList} ${(link.val===myLink)?styles.active:""}`}
                                      to={link.to}
                                  >
                                      {link.val}
                                  </Link>
                              </div>
                          ))}
                      </div>
                      <Link className={`${styles.signInBtn} ${styles.mobileView}`} to={'/login'} onClick={pwaInstall}>
                          Sign in
                      </Link>
                  </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default Header;
