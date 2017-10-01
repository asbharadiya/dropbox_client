import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Landing from './components/landing/landing';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home';

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
          </Dashboard>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
