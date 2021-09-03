import React from 'react';
import { Link } from 'react-router-dom';

function FooterLink(props){
    return(
        <Link to={props.redirectTo} className="mx-1">
          {props.linkText}
        </Link>
    )
}

export default FooterLink;