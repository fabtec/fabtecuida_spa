import React, { useState } from 'react'
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import './App.css'
import 'tabler-react/dist/Tabler.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Api from './services/api'
import LoadingPage from './components/LoadingPage'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  Api.verifyUser()
    .then((isValid) => {
      setIsLoggedIn(isValid)
    })
    .catch((isValid) => {
      console.log('---')
      setIsLoggedIn(isValid)
    })

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
          <Route path='/dashboard'>
            <DashboardPage />
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
