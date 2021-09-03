import React,{useEffect,useState} from 'react';
import moment from 'moment';
import styles from './ratesCalendar.module.css';
import {useDispatch,useSelector} from "react-redux";
import {Table} from 'react-bootstrap';
import ConfirmChange from "./ConfirmRateChange/ConfirmChange";
import SlideSelect from '../../../../../../components/Slide_select/Slide_select';
import {changedRatesInTimeline,fetchRatesCal,setSpecialRate} from '../../../../../../general_redux/rates/actions';
import AddRate from './AddRate/AddRate';
import Loading from '../../../../../../components/loading';
import tick from '../../../../../../icons/tick-yellow.svg';

function RatesCalendar(){
    let dt = new Date();
    const dispatch=useDispatch();
    const rentals = useSelector(({rentals})=>rentals && rentals.rentals);
    const rateList = useSelector(({rates})=>rates && rates.rateSettings);
    const rateCalendar = useSelector(({rates})=>rates && rates.rateCalendar);
    const actionForRateCal=useSelector(({rates})=>rates && rates.actionForRateCal);
    const actionForSpecialRate=useSelector(({rates})=>rates && rates.actionForSpecialRate);
    const [showConfirm,setShowConfirm]=useState(false);
    const [currentValue,setCurrentValue]=useState({
        value:0,
        date:'2021-06-04',
        rental:'Rental 1'
    });

    const Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const Years=['2019','2020','2021','2022','2023'];
    const d=new Date();

    const rateName=(id)=>{
        const tmp=rentals.filter((rental)=>rental.id===Number(id))
        if(tmp.length!==0){
            return tmp[0].name;
        }else{
            return "";
        }
    }
    const findCurrency = (id)=>{
        const tmp= rentals.filter((rental)=>rental.id===Number(id))
        if(tmp.length!==0){
            return tmp[0].currency;
        }else{
            return "";
        }
    }
    //selector
    const [currentDate,setCurrentDate] = useState(d.getDate());
    const [currentMonth,setCurrentMonth]=useState(d.getMonth())
    const [currentTimeline,setCurrentTimeline]=useState([]);
    const [currentYear,setCurrentYear]=useState(Years.findIndex((val)=>val===String(d.getFullYear())));

    useEffect(()=>{
        if(actionForSpecialRate.success){}
        let tmp=[];
        const yr=Number(Years[currentYear]);
        tmp.push(moment(`${currentDate}-${currentMonth+1}-${yr}`,"DD-M-YYYY").format("DD MMM YYYY ddd"));
        const totDays=moment(`${currentDate}-${currentMonth+1}-${yr}`, "DD-M-YYYY").daysInMonth();
        for(let i=1;i<totDays;i++){
            const newDate= moment(`${currentDate}-${currentMonth+1}-${yr}`,"DD-M-YYYY").add(i,'days');
            tmp.push(newDate.format("DD MMM YYYY ddd"));
        }
        setCurrentTimeline(tmp);
        const payload={
            startDate:`${Years[currentYear]}-${currentMonth+1}-${currentDate}`,
            endDate:`${Years[currentYear]}-${currentMonth+2}-${currentDate}`
        }
        dispatch(fetchRatesCal(payload))
    },[currentMonth,currentYear])

    const onBlur=(e,date,rental,type)=>{
        if(type==="rate"){
            const tmp=[{
                dailyRate:e.target.value,
                changeDate:moment(date,'DD MMM YYYY ddd').format('YYYY-MM-DD'),
                rentalId:rental.id,
                minimumStayRequirement:rental.minimumStayRequirement,
            }];
            console.log(currentValue,tmp);
            if(JSON.stringify(currentValue) !== JSON.stringify(tmp) ){
                setCurrentValue(tmp);
                setShowConfirm(true);
            }
        }else{
            const tmp=[{
                dailyRate:rental.dailyRate,
                changeDate:moment(date,'DD MMM YYYY ddd').format('YYYY-MM-DD'),
                rentalId:rental.id,
                minimumStayRequirement:e.target.value,
            }];
            if(JSON.stringify(currentValue) !== JSON.stringify(tmp) ){
                setCurrentValue(tmp);
                setShowConfirm(true);
            }
        }

    }

    const handleHide=()=>{
        setShowConfirm(false);
    }

    const handleConfirm=()=>{
        dispatch(setSpecialRate(currentValue));
        handleHide();
    }

    const handleDiscard=()=>{
        const payload={
            startDate:`${Years[currentYear]}-${currentMonth+1}-${currentDate}`,
            endDate:`${Years[currentYear]}-${currentMonth+2}-${currentDate}`
        }
        dispatch(fetchRatesCal(payload))
        handleHide();
    }
    // ADD RATE STARTS HERE

    const [addRateModal,setAddRateModal] = useState(false);
    return(
        <div >
            <Loading loadingStatus={actionForRateCal.loading || actionForSpecialRate.loading}/>
            <AddRate
                show={addRateModal}
                onHide={() => setAddRateModal(false)}
            />
            <ConfirmChange
                show={showConfirm}
                onHide={handleHide}
                confirmHeader={`Sync updates`}
                confirmBody={`Sync changes to the calendar?`}
                value={currentValue}
                onConfirm={handleConfirm}
                onDiscard={handleDiscard}
            />
            <div className={styles.calendarSetup}>
                <div className={styles.flexEnd}>
                    <button
                        className={`${styles.allBtn} w-25`}
                        onClick={ () => setAddRateModal(true)}
                    >
                        Set Rates
                    </button>
                </div>
                <SlideSelect list={Years} currentSelect={currentYear} onSelectData={(val)=>setCurrentYear(val)} />
                <SlideSelect list={Months} currentSelect={currentMonth} onSelectData={(val)=>setCurrentMonth(val)}/>
            </div>
            <br/>
            <Table responsive className={styles.table}>
                <thead className={styles.tableHead}>
                <tr className={styles.firstRow}>
                    <th className={styles.headRental}><p>Rentals</p></th>
                    {currentTimeline.length!==0 && currentTimeline.map((day)=>{
                        const locStr= day.split(" ");
                        return(
                            <th className={styles.dateDisplay} key={day}>
                                <div className={styles.dayHead}>{locStr[3]}</div>
                                <div className={styles.dateHead}>{locStr[0]}</div>
                                <div className={styles.dayHead}>{locStr[1]}</div>
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody >
                {!actionForRateCal.loading && rateCalendar && rateList && rateList.length!==0 && rateList.map((rental)=>(
                    <tr className={styles.secondRow} key={rental.id}>
                        <td className={styles.secondData}>
                            <div className={styles.rowWrapper}>
                                <p className={styles.rentalName}>{rateName(rental.rentalId)}</p>
                                <span className={styles.flexDisp}>
                                    <p className={styles.nightlyRate}>
                                        Nightly Rate
                                    </p>
                                    <label className={styles.currencyStyles}>{findCurrency(rental.rentalId)}</label>
                                </span>
                                <p className={styles.minStay}>Min Stay(nights)</p>
                            </div>
                        </td>
                        {currentTimeline.length!==0 && currentTimeline.map((day)=>(
                            <td key={day} className={styles.inputCell}>
                                <div className={styles.bookingBox}>
                                    {((rateCalendar[rental.id]?
                                        rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]?
                                            rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]["booking"]:false:false) &&(
                                        <img src={tick} alt="booked" style={{height:"1.5em",width:"1.5em"}}/>
                                    ))}
                                </div>
                                <div>
                                    {rateCalendar!=={} && (
                                        <input
                                            className={styles.rateInput}
                                            defaultValue={rateCalendar[rental.id]!==undefined?
                                                rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]?
                                                    rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]['rate']:rental.dailyRate
                                                :rental.dailyRate}

                                            onBlur={(e)=>onBlur(e,day,rental,"rate")}
                                        />
                                    )}
                                </div>
                                <div>
                                    <input
                                        className={styles.rateInput}
                                        defaultValue={rateCalendar[rental.id]!==undefined?
                                            rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]?
                                                rateCalendar[rental.id][`${moment(day,'DD MMM YYYY ddd').format('YYYY-MM-DD')}`]['minimumStayRequirement']:rental.minimumStayRequirement
                                            :rental.minimumStayRequirement}

                                        onBlur={(e)=>onBlur(e,day,rental,"minStay")}
                                    />
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table> 
        </div>
    )
}

export default RatesCalendar;