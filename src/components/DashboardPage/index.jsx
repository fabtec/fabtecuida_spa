import React, { useState, useEffect } from "react";
import EntitiesList from  '../EntitiesList';

import './DashboardPage.css'
const DashboardPage = () => {

    useEffect(()=>{
        //dispatch(verifyTokenAction());
    },[])

    

    return (
        <EntitiesList />
    )
}

export default DashboardPage
