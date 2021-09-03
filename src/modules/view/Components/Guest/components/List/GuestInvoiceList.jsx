import React, { useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Table from '../../../../../../components/Table';

function GuestInvoiceList(props) {
    const cols = [
        {lable: 'Created', key: 'created'},
        {lable: 'Invoice Ne', key: 'invoiceNr'},
        {lable: 'Total', key: 'total'},
        {lable: 'Sent', key: 'sent'},
        {lable: 'Status', key: 'status'},
        {lable: 'Actions', key: ''},
    ]

    return (
        <div>
            <Container fluid>
                <Row >
                    <Col xs={12} md={8} className={`pt-3`}>
                        <Table
                            rows={[]}
                            cols={cols}
                            startKey={cols[0].key}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default GuestInvoiceList;