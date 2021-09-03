import React,{useState} from 'react';
import styles from './cookieConsent.module.css';
import {useSelector} from "react-redux";

function CookieConsent(props){
    const [show,setShow]=useState(()=>checkCookie());
    const token = useSelector(({user})=>user && user.user && user.user.authToken);

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        console.log("called");
        let appCookie = getCookie(`${props.cookieName}`);
        return appCookie === "";
    }

    const handleAccept=()=>{
        setCookie(props.cookieName,token,1);
        setShow(false);
    }

    return(
        <>
            {show ? (
                <div className="container">
                    <div className={styles.cookieDisclaimer}>
                        <div className={`${styles.cookieClose}`} onClick={()=>setShow(false)}><i className="fa fa-times"/></div>
                        <div className="container">
                            <br/>
                            <p>Notice:<br/>
                                This website or its third-party tools process personal data (e.g. browsing data or
                                IP addresses) and uses cookies which are necessary for its functioning.
                                You accept the use of cookies or other identifiers by closing this notice, clicking
                                a button, or continuing to browse otherwise.</p>
                            <div className={styles.btnContainer}>
                                <button type="button" className={styles.declineCookie}>
                                    <a
                                       style={{textDecoration: "none",color:"#fff"}}
                                       href={'/cookie-policy'}
                                       target={"_blank"}
                                    >Learn more</a>
                                </button>
                                <button type="button" className={styles.acceptCookie} onClick={handleAccept}>Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <>
                </>
            )}

        </>
    )
}

export default CookieConsent;