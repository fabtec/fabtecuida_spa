import React, { useState } from 'react'
import './App.css'
import 'tabler-react/dist/Tabler.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Api from './services/api'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  Api.verifyUser()
    .then((isValid) => {
      setIsLoggedIn(isValid)
    })
    .catch((isValid) => {
      console.log('---')
      setIsLoggedIn(isValid)
    })

  const renderRoot = () => {
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
