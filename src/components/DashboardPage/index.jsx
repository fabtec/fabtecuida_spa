import React, { useState } from "react"
import { Tabs, Tab, Row, Col } from "react-bootstrap"
import DashboardCalendar from '../DashboardCalendar'
import DashboardSearch from "../DashboardSearch"
import DashboardTable from "../DashboardTable"
import './DashboardPage.css'

const DashboardPage = () => {
    
    const [tabKey, setTabKey] = useState("calendar");

    return (
        <div>
            <DashboardSearch />
            <Tabs className="mt-4" activeKey={tabKey} onSelect={(keyName) => setTabKey(keyName)}>
                <Tab eventKey="calendar" title="Calendario">
                <Row>
                    <Col>
                        <DashboardCalendar />
                    </Col>
                </Row>
                </Tab>
                <Tab eventKey="table" title="Tabla">
                    <Row>
                        <Col>
                        <DashboardTable />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </div>
    )
}

export default DashboardPage
