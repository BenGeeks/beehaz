import React, {useRef, useState} from 'react';

import moment from 'moment'
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  TodayMarker ,
  CursorMarker
} from "react-calendar-timeline/lib";
import { Spring } from "react-spring/renderprops";
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import styles from "./calendar.module.css";

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
        style={{ maxHeight: `${itemContext.dimensions.height}`,borderLeft:`5px solid #d3d3d3 ` }}
        >
           <span className={styles.itemText}>{item.title}</span>
            <span className={styles.itemStatus} style={{backgroundColor: `${item.color}`}}/>
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

const MyCalendar = ({visibleTimeStart,
                      visibleTimeEnd,
                      itemStatus,
                      actionForRental,
                      items,
                      groups,
                      onTimeChange,
                      clickItem,
                      }) => {
  const dateInput = useRef();
  return (
    <>
      {(!itemStatus.loading && !actionForRental.loading) && (
          <Spring
              config={{duration:250}}
              to={{visibleTimeStart,visibleTimeEnd}}
              immediate={true}
          >
            {()=>(
                <Timeline
                    groups={groups}
                    items={items}
                    visibleTimeStart={visibleTimeStart}
                    visibleTimeEnd={visibleTimeEnd}
                    groupRenderer={groupRenderer}
                    itemRenderer={itemRenderer}
                    showCursorLine
                    headerLabelHeight={50}
                    headerLabelGroupHeight={50}
                    lineHeight={50}
                    stackItems
                    className={`p-2 ${styles.timelineMain}`}
                    canMove={false}
                    canResize={false}
                    onTimeChange={onTimeChange}
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
                        intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
                          const text = intervalContext.intervalText && intervalContext.intervalText.split('-')
                          return <div {...getIntervalProps()} >
                            {text && text.length > 1 ? (
                                <>
                                  <div style={{textAlign:"center",color:"Black",backgroundColor:"#f3f6f5" ,fontSize:"14px", padding:"5px 0"}}>
                                    <span >{`${text[0]}, ${text[1]}`}</span>
                                  </div>
                                </>
                            ) : intervalContext.intervalText}
                          </div>
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
      )}
    </>
  )
}

export default MyCalendar;