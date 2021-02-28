import React from 'react';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import {BrowserRouter as Router , Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="container">
      <br></br>
      <Route path="/" exact component={Login}></Route>
      <Route path="/signup" exact component={Signup}></Route>
    </div>
  </Router>
  );
}

export default App;
