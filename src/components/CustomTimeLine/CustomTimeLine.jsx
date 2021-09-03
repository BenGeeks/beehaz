import React, { forwardRef,useState,useEffect,useImperativeHandle,useRef } from "react";
import moment from "moment";
import { Spring } from "react-spring/renderprops";
import Timeline, {
    TimelineHeaders,
    DateHeader,
    SidebarHeader,
    TimelineMarkers,
    CustomMarker,
    TodayMarker,
    } from "react-calendar-timeline";
import styles from "./customTimeLien.module.css";
import 'react-calendar-timeline/lib/Timeline.css';

const CustomTimeLine=forwardRef((props,ref)=> {
    const { width,groups,items,setCurrentSelectMonth,setCurrentSelectYear,itemStatus,actionForRental,clickItem } =props;
    const dateInput=useRef();
    //calendar props
    const minTime =moment("2004-01-01 00:00","YYYY-MM-dd HH:mm").valueOf()
    const maxTime = moment("2024-01-01 00:00","YYYY-MM-dd HH:mm").valueOf()


    const d = new Date();
    const now = new Date().getUTCFullYear();
    const myLast = now + 2;
    const years = Array(myLast - (myLast - 20))
        .fill('')
        .map((v, idx) => myLast - idx)
        .reverse();

    const [currentMonth,setCurrentMonth]=useState(d.getMonth());
    const [currentYear, setCurrentYear] = useState(years.length - 3);
    const [sidebarWidth,setSidebarWidth]=useState(width<=575?70:width<=900?100:150);
    const [totalDays,setTotalDays]= useState(width<400?5 : width < 575 ? 8 : width<700? 12 : width<1000?15 :width<1260?18 : width < 1400 ? 20 : width >= 1700 ? 30 : 22);
    const [visibleTimeStart,setVisibleTimeStart] = useState(moment().add(-1, "day").valueOf());
    const [visibleTimeEnd,setVisibleTimeEnd] = useState(moment().add(totalDays, "day").valueOf());

    useEffect(()=>{
        setSidebarWidth(width<=575?70:width<=900?100:150);
        setTotalDays(width<400?5 : width < 575 ? 8 : width<700? 12 : width<1000?15 :width<1260?18 : width < 1400 ? 20 : width >= 1700 ? 30 : 22);
    },[width])

    useEffect(()=>{
        setVisibleTimeStart(moment().add(-1, "day").valueOf());
        setVisibleTimeEnd(moment().add(totalDays, "day").valueOf());
    },[totalDays])

    const findYear=(val)=>{
        return years.findIndex((year) => year === val);
    }

    useImperativeHandle(ref, () => ({

        onPrevClick(){
            const zoom = visibleTimeEnd - visibleTimeStart;
            if (visibleTimeStart-zoom > minTime){
                setVisibleTimeStart(visibleTimeStart - zoom);
                setVisibleTimeEnd(visibleTimeEnd-zoom);
                const myDate = moment(visibleTimeStart-zoom).format("DD-M-YYYY").split('-');
                if(currentMonth!==Number(myDate[1])-1){
                    setCurrentMonth(Number(myDate[1])-1);
                    setCurrentSelectMonth(Number(myDate[1])-1);
                }
                if(currentYear!==findYear(Number(myDate[2]))){
                    setCurrentYear(findYear(Number(myDate[2])));
                    setCurrentSelectYear(findYear(Number(myDate[2])));
                }
            }
        },
        onNextClick(){
            const zoom = visibleTimeEnd - visibleTimeStart;
            if(visibleTimeEnd+zoom <maxTime){
                setVisibleTimeStart(visibleTimeStart + zoom);
                setVisibleTimeEnd(visibleTimeEnd + zoom);
                const myDate = moment(visibleTimeStart + zoom).format("DD-M-YYYY").split('-');
                if(currentMonth!==Number(myDate[1])-1){
                    setCurrentMonth(Number(myDate[1])-1);
                    setCurrentSelectMonth(Number(myDate[1])-1);
                }
                if(currentYear!==findYear(Number(myDate[2]))){
                    setCurrentYear(findYear(Number(myDate[2])));
                    setCurrentSelectYear(findYear(Number(myDate[2])));
                }
            }
        },
        renderToday(){
            setVisibleTimeStart(moment().add(-1, "day").valueOf());
            setVisibleTimeEnd(moment().add(totalDays, "day").valueOf());
            setCurrentMonth(d.getMonth());
            setCurrentSelectMonth(d.getMonth());
            setCurrentYear(years.length - 3);
            setCurrentSelectYear(years.length - 3);
        },
        onMonthUpdate(index){
            setCurrentMonth(index);
            setVisibleTimeStart(moment(`1-${index+1}-${years[currentYear]}`, "DD-MM-YYYY").add(-1, "day").valueOf());
            setVisibleTimeEnd(moment(`1-${index+1}-${years[currentYear]}`, "DD-MM-YYYY").add(totalDays, "day").valueOf());
        },
        onYearUpdate(index){
            setCurrentYear(index);
            setCurrentSelectYear(index);
            setVisibleTimeStart(moment(`1-${currentMonth+1}-${years[index]}`,"DD-MM-YYYY").add(-1,"day").valueOf());
            setVisibleTimeEnd(moment(`1-${currentMonth+1}-${years[index]}`,"DD-MM-YYYY").add(totalDays,"day").valueOf());
        }
    }));

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd,updateScrollCanvas) => {
        if(visibleTimeStart < minTime && visibleTimeEnd > maxTime){
            setVisibleTimeStart(minTime)
            setVisibleTimeEnd(maxTime);
            updateScrollCanvas(minTime, maxTime);
        }else if (visibleTimeStart < minTime){
            setVisibleTimeStart(minTime);
            setVisibleTimeEnd(minTime + (visibleTimeEnd - visibleTimeStart));
            updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
        }else if(visibleTimeEnd > maxTime){
            setVisibleTimeStart(maxTime - (visibleTimeEnd - visibleTimeStart))
            setVisibleTimeEnd(maxTime);
            updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
        }else{
            setVisibleTimeStart(visibleTimeStart);
            setVisibleTimeEnd(visibleTimeEnd);
            const myDate = moment(visibleTimeStart).format("DD-M-YYYY").split('-');
            if(currentMonth!==Number(myDate[1])-1) {
                setCurrentMonth(Number(myDate[1]) - 1);
                setCurrentSelectMonth(Number(myDate[1]) - 1);
            }
            if(currentYear!==findYear(Number(myDate[2]))){
                setCurrentYear(findYear(Number(myDate[2])));
                setCurrentSelectYear(findYear(Number(myDate[2])));
            }
            updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
        }
    };
    //renderer
    const groupRenderer = ({ group }) => {
        return (
            <div className={`${styles.customGroup}`}>
                <span className="title">{group.title}</span>
                <p className="tip">{group.tip}</p>
            </div>
        )
    }

    const itemRenderer = ({
              item,
              itemContext,
              getItemProps,
              getResizeProps,
          }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
        return (
            <div {...getItemProps(item.itemProps)} className={styles.itemBlock} >
                {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
                {item.type==="booking" && (
                    <div
                        className={styles.rctItemContent}
                        style={{ maxHeight: `${itemContext.dimensions.height}`, borderLeft:`5px solid ${item.color}`}}
                    >
                        <span className={styles.itemText}>{item.title}</span>
                        <span className={styles.itemStatus} style={{backgroundColor: `${(item.paymentStatus==="Payment Pending")
                                ?"#dc3545":((item.paymentStatus==="Partially Paid")?"#f5b60e":"#439a86")}`}}/>
                    </div>
                )}
                {item.type==="blockdates" && (
                    <div className={styles.blockdate}>
                        <span className={styles.blockDateText}>{item.title}</span>
                    </div>
                )}
                {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
            </div>
        )}


    return (
            <div >
                {(width && !itemStatus.loading && !actionForRental.loading) && (
                    <>
                        <Spring
                            config={{ duration: 250 }}
                            to={{ visibleTimeStart, visibleTimeEnd }}
                            immediate={true}
                        >
                            {() => (
                                <Timeline
                                    groups={groups}
                                    items={items}
                                    itemTouchSendsClick={false}
                                    stackItems
                                    groupRenderer={groupRenderer}
                                    itemRenderer={itemRenderer}
                                    showCursorLine
                                    sidebarWidth={sidebarWidth}
                                    headerLabelHeight={50}
                                    headerLabelGroupHeight={50}
                                    lineHeight={50}
                                    className={`p-2`}
                                    canMove={false}
                                    canResize={false}
                                    visibleTimeStart={visibleTimeStart}
                                    visibleTimeEnd={visibleTimeEnd}
                                    onTimeChange={handleTimeChange}
                                    onItemSelect={(itemId, e, time)=>clickItem(itemId)}
                                    onItemClick = {(itemId, e, time)=>clickItem(itemId)}
                                >
                                    <TimelineMarkers>
                                        <CustomMarker date={moment().startOf("day")}>
                                            {/* custom renderer for this marker */}
                                            {({ styles, date }) => {
                                                let customStyles;
                                                customStyles = {
                                                    ...styles,
                                                    backgroundColor: '#f1ecda',
                                                    width:`${dateInput.current.scrollWidth+2}px`,
                                                    border:'4px solid #f5b60e',
                                                    borderTop:'none',
                                                    zIndex:50
                                                }
                                                return <div style={customStyles} />
                                            }}
                                        </CustomMarker>
                                    </TimelineMarkers>
                                    <TimelineHeaders className={`${styles.header} sticky`} style={{ color: 'black'}}>
                                        <SidebarHeader>
                                            {({ getRootProps }) => {
                                                return <div className={`d-flex justify-content-center align-items-center ${styles.header}`} {...getRootProps()}>Rentals</div>;
                                            }}
                                        </SidebarHeader>
                                        <DateHeader
                                            unit="month"
                                            labelFormat={"MMMM-YYYY"}
                                            // height={21}
                                            intervalRenderer={({
                                                                   getIntervalProps,
                                                                   intervalContext,
                                                                   data
                                                               }) => {
                                                const text =
                                                    intervalContext.intervalText &&
                                                    intervalContext.intervalText.split("-");
                                                return (
                                                    <div {...getIntervalProps()}>
                                                        {text && text.length > 1 ? (
                                                            <div>
                                                                <div
                                                                    style={{
                                                                        textAlign: "center",
                                                                        color: "Black",
                                                                        backgroundColor: "#f3f6f5",
                                                                        fontSize: "14px",
                                                                        padding: "5px 0px"
                                                                    }}
                                                                >
                                                                    <span>{`${text[0]}, ${text[1]}`}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            intervalContext.intervalText
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        />
                                        <DateHeader labelFormat="DD-ddd-MMM" unit="day" height={45}
                                                    intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                                                        const text = intervalContext.intervalText && intervalContext.intervalText.split('-')
                                                        return <div {...getIntervalProps()} className={
                                                            (intervalContext.intervalText===moment().format("DD-ddd-MMM"))?
                                                                `${styles.dataToday}`:`${styles.dataHeader}`}>

                                                            {text && text.length > 1 ? (
                                                                <div className={`d-flex flex-column`} ref={dateInput}>
                                                                    <span className={styles.dayHead}>{text[1]}</span>
                                                                    <span className={styles.dateHead} >{text[0]}</span>
                                                                </div>
                                                            ) : intervalContext.intervalText}
                                                        </div>
                                                    }}
                                        />
                                    </TimelineHeaders>
                                </Timeline>
                            )}
                        </Spring>
                    </>
                )}
            </div>
        );
})
export default CustomTimeLine;