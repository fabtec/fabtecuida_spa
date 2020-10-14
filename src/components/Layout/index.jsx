import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import LoginPage from '../LoginPage';
import DashboardPage from '../DashboardPage';
import { AppContext } from '../../context/AppContext';
import { verifyTokenAction } from '../../redux/authDucks';
import LoadingPage from '../LoadingPage';
import EntitiesPage from '../EntitiesPage';

const Layout = ({ children }) => {

  
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  const { isSidebarOpen } = useContext(AppContext);
  const showSidebarClassname = isSidebarOpen ? 'd-flex' : 'd-flex toggled';

  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth)  

  useEffect(()=>{
    dispatch(verifyTokenAction())
  },[dispatch])

  useEffect(()=>{

    if(auth.active && !auth.loading){
      setIsLoading(false);
    }

    if(!auth.active && !auth.loading){
      setIsLoading(false);
      setIsLogin(true);
    }

  }, [auth])

  const renderRoot = () => {
    return ( isLogin ? 
      <LoginPage></LoginPage> :
      <Router>
        <div className={showSidebarClassname} id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <Navbar />
                <div className="mt-4 container-fluid">
                    
                        <Switch>
                            <Route component={ DashboardPage } path="/" exact/>
                            <Route component={ LoginPage } path="/login" exact/>
                            <Route component={ EntitiesPage } path="/entities" exact/>
                        </Switch>
                    
                </div>
            </div>
        </div>
    </Router>
    )

  }

  
  return (
    isLoading ? 
    <LoadingPage></LoadingPage> :
    renderRoot()
  )
}

export default Layout
