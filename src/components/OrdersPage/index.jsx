import React, { useState } from "react";
import { Button,Col, Row, Tabs, Tab } from "react-bootstrap";
import OrderCreateModal from '../OrderCreateModal';
import OrderPendingTab from '../OrderPendingTab'
import OrderInProgressTab from '../OrderInProgressTab'

import './OrdersPage.css'

const OrdersPage = () => {
    const [showModalSingle, setShowModalSingle] = useState(false);
    const [tabKey, setTabKey] = useState("pending");

    return (
        <div>
            <Row>
                <Col xs={12} className="text-center mb-4">
                    <Button onClick={()=>setShowModalSingle(true)}>Crear Nueva Orden</Button>
                </Col>
                <Col xs={12}>
                    <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
                    <Tab eventKey="pending" title="Pendientes" >
                        <OrderPendingTab tabKey={tabKey} />
                    </Tab>                    
                    <Tab eventKey="inprogress" title="En Progreso">
                        <OrderInProgressTab tabKey={tabKey} />
                    </Tab>
                    </Tabs>
                </Col>
            </Row>
            <OrderCreateModal showModal={ showModalSingle } handleClose={()=> setShowModalSingle(false)} />
        </div> 
      )
    }

export default OrdersPage
