import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router , Route} from 'react-router-dom';

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
