import React,{useState,useEffect} from 'react';
import Loading from '../../../../components/loading';
import {useSelector,useDispatch} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import Table from "../../../../components/Table";
import EditInvoice from './Components/EditInvoice';
import {getInvoices,editInvoice,deleteInvoice} from '../../../../general_redux/invoice/actions';

function Invoices(){
    const dispatch=useDispatch();
    const [viewInvoice,setViewInvoice]=useState(false);
    const invoiceList=useSelector(({invoice})=>invoice && invoice.invoiceList);
    const [selectedData,setSelectedData]=useState(null);    
    const dateFormat = useSelector(({generalSetting})=>generalSetting && generalSetting.setting.dateDisplay);
    const actionForGetInvoice=useSelector(({invoice})=>invoice && invoice.actionForGetInvoice);

    useEffect(()=>{
        dispatch(getInvoices());
    },[])

    const handleEdit=(data)=>{
        setSelectedData(data)
        setViewInvoice(true);
    }

    const handleDelete=(data)=>{
        dispatch(deleteInvoice(data.id));
    }

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
        console.log(data)
        const payload={
            id:selectedData.id,
            bookingId:selectedData.bookingId,
            invoiceDate:data.invoiceDate,
            dueDate:data.dueDate,
            invoiceNumber:"3",
            downloadLink:selectedData.downloadLink,
            markSent:false,
            currency:selectedData.currency,
            invoiceItem:tableData,
            total:totalCost,
            recipientDetail:{
                name:data.r_name,
                company:data.r_comp,
                address1:data.r_address1,
                address2:data.r_address2,
                email:selectedData.recipientDetail.email,
            },
            senderDetail:{
                name:data.s_name,
                address1:data.s_address1,
                address2:data.s_address2,
            },
            invoiceText:data.invoiceText,
            invoiceFooter:data.invoiceText,
            paymentStatus:data.status,
            guestId:selectedData.guestId
        }
        console.log(payload);
        dispatch(editInvoice(payload));
    }

    return(
        <>
            <EditInvoice
                show={selectedData && viewInvoice}
                onHide={()=>{
                    setViewInvoice(false);
                    setSelectedData(null);
                }}
                selectedData={selectedData}
                handleSubmit={handleSubmit}
                bookingId={selectedData?selectedData.bookingId:""}
            />
            <Loading loadingStatus={actionForGetInvoice.loading}/>
            <Container fluid>
                <Row className="justify-content-center ">
                    <Col md={"auto"} lg={"auto"} className={`pt-3`}>
                        {/*<AppTable*/}
                        {/*    cols={cols}*/}
                        {/*    tableName="Inquiry"*/}
                        {/*    rows={queryResult}*/}
                        {/*    dateFormat={dateFinal.val}*/}
                        {/*/>*/}
                        <Table
                            rows={invoiceList}
                            startKey={cols[0].key}
                            cols={cols}
                            dateFormat={dateFormat}
                            onEdit={(data)=>handleEdit(data)}
                            onDelete={handleDelete}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Invoices;