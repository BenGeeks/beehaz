import React, { useState, useEffect } from 'react';
import styles from "./generalStyles.module.css";

function WeekDayPick ({isReset,selectedDays}){
    const [weekSelection,setWeekSelection]=useState([
        {day:"Mon",status:false},
        {day:"Tue",status:false},
        {day:"Wed",status:false},
        {day:"Thu",status:false},
        {day:"Fri",status:false},
        {day:"Sat",status:false},
        {day:"Sun",status:false},
    ]);

    const getActiveSelection=(dayName)=>{
        const idx= weekSelection.findIndex((obj => obj.day === dayName));
        const currentStatus= weekSelection.filter((obj => obj.day === dayName))[0].status;
        let tmp=[...weekSelection];
        tmp[idx].status=!currentStatus;
        setWeekSelection(tmp);
    }
    useEffect(()=>{
        if(isReset){
            onResetWeekDay();
        }
    },[isReset])

    const onResetWeekDay=()=>{
        setWeekSelection([
            {day:"Mon",status:false},
            {day:"Tue",status:false},
            {day:"Wed",status:false},
            {day:"Thr",status:false},
            {day:"Fri",status:false},
            {day:"Sat",status:false},
            {day:"Sun",status:false},
        ]);
    }

    useEffect(() => {
        selectedDays(weekSelection)
    },[weekSelection])

    return(
        <div className={styles.weekcontainer}>
            {weekSelection && weekSelection.map((d)=>(
                <div className={d.status ? styles.weekDays_active : styles.weekDays} key={d.day} onClick={()=>getActiveSelection(d.day)}>{d.day}</div>
            ))}
        </div>
    )
}

export default WeekDayPick;