import moment from 'moment';
import React, { useState } from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap';
import styles from "./table.module.css";

function index(props) {
    return (
        <div style={{marginTop:'1em'}}>

                         <Table bordered striped responsive className={styles.mainTable}>
                            <thead>
                                <tr >
                                {props && props.cols && props.cols.map((h) => <th>{h.lable}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {props && props.rows && props.rows.map((row)  => (
                                    <tr >
                                        {props && props.cols && props.cols.filter(h => h.key ).map((h) => <td>
                                            <span>
                                                {(h.key==='arrive' || h.key==='depart') ? moment(row[h.key]).format(props.dateFormat) :row[h.key]}
                                            </span>
                                        </td>)}
                                        {props && props.cols && props.cols.filter(h => !h.key).length > 0 ?
                                        <td ><span className={`d-flex justify-content-around`}>
                                            {props.isEdit ? <span className={styles.iconText} onClick={() => props.onEdit && props.onEdit(row)}>View/Edit</span> : ''}
                                            {props.isOnlyEdit ? <span className={styles.icon} onClick={() => props.onView && props.onView(row)}><i className="fa fa-pencil-square-o"></i></span> : ''}
                                            {props.isDownload ? <span className={styles.icon} onClick={() => props.onView && props.onView(row)}><i className="fa fa-download"></i></span> : ''}
                                            {props.isView ? <span className={styles.icon} onClick={() => props.onView && props.onView(row)}><i className="fa fa-eye"></i></span> : ''}
                                            {(props.isDelete) ? <span className={styles.icon} onClick={() => props.onDelete && props.onDelete(row)}><i className="fa fa-trash"></i></span>: ''}
                                            </span></td>
                                            : ''}
                                    </tr>
                                ))}
                                {
                                    props && props.rows && props.rows && props.rows.length > 0 ? '' : 
                                    <tr>
                                        <td className={'text-center'} colSpan={props && props.cols && props.cols.length || 1}>No {props.tableName} Found</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
        </div>
    )
}
export default index;