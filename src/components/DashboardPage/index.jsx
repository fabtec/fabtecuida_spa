import React, { useState } from "react"
import { Tabs, Tab, Row, Col } from "react-bootstrap"
import DashboardCalendar from '../DashboardCalendar'
import './DashboardPage.css'

const DashboardPage = () => {

    const [tabKey, setTabKey] = useState("calendar");

    return (
        <div>
            {/* <DashboardSearch setSearch={setOrderSearch} /> */}
            <Tabs activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
                <Tab eventKey="calendar" title="Calendario">
                <Row className="row">
                    <Col>
                        <DashboardCalendar />
                    </Col>
                </Row>
                </Tab>
                <Tab eventKey="table" title="Tabla">
                <div className="row justify-content-center">
                    {/* <DashboardTable orders={orders} setOrder={setOrder} setShowModalInfo={setShowOrder} /> */}
                </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default DashboardPage
