import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../css/main.css';
import Header from '../navigations/Header';
import Home from '../home/View';
import UserLogIn from '../users/UserLogIn';
import UserLogOut from '../users/UserLogOut';
import Questionnaires from '../statistics/Questionnaires';

class App extends Component {

  render() {
    
    return (
      <div className='App'>
        <Route component={Header} />
        <Route exact path='/' component={Home}/>
        <Route exact path='/statistics' component={Questionnaires}/>
        <Route exact path='/log-in' component={UserLogIn}/>
        <Route exact path='/log-out' component={UserLogOut}/>
      </div>
    );
  }
}

export default App;
