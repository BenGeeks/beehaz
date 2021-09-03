import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import styles from './verify.module.css';
import { userTokenVerify, addUserAuthToken,authRelogin } from '../../general_redux/user/actions';

const Verify = (props) => {
    let authFailed = useSelector(({user}) => user && user.authFail);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props && props.match && props.match.params && props.match.params.token) {
            dispatch(userTokenVerify(props.match.params.token))
            dispatch(addUserAuthToken(props.match.params.token))
        }
    }, [props, dispatch])

    const handleReLogin=(e)=>{
        e.preventDefault();
        dispatch(authRelogin());
        props.history.push("/login");
    }

    return (
        <div>
            <div className={`container`}>
                <div className={`copy-container ${styles.center}`}>
                    {!authFailed ?(
                        <p>Loading....</p>
                    ):(
                        <p>
                            Authentication error please click
                            <Link
                                onClick={(e)=>handleReLogin(e)}
                            >
                                {` here`}</Link> to login again!
                        </p>
                    )}
                    <span className={`handle`}/>
                </div>
            </div>
        </div>
    )
}

export default Verify;