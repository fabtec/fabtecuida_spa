import React from 'react';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DashboardPage from './components/DashboardPage';

import { Provider } from 'react-redux';
import generateStore from './redux/store'

function App() {

  const store = generateStore();

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
            <Route component={ DashboardPage } path="/" exact/>
            <Route component={ LoginPage } path="/login" exact/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;