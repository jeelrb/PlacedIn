import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';

function App() {
  return (
    <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
    </Router>
  );
}

export default App;
