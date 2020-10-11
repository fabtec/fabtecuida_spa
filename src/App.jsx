import React from 'react';

import EntitiesPage from './components/EntitiesPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
          <Route component={ EntitiesPage } path="/" exact/>
          <Route component={ LoginPage } path="/login" exact/>
      </Switch>
    </Router>
  );
}

export default App;