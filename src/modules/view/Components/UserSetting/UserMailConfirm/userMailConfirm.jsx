import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Login from '../../../../Login/Login';
import { confirmMail } from '../../../../../general_redux/user/actions';

const MailConfirm = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props && props.match && props.match.params && props.match.params.token) {
            // dispatch(userTokenVerify(props.match.params.token))
            dispatch(confirmMail(props.match.params.token))
        }
    }, [props, dispatch])

    return (
        <div>
            <Login/>
        </div>
    )
}

export default MailConfirm;