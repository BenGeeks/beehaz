import React from 'react';
import Select, { components } from "react-select";


function MySelect(props){
    const handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        props.onChange(props.optFor, value);
    };

    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        props.onBlur(props.optFor, true);
    };
    return(
        <>
            <Select
                id={props.optFor}
                options={props.optionArray}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
                isClearable={true}
            />
            {!!props.error &&
            props.touched && (
                <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
            )}
        </>
    )
}
export default MySelect;