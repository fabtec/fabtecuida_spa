import React, { useState, useEffect } from 'react'
import * as RA from 'ramda-adjunct'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Api from './services/api'
import LoadingPage from './components/LoadingPage'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import NewOrderPage from './components/NewOrderPage'
import Layout from './components/Layout'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    Api.verifyUser()
      .then((isValid) => {
        setIsLoggedIn(isValid)
      })
      .catch((isValid) => {
        console.log('---')
        setIsLoggedIn(isValid)
      })
  }, [])

  const renderRoot = () => {
    if (RA.isNilOrEmpty(isLoggedIn)) {
      return (
        <LoadingPage />
      )
    }

    if (!isLoggedIn) {
      return (
        <LoginPage />
      )
    }

    return (
      <Router>
        <Switch>
          <Route path='/orders/new'>
            <Layout>
              <NewOrderPage />
            </Layout>
          </Route>
          <Route path={['/', '/dashboard']}>
            <Layout>
              <DashboardPage />
            </Layout>
          </Route>
        </Switch>
      </Router>
    )
  }

  return (
    <div className='App'>
      {renderRoot()}
    </div>
  )
}

export default App
