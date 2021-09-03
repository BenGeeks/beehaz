import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import styles from "../../editBooking.module.css";
import styles2 from "../invoiceDetail.module.css";
import iconPlus from "../../../../../../../../icons/icons8-plus.svg";
import {Row} from "react-bootstrap";
import { useSelector} from "react-redux";
import moment from "moment";

function CreateMode({bookingId,initialValues,validationSchema,onSubmit}){
    const bookingData= useSelector(({calendar}) => calendar &&
        calendar.allBooking.filter((row)=>row.id===bookingId)[0]);
    const rentalDetail = useSelector(({rentals})=>rentals
        && rentals.rentals.filter((row)=> {
            if(bookingData){
                return row.id === bookingData.rentalId
            }
        })[0]);
    const paymentOpt = ['Payment Pending', 'Partially Paid', 'Paid'];
    const [count,setCount]=useState(1);
    const [totalCost,setTotalCost]=useState(initialValues.total);
    const [tableData,setTableData]=useState((initialValues.tableData && initialValues.tableData!==[])
        ?initialValues.tableData:[
        {
            id:1,
            title:(bookingData)?`${bookingData.rentalName} ${moment(bookingData.arrive).format('Mo MMM YYYY')} ${moment(bookingData.depart).format('Mo MMM YYYY')}, ${bookingData.noOfAdults + bookingData.noOfChildren} Guest(s)`:`Booking`,
            fee:`${initialValues.total}`,
        }
    ]);

    useEffect(()=>{
        let tmp=0;
        tableData.forEach((row)=>{
            tmp+=Number(row.fee);
        })
        setTotalCost(tmp);
    },[tableData])

    const setInputs=(val,index,field)=>{
        const myArr=[...tableData];
        if(field){
            myArr[index].title=val;
        }else{
            myArr[index].fee=val;
        }
        setTableData(myArr);
    }

    const setData=()=>{
        setCount(count+1);
        setTableData((prevState)=>([...prevState,{
            id:count+1,
            title:"",
            fee:'0'
        }]))
    }

    const handleDelData=(id)=>{
        setTableData(tableData.filter((row)=>(row.id!==Number(id))));
    }

    return(
        <div className={'p-0'}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(data)=>onSubmit(data,totalCost,tableData)}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({values,
                      errors,
                      handleChange,
                      handleReset,
                      handleSubmit,
                  })=>(
                    <Form>
                        <div className={styles.mainContainer}>
                            <div className={`col-lg-6 col-md-12 px-xs-1 p-0`}>
                                <div className={`${styles.form_wrapper} d-flex`} key={'invoiceNr'}>
                                    <div className={styles2.form_title}>{'Invoice Nr: '}</div>
                                    <div>
                                        <Field
                                            type={'number'}
                                            name={'invoiceNr'}
                                            onChange={handleChange}
                                            className={`${errors.invoiceNr ? styles2.form_entry_err : styles2.form_entry} w-50`}
                                        >
                                        </Field>
                                        <div className={errors.invoiceNr ? styles.form_error : styles.form_error_hidden}>{errors.invoiceNr}</div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'issueDate'}>
                                    <div className={styles2.form_title}>{'Date: '}</div>
                                    <div>
                                        <Field
                                            type={'date'}
                                            name={'issueDate'}
                                            onChange={handleChange}
                                            className={`${errors.issueDate ? styles2.form_entry_err : styles2.form_entry} w-100`}
                                        >
                                        </Field>
                                        <div className={errors.issueDate ? styles.form_error : styles.form_error_hidden}>{errors.issueDate}</div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'dueDate'}>
                                    <div className={styles2.form_title}>{'Due date: '}</div>
                                    <div>
                                        <Field
                                            type={'date'}
                                            name={'dueDate'}
                                            onChange={handleChange}
                                            className={`${errors.dueDate ? styles2.form_entry_err : styles2.form_entry} w-100`}
                                        >
                                        </Field>
                                        <div className={`${errors.dueDate ? styles.form_error : styles.form_error_hidden}`}>{errors.dueDate}</div>
                                    </div>
                                </div>

                            </div>
                            <div className={`col-lg-6 col-md-12 p-0`}>
                                <div className={`${styles.form_wrapper} justify-content-lg-end d-flex`} key={'bookingNr'}>
                                    <div className={styles2.form_title}>{'Payment status: '}</div>
                                    <div>
                                        <Field
                                            as={'select'}
                                            name={'status'}
                                            className={
                                                errors.status
                                                    ? styles2.form_entry_err
                                                    : `${styles2.form_entry_half} ${styles.statusEntryWidth}`
                                            }
                                        >
                                            {paymentOpt.map((opt) => (
                                                <option value={opt} key={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </Field>
                                        <div className={errors.status ? styles.form_error : styles.form_error_hidden}>{errors.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={styles2.tableWrapper}>
                            <table className={`table ${styles2.tableClass}`}>
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>{``}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData && tableData.length!==0 && tableData.map((row,index)=>(
                                    <tr key={row.id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <Field
                                                type={"text"}
                                                value={row.title}
                                                onChange={(e)=>setInputs(e.target.value,index,1)}
                                                className={`${styles2.tableInput}`}
                                                required={true}
                                                maxLength="70"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type={"number"}
                                                value={row.fee}
                                                onChange={(e)=>setInputs(e.target.value,index,0)}
                                                className={`${styles2.tableInput} ${styles2.widthInput}`}
                                                min={0}
                                                required={true}
                                            />
                                        </td>
                                        <td>
                                            {(index!==0) && (
                                                <span className={styles2.icon} >
                                                  <i className="fa fa-trash" onClick={()=>handleDelData(row.id)}/>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <img
                                src={iconPlus}
                                alt={"addIcon"}
                                className={styles2.add_btn}
                                onClick={()=>{setData()}}
                            />
                        </div>
                        <br/>
                        <div className={styles.subHeader}>{`Total: ${totalCost} ${rentalDetail?rentalDetail.currency:""}`}</div>
                        <hr className="my-1" />

                        {/*<div className="pb-2 d-flex flex-direction-column col-lg-6 col-md-12 px-xs-1 p-0">*/}
                        {/*    <div className={styles.subHeader}>Recipient</div>*/}
                        {/*</div>*/}
                        <Row className={'p-3'}>
                            <div className={`col-lg-6 col-md-12 px-xs-1 p-0`}>
                                <div className={styles.subHeader}>Recipient</div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'r_name'}>
                                    <div className={styles2.form_title}>{'Name: '}</div>
                                    <div>
                                        <div>
                                            <Field
                                                type={'text'}
                                                name={'r_name'}
                                                onChange={handleChange}
                                                className={`${errors.r_name ? styles2.form_entry_err : styles2.form_entry} w-100`}
                                            >
                                            </Field>
                                            <div className={errors.r_name ? styles.form_error : styles.form_error_hidden}>{errors.r_name}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'r_comp'}>
                                    <div className={styles2.form_title}>{'Company: '}</div>
                                    <div>
                                        <div>
                                            <Field
                                                type={'text'}
                                                name={'r_comp'}
                                                onChange={handleChange}
                                                className={`w-100 ${errors.r_comp ? styles2.form_entry_err : styles2.form_entry}`}
                                            >
                                            </Field>
                                            <div className={errors.r_comp ? styles.form_error : styles.form_error_hidden}>{errors.r_comp}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'r_address1'}>
                                    <div className={styles2.form_title}>{'Address 1: '}</div>
                                    <div>
                                        <Field
                                            type={'text'}
                                            name={'r_address1'}
                                            onChange={handleChange}
                                            className={`w-100 ${
                                                errors
                                                    .r_address1 ? styles2.form_entry_err : styles2.form_entry
                                            }`}
                                        >
                                        </Field>
                                        <div className={errors.r_address1 ? styles.form_error : styles.form_error_hidden}>{errors.r_address1}</div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'r_address2'}>
                                    <div className={styles2.form_title}>{'Address 2: '}</div>
                                    <div>
                                        <Field
                                            type={'text'}
                                            name={'r_address2'}
                                            onChange={handleChange}
                                            className={`w-100 ${
                                                errors
                                                    .r_address2 ? styles2.form_entry_err : styles2.form_entry
                                            }`}
                                        >
                                        </Field>
                                        <div className={errors.r_address2 ? styles.form_error : styles.form_error_hidden}>{errors.r_address2}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-6 col-md-12 px-xs-1 p-0`}>
                                <div className={styles.subHeader}>Sender</div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'s_name'}>
                                    <div className={styles2.form_title}>{'Name: '}</div>
                                    <div>
                                        <Field
                                            type={'text'}
                                            name={'s_name'}
                                            onChange={handleChange}
                                            className={`w-100 ${errors.s_name ? styles2.form_entry_err : styles2.form_entry}`}
                                        >
                                        </Field>
                                        <div className={errors.s_name ? styles.form_error : styles.form_error_hidden}>{errors.s_name}</div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'s_address1'}>
                                    <div className={styles2.form_title}>{'Address 1: '}</div>
                                    <div>
                                        <Field
                                            type={'text'}
                                            name={'s_address1'}
                                            onChange={handleChange}
                                            className={`w-100 ${
                                                errors
                                                    .s_address1 ? styles2.form_entry_err : styles2.form_entry
                                            }`}
                                        >
                                        </Field>
                                        <div className={errors.s_address1 ? styles.form_error : styles.form_error_hidden}>{errors.s_address1}</div>
                                    </div>
                                </div>
                                <div className={`${styles.form_wrapper} d-flex`} key={'s_address2'}>
                                    <div className={styles2.form_title}>{'Address 2: '}</div>
                                    <div>
                                        <Field
                                            type={'text'}
                                            name={'s_address2'}
                                            onChange={handleChange}
                                            className={`w-100 ${
                                                errors
                                                    .s_address2 ? styles2.form_entry_err : styles2.form_entry
                                            }`}
                                        >
                                        </Field>
                                        <div className={errors.s_address2 ? styles.form_error : styles.form_error_hidden}>{errors.s_address2}</div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <hr className="my-1" />
                        <div >
                            <div className={styles.subHeader}>Invoice Text</div>
                            <div className="col-sm-12 col-lg-8 col-xs-10 pt-1 pb-2">
                                <Field
                                    as={"textarea"}
                                    className={`w-100 ${styles2.textArea}`}
                                    onChange={handleChange}
                                    rows={4}
                                    name="invoiceText"
                                />
                            </div>
                            <div className={styles.subHeader}>Footer Text</div>
                            <div className="col-sm-12 col-lg-8 pt-1 pb-2 col-xs-10">
                                <Field
                                    as={"textarea"}
                                    className={`w-100 ${styles2.textArea}`}
                                    onChange={handleChange}
                                    rows={4}
                                    name="footerText"
                                />
                            </div>
                        </div>
                        <div className={`d-flex justify-content-center ${styles.button_group}`}>
                            <div>
                                <button className={styles.settings_save} style={{backgroundColor:"#dc3545"}} onClick={handleReset}>
                                    Discard changes
                                </button>
                                <button type="submit" className={styles.settings_save} >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateMode;