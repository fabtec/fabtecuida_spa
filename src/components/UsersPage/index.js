import React, { useState, useEffect } from "react";

import Api from "../../services/api";
import {Tabs, Tab, Form, Button} from "react-bootstrap";

function UsersPage() {
  

  return (
    <Tabs defaultActiveKey="addUser" id="uncontrolled-tab-example">
        <Tab eventKey="addUser" title="Añadir Usuario">
            asd
        </Tab>
        <Tab eventKey="userList" title="Usuarios">
            asd
        </Tab>
    </Tabs>
    
  );
}

export default UsersPage;
