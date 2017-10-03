import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './Responsive.css';
import Landing from './components/landing/landing';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home';
import Files from './components/dashboard/files';
import Account from './components/dashboard/account';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            localStorage.jwt ? (
              <Redirect to="/home"/>
            ) : (
              <Landing/>
            )
          )}/>
          <Dashboard>
            <Route path='/home' component={Home}/>
            <Route path='/files' component={Files}/>
            <Route path='/files/*' component={Files}/>
            <Route path='/account' component={Account}/>
          </Dashboard>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
