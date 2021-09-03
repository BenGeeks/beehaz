import React,{useState,useEffect} from 'react';
import base64 from 'base64topdf';
import * as yup from 'yup';
import moment from 'moment';
import {useSelector,useDispatch} from "react-redux";
import styles from '../editBooking.module.css';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ReactTooltip from "react-tooltip";
import {Row,Col,Container} from 'react-bootstrap';
import Table from '../../../../../../../components/Table';
import styles2 from './invoiceDetail.module.css';
import Loading from '../../../../../../../components/loading';
import CreateMode from './CreateMode/CreateMode';

import {addInvoice,getInvoiceByBooking,deleteInvoice,editInvoice} from '../../../../../../../general_redux/invoice/actions';

const Invoice = (props) => {
    const [createMode,setCreateMode]=useState(false);
    const dispatch=useDispatch();
    const bookingData= useSelector(({calendar}) => calendar &&
        calendar.allBooking.filter((row)=>row.id===props.bookingId)[0]);
    const rentalDetail = useSelector(({rentals})=>rentals
        && rentals.rentals.filter((row)=>row.id===bookingData.rentalId)[0]);
    const guestDetails = useSelector(({guests})=>guests && guests.guestByBooking)[0];
    const settings= useSelector(({generalSetting})=>generalSetting && generalSetting.setting);
    const invoiceByBooking=useSelector(({invoice})=>invoice && invoice.invoiceByBooking);
    const invoiceList=useSelector(({invoice})=>invoice && invoice.invoiceList);
    const dateFormat = useSelector(({generalSetting})=>generalSetting && generalSetting.setting.dateDisplay);
    const actionForAddInvoice=useSelector(({invoice})=>invoice && invoice.actionForAddInvoice);
    const [selectedInvoice,setSelectedInvoice]=useState(null);

    useEffect(()=>{
        dispatch(getInvoiceByBooking(props.bookingId));
    },[invoiceList])

    const invoiceSchema =  yup.object().shape({
        invoiceNr:yup.number(),
        issueDate:yup.date().required('Issue Date is required!'),
        dueDate:yup.date().required('Due date is required!'),
        status: yup.string().required('Please add a status of payment!'),
        r_name:yup.string().required("Please enter recipient's name!"),
        r_comp:yup.string(),
        r_address1:yup.string(),
        r_address2:yup.string(),
        s_name:yup.string().required("Sender name is required!"),
        s_address1:yup.string(),
        s_address2:yup.string(),
        s_country:yup.string(),
        invoiceText:yup.string(),
        footerText:yup.string(),
        total:yup.number(),
    })

    const cols = [
        { lable:'Invoice Nr', key:'id'},
        {lable: 'Created', key: 'createdOn',isDate:true},
        {lable: 'Invoice Due', key: 'dueDate',isDate:true},
        {lable: 'Total', key: 'total'},
        {lable: 'Invoice Status', key: 'paymentStatus'},
        {lable: 'Mark as Sent', key: 'markSent'},
        {lable: 'Actions', key: ''},
    ];

    const handleSubmit=(data,totalCost,tableData)=>{
        const payload={
            id:(selectedInvoice)?selectedInvoice.id : undefined,
            invoiceDate: data.issueDate,
            invoiceNumber:data.invoiceNr,
            dueDate:data.dueDate,
            currency:rentalDetail.currency,
            invoiceItem:tableData,
            total:totalCost,
            markSent:selectedInvoice?false:undefined,
            downloadLink:selectedInvoice?selectedInvoice.downloadLink:undefined,
            recipientDetail:{
                name:data.r_name,
                company:data.r_comp,
                address1:data.r_address1,
                address2:data.r_address2,
                email:guestDetails.email_id,
            },
            senderDetail:{
                name:data.s_name,
                address1:data.s_address1,
                address2:data.s_address2,
            },
            invoiceText:data.invoiceText,
            invoiceFooter:data.invoiceText,
            paymentStatus:data.status,
            bookingId:props.bookingId,
            guestId:guestDetails.id
        }
        if(!selectedInvoice){
            dispatch(addInvoice(payload));
        }else{
            //dispatch(editInvoice(payload))
        }
        //console.log(payload);
    }

    const handleEdit=(data)=>{
        setSelectedInvoice(data);
        setCreateMode(true);
    }

    const handleDelete=(data)=>{
        if(data && data.id){
            dispatch(deleteInvoice(data.id))
        }
    }

    const handleDownload=(invoiceD)=>{
        // const byteCharacters = atob(invoiceD.downloadLink);
        console.log('byteCharacters',invoiceD.downloadLink)
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], {type: 'file/pdf'});
        // const blobUrl = URL.createObjectURL(blob);
        // let decodedBase64 = base64.base64Decode(invoiceD.downloadLink, 'sample');
        // console.log(decodedBase64);
    }

    const initialValuesEdit={
        invoiceNr:selectedInvoice ? selectedInvoice.id:"",
        issueDate:selectedInvoice? moment(selectedInvoice.createdOn).format('YYYY-MM-dd'):`${moment(new Date()).format("YYYY-MM-DD")}`,
        dueDate:selectedInvoice?selectedInvoice.dueDate:"",
        status:selectedInvoice?selectedInvoice.paymentStatus:"Payment Pending",
        r_name:selectedInvoice?selectedInvoice.recipientDetail.name:"",
        r_comp:selectedInvoice?selectedInvoice.recipientDetail.company:"",
        r_address1:selectedInvoice?selectedInvoice.recipientDetail.address1:"",
        r_address2:selectedInvoice?selectedInvoice.recipientDetail.address2:"",
        s_name:selectedInvoice?selectedInvoice.senderDetail.name:"",
        s_address1:selectedInvoice?selectedInvoice.senderDetail.address1:"",
        s_address2:selectedInvoice?selectedInvoice.senderDetail.address2:"",
        invoiceText:selectedInvoice?selectedInvoice.invoiceText:"",
        footerText:selectedInvoice?selectedInvoice.invoiceFooter:"",
        total:selectedInvoice?selectedInvoice.total:bookingData.price,
        tableData:selectedInvoice?selectedInvoice.invoiceItem:[],
    }
    const initialValues={
        invoiceNr:``,
        issueDate:`${moment(new Date()).format("YYYY-MM-DD")}`,
        dueDate:``,
        status:'Payment Pending',
        r_name:guestDetails.name?`${guestDetails.name}`:"",
        r_comp:guestDetails.company?`${guestDetails.company}`:"",
        r_address1:guestDetails.address?`${guestDetails.address}`:"",
        r_address2:guestDetails.country?`${guestDetails.country}`:"",
        s_name:settings.name?`${settings.name}`:"",
        s_address1:settings.address1?`${settings.address1}`:"",
        s_address2:settings.address2?`${settings.address2}`:"",
        s_country:settings.country?`${settings.country}`:"",
        invoiceText:settings.invoiceText?`${settings.invoiceText}`:"",
        footerText:settings.invoiceFooter?`${settings.invoiceFooter}`:"",
        total:bookingData? bookingData.price:0,
    }

  return (
    <div className="p-3">
        <Loading loadingStatus={actionForAddInvoice.loading}/>
        <Row >
            <div className="pb-2 pl-3 d-flex w-100 justify-content-between">
                <div className="d-flex">
                    <div className={styles.subHeader}> Invoice </div>
                    <InfoOutlinedIcon
                        fontSize="small"
                        color="inherit"
                        data-tip
                        data-for="guest"
                        className={styles.toolTipIcon}
                    />
                </div>
                <div>
                    <ReactTooltip place="bottom" type="dark" id="guest" effect="solid" className={styles.toolTip}>
                    <span>
                     You will see here invoices made for this reservation. To see all invoices linked to
                    a particular guest, click ‘Guests’ on the left menu and search for the desired
                    guest. To see all invoices, click ‘Invoices’ on the left menu.
                    Note that changing the invoice status will not affect the payment status of the
                    booking. Changing the status of the total due can be done under the ‘Booking
                    Details’ or ‘Payment’ tabs.
                    </span>
                    </ReactTooltip>
                </div>
                <button
                    className={styles2.sideButton}
                    onClick={()=> {
                        if(createMode){
                            setSelectedInvoice(null);
                        }
                        setCreateMode(!createMode)
                    }}
                >{(createMode)?"View invoice":"Create invoice"}</button>
            </div>
        </Row>
        {(!createMode)?(
            <>
                <div className="p-0">
                    <Col xs={12} md={12} lg={12}>
                        <Table
                            rows={invoiceByBooking}
                            cols={cols}
                            onEdit={(data)=>handleEdit(data)}
                            onDelete={(val)=>handleDelete(val)}
                            startKey={cols[0].key}
                            dateFormat={dateFormat}
                            onDownload={handleDownload}
                        />
                    </Col>
                </div>
            </>
        ):(
            <>
                <CreateMode
                    initialValues={(selectedInvoice && selectedInvoice.length!==0)?initialValuesEdit:initialValues}
                    validationSchema={invoiceSchema}
                    onSubmit={handleSubmit}
                    bookingId={props.bookingId}
                />
            </>
        )}
    </div>
  );
}

export default Invoice;
