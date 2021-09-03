import React,{useEffect} from 'react';
import { oauthLoginUserCallback} from '../../general_redux/user/actions';
import {useDispatch} from 'react-redux';

function OauthLogin(props) {
    let code = new URLSearchParams(props.location.search).get("code");
    let state = new URLSearchParams(props.location.search).get("state");
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("Oauth compoennet rendered:",code,state);
        dispatch(oauthLoginUserCallback(code, state));
    },[])
    return (
        <div>Loading..</div>
    )
}
export default OauthLogin;