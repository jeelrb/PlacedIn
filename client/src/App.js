import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import AddProfile from './components/AddProfile'
import Profile from './components/Profile'
import InterviewExperience from './components/InterviewExperience'
import Colleagues from './components/Colleagues'
import AddPost from './components/AddPost'
import About from './components/About'
import YourPosts from './components/YourPosts'
import YourInterviewExperiences from './components/YouInterviewExperiences'
import ForgotPassword from './components/ForgotPassword'
import PrivateRoute from './components/routing/PrivateRoute'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';

function App() {

  const [ user, setUser ] = useState({
    username: '',
    token: '',
    isAuthenticated: false,
    isLoading: true
  })

  const onAuthenticated = (token, isAuthenticated, isLoading) => {
    setUser({
      token, isAuthenticated, isLoading
    })
    // console.log(isAuthenticated)
  }

  return (
    <Router>
        <Switch>
          <Route path="/" exact render={() => <Login onAuthenticated={onAuthenticated}/>}></Route>
          <Route path="/signup" exact render={() => <Signup onAuthenticated={onAuthenticated}/>}></Route>
          <Route path="/forgot-password" exact render={() => <ForgotPassword />}></Route>
          <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/dashboard/profileSettings" exact component={AddProfile}></PrivateRoute>
          <PrivateRoute path="/dashboard/profiles" exact component={Colleagues}></PrivateRoute>
          <PrivateRoute path="/dashboard/profiles/:user" component={Profile}></PrivateRoute>
          <PrivateRoute path="/dashboard/interview-exp" component={InterviewExperience}></PrivateRoute>
          <PrivateRoute path="/dashboard/post" component={AddPost}></PrivateRoute>
          <PrivateRoute path="/dashboard/myposts" component={YourPosts}></PrivateRoute>
          <PrivateRoute path="/dashboard/myinterviewexperiences" component={YourInterviewExperiences}></PrivateRoute>
          <PrivateRoute path="/dashboard/about" component={About}></PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;
