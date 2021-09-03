import React,{useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import WeekDayPick from './weekDayPick';
import { Form } from 'react-bootstrap';

function FormInput(props){

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    var modifiers = {
        'weekend': function(weekday) {
          return weekday == 0 || weekday == 6;
        }
    };

    return(
        <>
            {props.type ==="checkbox" && (
                <>
                    <div className="form-group row">
                        <label htmlFor={props.label} className="col-xs-1" style={{marginTop:'0.5em',marginLeft:'1em'}} >{props.label}</label>
                        <div className="col-xs-2">
                            <input type={props.type} className="form-control" style={{marginLeft:'1em'}}
                                   id={props.label}
                                   placeholder={props.placeholder}
                                   value={props.value}
                            />
                        </div>
                    </div>
                </>
            )}
            {props.type ==="datepicker" && (
                <div  className={"date-range"}>
                    <div className="form-group row">
                        <label htmlFor={props.label} className="col-sm-4 col-form-label" >{props.label}</label>
                        <div className="col-md-4">
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />
                        </div>
                    </div>
                </div>
            )}
            {props.type ==="weekdaypick" && (
                <>
                    <div className="form-group row">
                        <label htmlFor={props.label} className="col-sm-4 col-form-label" >{props.label}</label>
                        <div className="col-md-4">
                            <WeekDayPick/>
                        </div>
                    </div>
                </>
            )}
            {props.type !=="checkbox" && props.type !=="datepicker" && props.type!=="weekdaypick" &&(
                <>
                    <div className="form-group row">
                    <Form.Label className="col-sm-4 col-form-label">{props.label}</Form.Label>
                        <div className="col-md-4">
                            {
                                (props.type === 'select') ?
                                    (
                                        <Form.Control as="select">
                                        <option value='' >{props.blankValue}</option>
                                            {(props.options && props.options.map((d) =>
                                               <option value={d.value || d} selected={props.defaultVal===d || props.defaultVal===d.value}>{d.label || d}</option>
                                            ))}
                                        </Form.Control>
                                    ) : (
                                        <input type={props.type} className="form-control" id={props.label}
                                               placeholder={props.placeholder} defaultValue={(props.defaultVal)} required={props.validation && props.validation.required}/>
                                    )
                            }
                        </div>
                    </div>
                </>
            )}
        </>

    )
}
export default FormInput;