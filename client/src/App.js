import React from 'react';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
    <div className="container">
      <br></br>
      <Route path="/" exact component={Login}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/dashboard" exact component={Dashboard}></Route>
    </div>
  </Router>
  );
}

export default App;
